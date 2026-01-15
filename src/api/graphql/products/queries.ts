import {gql} from '@apollo/client';

export const PRODUCTS = gql`
  query Products(
    $size: Int
    $page: Int
    $product: Product_
    $search: String
    $minPrice: Float
    $maxPrice: Float
    $orderBy: SortInput
  ) {
    products(
      size: $size
      page: $page
      product: $product
      search: $search
      min_price: $minPrice
      max_price: $maxPrice
      orderBy: $orderBy
    ) {
      currentPage
      totalPages
      totalData
      data {
        id
        name
        slug
        description
        sku
        barcode
        category_id
        brand_id
        type
        price
        vat_percentage
        stock
        max_order_quantity
        cover_image
        is_active
        meta_title
        meta_description
        created_at
        updated_at
        deleted_at
        category {
          name
          id
        }
        brand {
          name
          id
        }
        variations {
          id
          product_id
          sku
          attribute_combination
          price
          stock
          min_order_quantity
          max_order_quantity
          created_at
          updated_at
        }
        attributes {
          id
          product_id
          attribute_id
          is_variation
          is_visible
          position
          created_at
          updated_at
        }
      }
    }
  }
`;
