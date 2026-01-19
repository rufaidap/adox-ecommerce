
import {makeAutoObservable, runInAction} from 'mobx';
import authStore from '@/stores/authStore';
import {secureStorage} from '../utils/secureStorage';

// Temporary type definitions until REST types are defined
export type Order = {
  id: string;
  order_no: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  created_at: string;
  [key: string]: any;
};

class OrderStore {
  orders: Order[] = [];
  currentOrder: Order | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private getCustomerId = (): string | undefined => {
    return authStore.userData?.id as string | undefined;
  };

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

      // TODO: Implement REST API call
      console.log('loadOrders not implemented yet');
      
      const savedOrders = await secureStorage.getObject('USER_ORDERS');
      runInAction(() => {
         if (Array.isArray(savedOrders)) {
             this.orders = savedOrders;
         }
         this.loading = false;
      });

    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  };

  loadOrder = async (orderId: string) => {
    this.loading = true;
    this.error = null;
    try {
        // TODO: Implement REST API call
        console.log('loadOrder not implemented yet');
        throw new Error('Not implemented');
    } catch(error: any) {
        runInAction(() => {
            this.error = error.message;
            this.loading = false;
        });
        throw error;
    }
  };

  createOrder = async (orderData: any) => {
    this.loading = true;
    try {
        // TODO: Implement REST API call
        console.log('createOrder not implemented yet');
        throw new Error('Not implemented');
    } catch(error: any) {
        runInAction(() => {
            this.error = error.message;
            this.loading = false;
        });
        throw error;
    }
  };

  updateOrder = async (id: string, orderData: any) => {
     this.loading = true;
     try {
         // TODO: Implement REST API call
         console.log('updateOrder not implemented yet');
         throw new Error('Not implemented');
     } catch(error: any) {
         runInAction(() => {
             this.error = error.message;
             this.loading = false;
         });
         throw error;
     }
  };

  deleteOrder = async (id: string) => {
      this.loading = true;
      try {
          // TODO: Implement REST API call
          console.log('deleteOrder not implemented yet');
          throw new Error('Not implemented');
      } catch(error: any) {
          runInAction(() => {
              this.error = error.message;
              this.loading = false;
          });
          throw error;
      }
  };

  clearCurrentOrder = () => {
    runInAction(() => {
      this.currentOrder = null;
    });
  };

  clearOrders = () => {
    runInAction(() => {
      this.orders = [];
      this.currentOrder = null;
    });
  };

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
