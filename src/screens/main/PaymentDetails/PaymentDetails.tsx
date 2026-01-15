import React, {useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {format} from 'date-fns';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {useCreditAccountInfo} from '@/api/graphql/creditAccounts';
import {useWalletBalance} from '@/api/graphql/wallets';
import {PaymentIcon} from '@/assets/icons';
import AmountWithCurrency from '@/components/AmountWithCurrency';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import addressStore from '@/stores/addressStore';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import {commonColors, ThemeType} from '@/styles/colors';
import {ms} from '@/styles/scaling';
import {CustomError, validateGraphQlError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';

const VAT_RATE = 0.15; // 15% VAT
const DELIVERY_CHARGE = 1.0;

type PaymentDetailsNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'PaymentDetails'
>;

const PaymentDetails = observer(() => {
  const {t} = useTranslation();
  const navigation = useNavigation<PaymentDetailsNavigationProp>();
  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const styles = useRTLStyles(isRTL, theme as ThemeType);
  const [paymentMethod, setPaymentMethod] = useState<
    'wallet' | 'cash' | 'credit' | 'credit_wallet' | 'credit_cod' | 'wallet_cod'
  >('wallet');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [splitPayments, setSplitPayments] = useState({
    wallet: 0,
    credit: 0,
    cod: 0,
  });
  const {balance: walletBalance, refetch: refetchWalletBalance} =
    useWalletBalance();
  const {
    availableCredit,
    isApproved: isCreditApproved,
    loading: creditLoading,
  } = useCreditAccountInfo();

  const cartItems = cartStore.items;
  const itemTotal = cartStore.total;
  const vat = itemTotal * VAT_RATE;
  const deliveryCharges = DELIVERY_CHARGE;
  const totalPrice = itemTotal + vat + deliveryCharges;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  const handleCreateOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('EMPTY_CART', 'CART_EMPTY_MESSAGE');
      return;
    }

    if (!addressStore.selectedAddress) {
      Alert.alert(
        'SHIPPING_ADDRESS_REQUIRED',
        'PLEASE_SELECT_SHIPPING_ADDRESS',
        [
          {
            text: 'SELECT_ADDRESS',
            onPress: () => navigation.navigate('MyAddress', {selectMode: true}),
          },
          {
            text: 'CANCEL',
            style: 'cancel',
          },
        ]
      );
      return;
    }

    // Validate wallet payment
    if (paymentMethod === 'wallet') {
      const shippingCost = 0;
      const paymentAmountWithoutVAT = itemTotal + shippingCost;
      if (walletBalance < paymentAmountWithoutVAT) {
        Alert.alert(
          'INSUFFICIENT_WALLET_BALANCE',
          'WALLET_BALANCE_LESS_THAN_TOTAL'
        );
        return;
      }
    }

    // Validate credit payment
    if (paymentMethod === 'credit') {
      if (!isCreditApproved) {
        Alert.alert('CREDIT_NOT_APPROVED', 'CREDIT_ACCOUNT_NOT_APPROVED');
        return;
      }
      if (availableCredit < itemTotal) {
        Alert.alert('INSUFFICIENT_CREDIT', 'AVAILABLE_CREDIT_LESS_THAN_TOTAL');
        return;
      }
    }

    // Validate split payments
    if (
      paymentMethod === 'credit_wallet' ||
      paymentMethod === 'credit_cod' ||
      paymentMethod === 'wallet_cod'
    ) {
      const totalSplit =
        splitPayments.wallet + splitPayments.credit + splitPayments.cod;
      if (Math.abs(totalSplit - itemTotal) > 0.01) {
        Alert.alert('INVALID_SPLIT_PAYMENT', 'SPLIT_PAYMENT_MUST_EQUAL_TOTAL');
        return;
      }
      if (splitPayments.wallet > 0 && walletBalance < splitPayments.wallet) {
        Alert.alert(
          'INSUFFICIENT_WALLET_BALANCE',
          'WALLET_BALANCE_LESS_THAN_SPLIT_AMOUNT'
        );
        return;
      }
      if (splitPayments.credit > 0) {
        if (!isCreditApproved) {
          Alert.alert('CREDIT_NOT_APPROVED', 'CREDIT_ACCOUNT_NOT_APPROVED');
          return;
        }
        if (availableCredit < splitPayments.credit) {
          Alert.alert(
            'INSUFFICIENT_CREDIT',
            'AVAILABLE_CREDIT_LESS_THAN_SPLIT_AMOUNT'
          );
          return;
        }
      }
    }

    setIsCreatingOrder(true);

    try {
      const shippingAddressObj = {
        contact_name: addressStore.selectedAddress.contact_name || null,
        contact_phone: addressStore.selectedAddress.contact_phone || null,
        address_line1: addressStore.selectedAddress.address_line1 || null,
        address_line2: addressStore.selectedAddress.address_line2 || null,
        city: addressStore.selectedAddress.city || null,
        state: addressStore.selectedAddress.state || null,
        postal_code: addressStore.selectedAddress.postal_code || null,
        country: addressStore.selectedAddress.country || null,
        landmark: addressStore.selectedAddress.landmark || null,
      };

      const shippingAddress = JSON.stringify(shippingAddressObj);

      const shippingCost = 0;

      // Determine payment method and status
      let paymentMethodValue: string;
      let paymentStatusValue: string;
      let walletAmount: number | null = null;
      let codAmount: number | null = null;
      let creditAmount: number | null = null;

      if (paymentMethod === 'wallet') {
        paymentMethodValue = 'WALLET';
        paymentStatusValue = 'completed';
        walletAmount = itemTotal;
      } else if (paymentMethod === 'credit') {
        paymentMethodValue = 'CREDIT';
        paymentStatusValue = 'completed';
        creditAmount = itemTotal;
      } else if (paymentMethod === 'credit_wallet') {
        paymentMethodValue = 'CREDIT_WALLET';
        paymentStatusValue = 'pending';
        walletAmount = splitPayments.wallet > 0 ? splitPayments.wallet : null;
        creditAmount = splitPayments.credit > 0 ? splitPayments.credit : null;
      } else if (paymentMethod === 'credit_cod') {
        paymentMethodValue = 'CREDIT_COD';
        paymentStatusValue = 'pending';
        creditAmount = splitPayments.credit > 0 ? splitPayments.credit : null;
        codAmount = splitPayments.cod > 0 ? splitPayments.cod : null;
      } else if (paymentMethod === 'wallet_cod') {
        paymentMethodValue = 'WALLET_COD';
        paymentStatusValue = 'pending';
        walletAmount = splitPayments.wallet > 0 ? splitPayments.wallet : null;
        codAmount = splitPayments.cod > 0 ? splitPayments.cod : null;
      } else {
        paymentMethodValue = 'COD';
        paymentStatusValue = 'pending';
        codAmount = itemTotal;
      }

      const orderData = {
        subtotal: itemTotal,
        discount: 0,
        shipping_cost: shippingCost,
        order_status: 'pending',
        payment_status: paymentStatusValue,
        payment_method: paymentMethodValue,
        shipping_address: shippingAddress,
        wallet_amount: walletAmount,
        cod_amount: codAmount,
        credit_amount: creditAmount,
        debit_credit_amount: null,
        delivery_type: 'delivery',
        warehouse_id: null,
        rejection_reason: null,
        notes: null,
      };

      const newOrder = await orderStore.createOrder(orderData);
      await cartStore.clearCart();

      // Refetch wallet balance after successful order creation
      if (paymentMethod === 'wallet') {
        await refetchWalletBalance();
      }

      let dateObj = new Date(newOrder.created_at);
      if (isNaN(dateObj.getTime())) {
        dateObj = new Date();
      }

      const formattedDate = format(dateObj, 'dd MMM yyyy');
      const formattedTime = format(dateObj, 'h:mm a');

      navigation.navigate('PaymentSuccessful', {
        amount: newOrder.total_amount,
        date: formattedDate,
        time: formattedTime,
        paymentId: newOrder.order_no,
        paymentMethod: paymentMethod, // Or use a translation/formatted label if preferred
      });
    } catch (error: unknown) {
      const errorData = validateGraphQlError(error as CustomError);
      const errorMessage =
        errorData?.message ||
        (error instanceof Error ? error.message : '') ||
        t('FAILED_TO_CREATE_ORDER');

      Alert.alert(t('ORDER_FAILED'), errorMessage);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp title="PAYMENT_DETAILS" showBack={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Payment Options */}
        <View style={styles.paymentDetailsContainer}>
          <TextComp text="PAYMENT_DETAILS" style={styles.sectionTitle} />
          {/* Wallet Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('wallet')}
            activeOpacity={0.7}>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'wallet' && styles.radioButtonSelected,
                ]}>
                {paymentMethod === 'wallet' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <TextComp text="WALLET" style={styles.paymentOptionText} />
            </View>
            {paymentMethod === 'wallet' && (
              <AmountWithCurrency
                amound={walletBalance}
                amountStyle={styles.walletBalance}
              />
            )}
          </TouchableOpacity>

          {/* Credit Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('credit')}
            activeOpacity={0.7}
            disabled={!isCreditApproved || creditLoading}>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'credit' && styles.radioButtonSelected,
                ]}>
                {paymentMethod === 'credit' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <TextComp text="CREDIT" style={styles.paymentOptionText} />
            </View>
            {paymentMethod === 'credit' && (
              <AmountWithCurrency
                amound={availableCredit}
                amountStyle={styles.walletBalance}
              />
            )}
          </TouchableOpacity>

          {/* Cash Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('cash')}
            activeOpacity={0.7}>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'cash' && styles.radioButtonSelected,
                ]}>
                {paymentMethod === 'cash' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <TextComp text="CASH" style={styles.paymentOptionText} />
            </View>
          </TouchableOpacity>

          {/* Split Payment Options */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => {
              setPaymentMethod('credit_wallet');
              setSplitPayments({wallet: 0, credit: 0, cod: 0});
            }}
            activeOpacity={0.7}
            disabled={!isCreditApproved || creditLoading}>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'credit_wallet' &&
                    styles.radioButtonSelected,
                ]}>
                {paymentMethod === 'credit_wallet' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <TextComp text="CREDIT_WALLET" style={styles.paymentOptionText} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => {
              setPaymentMethod('credit_cod');
              setSplitPayments({wallet: 0, credit: 0, cod: 0});
            }}
            activeOpacity={0.7}
            disabled={!isCreditApproved || creditLoading}>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'credit_cod' && styles.radioButtonSelected,
                ]}>
                {paymentMethod === 'credit_cod' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <TextComp text="CREDIT_COD" style={styles.paymentOptionText} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => {
              setPaymentMethod('wallet_cod');
              setSplitPayments({wallet: 0, credit: 0, cod: 0});
            }}
            activeOpacity={0.7}>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'wallet_cod' && styles.radioButtonSelected,
                ]}>
                {paymentMethod === 'wallet_cod' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <TextComp text="WALLET_COD" style={styles.paymentOptionText} />
            </View>
          </TouchableOpacity>

          {/* Split Payment Inputs */}
          {(paymentMethod === 'credit_wallet' ||
            paymentMethod === 'credit_cod' ||
            paymentMethod === 'wallet_cod') && (
            <View style={styles.splitPaymentContainer}>
              <TextComp
                text="ENTER_SPLIT_AMOUNTS"
                style={styles.splitPaymentLabel}
              />

              {/* Wallet Input (for credit_wallet and wallet_cod) */}
              {(paymentMethod === 'credit_wallet' ||
                paymentMethod === 'wallet_cod') && (
                <View style={styles.splitInputRow}>
                  <TextComp text="WALLET" style={styles.splitLabel} />
                  <TextInputComp
                    value={
                      splitPayments.wallet > 0
                        ? splitPayments.wallet.toString()
                        : ''
                    }
                    onChangeText={(text: string) => {
                      const value = parseFloat(text) || 0;
                      const remaining = itemTotal - value;
                      if (paymentMethod === 'credit_wallet') {
                        setSplitPayments({
                          wallet: value,
                          credit: remaining,
                          cod: 0,
                        });
                      } else {
                        setSplitPayments({
                          wallet: value,
                          credit: 0,
                          cod: remaining,
                        });
                      }
                    }}
                    keyboardType="numeric"
                    placeholder="0.00"
                    containerStyle={styles.splitInput}
                  />
                  <TouchableOpacity
                    style={styles.maxButton}
                    onPress={() => {
                      const maxWallet = Math.min(walletBalance, itemTotal);
                      const remaining = itemTotal - maxWallet;
                      if (paymentMethod === 'credit_wallet') {
                        setSplitPayments({
                          wallet: maxWallet,
                          credit: remaining,
                          cod: 0,
                        });
                      } else {
                        setSplitPayments({
                          wallet: maxWallet,
                          credit: 0,
                          cod: remaining,
                        });
                      }
                    }}>
                    <TextComp text="MAX" style={styles.maxButtonText} />
                  </TouchableOpacity>
                </View>
              )}

              {/* Credit Input (for credit_wallet and credit_cod) */}
              {(paymentMethod === 'credit_wallet' ||
                paymentMethod === 'credit_cod') && (
                <View style={styles.splitInputRow}>
                  <TextComp text="CREDIT" style={styles.splitLabel} />
                  <TextInputComp
                    value={
                      splitPayments.credit > 0
                        ? splitPayments.credit.toString()
                        : ''
                    }
                    onChangeText={(text: string) => {
                      const value = parseFloat(text) || 0;
                      const remaining = itemTotal - value;
                      if (paymentMethod === 'credit_wallet') {
                        setSplitPayments({
                          wallet: remaining,
                          credit: value,
                          cod: 0,
                        });
                      } else {
                        setSplitPayments({
                          wallet: 0,
                          credit: value,
                          cod: remaining,
                        });
                      }
                    }}
                    keyboardType="numeric"
                    placeholder="0.00"
                    containerStyle={styles.splitInput}
                  />
                  <TouchableOpacity
                    style={styles.maxButton}
                    onPress={() => {
                      const maxCredit = Math.min(availableCredit, itemTotal);
                      const remaining = itemTotal - maxCredit;
                      if (paymentMethod === 'credit_wallet') {
                        setSplitPayments({
                          wallet: remaining,
                          credit: maxCredit,
                          cod: 0,
                        });
                      } else {
                        setSplitPayments({
                          wallet: 0,
                          credit: maxCredit,
                          cod: remaining,
                        });
                      }
                    }}>
                    <TextComp text="MAX" style={styles.maxButtonText} />
                  </TouchableOpacity>
                </View>
              )}

              {/* COD Input (for credit_cod and wallet_cod) */}
              {(paymentMethod === 'credit_cod' ||
                paymentMethod === 'wallet_cod') && (
                <View style={styles.splitInputRow}>
                  <TextComp text="COD" style={styles.splitLabel} />
                  <TextInputComp
                    value={
                      splitPayments.cod > 0 ? splitPayments.cod.toString() : ''
                    }
                    onChangeText={(text: string) => {
                      const value = parseFloat(text) || 0;
                      const remaining = itemTotal - value;
                      if (paymentMethod === 'credit_cod') {
                        setSplitPayments({
                          wallet: 0,
                          credit: remaining,
                          cod: value,
                        });
                      } else {
                        setSplitPayments({
                          wallet: remaining,
                          credit: 0,
                          cod: value,
                        });
                      }
                    }}
                    keyboardType="numeric"
                    placeholder="0.00"
                    containerStyle={styles.splitInput}
                  />
                </View>
              )}

              {/* Split Summary */}
              <View style={styles.splitSummary}>
                <TextComp text="TOTAL" style={styles.splitSummaryLabel} />
                <AmountWithCurrency
                  amound={
                    splitPayments.wallet +
                    splitPayments.credit +
                    splitPayments.cod
                  }
                  amountStyle={styles.splitSummaryAmount}
                />
              </View>
              {Math.abs(
                splitPayments.wallet +
                  splitPayments.credit +
                  splitPayments.cod -
                  itemTotal
              ) > 0.01 && (
                <TextComp
                  text="SPLIT_AMOUNT_MUST_EQUAL_TOTAL"
                  style={styles.splitErrorText}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Payment Button */}
      {cartItems.length > 0 && (
        <View style={styles.paymentButtonContainer}>
          <TouchableOpacity
            style={styles.paymentButton}
            activeOpacity={0.8}
            onPress={handleCreateOrder}
            disabled={
              isCreatingOrder ||
              ((paymentMethod === 'credit_wallet' ||
                paymentMethod === 'credit_cod' ||
                paymentMethod === 'wallet_cod') &&
                Math.abs(
                  splitPayments.wallet +
                    splitPayments.credit +
                    splitPayments.cod -
                    itemTotal
                ) > 0.01)
            }>
            <View style={styles.paymentButtonContent}>
              <TextComp
                text={isCreatingOrder ? 'CREATING_ORDER' : 'PAY'}
                style={styles.paymentButtonText}
              />
              {!isCreatingOrder && (
                <>
                  <PaymentIcon
                    width={ms(20)}
                    height={ms(20)}
                    fill={commonColors.white}
                  />
                  <TextComp
                    isDynamic
                    text={formatPrice(totalPrice)}
                    style={styles.paymentButtonText}
                  />
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </WrapperContainer>
  );
});

export default PaymentDetails;
