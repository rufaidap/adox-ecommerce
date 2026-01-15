import {gql} from '@apollo/client';

export const CARTS = gql`
  query Carts($size: Int, $page: Int, $cart: Cart_, $search: String) {
    carts(size: $size, page: $page, cart: $cart, search: $search) {
      currentPage
      totalPages
      totalData
      data {
        id
        customer_id
        product_id
        product_variation_id
        quantity
        price
        discount
        vat_percentage
        total_price
        created_at
        updated_at
        customer {
          id
          shop_name
          owner_name
          email
        }
        product {
          id
          name
          cover_image
          price
          vat_percentage
        }
        variation {
          id
          product_id
          sku
          attribute_combination
          price
          stock
        }
      }
    }
  }
`;
