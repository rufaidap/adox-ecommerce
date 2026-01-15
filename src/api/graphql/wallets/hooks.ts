import {useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import authStore from '@/stores/authStore';

import {WALLETS} from './queries';
import type {WalletsResponse, WalletsVariables} from './types';

interface UseWalletsOptions {
  size?: number;
  page?: number;
  customerId?: string;
  search?: string;
  skip?: boolean;
}

export const useWallets = (options: UseWalletsOptions = {}) => {
  const {size, page, customerId, search, skip = false} = options;

  const payload: WalletsVariables = {};

  if (typeof size === 'number') {
    payload.size = size;
  }

  if (typeof page === 'number') {
    payload.page = page;
  }

  if (typeof customerId === 'string' && customerId.trim() !== '') {
    payload.wallet = {
      customer_id: customerId,
    };
  } else {
    // If no customerId provided, use the logged-in user's ID
    const currentCustomerId = authStore.userData?.id as string | undefined;
    if (currentCustomerId) {
      payload.wallet = {
        customer_id: currentCustomerId,
      };
    }
  }

  if (typeof search === 'string' && search.trim() !== '') {
    payload.search = search;
  }

  const {data, loading, error, refetch} = useQuery<
    WalletsResponse,
    WalletsVariables
  >(WALLETS, {
    client: generalApolloClient,
    variables: payload,
    skip,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    wallets: data?.wallets?.data || [],
    totalData: data?.wallets?.totalData || 0,
    totalPages: data?.wallets?.totalPages || 0,
    currentPage: data?.wallets?.currentPage || 1,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to get the current customer's wallet balance
 * Returns the first active wallet's balance, or 0 if no wallet found
 */
export const useWalletBalance = () => {
  const {wallets, loading, error, refetch} = useWallets({
    size: 1,
    page: 1,
  });

  const activeWallet = wallets.find(wallet => wallet.status === true);
  const balance = activeWallet?.balance || 0;

  return {
    balance,
    wallet: activeWallet,
    loading,
    error,
    refetch,
  };
};
