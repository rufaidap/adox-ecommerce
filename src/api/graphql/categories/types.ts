export interface ProductCategory {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  description: string | null;
  is_active: boolean;
}

export interface ProductCategoriesData {
  data: ProductCategory[];
  totalData: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductCategoriesResponse {
  productCategories: ProductCategoriesData;
}

export interface ProductCategoriesVariables {
  size?: number;
  page?: number;
}
