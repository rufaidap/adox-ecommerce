import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {FavouritesIcon} from '@/assets/icons';
import ProductPlaceholder from '@/assets/images/product/product.svg';
import {ImageComp} from '@/components';
import AmountWithCurrency from '@/components/AmountWithCurrency/AmountWithCurrency';
import TextComp from '@/components/TextComp';

type TopSellingProductProps = {
  item: any;
  styles: any;
  colors: any;
  onPress: () => void;
  onFavouritePress: () => void;
};

const TopSellingProduct = ({
  item,
  styles,
  colors,
  onPress,
  onFavouritePress,
}: TopSellingProductProps) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.productImageContainer}>
        {item.image ? (
          <ImageComp
            source={item.image}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <ProductPlaceholder
            width="100%"
            height="100%"
            style={styles.productPlaceholder}
          />
        )}
        <TouchableOpacity
          style={styles.favouriteButton}
          activeOpacity={0.7}
          onPress={onFavouritePress}>
          <FavouritesIcon fill={colors.border} stroke={colors.border} />
        </TouchableOpacity>
      </View>
      <TextComp
        isDynamic
        text={item.name}
        style={styles.productName}
        numberOfLines={2}
      />
      <View style={styles.productFooter}>
        <AmountWithCurrency
          amound={item.price}
          style={styles.priceContainer}
          amountStyle={styles.priceText}
          symbolStyle={styles.priceSymbol}
        />
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <TextComp text="ADD" style={styles.addButtonText} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TopSellingProduct;
