import {gql} from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($cart: Cart_Create) {
    addToCart(cart: $cart) {
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
      product {
        id
        name
        cover_image
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cart: Cart_delete) {
    removeFromCart(cart: $cart) {
      id
      customer_id
      product_id
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCart($cart: Cart_Update) {
    updateCart(cart: $cart) {
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
      product {
        id
        name
        cover_image
      }
    }
  }
`;
