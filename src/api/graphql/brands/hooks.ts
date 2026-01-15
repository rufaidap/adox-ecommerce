import {useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';

import {BRANDS} from './queries';
import type {BrandsResponse, BrandsVariables} from './types';

interface UseBrandsOptions {
  size?: number;
  page?: number;
  brand?: BrandsVariables['brand'];
  skip?: boolean;
}

export const useBrands = (options: UseBrandsOptions = {}) => {
  const {size = 20, page = 1, brand, skip = false} = options;

  const {data, loading, error, refetch} = useQuery<
    BrandsResponse,
    BrandsVariables
  >(BRANDS, {
    client: generalApolloClient,
    variables: {
      size,
      page,
      brand,
    },
    skip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    brands: data?.brands?.data || [],
    totalData: data?.brands?.totalData || 0,
    totalPages: data?.brands?.totalPages || 0,
    currentPage: data?.brands?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};
