export interface ProductCategoryInfo {
  id: string;
  name: string;
}

export interface ProductBrandInfo {
  id: string;
  name: string;
}

export interface ProductVariation {
  id: string;
  product_id: string;
  sku: string;
  attribute_combination: string | null;
  price: number;
  stock: number;
  min_order_quantity: number;
  max_order_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ProductAttribute {
  id: string;
  product_id: string;
  attribute_id: string;
  is_variation: boolean;
  is_visible: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sku: string;
  barcode: string | null;
  category_id: string;
  brand_id: string;
  type: string;
  price: number;
  vat_percentage: number;
  stock: number;
  max_order_quantity: number;
  cover_image: string | null;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category: ProductCategoryInfo;
  brand: ProductBrandInfo;
  variations: ProductVariation[];
  attributes: ProductAttribute[];
}

export interface ProductsData {
  currentPage: number;
  totalPages: number;
  totalData: number;
  data: Product[];
}

export interface ProductsResponse {
  products: ProductsData;
}

export interface ProductFilter {
  [key: string]: unknown;
}

export interface SortInput {
  field: string;
  sort: 'ASC' | 'DESC';
}

export interface ProductsVariables {
  size?: number;
  page?: number;
  product?: ProductFilter;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: SortInput;
}
