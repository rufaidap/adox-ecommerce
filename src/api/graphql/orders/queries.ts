import {gql} from '@apollo/client';

export const ORDERS = gql`
  query Orders(
    $size: Int
    $page: Int
    $order: Order_
    $search: String
    $orderBy: SortInput
  ) {
    orders(
      size: $size
      page: $page
      order: $order
      search: $search
      orderBy: $orderBy
    ) {
      currentPage
      totalPages
      totalData
      data {
        id
        order_no
        total_amount
        order_status
        payment_status
        estimated_delivery_date
        delivered_at
        created_at
        order_items {
          quantity
        }
      }
    }
  }
`;

export const ORDER = gql`
  query Order($orderId: ID, $orderNo: String) {
    order(id: $orderId, order_no: $orderNo) {
      order_no
      subtotal
      discount
      vat_amount
      shipping_cost
      total_amount
      order_status
      shipping_address
      estimated_delivery_date
      delivered_at
      payment_method
      created_at
      order_items {
        id
        quantity
        price
        product {
          name
          cover_image
        }
      }
      status_logs {
        id
        new_status
        created_at
      }
    }
  }
`;
