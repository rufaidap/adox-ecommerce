import React, {useMemo} from 'react';
// eslint-disable-next-line no-restricted-imports
import {View, TouchableOpacity, FlatList} from 'react-native';

import {useProductCategories} from '@/api/graphql/categories/hooks';
import {ImageComp} from '@/components';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {Colors, ThemeType} from '@/styles/colors';
import {ms, verticalScale} from '@/styles/scaling';

import type {CategoryItem, CategoriesCompProps} from './CategoriesComp.types';
import useRTLStyles from './styles';
import {transformProductCategories} from '../../utils/transformCategories';

/**
 * CategoriesComp - Component for displaying categories in a horizontal scrollable list
 * Fetches categories from API if not provided via props
 *
 * @component
 * @example
 * <CategoriesComp
 *   onCategoryPress={(category) => console.log('Category pressed', category)}
 *   onSeeAllPress={() => navigation.navigate('AllCategories')}
 * />
 */
const CategoriesComp: React.FC<CategoriesCompProps> = ({
  categories: categoriesProp,
  onCategoryPress,
  onSeeAllPress,
  size = 8,
  page = 1,
  isHorizontal = true,
  numColumns = 1,
  numRows = 1,
  showHeader = true,
  containerStyle,
  itemStyle,
  imageContainerStyle,
}) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  // Fetch categories from API if not provided via props
  const {categories: apiCategories, loading: categoriesLoading} =
    useProductCategories({size, page, skip: !!categoriesProp});

  // Transform API categories to component format
  const transformedCategories = useMemo(
    () => transformProductCategories(apiCategories),
    [apiCategories]
  );

  // Use provided categories or transformed API categories
  const categories = categoriesProp || transformedCategories;

  // Chunk categories into rows if horizontal and numRows > 1
  const displayData = useMemo(() => {
    if (!isHorizontal || numRows <= 1) return categories;
    const result = [];
    for (let i = 0; i < categories.length; i += numRows) {
      const items = categories.slice(i, i + numRows);
      result.push({
        id: `chunk-${i}-${items.map(it => it.id).join('-')}`,
        items,
      });
    }
    return result;
  }, [categories, isHorizontal, numRows]);

  const renderSingleCategory = (item: CategoryItem) => {
    const CategoryIcon = item.Icon;
    const hasImage = item.image && item.image.trim() !== '';
    const displayName = item.name || item.nameKey;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.categoryItem, itemStyle]}
        onPress={() => onCategoryPress?.(item)}
        activeOpacity={0.7}>
        <View style={[styles.categoryImageContainer, imageContainerStyle]}>
          {hasImage ? (
            <ImageComp
              source={item.image!}
              style={styles.categoryImage}
              resizeMode="cover"
            />
          ) : CategoryIcon ? (
            <CategoryIcon width={ms(32)} height={ms(32)} />
          ) : (
            <View style={styles.categoryPlaceholder} />
          )}
        </View>
        {item.nameKey ? (
          <TextComp
            text={item.nameKey}
            style={styles.categoryName}
            numberOfLines={2}
          />
        ) : (
          <TextComp
            isDynamic
            text={displayName}
            style={styles.categoryName}
            numberOfLines={2}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({
    item,
  }: {
    item: CategoryItem | {id: string; items: CategoryItem[]};
  }) => {
    if ('items' in item) {
      return (
        <View style={styles.categoryColumn}>
          {item.items.map(subItem => renderSingleCategory(subItem))}
        </View>
      );
    }
    return renderSingleCategory(item);
  };

  // Don't render if loading or no categories
  if (categoriesLoading || categories.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.section,
        {
          backgroundColor: Colors[theme].muted,
          paddingVertical: verticalScale(16),
        },
        containerStyle,
      ]}>
      {showHeader && (
        <View style={styles.sectionHeader}>
          <TextComp text="CATEGORIES" style={styles.sectionTitle} />
          <TouchableOpacity activeOpacity={0.7} onPress={onSeeAllPress}>
            <TextComp text="SEE_ALL" style={styles.seeAllText} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList<CategoryItem | {id: string; items: CategoryItem[]}>
        data={displayData}
        renderItem={renderCategoryItem}
        keyExtractor={item => {
          const identifiable = item as {id: string};
          return identifiable.id;
        }}
        horizontal={isHorizontal}
        numColumns={!isHorizontal ? numColumns : 1}
        scrollEnabled={isHorizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        columnWrapperStyle={
          !isHorizontal && numColumns > 1 ? styles.columnWrapper : undefined
        }
      />
    </View>
  );
};

export default CategoriesComp;
