import {useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';

import {PRODUCT_CATEGORIES} from './queries';
import type {
  ProductCategoriesResponse,
  ProductCategoriesVariables,
} from './types';

interface UseProductCategoriesOptions {
  size?: number;
  page?: number;
  skip?: boolean;
}

export const useProductCategories = (
  options: UseProductCategoriesOptions = {}
) => {
  const {size = 20, page = 1, skip = false} = options;

  const {data, loading, error, refetch} = useQuery<
    ProductCategoriesResponse,
    ProductCategoriesVariables
  >(PRODUCT_CATEGORIES, {
    client: generalApolloClient,
    variables: {
      size,
      page,
    },
    skip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    categories: data?.productCategories?.data || [],
    totalData: data?.productCategories?.totalData || 0,
    totalPages: data?.productCategories?.totalPages || 0,
    currentPage: data?.productCategories?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};
