import React, {useCallback, useMemo} from 'react';
// eslint-disable-next-line no-restricted-imports
import {FlatList, View, TouchableOpacity} from 'react-native';

import {ProductCardComp} from '@/components';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';

import useRTLStyles from './styles';
import type {TopOffersCompProps} from './TopOffersComp.types';
import {useProducts} from '../../hooks';
import {transformProductsToCards} from '../../utils';

const TopOffersComp: React.FC<TopOffersCompProps> = ({
  onOfferPress,
  onSeeAllPress,
  size = 10,
  page = 1,
  search,
  minPrice,
  maxPrice,
  productFilter,
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
      <ProductCardComp item={item} onPress={handleOfferPress} />
    ),
    []
  );

  if (loading || topOffers.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <TextComp text="TOP_OFFER" style={styles.sectionTitle} />
        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAllPress}>
          <TextComp text="SEE_ALL" style={styles.seeAllText} />
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

export default TopOffersComp;
