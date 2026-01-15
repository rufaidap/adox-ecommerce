import {useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';

import {PRODUCTS} from './queries';
import type {ProductsResponse, ProductsVariables} from './types';

interface UseProductsOptions {
  size?: number;
  page?: number;
  product?: ProductsVariables['product'];
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  skip?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const {
    size,
    page,
    product,
    search,
    minPrice,
    maxPrice,
    skip = false,
  } = options;

  const payload: ProductsVariables = {};

  if (typeof size === 'number') {
    payload.size = size;
  }

  if (typeof page === 'number') {
    payload.page = page;
  }

  if (product && Object.keys(product).length > 0) {
    payload.product = product;
  }

  if (typeof search === 'string' && search.trim() !== '') {
    payload.search = search;
  }

  if (typeof minPrice === 'number') {
    payload.minPrice = minPrice;
  }

  if (typeof maxPrice === 'number') {
    payload.maxPrice = maxPrice;
  }

  const {data, loading, error, refetch} = useQuery<
    ProductsResponse,
    ProductsVariables
  >(PRODUCTS, {
    client: generalApolloClient,
    variables: payload,
    skip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    products: data?.products?.data || [],
    totalData: data?.products?.totalData || 0,
    totalPages: data?.products?.totalPages || 0,
    currentPage: data?.products?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};
