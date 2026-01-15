export interface Brand {
  id: string;
  name: string;
  logo: string | null;
  is_active: boolean;
}

export interface BrandsData {
  data: Brand[];
  totalData: number;
  totalPages: number;
  currentPage: number;
}

export interface BrandsResponse {
  brands: BrandsData;
}

export interface BrandFilter {
  [key: string]: unknown;
}

export interface BrandsVariables {
  size?: number;
  page?: number;
  brand?: BrandFilter;
}
