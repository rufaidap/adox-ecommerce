import type {FC} from 'react';

import type {SvgProps} from 'react-native-svg';

import type {ProductCategory} from '@/api/graphql/categories/types';
import {demoCategoryIcons} from '@/assets/demo';

import type {CategoryItem} from '../components/CategoriesComp/CategoriesComp.types';

/**
 * Maps category slug to demo icon for fallback
 */
const getCategoryIcon = (slug: string): FC<SvgProps> | null => {
  const slugLower = slug.toLowerCase();
  if (slugLower.includes('dairy')) {
    return demoCategoryIcons.dairy;
  }
  if (slugLower.includes('beverage')) {
    return demoCategoryIcons.beverages;
  }
  if (slugLower.includes('bakery')) {
    return demoCategoryIcons.bakery;
  }
  if (slugLower.includes('frozen')) {
    return demoCategoryIcons.frozen;
  }
  if (slugLower.includes('household')) {
    return demoCategoryIcons.household;
  }
  // Default fallback
  return demoCategoryIcons.dairy;
};

/**
 * Transforms API ProductCategory to CategoryItem format
 */
export const transformProductCategories = (
  categories: ProductCategory[]
): CategoryItem[] => {
  return categories
    .filter(category => category.is_active)
    .map(category => {
      const fallbackIcon = getCategoryIcon(category.slug);
      return {
        id: category.id,
        nameKey: category.name, // Use API name directly, will be displayed as dynamic text
        name: category.name,
        image: category.image,
        slug: category.slug,
        Icon: fallbackIcon || demoCategoryIcons.dairy, // Fallback icon
        type: 'simple' as const, // Default to simple, can be enhanced based on API data
      };
    });
};
