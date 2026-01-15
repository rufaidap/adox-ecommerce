import type {FC} from 'react';

import type {SvgProps} from 'react-native-svg';

export interface CategoryItem {
  id: string;
  nameKey: string;
  name?: string; // API name field
  image?: string | null; // API image URL
  slug?: string; // API slug field
  Icon: FC<SvgProps>;
  type: 'simple' | 'variable';
}

export interface CategoriesCompProps {
  categories?: CategoryItem[]; // Optional - if not provided, will fetch from API
  onCategoryPress?: (category: CategoryItem) => void;
  onSeeAllPress?: () => void;
  size?: number; // API pagination size
  page?: number; // API pagination page
  isHorizontal?: boolean;
  numColumns?: number;
  numRows?: number;
  showHeader?: boolean;
  containerStyle?: object;
  itemStyle?: object;
  imageContainerStyle?: object;
}
