export interface SortInput {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface Warehouse {
  id: string;
  name: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  is_active: boolean;
  opening_hours: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface WarehousesData {
  currentPage: number;
  totalPages: number;
  totalData: number;
  data: Warehouse[];
}

export interface WarehousesResponse {
  warehouses: WarehousesData;
}

export interface WarehousesVariables {
  size?: number;
  page?: number;
  isActive?: string;
  search?: string;
  orderBy?: SortInput;
}

export interface WarehouseResponse {
  warehouse: Warehouse;
}

export interface WarehouseVariables {
  id: string;
}
