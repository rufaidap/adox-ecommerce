import {gql} from '@apollo/client';

export const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer($customer: Customer_Create) {
    registerCustomer(customer: $customer) {
      id
      shop_name
      owner_name
      email
      whatsapp_number
      secondary_number
      shop_board_photo
      vat_no
      cr_no
      baladiya_no
      is_approved
      status
      access_token
      firebase_id
      created_at
      updated_at
      deleted_at
    }
  }
`;

export const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      id
      shop_name
      owner_name
      email
      whatsapp_number
      secondary_number
      shop_board_photo
      vat_no
      cr_no
      baladiya_no
      is_approved
      status
      access_token
      created_at
      updated_at
    }
  }
`;
