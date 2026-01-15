export interface CustomerAddress {
  id: string;
  customer_id: string;
  label: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  is_default: boolean | null;
  landmark: string | null;
  delivery_instructions: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerAddressesData {
  currentPage: number;
  totalPages: number;
  totalData: number;
  data: CustomerAddress[];
}

export interface CustomerAddressesResponse {
  customerAddresses: CustomerAddressesData;
}

export interface CustomerAddressesVariables {
  size?: number;
  page?: number;
  customerId?: string;
  search?: string;
}

export interface CreateCustomerAddressResponse {
  createCustomerAddress: CustomerAddress;
}

export interface CreateCustomerAddressVariables {
  address?: {
    id?: string | null;
    customer_id?: string | null;
    label?: string | null;
    contact_name?: string | null;
    contact_phone?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    is_default?: boolean | null;
    landmark?: string | null;
    delivery_instructions?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    [key: string]: unknown;
  };
}

export interface UpdateCustomerAddressResponse {
  updateCustomerAddress: CustomerAddress;
}

export interface UpdateCustomerAddressVariables {
  address?: {
    id?: string;
    customer_id?: string | null;
    label?: string | null;
    contact_name?: string | null;
    contact_phone?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    is_default?: boolean | null;
    landmark?: string | null;
    delivery_instructions?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    [key: string]: unknown;
  };
}

export interface DeleteCustomerAddressResponse {
  deleteCustomerAddress: {
    id: string;
  };
}

export interface DeleteCustomerAddressVariables {
  address?: {
    id?: string;
    [key: string]: unknown;
  };
}
