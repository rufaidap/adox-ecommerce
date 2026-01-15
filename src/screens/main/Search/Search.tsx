import React, {useState, useMemo} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {useProductCategories} from '@/api/graphql/categories/hooks';
import {useProducts} from '@/api/graphql/products/hooks';
import {SearchIcon} from '@/assets/icons';
import {
  HeaderComp,
  MyFlatList,
  ProductCardComp,
  TextComp,
  WrapperContainer,
} from '@/components';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import {Colors, ThemeType} from '@/styles/colors';
import {ms, s} from '@/styles/scaling';

import {transformProductsToCards} from '../Home/utils';
import {transformProductCategories} from '../Home/utils/transformCategories';

const Search = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'Search'>>();
  const initialType = route.params?.type || 'products';
  const {t} = useTranslation();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const themeType = theme as ThemeType;
  const colors = Colors[themeType];
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>(
    initialType
  );

  const {categories: apiCategories, loading: categoriesLoading} =
    useProductCategories({
      size: 50,
      page: 1,
    });

  const {products, loading: productsLoading} = useProducts({
    size: 20,
    page: 1,
    search: searchText.trim() || undefined,
    product: {is_active: true},
  });

  const filteredCategories = useMemo(() => {
    const categories = transformProductCategories(apiCategories);
    if (!searchText.trim()) return categories;
    return categories.filter(cat =>
      cat?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [apiCategories, searchText]);

  const productCards = useMemo(
    () => transformProductsToCards(products),
    [products]
  );

  const handleCategoryPress = (category: {id: string; name: string}) => {
    navigation.navigate('ProductListing', {
      label: category.name,
      categoryId: category.id,
    });
  };

  const handleProductPress = (_item: ProductCardItem) => {
    // Navigate to product details
  };

  const renderCategoryItem = ({item}: {item: CategoryItem}) => (
    <TouchableOpacity
      style={[styles.categoryItem, {borderBottomColor: colors.border}]}
      onPress={() => handleCategoryPress(item)}>
      <TextComp
        text={item.name}
        isDynamic
        style={[styles.categoryText, {color: colors.text}]}
      />
    </TouchableOpacity>
  );

  const renderProductItem = ({item}: {item: ProductCardItem}) => (
    <ProductCardComp item={item} onPress={handleProductPress} />
  );

  return (
    <WrapperContainer>
      <HeaderComp title="SEARCH" onBackPress={() => navigation.goBack()} />

      <View style={styles.searchContainer}>
        <View
          style={[styles.searchBar, {backgroundColor: colors.inputBackground}]}>
          <SearchIcon
            width={ms(17)}
            height={ms(19)}
            style={styles.searchIconWrapper}
          />
          <TextInput
            style={[styles.searchInput, {color: colors.text}]}
            placeholder={t('SEARCH_PLACEHOLDER')}
            placeholderTextColor={colors.inputPlaceholder}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            textAlign={isRTL ? 'right' : 'left'}
          />
        </View>
      </View>

      <View style={[styles.tabContainer, {borderBottomColor: colors.border}]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'products' && [
              styles.activeTab,
              {borderBottomColor: colors.primary},
            ],
          ]}
          onPress={() => setActiveTab('products')}>
          <TextComp
            text="PRODUCTS"
            style={[
              styles.tabText,
              {color: colors.textSecondary},
              activeTab === 'products' && [
                styles.activeTabText,
                {color: colors.primary},
              ],
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'categories' && [
              styles.activeTab,
              {borderBottomColor: colors.primary},
            ],
          ]}
          onPress={() => setActiveTab('categories')}>
          <TextComp
            text="CATEGORIES"
            style={[
              styles.tabText,
              {color: colors.textSecondary},
              activeTab === 'categories' && [
                styles.activeTabText,
                {color: colors.primary},
              ],
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'products' ? (
          <MyFlatList
            data={productCards}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            key="products-list-2"
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !productsLoading && searchText ? (
                <View style={styles.emptyContainer}>
                  <TextComp
                    text="NO_PRODUCTS_FOUND"
                    style={[styles.emptyText, {color: colors.textSecondary}]}
                  />
                </View>
              ) : null
            }
          />
        ) : (
          <MyFlatList
            key="categories-list-1"
            data={filteredCategories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !categoriesLoading && searchText ? (
                <View style={styles.emptyContainer}>
                  <TextComp
                    text="NO_CATEGORIES_FOUND"
                    style={[styles.emptyText, {color: colors.textSecondary}]}
                  />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    borderBottomWidth: 2,
  },
  activeTabText: {
    fontWeight: '600',
  },
  categoryItem: {
    borderBottomWidth: 1,
    paddingVertical: s(12),
  },
  categoryText: {
    fontSize: s(14),
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: s(40),
  },
  emptyText: {
    textAlign: 'center',
  },
  listContent: {
    padding: s(16),
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: s(16),
  },
  searchBar: {
    alignItems: 'center',
    borderRadius: s(8),
    flexDirection: 'row',
    height: s(46),
    paddingHorizontal: s(12),
  },
  searchContainer: {
    paddingBottom: s(12),
    paddingHorizontal: s(16),
  },
  searchIconWrapper: {
    marginRight: s(8),
  },
  searchInput: {
    flex: 1,
    fontSize: s(14),
    paddingVertical: 0,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: s(12),
  },
  tabContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  tabText: {
    fontSize: s(14),
  },
});

export default Search;
