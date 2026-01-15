import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import {LocationIcon, PaymentIcon} from '@/assets/icons';
import AmountWithCurrency from '@/components/AmountWithCurrency';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import addressStore from '@/stores/addressStore';
import cartStore from '@/stores/cartStore';
import {commonColors, ThemeType} from '@/styles/colors';
import {ms, vs} from '@/styles/scaling';

import useRTLStyles from './styles';

const VAT_RATE = 0.15; // 15% VAT
const DELIVERY_CHARGE = 1.0;

type CheckoutNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Checkout'
>;

const Checkout = observer(() => {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const cartItems = cartStore.items;
  const itemTotal = cartStore.total;
  const vat = itemTotal * VAT_RATE;
  const deliveryCharges = DELIVERY_CHARGE;
  const totalPrice = itemTotal + vat + deliveryCharges;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  useEffect(() => {
    addressStore.loadShippingAddress();
    cartStore.loadCartItems();
  }, []);

  return (
    <WrapperContainer>
      <HeaderComp
        showBack={true}
        title="Payment"
        customStyle={styles.headerStyle}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Delivery Address Section */}
        <View style={styles.addressContainer}>
          <View style={styles.addressHeader}>
            <LocationIcon width={ms(20)} height={ms(20)} />
            {addressStore.selectedAddress?.contact_name ? (
              <TextComp
                isDynamic
                text={addressStore.selectedAddress.contact_name}
                style={styles.addressName}
              />
            ) : (
              <TextComp text="SHIPPING_ADDRESS" style={styles.addressName} />
            )}
          </View>
          {addressStore.selectedAddress ? (
            <TextComp
              isDynamic
              text={`${addressStore.selectedAddress.address_line1 || ''} ${
                addressStore.selectedAddress.address_line2 || ''
              }, ${addressStore.selectedAddress.city || ''}, ${
                addressStore.selectedAddress.postal_code || ''
              }`}
              style={styles.addressText}
            />
          ) : (
            <TextComp
              text="PLEASE_SELECT_SHIPPING_ADDRESS"
              style={[styles.addressText, {color: commonColors.error}]}
            />
          )}
          <TouchableOpacity
            style={styles.changeButton}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('MyAddress', {selectMode: true})
            }>
            <TextComp
              text={addressStore.selectedAddress ? 'CHANGE' : 'SELECT_ADDRESS'}
              style={styles.changeText}
            />
          </TouchableOpacity>
        </View>

        {/* Invoice Info Section */}
        <View style={styles.invoiceInfoContainer}>
          <TextComp text="INVOICE_INFO" style={styles.sectionTitle} />
          <View style={styles.invoiceButtonsContainer}>
            <TouchableOpacity style={styles.invoiceButton} activeOpacity={0.7}>
              <TextComp
                text="GENERATE_TAX_INVOICE"
                style={styles.invoiceButtonText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.invoiceButton} activeOpacity={0.7}>
              <TextComp
                text="ORDER_AS_AN_INDIVIDUAL"
                style={styles.invoiceButtonText}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Details Section */}
        <TextComp text="PRICE_DETAILS" style={styles.priceDetailsTitle} />
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <TextComp text="ITEM_TOTAL" style={styles.priceLabel} />
            <AmountWithCurrency
              amound={itemTotal}
              amountStyle={styles.priceValue}
              gap={vs(3)}
            />
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <TextComp text="VAT" style={styles.priceLabel} />
            <AmountWithCurrency
              amound={vat}
              amountStyle={styles.priceValue}
              gap={vs(3)}
            />
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <TextComp text="DELIVERY_CHARGES" style={styles.priceLabel} />
            <AmountWithCurrency
              amound={deliveryCharges}
              amountStyle={styles.priceValue}
              gap={vs(3)}
            />
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <TextComp text="TOTAL_PRICE" style={styles.totalLabel} />
            <AmountWithCurrency
              amound={totalPrice}
              amountStyle={styles.totalValue}
              gap={vs(3)}
            />
          </View>
        </View>

        {/* Help/Contact Section */}
        <View style={styles.helpContainer}>
          <TextComp isDynamic text="🙁" style={styles.helpEmoji} />
          <TextComp text="HAVING_TROUBLE_ORDERING" style={styles.helpText} />
          <TouchableOpacity style={styles.contactButton} activeOpacity={0.7}>
            <TextComp text="CONTACT" style={styles.contactText} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Payment Button */}
      {cartItems.length > 0 && (
        <View style={styles.paymentButtonContainer}>
          <TouchableOpacity
            style={styles.paymentButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PaymentDetails')}>
            <View style={styles.paymentButtonContent}>
              <TextComp text="PAY" style={styles.paymentButtonText} />
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
            </View>
          </TouchableOpacity>
        </View>
      )}
    </WrapperContainer>
  );
});

export default Checkout;
