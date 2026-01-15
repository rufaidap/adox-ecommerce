// Enums matching backend schema (from payment_types table)
export type PaymentMethodEnum = 'DEBIT_CREDIT' | 'COD';
export type OrderStatusEnum =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';
export type PaymentStatusEnum = 'pending' | 'completed' | 'failed';
export type DeliveryTypeEnum = 'delivery' | 'pickup'; // Backend accepts "delivery" or "pickup"

export interface OrderItemProduct {
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
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_variation_id: string | null;
  quantity: number;
  price: number;
  discount: number | null;
  vat_percentage: number | null;
  vat_amount: number | null;
  total_price: number;
  created_at: string;
  updated_at: string;
  product?: OrderItemProduct | null;
}

export interface StatusLog {
  id: string;
  order_id: string;
  previous_status: string | null;
  new_status: string;
  status_details: string | null;
  changed_by: string | null;
  tracking_number: string | null;
  carrier: string | null;
  live_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_no: string;
  customer_id: string;
  subtotal: number;
  discount: number | null;
  vat_amount: number;
  shipping_cost: number;
  total_amount: number;
  order_status: string;
  payment_status: string;
  shipping_address: string | null;
  notes: string | null;
  tracking_number: string | null;
  carrier: string | null;
  estimated_delivery_date: string | null;
  delivered_at: string | null;
  wallet_amount: number | null;
  credit_amount: number | null;
  cod_amount: number | null;
  debit_credit_amount: number | null;
  payment_method: string;
  delivery_type: string | null;
  warehouse_id: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  status_logs?: StatusLog[];
}

export interface OrdersData {
  currentPage: number;
  totalPages: number;
  totalData: number;
  data: Order[];
}

export interface OrdersResponse {
  orders: OrdersData;
}

export interface Order_ {
  customer_id?: string;
  [key: string]: unknown;
}

export interface SortInput {
  [key: string]: unknown;
}

export interface OrdersVariables {
  size?: number;
  page?: number;
  order?: Order_;
  search?: string;
  orderBy?: SortInput;
}

export interface OrderResponse {
  order: Order;
}

export interface OrderVariables {
  orderId?: string;
  orderNo?: string;
}

export interface CreateOrderResponse {
  createOrder: Order;
}

export interface CreateOrderVariables {
  order?: {
    id?: string | null;
    subtotal?: number | null;
    discount?: number | null;
    shipping_cost?: number | null;
    rejection_reason?: string | null;
    warehouse_id?: string | null;
    delivery_type?: string | null;
    payment_method?: string | null; // Enum: "WALLET", "COD", "CREDIT", "DEBIT_CREDIT"
    debit_credit_amount?: number | null;
    cod_amount?: number | null;
    credit_amount?: number | null;
    wallet_amount?: number | null;
    notes?: string | null;
    shipping_address?: string | null;
    payment_status?: string | null;
    order_status?: string | null;
    [key: string]: unknown;
  };
}

export interface UpdateOrderResponse {
  updateOrder: Order;
}

export interface UpdateOrderVariables {
  order?: {
    id?: string;
    subtotal?: number | null;
    discount?: number | null;
    rejection_reason?: string | null;
    warehouse_id?: string | null;
    delivery_type?: string | null;
    payment_method?: string | null;
    debit_credit_amount?: number | null;
    cod_amount?: number | null;
    credit_amount?: number | null;
    wallet_amount?: number | null;
    notes?: string | null;
    shipping_address?: string | null;
    payment_status?: string | null;
    order_status?: string | null;
    shipping_cost?: number | null;
    vat_amount?: number | null;
    total_amount?: number | null;
    [key: string]: unknown;
  };
}

export interface DeleteOrderResponse {
  deleteOrder: {
    id: string;
  };
}

export interface DeleteOrderVariables {
  order?: {
    id?: string;
    [key: string]: unknown;
  };
}
