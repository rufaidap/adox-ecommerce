export interface CreditAccount {
  id: string;
  available_credit: number;
  credit_limit: number;
  is_approved: boolean;
  status: string;
  used_credit: number;
}

export interface CreditAccountResponse {
  creditAccount: CreditAccount | null;
}

export interface CreditAccountVariables {
  customerId?: string;
}
