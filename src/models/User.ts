/**
 * Customer model matching the API response structure
 */
export type Customer = {
  id: string;
  shop_name: string;
  owner_name: string;
  email: string;
  whatsapp_number?: string;
  secondary_number?: string;
  shop_board_photo?: string;
  vat_no?: string;
  cr_no?: string;
  baladiya_no?: string;
  is_approved?: boolean;
  status?: boolean;
  access_token?: string;
  created_at?: string;
  updated_at?: string;
};

// Legacy User type for backward compatibility (deprecated)
export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};
