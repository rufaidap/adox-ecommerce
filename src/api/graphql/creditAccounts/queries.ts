import {gql} from '@apollo/client';

export const CREDIT_ACCOUNT = gql`
  query CreditAccount($customerId: ID) {
    creditAccount(customer_id: $customerId) {
      id
      available_credit
      credit_limit
      is_approved
      status
      used_credit
    }
  }
`;
