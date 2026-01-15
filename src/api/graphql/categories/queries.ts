import {gql} from '@apollo/client';

export const PRODUCT_CATEGORIES = gql`
  query ProductCategories($size: Int, $page: Int) {
    productCategories(size: $size, page: $page) {
      data {
        id
        name
        image
        slug
        description
        is_active
      }
      totalData
      totalPages
      currentPage
    }
  }
`;
