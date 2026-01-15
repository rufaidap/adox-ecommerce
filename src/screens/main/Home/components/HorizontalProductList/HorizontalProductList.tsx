import React, {useCallback, useMemo} from 'react';
// eslint-disable-next-line no-restricted-imports
import {FlatList, View, TouchableOpacity} from 'react-native';

import {ProductCardComp} from '@/components';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';

import type {HorizontalProductListProps} from './HorizontalProductList.types';
import useRTLStyles from './styles';
import {useProducts} from '../../hooks';
import {transformProductsToCards} from '../../utils';

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({
  onOfferPress,
  onSeeAllPress,
  size = 10,
  page = 1,
  search,
  minPrice,
  maxPrice,
  productFilter,
  label,
  cardType = 'primary',
}) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const {products, loading} = useProducts({
    size,
    page,
    search,
    minPrice,
    maxPrice,
    product: productFilter,
  });

  const topOffers = useMemo(
    () => transformProductsToCards(products),
    [products]
  );

  const handleOfferPress = (item: ProductCardItem) => {
    onOfferPress?.(item);
  };

  const renderOfferItem = useCallback(
    ({item}: {item: ProductCardItem}) => (
      <ProductCardComp
        item={item}
        onPress={handleOfferPress}
        cardType={cardType}
      />
    ),
    []
  );

  if (loading || topOffers.length === 0) {
    return null;
  }

  return (
    <View style={cardType === 'secondary' ? styles.secSection : styles.section}>
      <View style={styles.sectionHeader}>
        <TextComp text={label || 'TOP_OFFER'} style={styles.sectionTitle} />
        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAllPress}>
          <TextComp
            text="SEE_ALL"
            style={[
              styles.seeAllText,
              // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
              cardType === 'secondary' && {color: '#018345'},
            ]}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={topOffers}
        renderItem={renderOfferItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offersList}
      />
    </View>
  );
};

export default HorizontalProductList;
