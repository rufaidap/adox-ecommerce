import {useQuery} from '@apollo/client';

import {generalApolloClient} from '../apolloClient';
import {WAREHOUSE, WAREHOUSES} from './queries';
import type {
  WarehouseResponse,
  WarehouseVariables,
  WarehousesResponse,
  WarehousesVariables,
} from './types';

/**
 * Hook to fetch warehouses
 */
export const useWarehouses = (
  page: number = 1,
  size: number = 100,
  search?: string,
  isActive?: string
) => {
  const {data, loading, error, refetch} = useQuery<
    WarehousesResponse,
    WarehousesVariables
  >(WAREHOUSES, {
    client: generalApolloClient,
    variables: {size, page, search, isActive},
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  return {
    warehouses: data?.warehouses?.data || [],
    currentPage: data?.warehouses?.currentPage || 1,
    totalPages: data?.warehouses?.totalPages || 1,
    totalData: data?.warehouses?.totalData || 0,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single warehouse by ID
 */
export const useWarehouse = (id: string) => {
  const {data, loading, error, refetch} = useQuery<
    WarehouseResponse,
    WarehouseVariables
  >(WAREHOUSE, {
    client: generalApolloClient,
    variables: {id},
    fetchPolicy: 'cache-and-network',
    skip: !id,
  });

  return {
    warehouse: data?.warehouse || null,
    loading,
    error,
    refetch,
  };
};
