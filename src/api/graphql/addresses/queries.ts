import {gql} from '@apollo/client';

export const CUSTOMER_ADDRESSES = gql`
  query CustomerAddresses(
    $size: Int
    $page: Int
    $customerId: ID
    $search: String
  ) {
    customerAddresses(
      size: $size
      page: $page
      customer_id: $customerId
      search: $search
    ) {
      currentPage
      totalPages
      totalData
      data {
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
  }
`;
