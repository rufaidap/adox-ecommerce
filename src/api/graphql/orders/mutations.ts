import {gql} from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($order: Order_Create) {
    createOrder(order: $order) {
      id
      order_no
      customer_id
      subtotal
      discount
      vat_amount
      shipping_cost
      total_amount
      order_status
      payment_status
      shipping_address
      notes
      tracking_number
      carrier
      estimated_delivery_date
      delivered_at
      wallet_amount
      credit_amount
      cod_amount
      debit_credit_amount
      payment_method
      delivery_type
      warehouse_id
      rejection_reason
      created_at
      updated_at
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($order: Order_Update) {
    updateOrder(order: $order) {
      id
      order_no
      customer_id
      subtotal
      discount
      vat_amount
      shipping_cost
      total_amount
      order_status
      payment_status
      shipping_address
      notes
      tracking_number
      carrier
      estimated_delivery_date
      delivered_at
      wallet_amount
      credit_amount
      cod_amount
      debit_credit_amount
      payment_method
      delivery_type
      warehouse_id
      rejection_reason
      created_at
      updated_at
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($order: Order_Delete) {
    deleteOrder(order: $order) {
      id
    }
  }
`;
