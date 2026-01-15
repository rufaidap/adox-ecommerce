import {gql} from '@apollo/client';

export const CREATE_CUSTOMER_ADDRESS = gql`
  mutation CreateCustomerAddress($address: CustomerAddress_Create) {
    createCustomerAddress(address: $address) {
      id
      customer_id
      label
      contact_name
      contact_phone
      address_line1
      address_line2
      city
      state
      postal_code
      country
      is_default
      landmark
      delivery_instructions
      latitude
      longitude
      created_at
      updated_at
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation UpdateCustomerAddress($address: CustomerAddress_Update) {
    updateCustomerAddress(address: $address) {
      id
      customer_id
      label
      contact_name
      contact_phone
      address_line1
      address_line2
      city
      state
      postal_code
      country
      is_default
      landmark
      delivery_instructions
      latitude
      longitude
      created_at
      updated_at
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
  mutation DeleteCustomerAddress($address: CustomerAddress_Delete) {
    deleteCustomerAddress(address: $address) {
      id
    }
  }
`;
