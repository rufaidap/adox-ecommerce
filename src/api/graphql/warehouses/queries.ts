import {gql} from '@apollo/client';

export const WAREHOUSES = gql`
  query Warehouses(
    $size: Int
    $page: Int
    $isActive: String
    $search: String
    $orderBy: SortInput
  ) {
    warehouses(
      size: $size
      page: $page
      is_active: $isActive
      search: $search
      orderBy: $orderBy
    ) {
      currentPage
      totalPages
      totalData
      data {
        id
        name
        address_line1
        address_line2
        city
        state
        postal_code
        country
        contact_phone
        contact_email
        is_active
        opening_hours
        notes
        created_at
        updated_at
      }
    }
  }
`;

export const WAREHOUSE = gql`
  query Warehouse($id: ID!) {
    warehouse(id: $id) {
      id
      name
      address_line1
      address_line2
      city
      state
      postal_code
      country
      contact_phone
      contact_email
      is_active
      opening_hours
      notes
      created_at
      updated_at
    }
  }
`;
