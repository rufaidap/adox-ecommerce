import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from 'react-native';

import {t} from 'i18next';

import {ProductVariation} from '@/api/graphql/products/types';
import ProductIcon from '@/assets/images/product/product.svg';
import ButtonComp from '@/components/ButtonComp';
import ImageComp from '@/components/ImageComp/ImageComp';
import TextComp from '@/components/TextComp';
import useIsRTL from '@/hooks/useIsRTL';
import {commonColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale, verticalScale} from '@/styles/scaling';
import {handleAddToCart} from '@/utils/cartUtils';

import type {ProductCardItem} from './ProductCardComp';

interface VariableProductDetailsProps {
  item: ProductCardItem;
  onAddToCartComplete?: () => void;
}

const VariableProductDetails: React.FC<VariableProductDetailsProps> = ({
  item,
  onAddToCartComplete,
}) => {
  const isRTL = useIsRTL();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    item.quantityOptions?.[0] || 5
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizeOptions?.[0]?.value || ''
  );
  const [selectedVariant, setSelectedVariant] = useState<string>(
    item.variantOptions?.[0]?.value || ''
  );

  const getCurrentPrice = () => {
    if (selectedVariant && item.variations) {
      const variation = item.variations.find(
        (v: ProductVariation) => v.id === selectedVariant
      );
      if (variation && typeof variation.price === 'number') {
        return variation.price;
      }
    }
    return item.price;
  };

  const calculateTotalPrice = () => {
    return getCurrentPrice() * selectedQuantity;
  };

  const getRemainingAmount = () => {
    if (!item.minOrderValue) return 0;
    const total = calculateTotalPrice();
    return Math.max(0, item.minOrderValue - total);
  };

  const handleAddToCartClick = () => {
    const itemWithPrice = {
      ...item,
      price: getCurrentPrice(),
    };
    handleAddToCart(
      itemWithPrice,
      selectedQuantity,
      selectedSize,
      selectedVariant
    );
    onAddToCartComplete?.();
  };

  // Helper function to extract URI from ImageSourcePropType
  const getImageSourceUri = (
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

  const imageSource = getImageSourceUri(item.image);
  const screenHeight = Dimensions.get('window').height;
  const maxScrollHeight = screenHeight * 0.6; // 60% of screen height

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={[styles.scrollView, {maxHeight: maxScrollHeight}]}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {imageSource ? (
            <ImageComp
              source={imageSource}
              containerStyle={styles.productImage}
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <ProductIcon width={scale(120)} height={scale(120)} />
            </View>
          )}
        </View>

        {/* Product Name */}
        <TextComp
          isDynamic
          text={item.name}
          style={styles.productName}
          numberOfLines={2}
        />

        {/* Price */}
        <TextComp
          isDynamic
          text={`﷼ ${getCurrentPrice()}`}
          style={styles.productPrice}
        />

        {/* Category */}
        {item.category && (
          <View style={[styles.infoRow, isRTL && styles.infoRowRTL]}>
            <TextComp text="CATEGORY" style={styles.infoLabel} />
            <TextComp
              isDynamic
              text={item.category.name}
              style={styles.infoValue}
            />
          </View>
        )}

        {/* Brand */}
        {item.brand && (
          <View style={[styles.infoRow, isRTL && styles.infoRowRTL]}>
            <TextComp text="BRAND" style={styles.infoLabel} />
            <TextComp
              isDynamic
              text={item.brand.name}
              style={styles.infoValue}
            />
          </View>
        )}

        {/* Description */}
        {item.description && (
          <View style={styles.descriptionContainer}>
            <TextComp text="DESCRIPTION" style={styles.descriptionLabel} />
            <TextComp
              isDynamic
              text={item.description}
              style={styles.descriptionText}
            />
          </View>
        )}

        {/* Quantity Selection */}
        {/* {item.quantityOptions && item.quantityOptions.length > 0 && (
          <View style={styles.optionSection}>
            <TextComp text="QUANTITY" style={styles.optionLabel} />
            <View style={styles.optionsContainer}>
              {item.quantityOptions.map((qty, index) => (
                <TouchableOpacity
                  key={`quantity-${index}-${qty}`}
                  style={[
                    styles.optionButton,
                    selectedQuantity === qty && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedQuantity(qty)}
                  activeOpacity={0.7}>
                  <TextComp
                    isDynamic
                    text={qty.toString()}
                    style={[
                      styles.optionText,
                      selectedQuantity === qty && styles.optionTextSelected,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )} */}

        {/* Size Selection */}
        {item.sizeOptions && item.sizeOptions.length > 0 && (
          <View style={styles.optionSection}>
            <TextComp text="SIZE" style={styles.optionLabel} />
            <View style={styles.optionsContainer}>
              {item.sizeOptions.map((size, index) => (
                <TouchableOpacity
                  key={`size-${index}-${size.value}`}
                  style={[
                    styles.optionButton,
                    selectedSize === size.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedSize(size.value)}
                  activeOpacity={0.7}>
                  <TextComp
                    isDynamic
                    text={size.label}
                    style={[
                      styles.optionText,
                      selectedSize === size.value && styles.optionTextSelected,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Variant Selection */}
        {item.variantOptions && item.variantOptions.length > 0 && (
          <View style={styles.optionSection}>
            <TextComp text="VARIANT" style={styles.optionLabel} />
            <View style={styles.optionsContainer}>
              {item.variantOptions.map((variant, index) => {
                // Ensure label is always a string
                const variantLabel =
                  typeof variant.label === 'string'
                    ? variant.label
                    : variant.label
                    ? String(variant.label)
                    : `Variant ${variant.value.slice(0, 8)}`;

                return (
                  <TouchableOpacity
                    key={`variant-${index}-${variant.value}`}
                    style={[
                      styles.optionButton,
                      selectedVariant === variant.value &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedVariant(variant.value)}
                    activeOpacity={0.7}>
                    <TextComp
                      isDynamic
                      text={variantLabel}
                      style={[
                        styles.optionText,
                        selectedVariant === variant.value &&
                          styles.optionTextSelected,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Minimum Order Value Message */}
        {item.minOrderValue && getRemainingAmount() > 0 && (
          <View style={styles.minOrderContainer}>
            <TextComp
              text="MINIMUM_ORDER_VALUE"
              values={{
                amount: getRemainingAmount().toFixed(2),
                currency: '﷼',
                minValue: item.minOrderValue.toFixed(2),
              }}
              style={styles.minOrderText}
            />
          </View>
        )}

        {/* Add to Cart Button */}
      </ScrollView>
      <View style={styles.addToCartContainer}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => setSelectedQuantity(prev => Math.max(1, prev - 1))}
            style={styles.quantityButton}
            activeOpacity={0.7}>
            <TextComp isDynamic text="−" style={styles.quantityButtonText} />
          </TouchableOpacity>
          <TextComp
            isDynamic
            text={selectedQuantity.toString()}
            style={styles.quantityText}
          />
          <TouchableOpacity
            onPress={() => setSelectedQuantity(prev => prev + 1)}
            style={styles.quantityButton}
            activeOpacity={0.7}>
            <TextComp isDynamic text="+" style={styles.quantityButtonText} />
          </TouchableOpacity>
        </View>
        <ButtonComp
          title={t('ADD_TO_CART_WITH_PRICE', {
            currency: '﷼',
            price: calculateTotalPrice().toFixed(2),
          })}
          onPress={handleAddToCartClick}
          style={styles.addToCartButton}
          textStyle={styles.addToCartButtonText}
        />
      </View>
    </View>
  );
};

export default VariableProductDetails;

const styles = StyleSheet.create({
  addToCartButton: {
    flex: 1,
    marginHorizontal: scale(12),
  },
  addToCartButtonText: {
    color: commonColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: rf(14),
  },
  addToCartContainer: {
    alignItems: 'center',
    backgroundColor: commonColors.primary,
    borderRadius: ms(18),
    flexDirection: 'row',
    height: ms(50),
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
    paddingHorizontal: scale(16),
    width: '100%',
  },
  container: {
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  descriptionContainer: {
    marginBottom: verticalScale(20),
  },
  descriptionLabel: {
    color: commonColors.text,
    fontFamily: fontFamily.medium,
    fontSize: rf(14),
    marginBottom: verticalScale(8),
    textAlign: 'left',
  },
  descriptionText: {
    color: commonColors.text,
    fontFamily: fontFamily.regular,
    fontSize: rf(14),
    lineHeight: rf(20),
    textAlign: 'left',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: commonColors.card,
    borderRadius: ms(12),
    height: scale(200),
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    overflow: 'hidden',
    width: '100%',
  },
  infoLabel: {
    color: commonColors.text,
    fontFamily: fontFamily.medium,
    fontSize: rf(14),
    marginEnd: scale(8),
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(12),
  },
  infoRowRTL: {
    flexDirection: 'row-reverse',
  },
  infoValue: {
    color: commonColors.text,
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rf(14),
    marginStart: scale(8),
  },
  minOrderContainer: {
    backgroundColor: commonColors.success,
    borderRadius: ms(8),
    marginBottom: verticalScale(16),
    marginTop: verticalScale(8),
    padding: verticalScale(12),
  },
  minOrderText: {
    color: commonColors.white,
    fontFamily: fontFamily.medium,
    fontSize: rf(14),
    textAlign: 'left',
  },
  optionButton: {
    alignItems: 'center',
    backgroundColor: commonColors.card,
    borderColor: commonColors.border,
    borderRadius: ms(8),
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: verticalScale(8),
    marginHorizontal: scale(4),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
  },
  optionButtonSelected: {
    backgroundColor: commonColors.background,
    borderColor: commonColors.secondary,
  },
  optionLabel: {
    color: commonColors.text,
    fontFamily: fontFamily.regular,
    fontSize: rf(14),
    marginBottom: verticalScale(8),
    textAlign: 'left',
  },
  optionSection: {
    marginBottom: verticalScale(20),
  },
  optionText: {
    color: commonColors.text,
    fontFamily: fontFamily.medium,
    fontSize: rf(14),
  },
  optionTextSelected: {
    color: commonColors.secondary,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: scale(-4),
  },
  placeholderContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  productImage: {
    height: '100%',
    width: '100%',
  },
  productName: {
    color: commonColors.text,
    fontFamily: fontFamily.semiBold,
    fontSize: rf(17),
    marginBottom: verticalScale(8),
    textAlign: 'left',
  },
  productPrice: {
    color: commonColors.text,
    fontFamily: fontFamily.bold,
    fontSize: rf(20),
    marginBottom: verticalScale(20),
    textAlign: 'left',
  },
  quantityButton: {
    alignItems: 'center',
    borderRadius: ms(4),
    height: ms(32),
    justifyContent: 'center',
    width: ms(32),
  },
  quantityButtonText: {
    color: commonColors.white,
    fontFamily: fontFamily.bold,
    fontSize: rf(18),
    textAlign: 'center',
  },
  quantitySelector: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quantityText: {
    color: commonColors.white,
    fontFamily: fontFamily.bold,
    fontSize: rf(16),
    marginHorizontal: scale(12),
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
});
