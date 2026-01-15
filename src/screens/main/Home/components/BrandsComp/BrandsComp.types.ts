import type {FC} from 'react';

import type {SvgProps} from 'react-native-svg';

export interface BrandItem {
  id: string;
  name: string;
  logo: string | null;
  Icon: FC<SvgProps>;
}

export interface BrandsCompProps {
  brands?: BrandItem[];
  onBrandPress?: (brand: BrandItem) => void;
  onSeeAllPress?: () => void;
  size?: number;
  page?: number;
}
