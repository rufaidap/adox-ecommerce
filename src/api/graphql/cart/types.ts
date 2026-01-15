export interface CartProduct {
  id: string;
  name: string;
  cover_image: string | null;
  price?: number;
  vat_percentage?: number;
}

export interface CartVariation {
  id: string;
  product_id: string;
  sku: string;
  attribute_combination: string | null;
  price: number;
  stock: number;
}

export interface CartCustomer {
  id: string;
  shop_name: string;
  owner_name: string;
  email: string;
}

export interface CartItem {
  id: string;
  customer_id: string;
  product_id: string;
  product_variation_id: string | null;
  quantity: number;
  price: number;
  discount: number;
  vat_percentage: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  customer?: CartCustomer;
  product?: CartProduct;
  variation?: CartVariation;
}

export interface CartsData {
  currentPage: number;
  totalPages: number;
  totalData: number;
  data: CartItem[];
}

export interface CartsResponse {
  carts: CartsData;
}

export interface CartFilter {
  [key: string]: unknown;
}

export interface CartsVariables {
  size?: number;
  page?: number;
  cart?: CartFilter;
  search?: string;
}

export interface AddToCartResponse {
  addToCart: CartItem;
}

export interface AddToCartVariables {
  cart?: {
    product_id?: string;
    product_variation_id?: string | null;
    quantity?: number;
    price?: number;
    discount?: number;
    vat_percentage?: number;
    [key: string]: unknown;
  };
}

export interface RemoveFromCartResponse {
  removeFromCart: {
    id: string;
    customer_id: string;
    product_id: string;
  };
}

export interface RemoveFromCartVariables {
  cart?: {
    id?: string;
    customer_id?: string;
    product_id?: string;
    [key: string]: unknown;
  };
}

export interface UpdateCartResponse {
  updateCart: CartItem;
}

export interface UpdateCartVariables {
  cart?: {
    id?: string;
    customer_id?: string;
    product_id?: string;
    product_variation_id?: string | null;
    quantity?: number;
    price?: number;
    discount?: number;
    vat_percentage?: number;
    total_price?: number;
    [key: string]: unknown;
  };
}
