import React, {useState, useRef} from 'react';
import {TouchableOpacity, View, type ImageSourcePropType} from 'react-native';

import {t} from 'i18next';
import {observer} from 'mobx-react-lite';

import {ProductVariation} from '@/api/graphql/products/types';
import CustomBottomSheet, {
  CustomBottomSheetRef,
} from '@/components/CustomBottomSheet';
import ImageComp from '@/components/ImageComp/ImageComp';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import cartStore from '@/stores/cartStore';
import {ThemeType} from '@/styles/colors';
import {handleAddToCart} from '@/utils/cartUtils';

import SimpleQuantitySelector from './SimpleQuantitySelector';
import useRTLStyles from './styles';
import VariableProductDetails from './VariableProductDetails';

export interface ProductCardItem {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType | null;
  type: 'simple' | 'variable';
  weight?: string;
  quantityOptions?: number[];
  sizeOptions?: {label: string; value: string}[];
  variantOptions?: {label: string; value: string}[];
  variations?: ProductVariation[];
  minOrderValue?: number;
  cardType?: 'primary' | 'secondary';
  cardWidth?: number;
  category?: {id: string; name: string} | null;
  brand?: {id: string; name: string} | null;
  description?: string | null;
}

interface ProductCardCompProps {
  item: ProductCardItem;
  onPress: (item: ProductCardItem) => void;
  cardType?: 'primary' | 'secondary';
  cardWidth?: number;
}

const ProductCardComp: React.FC<ProductCardCompProps> = observer(
  ({item, cardType = 'primary', cardWidth}) => {
    const isRTL = useIsRTL();
    const {theme} = useTheme();
    const styles = useRTLStyles(isRTL, theme as ThemeType);
    const [showQuantitySelector, setShowQuantitySelector] = useState(false);
    const variableProductSheetRef = useRef<CustomBottomSheetRef>(null);

    // Get current quantity from cart store
    const currentQuantity = cartStore.getQuantity(item.id);

    // Helper function to extract URI from ImageSourcePropType
    const getImageSource = (
      image: ImageSourcePropType | null
    ): string | number | null => {
      if (!image) return null;
      if (typeof image === 'number') return image;
      if (typeof image === 'string') return image;
      if (Array.isArray(image)) {
        const firstImage = image[0];
        if (
          typeof firstImage === 'object' &&
          firstImage !== null &&
          'uri' in firstImage
        ) {
          return firstImage.uri || null;
        }
        return null;
      }
      if (typeof image === 'object' && image !== null && 'uri' in image) {
        return image.uri || null;
      }
      return null;
    };

    const handleCartClick = () => {
      if (item.type === 'simple') {
        // Add 1 quantity to cart for simple products
        const isInCart = cartStore.isInCart(item.id);
        if (isInCart) {
          // Increment existing quantity
          cartStore.incrementQuantity(item.id);
        } else {
          // Add new item with quantity 1 using common function
          handleAddToCart(item, 1);
        }
        // Show quantity selector overlay
        setShowQuantitySelector(true);
      } else {
        // Show variable product details bottom sheet
        variableProductSheetRef.current?.present();
      }
    };

    const handleQuantityChange = (quantity: number) => {
      // Use common handleAddToCart function
      handleAddToCart(item, quantity);
      // setShowQuantitySelector(false);
    };

    const handleRemove = () => {
      // Remove item from cart
      cartStore.removeFromCart(item.id);
      setShowQuantitySelector(false);
    };

    const handleVariableAddToCartComplete = () => {
      // Close the bottom sheet after adding to cart
      variableProductSheetRef.current?.close();
    };

    return (
      <>
        <TouchableOpacity
          style={[
            cardType === 'primary'
              ? styles.offerItem
              : styles.productCardContainer,
            cardWidth ? {width: cardWidth} : undefined,
          ]}
          onPress={() => {
            // onPress(item);
            variableProductSheetRef.current?.present();
          }}
          activeOpacity={0.7}>
          <View
            style={[
              styles.offerImageContainer,
              cardType === 'secondary' && styles.secCardImgStyle,
            ]}>
            {item.image ? (
              <ImageComp
                source={getImageSource(item.image) || ''}
                style={styles.offerImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.offerPlaceholder} />
            )}
            {cardType === 'primary' &&
              (item.type === 'simple' && showQuantitySelector ? (
                <SimpleQuantitySelector
                  quantity={currentQuantity || 1}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ) : (
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={handleCartClick}
                  activeOpacity={0.8}>
                  <TextComp isDynamic text="+" style={styles.addToCartIcon} />
                </TouchableOpacity>
              ))}
          </View>
          <TextComp
            isDynamic
            text={item.name}
            style={styles.offerName}
            numberOfLines={2}
          />
          <TextComp
            isDynamic
            text={`﷼ ${item.price}`}
            style={styles.offerPrice}
          />
          {cardType === 'secondary' && (
            <View style={styles.bottomButtonContainer}>
              {item.type === 'simple' && currentQuantity > 0 ? (
                <SimpleQuantitySelector
                  inline={true}
                  quantity={currentQuantity}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ) : (
                <TouchableOpacity
                  style={styles.addToCartBottomButton}
                  onPress={handleCartClick}
                  activeOpacity={0.8}>
                  <TextComp
                    isDynamic
                    text="+"
                    style={styles.addToCartBottomIcon}
                  />
                  <TextComp text="ADD" style={styles.addToCartBottomText} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </TouchableOpacity>

        {/* {item.type === 'variable' && ( */}
        <CustomBottomSheet
          ref={variableProductSheetRef}
          title={t('PRODUCT_DETAILS')}
          showCloseIcon={true}>
          <VariableProductDetails
            item={item}
            onAddToCartComplete={handleVariableAddToCartComplete}
          />
        </CustomBottomSheet>
        {/* )} */}
      </>
    );
  }
);

export default ProductCardComp;
