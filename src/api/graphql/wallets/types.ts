export interface Wallet {
  id: string;
  balance: number;
  status: boolean;
}

export interface WalletsData {
  currentPage: number;
  totalPages: number;
  totalData: number;
  data: Wallet[];
}

export interface WalletsResponse {
  wallets: WalletsData;
}

export interface WalletsVariables {
  size?: number;
  page?: number;
  wallet?: {
    customer_id?: string;
    status?: boolean;
    [key: string]: unknown;
  };
  search?: string;
  orderBy?: {
    field?: string;
    direction?: 'ASC' | 'DESC';
    [key: string]: unknown;
  };
}
