import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';

import {useProductCategories} from '@/api/graphql/categories/hooks';
import {CartIcons, FavouritesIcon, ScanIcon, SearchIcon} from '@/assets/icons';
import {MyFlatList, ProductCardComp} from '@/components';
import HeaderComp from '@/components/HeaderComp';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import type {MainTabScreenNavigationProp} from '@/navigation/types';
import cartStore from '@/stores/cartStore';
import {Colors, ThemeType} from '@/styles/colors';
import {ms, s} from '@/styles/scaling';

import useRTLStyles from './styles';
import {useProducts} from '../Home/hooks';
import {transformProductsToCards} from '../Home/utils';
import CategoryPageCategoriesComp from './components/CategoryPageCategoriesComp/CategoryPageCategoriesComp';
import {transformProductCategories} from '../Home/utils/transformCategories';

type CategoryNavigationProp = MainTabScreenNavigationProp<'Category'>;

const {width: WIDTH} = Dimensions.get('screen');

const CARD_WIDTH = (WIDTH - 2 * s(16) - 2 * s(12)) / 3; //screen width - 2* horizontal padding - 2* gap between product cards

const Category = observer(() => {
  const navigation = useNavigation<CategoryNavigationProp>();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);
  const cartItemsCount = cartStore.itemsCount;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const {categories: apiCategories, loading: categoriesLoading} =
    useProductCategories({
      size: 50,
      page: 1,
    });

  const categories = useMemo(
    () => transformProductCategories(apiCategories),
    [apiCategories]
  );

  // Fetch products with optional category filter
  const productFilter = useMemo(() => {
    const filter: {is_active: boolean; category_id?: string} = {
      is_active: true,
    };
    if (selectedCategoryId) {
      filter.category_id = selectedCategoryId;
    }
    return filter;
  }, [selectedCategoryId]);

  const {products, loading} = useProducts({
    size: 50,
    page: 1,
    product: productFilter,
  });

  const productCards = useMemo(
    () => transformProductsToCards(products),
    [products]
  );

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleFavouritesPress = () => {
    // Navigate to favourites screen when available
  };

  const handleCategoryPress = (category: {id: string}) => {
    setSelectedCategoryId(
      selectedCategoryId === category.id ? null : category.id
    );
  };

  const handleProductPress = (_item: ProductCardItem) => {
    // Handle product press - navigate to product details
  };

  const handleScanPress = () => {
    // Handle scan press
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

  const rightAccessory = (
    <View style={styles.headerIcons}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleFavouritesPress}
        activeOpacity={0.7}>
        <FavouritesIcon width={ms(17)} height={ms(17)} />
        <TextComp text="FAVOURITES" style={styles.iconLabel} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleCartPress}
        activeOpacity={0.7}>
        <CartIcons width={ms(22)} height={ms(22)} />
        {cartItemsCount > 0 && (
          <View style={styles.cartBadge}>
            <TextComp
              isDynamic
              text={cartItemsCount > 99 ? '99+' : cartItemsCount.toString()}
              style={styles.cartBadgeText}
            />
          </View>
        )}
        <TextComp text="CART" style={styles.iconLabel} />
      </TouchableOpacity>
    </View>
  );

  return (
    <WrapperContainer>
      <HeaderComp
        showBack={false}
        title="CATEGORIES"
        rightAccessory={rightAccessory}
      />

      {/* Search Bar */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Search', {type: 'categories'})}
        style={styles.searchContainer}>
        <SearchIcon
          width={ms(17)}
          height={ms(19)}
          style={styles.searchIconWrapper}
        />
        <View style={styles.searchInput}>
          <TextComp
            text={t('SEARCH_CATEGORY')}
            style={{
              color: Colors[theme as ThemeType].inputPlaceholder,
              fontSize: ms(14),
            }}
          />
        </View>
        <View style={styles.searchDivider} />
        <TouchableOpacity onPress={handleScanPress} activeOpacity={0.7}>
          <ScanIcon width={ms(23)} height={ms(23)} />
        </TouchableOpacity>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        {!categoriesLoading && categories.length > 0 && (
          <CategoryPageCategoriesComp
            categories={categories}
            onCategoryPress={handleCategoryPress}
            selectedCategoryId={selectedCategoryId}
          />
        )}

        {/* Products Grid */}
        {!loading && productCards.length > 0 && (
          <View style={styles.productsSection}>
            {/* <TextComp text="FOOD_CUPBOARD" style={styles.sectionTitle} /> */}
            <MyFlatList
              data={productCards}
              renderItem={renderProductItem}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={styles.productRow}
              contentContainerStyle={styles.productsList}
            />
          </View>
        )}
      </ScrollView>
    </WrapperContainer>
  );
});

export default Category;
