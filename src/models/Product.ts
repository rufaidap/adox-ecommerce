import type {ImageSourcePropType} from 'react-native';

export type ProductStatus =
  | 'available'
  | 'on-rent'
  | 'booked'
  | 'in-dry-wash'
  | 'ready-for-pickup';

export interface ProductAttribute {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material' | 'style' | 'custom';
  required: boolean;
  options: ProductAttributeOption[];
}

export interface ProductAttributeOption {
  id: string;
  value: string;
  displayName: string;
  priceModifier?: number; // Additional price for this option
  available: boolean;
}

export interface ProductVariation {
  id: string;
  attributes: Record<string, string>; // attributeId -> optionId
  price: number;
  pricePerDay: number; // Daily rental rate
  available: boolean;
  image?: ImageSourcePropType; // Optional variation-specific image
}

export interface Product {
  id: string;
  productId: string;
  tag: string;
  category: 'suits' | 'dresses' | 'accessories' | 'shoes' | string;
  color: string;
  price: number;
  pricePerDay: number; // Daily rental rate
  status: ProductStatus;
  description: string;
  image: ImageSourcePropType; // React Native image source (require() result)
  thumbnail?: ImageSourcePropType; // Optional thumbnail image
  attributes: ProductAttribute[];
  variations: ProductVariation[];
  currency: 'INR';
  createdAt: Date;
  updatedAt: Date;
}
