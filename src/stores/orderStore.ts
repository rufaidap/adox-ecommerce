import {makeAutoObservable, runInAction} from 'mobx';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import {
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
} from '@/api/graphql/orders/mutations';
import {ORDERS, ORDER} from '@/api/graphql/orders/queries';
import type {
  Order,
  OrdersVariables,
  OrderVariables,
  CreateOrderResponse,
  CreateOrderVariables,
  UpdateOrderResponse,
  UpdateOrderVariables,
  DeleteOrderResponse,
  DeleteOrderVariables,
} from '@/api/graphql/orders/types';
import authStore from '@/stores/authStore';

import {secureStorage} from '../utils/secureStorage';

class OrderStore {
  orders: Order[] = [];
  currentOrder: Order | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Get customer ID from auth store
   */
  private getCustomerId = (): string | undefined => {
    return authStore.userData?.id as string | undefined;
  };

  /**
   * Load orders from API
   */
  loadOrders = async (page: number = 1, size: number = 20) => {
    this.loading = true;
    this.error = null;

    try {
      const customerId = this.getCustomerId();

      if (!customerId) {
        runInAction(() => {
          this.orders = [];
          this.loading = false;
        });
        return;
      }

      const variables: OrdersVariables = {
        customerId,
        page,
        size,
      };

      const response = await generalApolloClient.query({
        query: ORDERS,
        variables,
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      });

      if (response.data?.orders?.data) {
        const orders = response.data.orders.data;

        // Save to secure storage for offline access
        await secureStorage.setObject('USER_ORDERS', orders);

        runInAction(() => {
          this.orders = orders;
          this.loading = false;
        });
      } else {
        runInAction(() => {
          this.orders = [];
          this.loading = false;
        });
      }
    } catch (error: unknown) {
      // Try to load from secure storage as fallback
      try {
        const savedOrders = await secureStorage.getObject('USER_ORDERS');

        if (savedOrders && Array.isArray(savedOrders)) {
          runInAction(() => {
            this.orders = savedOrders;
            this.loading = false;
          });
          return;
        }
      } catch {
        // Ignore storage errors
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load orders';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
        this.orders = [];
      });
    }
  };

  /**
   * Load a single order by ID
   */
  loadOrder = async (orderId: string) => {
    this.loading = true;
    this.error = null;

    try {
      const variables: OrderVariables = {
        orderId,
      };

      const response = await generalApolloClient.query({
        query: ORDER,
        variables,
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      });

      if (response.data?.order) {
        runInAction(() => {
          this.currentOrder = response.data.order;
          this.loading = false;
        });

        return response.data.order;
      } else {
        throw new Error('Order not found');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load order';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
        this.currentOrder = null;
      });
      throw error;
    }
  };

  /**
   * Create a new order
   */
  createOrder = async (orderData: CreateOrderVariables['order']) => {
    this.loading = true;
    this.error = null;

    try {
      const customerId = this.getCustomerId();

      if (!customerId) {
        throw new Error('Customer ID is required');
      }

      // Backend gets customer_id from auth context, don't send it
      const variables: CreateOrderVariables = {
        order: {
          ...orderData,
        },
      };

      const response = await generalApolloClient.mutate<
        CreateOrderResponse,
        CreateOrderVariables
      >({
        mutation: CREATE_ORDER,
        variables,
        errorPolicy: 'all',
      });

      if (response.data?.createOrder) {
        const newOrder = response.data.createOrder;

        runInAction(() => {
          this.orders.unshift(newOrder);
          this.currentOrder = newOrder;
          this.loading = false;
        });

        await secureStorage.setObject('USER_ORDERS', this.orders);

        return newOrder;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create order';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      throw error;
    }
  };

  /**
   * Update an existing order
   */
  updateOrder = async (
    id: string,
    orderData: UpdateOrderVariables['order']
  ) => {
    this.loading = true;
    this.error = null;

    try {
      const variables: UpdateOrderVariables = {
        order: {
          ...orderData,
          id,
        },
      };

      const response = await generalApolloClient.mutate<
        UpdateOrderResponse,
        UpdateOrderVariables
      >({
        mutation: UPDATE_ORDER,
        variables,
        errorPolicy: 'all',
      });

      if (response.data?.updateOrder) {
        const updatedOrder = response.data.updateOrder;

        runInAction(() => {
          const index = this.orders.findIndex(order => order.id === id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          if (this.currentOrder?.id === id) {
            this.currentOrder = updatedOrder;
          }
          this.loading = false;
        });

        // Update secure storage
        await secureStorage.setObject('USER_ORDERS', this.orders);

        return updatedOrder;
      } else {
        throw new Error('Failed to update order');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update order';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      throw error;
    }
  };

  /**
   * Delete an order
   */
  deleteOrder = async (id: string) => {
    this.loading = true;
    this.error = null;

    try {
      const variables: DeleteOrderVariables = {
        order: {
          id,
        },
      };

      await generalApolloClient.mutate<
        DeleteOrderResponse,
        DeleteOrderVariables
      >({
        mutation: DELETE_ORDER,
        variables,
        errorPolicy: 'all',
      });

      runInAction(() => {
        this.orders = this.orders.filter(order => order.id !== id);
        if (this.currentOrder?.id === id) {
          this.currentOrder = null;
        }
        this.loading = false;
      });

      // Update secure storage
      await secureStorage.setObject('USER_ORDERS', this.orders);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete order';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      throw error;
    }
  };

  /**
   * Clear current order
   */
  clearCurrentOrder = () => {
    runInAction(() => {
      this.currentOrder = null;
    });
  };

  /**
   * Clear all orders
   */
  clearOrders = () => {
    runInAction(() => {
      this.orders = [];
      this.currentOrder = null;
    });
  };

  /**
   * Get order summary
   */
  getOrderSummary = (order: Order) => {
    return {
      orderId: order.id,
      orderNumber: order.order_no,
      totalAmount: order.total_amount,
      status: order.order_status,
      paymentStatus: order.payment_status,
      createdAt: order.created_at,
    };
  };
}

const orderStore = new OrderStore();
export default orderStore;
