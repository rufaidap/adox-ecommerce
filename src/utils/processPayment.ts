import {showMessage} from 'react-native-flash-message';

// import { verifyPaymentDirectly } from '@/api/rest/payment';

// Razorpay has been removed - payment processing needs to be implemented with an alternative solution

interface UserData {
  id?: string | number;
  [key: string]: unknown;
}

interface ProcessPaymentParams {
  totalAmount: number;
  tax: number;
  userData: UserData;
  payment_type: string;
  order_item_id: string;
  product_group_id?: string;
  description: string;
  navigation: unknown;
}

export const processPayment = async ({
  totalAmount,
  tax,
  userData,
  payment_type,
  order_item_id,
  product_group_id,
  description,
}: ProcessPaymentParams): Promise<void> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        user_id: userData?.id,
        payment_type,
        order_item_id,
        product_group_id,
        description,
        notes: {
          order_id: order_item_id,
          ...(product_group_id && {product_group_id}),
          tax,
          payment_type,
        },
      }),
    });

    //console.log('Backend Response:', JSON.stringify(payDt, null, 2));

    const text = await response.text();

    interface PaymentResponse {
      order?: {
        id: string;
        [key: string]: unknown;
      };
      error?: string;
      [key: string]: unknown;
    }

    let payDt: PaymentResponse | null = null;
    try {
      payDt = JSON.parse(text) as PaymentResponse;
    } catch (err) {
      //console.error('❌ JSON parse failed:', err);
    }
    if (!response.ok || !payDt?.order) {
      throw new Error(payDt?.error || 'Order creation failed');
    }

    // Razorpay payment processing has been removed
    // TODO: Implement alternative payment gateway integration
    showMessage({
      type: 'warning',
      message: 'Payment Processing',
      description:
        'Payment gateway integration is pending. Please implement an alternative payment solution.',
    });

    // Payment options would be configured here with the new payment gateway
    // const paymentResult = await newPaymentGateway.open({
    //   // payment configuration
    // });
  } catch (err: unknown) {
    //console.log('err:' + err);
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    showMessage({
      type: 'danger',
      message: 'Error',
      description: errorMessage,
    });
  }
};
