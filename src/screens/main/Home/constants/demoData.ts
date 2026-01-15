/* eslint-disable import/order */
import type {FC} from 'react';
import type {ImageSourcePropType} from 'react-native';
import type {SvgProps} from 'react-native-svg';

import {
  demoBrandIcons,
  demoCategoryIcons,
  demoProductImages,
} from '@/assets/demo';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';

export interface DemoBrandItem {
  id: string;
  nameKey: string;
  Icon: FC<SvgProps>;
}

export interface DemoCategoryItem {
  id: string;
  nameKey: string;
  Icon: FC<SvgProps>;
  type: 'simple' | 'variable';
}

export interface DemoProductItem
  extends Omit<ProductCardItem, 'image' | 'name'> {
  image: ImageSourcePropType | null;
  name: string;
  nameKey: string;
}

export const DEMO_BRANDS: DemoBrandItem[] = [
  {id: '1', nameKey: 'SUN_TOP', Icon: demoBrandIcons.sunTop},
  {id: '2', nameKey: 'AL_OSRA', Icon: demoBrandIcons.alOsra},
  {id: '3', nameKey: 'PERSIL', Icon: demoBrandIcons.persil},
  {id: '4', nameKey: 'CLOROX', Icon: demoBrandIcons.clorox},
  {id: '5', nameKey: 'BREA', Icon: demoBrandIcons.brea},
];

export const DEMO_CATEGORIES: DemoCategoryItem[] = [
  {id: '1', nameKey: 'DAIRY', Icon: demoCategoryIcons.dairy, type: 'simple'},
  {
    id: '2',
    nameKey: 'BEVERAGES',
    Icon: demoCategoryIcons.beverages,
    type: 'variable',
  },
  {id: '3', nameKey: 'BAKERY', Icon: demoCategoryIcons.bakery, type: 'simple'},
  {id: '4', nameKey: 'FROZEN', Icon: demoCategoryIcons.frozen, type: 'simple'},
  {
    id: '5',
    nameKey: 'HOUSEHOLD',
    Icon: demoCategoryIcons.household,
    type: 'variable',
  },
];

export const DEMO_TOP_OFFERS: DemoProductItem[] = [
  {
    id: '1',
    name: '',
    nameKey: 'AL_AILA_FORTIFIED_BASMATI',
    price: 38.95,
    image: demoProductImages.alAilaFortifiedBasmati,
    type: 'simple',
    weight: '4.5 KG',
  },
  {
    id: '2',
    name: '',
    nameKey: 'AL_AILA_INDIAN_WHITE_BASMATI',
    price: 87.95,
    image: demoProductImages.alAilaIndianWhiteBasmati,
    type: 'variable',
    quantityOptions: [5, 10, 15],
    sizeOptions: [
      {label: '5 KG', value: '5kg'},
      {label: '10 KG', value: '10kg'},
      {label: '20 KG', value: '20kg'},
      {label: '30 KG', value: '30kg'},
    ],
    variantOptions: [
      {label: 'Indian', value: 'indian'},
      {label: 'Saudi', value: 'saudi'},
      {label: 'USA', value: 'usa'},
    ],
    minOrderValue: 50,
  },
  {
    id: '3',
    name: '',
    nameKey: 'TILDA_BASMATI_RICE',
    price: 65.95,
    image: demoProductImages.vintageLaceWeddingDress,
    type: 'simple',
    weight: '5 KG',
  },
  {
    id: '4',
    name: '',
    nameKey: 'GOLD_CUFFLINKS_SET',
    price: 24.5,
    image: demoProductImages.goldCufflinksSet,
    type: 'simple',
    weight: 'ONE SIZE',
  },
  {
    id: '5',
    name: '',
    nameKey: 'NAVY_BLUE_SUIT',
    price: 19.75,
    image: demoProductImages.navyBlueSuit,
    type: 'simple',
    weight: 'SIZE 48',
  },
  {
    id: '6',
    name: '',
    nameKey: 'CLASSIC_BLACK_TUXEDO',
    price: 32.0,
    image: demoProductImages.classicBlackTuxedo,
    type: 'simple',
    weight: 'SIZE 52',
  },
];
