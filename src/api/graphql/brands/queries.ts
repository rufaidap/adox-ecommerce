import {gql} from '@apollo/client';

export const BRANDS = gql`
  query Brands($size: Int, $page: Int, $brand: Brand_) {
    brands(size: $size, page: $page, brand: $brand) {
      currentPage
      totalPages
      totalData
      data {
        id
        name
        logo
        is_active
      }
    }
  }
`;
