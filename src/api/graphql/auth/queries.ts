import {gql} from '@apollo/client';

// Kept for backward compatibility in case other parts of the app still use it
export const USER_CHECK = gql`
  query VerifyUser($firebaseId: String) {
    verifyUser(firebase_id: $firebaseId) {
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

// New customer verification query based on the provided schema
export const CUSTOMER_CHECK = gql`
  query VerifyCustomer($firebaseId: String) {
    verifyCustomer(firebase_id: $firebaseId) {
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
