import {useMutation, useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';

import {CREATE_ORDER, DELETE_ORDER, UPDATE_ORDER} from './mutations';
import {ORDER, ORDERS} from './queries';
import type {
  CreateOrderResponse,
  CreateOrderVariables,
  DeleteOrderResponse,
  DeleteOrderVariables,
  OrderResponse,
  OrdersResponse,
  OrdersVariables,
  OrderVariables,
  UpdateOrderResponse,
  UpdateOrderVariables,
} from './types';

interface UseOrdersOptions {
  size?: number;
  page?: number;
  customerId?: string;
  search?: string;
  skip?: boolean;
}

export const useOrders = (options: UseOrdersOptions = {}) => {
  const {size, page, customerId, search, skip = false} = options;

  const payload: OrdersVariables = {};

  if (typeof size === 'number') {
    payload.size = size;
  }

  if (typeof page === 'number') {
    payload.page = page;
  }

  // Backend's Order_ type doesn't accept customer_id
  // The backend filters by authenticated user automatically based on auth token
  // Pass empty order object if backend requires it, or omit entirely
  // For now, we'll omit the order parameter since backend handles filtering

  if (typeof search === 'string' && search.trim() !== '') {
    payload.search = search;
  }

  // Skip query if customerId is not provided
  const shouldSkip = skip || !customerId || customerId.trim() === '';

  const {data, loading, error, refetch} = useQuery<
    OrdersResponse,
    OrdersVariables
  >(ORDERS, {
    client: generalApolloClient,
    variables: payload,
    skip: shouldSkip,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  return {
    orders: data?.orders?.data || [],
    totalData: data?.orders?.totalData || 0,
    totalPages: data?.orders?.totalPages || 0,
    currentPage: data?.orders?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};

export const useOrder = (
  options: {orderId?: string; orderNo?: string; skip?: boolean} = {}
) => {
  const {orderId, orderNo, skip = false} = options;

  const variables: OrderVariables = {};
  if (orderId) {
    variables.orderId = orderId;
  }
  if (orderNo) {
    variables.orderNo = orderNo;
  }

  const shouldSkip =
    skip ||
    (!orderId && !orderNo) ||
    (orderId?.trim() === '' && orderNo?.trim() === '');

  const {data, loading, error, refetch} = useQuery<
    OrderResponse,
    OrderVariables
  >(ORDER, {
    client: generalApolloClient,
    variables,
    skip: shouldSkip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    order: data?.order || null,
    loading,
    error,
    refetch,
  };
};

export const useCreateOrder = () => {
  const [createOrder, {loading, error}] = useMutation<
    CreateOrderResponse,
    CreateOrderVariables
  >(CREATE_ORDER, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    createOrder,
    loading,
    error,
  };
};

export const useUpdateOrder = () => {
  const [updateOrder, {loading, error}] = useMutation<
    UpdateOrderResponse,
    UpdateOrderVariables
  >(UPDATE_ORDER, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    updateOrder,
    loading,
    error,
  };
};

export const useDeleteOrder = () => {
  const [deleteOrder, {loading, error}] = useMutation<
    DeleteOrderResponse,
    DeleteOrderVariables
  >(DELETE_ORDER, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    deleteOrder,
    loading,
    error,
  };
};
