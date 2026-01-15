import React, {useMemo} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';

import {MyFlatList, ImageComp} from '@/components';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';
import {ms, scale} from '@/styles/scaling';

import useRTLStyles from './styles';
import type {CategoryItem} from '../../../Home/components/CategoriesComp/CategoriesComp.types';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

interface CategoryPageCategoriesCompProps {
  categories: CategoryItem[];
  onCategoryPress?: (category: CategoryItem) => void;
  selectedCategoryId?: string | null;
}

/**
 * CategoryPageCategoriesComp - Component for displaying categories in Category page
 * Shows ~5.5 cards visible in a horizontal scrollable list with smaller text
 *
 * @component
 * @example
 * <CategoryPageCategoriesComp
 *   categories={categories}
 *   onCategoryPress={(category) => handleCategoryPress(category)}
 *   selectedCategoryId={selectedId}
 * />
 */
const CategoryPageCategoriesComp: React.FC<CategoryPageCategoriesCompProps> = ({
  categories,
  onCategoryPress,
  selectedCategoryId,
}) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  // Group categories into chunks of 3 for 3 rows
  const chunkedCategories = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < categories.length; i += 3) {
      const items = categories.slice(i, i + 3);
      chunks.push({
        id: `chunk-${i}-${items.map(it => it.id).join('-')}`,
        columns: items,
      });
    }
    return chunks;
  }, [categories]);

  // Calculate card width to show 5.5 items visible
  const numVisibleItems = 5.5;
  const HORIZONTAL_PADDING = scale(16);
  const gap = scale(16);
  const availableWidth = SCREEN_WIDTH - HORIZONTAL_PADDING;
  // Calculate width to show exactly 5.5 items (including the gaps between the visible items)
  const CARD_WIDTH =
    (availableWidth - Math.floor(numVisibleItems) * gap) / numVisibleItems;

  const renderSingleCategory = (item: CategoryItem) => {
    const CategoryIcon = item.Icon;
    const hasImage = item.image && item.image.trim() !== '';
    const displayName = item.name || item.nameKey;
    const isSelected = selectedCategoryId === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
        onPress={() => onCategoryPress?.(item)}
        activeOpacity={0.7}>
        <View
          style={[
            styles.categoryImageContainer,
            isSelected && styles.categoryImageContainerSelected,
          ]}>
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
            style={[
              styles.categoryName,
              isSelected && styles.categoryNameSelected,
            ]}
            numberOfLines={2}
          />
        ) : (
          <TextComp
            isDynamic
            text={displayName}
            style={[
              styles.categoryName,
              isSelected && styles.categoryNameSelected,
            ]}
            numberOfLines={2}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryColumn = ({
    item,
  }: {
    item: {id: string; columns: CategoryItem[]};
  }) => {
    return (
      <View style={[styles.categoryColumn, {width: CARD_WIDTH}]}>
        {item.columns.map(renderSingleCategory)}
      </View>
    );
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MyFlatList<{id: string; columns: CategoryItem[]}>
        data={chunkedCategories}
        renderItem={renderCategoryColumn}
        keyExtractor={item => item.id}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default CategoryPageCategoriesComp;
