import {useMutation, useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';

import {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART} from './mutations';
import {CARTS} from './queries';
import type {
  AddToCartResponse,
  AddToCartVariables,
  CartsResponse,
  CartsVariables,
  RemoveFromCartResponse,
  RemoveFromCartVariables,
  UpdateCartResponse,
  UpdateCartVariables,
} from './types';

interface UseCartsOptions {
  size?: number;
  page?: number;
  cart?: CartsVariables['cart'];
  search?: string;
  skip?: boolean;
}

export const useCarts = (options: UseCartsOptions = {}) => {
  const {size, page, cart, search, skip = false} = options;

  const payload: CartsVariables = {};

  if (typeof size === 'number') {
    payload.size = size;
  }

  if (typeof page === 'number') {
    payload.page = page;
  }

  if (cart && Object.keys(cart).length > 0) {
    payload.cart = cart;
  }

  if (typeof search === 'string' && search.trim() !== '') {
    payload.search = search;
  }

  const {data, loading, error, refetch} = useQuery<
    CartsResponse,
    CartsVariables
  >(CARTS, {
    client: generalApolloClient,
    variables: payload,
    skip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    carts: data?.carts?.data || [],
    totalData: data?.carts?.totalData || 0,
    totalPages: data?.carts?.totalPages || 0,
    currentPage: data?.carts?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};

export const useAddToCart = () => {
  const [addToCart, {loading, error}] = useMutation<
    AddToCartResponse,
    AddToCartVariables
  >(ADD_TO_CART, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    addToCart,
    loading,
    error,
  };
};

export const useRemoveFromCart = () => {
  const [removeFromCart, {loading, error}] = useMutation<
    RemoveFromCartResponse,
    RemoveFromCartVariables
  >(REMOVE_FROM_CART, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    removeFromCart,
    loading,
    error,
  };
};

export const useUpdateCart = () => {
  const [updateCart, {loading, error}] = useMutation<
    UpdateCartResponse,
    UpdateCartVariables
  >(UPDATE_CART, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    updateCart,
    loading,
    error,
  };
};
