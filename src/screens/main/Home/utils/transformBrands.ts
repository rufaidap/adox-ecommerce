import type {FC} from 'react';

import type {SvgProps} from 'react-native-svg';

import type {Brand} from '@/api/graphql/brands/types';
import {demoBrandIcons} from '@/assets/demo';

import type {BrandItem} from '../components/BrandsComp/BrandsComp.types';

/**
 * Maps brand name to demo icon for fallback
 */
const getBrandIcon = (name: string): FC<SvgProps> | null => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('sun') || nameLower.includes('top')) {
    return demoBrandIcons.sunTop;
  }
  if (nameLower.includes('osra') || nameLower.includes('zain')) {
    return demoBrandIcons.alOsra;
  }
  if (nameLower.includes('persil')) {
    return demoBrandIcons.persil;
  }
  if (nameLower.includes('clorox')) {
    return demoBrandIcons.clorox;
  }
  if (nameLower.includes('brea')) {
    return demoBrandIcons.brea;
  }
  // Default fallback
  return demoBrandIcons.sunTop;
};

/**
 * Transforms API Brand to BrandItem format
 */
export const transformBrands = (brands: Brand[]): BrandItem[] => {
  return brands
    .filter(brand => brand.is_active)
    .map(brand => {
      const fallbackIcon = getBrandIcon(brand.name);
      return {
        id: brand.id,
        name: brand.name,
        logo: brand.logo,
        Icon: fallbackIcon || demoBrandIcons.sunTop, // Fallback icon
      };
    });
};
