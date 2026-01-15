import type {FC} from 'react';
import type {ImageSourcePropType} from 'react-native';

import type {SvgProps} from 'react-native-svg';

import BrandSunTopIcon from '@/assets/images/Brands/1.svg';
import BrandZainIcon from '@/assets/images/Brands/2.svg';
import BrandPersilIcon from '@/assets/images/Brands/3.svg';
import BrandCloroxIcon from '@/assets/images/Brands/4.svg';
import BrandBreaIcon from '@/assets/images/Brands/5.svg';
import CategoryBakeryIcon from '@/assets/images/Categories/Bakery.svg';
import CategoryBeveragesIcon from '@/assets/images/Categories/Beverages.svg';
import CategoryDairyIcon from '@/assets/images/Categories/Dairy.svg';
import CategoryFrozenIcon from '@/assets/images/Categories/Frozen.svg';
import CategoryHouseholdIcon from '@/assets/images/Categories/image 363.svg';
import BridesmaidBlushDressImg from '@/assets/images/products/BridesmaidBlushDress.jpg';
import ClassicBlackTuxedoImg from '@/assets/images/products/ClassicBlackTuxedo.jpg';
import GoldCufflinksSetImg from '@/assets/images/products/GoldCufflinksSet.webp';
import NavyBlueSuitImg from '@/assets/images/products/NavyBlueSuit.jpg';
import OxfordDressShoesImg from '@/assets/images/products/OxfordDressShoes.jpg';
import AlAilaFortifiedBasmatiImg from '@/assets/images/products/product.png';
import AlAilaIndianWhiteBasmatiImg from '@/assets/images/products/product2.png';
import VintageLaceWeddingDressImg from '@/assets/images/products/VintageLaceWeddingDress.webp';

export const demoBrandIcons: Record<string, FC<SvgProps>> = {
  alOsra: BrandZainIcon,
  brea: BrandBreaIcon,
  clorox: BrandCloroxIcon,
  persil: BrandPersilIcon,
  sunTop: BrandSunTopIcon,
};

export const demoCategoryIcons: Record<string, FC<SvgProps>> = {
  bakery: CategoryBakeryIcon,
  beverages: CategoryBeveragesIcon,
  dairy: CategoryDairyIcon,
  frozen: CategoryFrozenIcon,
  household: CategoryHouseholdIcon,
};

export const demoProductImages: Record<string, ImageSourcePropType> = {
  alAilaFortifiedBasmati: AlAilaFortifiedBasmatiImg,
  alAilaIndianWhiteBasmati: AlAilaIndianWhiteBasmatiImg,
  bridesmaidBlushDress: BridesmaidBlushDressImg,
  classicBlackTuxedo: ClassicBlackTuxedoImg,
  goldCufflinksSet: GoldCufflinksSetImg,
  navyBlueSuit: NavyBlueSuitImg,
  oxfordDressShoes: OxfordDressShoesImg,
  vintageLaceWeddingDress: VintageLaceWeddingDressImg,
};
