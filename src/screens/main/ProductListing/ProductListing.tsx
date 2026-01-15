import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';

import {
  HeaderComp,
  MyFlatList,
  ProductCardComp,
  WrapperContainer,
} from '@/components';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import {MainStackParamList} from '@/navigation/types';
import {s} from '@/styles/scaling';

import {useProducts} from '../Home/hooks';
import {transformProductsToCards} from '../Home/utils';

type ProductListingRouteProp = RouteProp<MainStackParamList, 'ProductListing'>;

const {width: WIDTH} = Dimensions.get('screen');
const CARD_WIDTH = (WIDTH - 2 * s(16) - 2 * s(12)) / 3;

const ProductListing = () => {
  const route = useRoute<ProductListingRouteProp>();
  const navigation = useNavigation();
  const {
    label = 'Products',
    categoryId,
    brandId,
    search: initialSearch,
    filter,
  } = route.params || {};

  const [page, setPage] = useState(1);

  const productFilter = useMemo(() => {
    const baseFilter = {...filter, is_active: true};
    if (categoryId) {
      baseFilter.category_id = categoryId;
    }
    if (brandId) {
      baseFilter.brand_id = brandId;
    }
    return baseFilter;
  }, [categoryId, brandId, filter]);

  const {products, loading, totalPages} = useProducts({
    size: 20,
    page,
    search: initialSearch,
    product: productFilter,
  });

  const productCards = useMemo(
    () => transformProductsToCards(products),
    [products]
  );

  const handleProductPress = (_item: ProductCardItem) => {
    // Navigate to product details
  };

  const renderProductItem = useCallback(
    ({item}: {item: ProductCardItem}) => (
      <ProductCardComp
        item={item}
        onPress={handleProductPress}
        cardWidth={CARD_WIDTH}
      />
    ),
    []
  );

  const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <WrapperContainer>
      <HeaderComp title={label} onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <MyFlatList
          data={productCards}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          numColumns={3}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: s(12),
  },
  container: {
    flex: 1,
    paddingHorizontal: s(16),
  },
  listContent: {
    paddingVertical: s(16),
  },
});

export default ProductListing;
