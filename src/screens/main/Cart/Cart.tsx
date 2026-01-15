import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {toJS} from 'mobx';
import {observer} from 'mobx-react-lite';

import {DeleteIcon, PaymentIcon} from '@/assets/icons';
import {AmountWithCurrency, ImageComp} from '@/components';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import cartStore from '@/stores/cartStore';
import {commonColors, ThemeType} from '@/styles/colors';
import {ms, vs} from '@/styles/scaling';

import useRTLStyles from './styles';

const VAT_RATE = 0.15; // 15% VAT
const DELIVERY_CHARGE = 1.0;

type CartNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Cart'>;

const Cart = observer(() => {
  const navigation = useNavigation<CartNavigationProp>();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const cartItems = cartStore.items;
  const itemTotal = cartStore.total;
  const vat = itemTotal * VAT_RATE;
  const deliveryCharges = DELIVERY_CHARGE;
  const totalPrice = itemTotal + vat + deliveryCharges;

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    cartStore.updateQuantity(
      productId,
      quantity,
      selectedSize,
      selectedVariant
    );
  };

  const handleRemoveItem = (
    productId: string,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    cartStore.removeFromCart(productId, selectedSize, selectedVariant);
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  return (
    <WrapperContainer>
      <HeaderComp
        showBack={true}
        title="CART"
        customStyle={styles.headerStyle}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Items Added Section */}
        <TextComp text="Items Added" style={styles.sectionTitle} />
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <TextComp text="Cart is empty" style={styles.emptyText} />
            <TextComp
              text="Add items to get started"
              style={styles.emptySubText}
            />
          </View>
        ) : (
          cartItems.map(item => {
            const product = toJS(item.product);
            let imageSource = '';
            if (typeof product.image === 'string') {
              imageSource = product.image;
            } else if (
              product.image &&
              typeof product.image === 'object' &&
              'uri' in product.image
            ) {
              imageSource = (product.image as {uri: string}).uri;
            }
            return (
              <View key={item.id} style={styles.itemContainer}>
                <ImageComp
                  source={imageSource}
                  style={styles.itemImage}
                  containerStyle={styles.itemImageContainer}
                />
                <View style={styles.itemDetails}>
                  <TextComp
                    isDynamic
                    text={product.name}
                    style={styles.itemName}
                  />
                  <AmountWithCurrency
                    amound={product.price}
                    amountStyle={styles.itemPrice}
                    gap={vs(3)}
                  />
                  <View style={styles.itemActions}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(
                            product.id,
                            item.quantity - 1,
                            item.selectedSize,
                            item.selectedVariant
                          )
                        }
                        activeOpacity={0.7}>
                        <TextComp
                          isDynamic
                          text="−"
                          style={styles.quantityButtonText}
                        />
                      </TouchableOpacity>
                      <TextComp
                        isDynamic
                        text={item.quantity.toString()}
                        style={styles.quantityText}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(
                            product.id,
                            item.quantity + 1,
                            item.selectedSize,
                            item.selectedVariant
                          )
                        }
                        activeOpacity={0.7}>
                        <TextComp
                          isDynamic
                          text="+"
                          style={styles.quantityButtonText}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveItem(
                          product.id,
                          item.selectedSize,
                          item.selectedVariant
                        )
                      }
                      style={styles.deleteButton}
                      activeOpacity={0.7}>
                      <DeleteIcon width={ms(18)} height={ms(20)} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Price Details Section */}
        {cartItems.length > 0 && (
          <>
            <TextComp text="Price Details" style={styles.priceDetailsTitle} />
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <TextComp text="Item total" style={styles.priceLabel} />
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
                <TextComp text="Delivery charges" style={styles.priceLabel} />
                <AmountWithCurrency
                  amound={deliveryCharges}
                  amountStyle={styles.priceValue}
                  gap={vs(3)}
                />
              </View>
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <TextComp text="Total Price" style={styles.totalLabel} />
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
              <TextComp
                text="Having trouble ordering?"
                style={styles.helpText}
              />
              <TouchableOpacity
                style={styles.contactButton}
                activeOpacity={0.7}>
                <TextComp text="Contact" style={styles.contactText} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Payment Button */}
      {cartItems.length > 0 && (
        <View style={styles.paymentButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            style={styles.paymentButton}
            activeOpacity={0.8}>
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

export default Cart;
