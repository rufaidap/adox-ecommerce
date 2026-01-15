import {useMutation, useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';

import {
  CREATE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
} from './mutations';
import {CUSTOMER_ADDRESSES} from './queries';
import type {
  CreateCustomerAddressResponse,
  CreateCustomerAddressVariables,
  CustomerAddressesResponse,
  CustomerAddressesVariables,
  DeleteCustomerAddressResponse,
  DeleteCustomerAddressVariables,
  UpdateCustomerAddressResponse,
  UpdateCustomerAddressVariables,
} from './types';

interface UseCustomerAddressesOptions {
  size?: number;
  page?: number;
  customerId?: string;
  search?: string;
  skip?: boolean;
}

export const useCustomerAddresses = (
  options: UseCustomerAddressesOptions = {}
) => {
  const {size, page, customerId, search, skip = false} = options;

  const payload: CustomerAddressesVariables = {};

  if (typeof size === 'number') {
    payload.size = size;
  }

  if (typeof page === 'number') {
    payload.page = page;
  }

  if (typeof customerId === 'string' && customerId.trim() !== '') {
    payload.customerId = customerId;
  }

  if (typeof search === 'string' && search.trim() !== '') {
    payload.search = search;
  }

  const {data, loading, error, refetch} = useQuery<
    CustomerAddressesResponse,
    CustomerAddressesVariables
  >(CUSTOMER_ADDRESSES, {
    client: generalApolloClient,
    variables: payload,
    skip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    addresses: data?.customerAddresses?.data || [],
    totalData: data?.customerAddresses?.totalData || 0,
    totalPages: data?.customerAddresses?.totalPages || 0,
    currentPage: data?.customerAddresses?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};

export const useCreateCustomerAddress = () => {
  const [createCustomerAddress, {loading, error}] = useMutation<
    CreateCustomerAddressResponse,
    CreateCustomerAddressVariables
  >(CREATE_CUSTOMER_ADDRESS, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    createCustomerAddress,
    loading,
    error,
  };
};

export const useUpdateCustomerAddress = () => {
  const [updateCustomerAddress, {loading, error}] = useMutation<
    UpdateCustomerAddressResponse,
    UpdateCustomerAddressVariables
  >(UPDATE_CUSTOMER_ADDRESS, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    updateCustomerAddress,
    loading,
    error,
  };
};

export const useDeleteCustomerAddress = () => {
  const [deleteCustomerAddress, {loading, error}] = useMutation<
    DeleteCustomerAddressResponse,
    DeleteCustomerAddressVariables
  >(DELETE_CUSTOMER_ADDRESS, {
    client: generalApolloClient,
    errorPolicy: 'all',
  });

  return {
    deleteCustomerAddress,
    loading,
    error,
  };
};
