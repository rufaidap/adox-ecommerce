import {useQuery} from '@apollo/client';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import authStore from '@/stores/authStore';

import {CREDIT_ACCOUNT} from './queries';
import type {CreditAccountResponse, CreditAccountVariables} from './types';

interface UseCreditAccountOptions {
  customerId?: string;
  skip?: boolean;
}

export const useCreditAccount = (options: UseCreditAccountOptions = {}) => {
  const {customerId, skip = false} = options;

  const payload: CreditAccountVariables = {};

  if (typeof customerId === 'string' && customerId.trim() !== '') {
    payload.customerId = customerId;
  } else {
    // If no customerId provided, use the logged-in user's ID
    const currentCustomerId = authStore.userData?.id as string | undefined;
    if (currentCustomerId) {
      payload.customerId = currentCustomerId;
    }
  }

  const {data, loading, error, refetch} = useQuery<
    CreditAccountResponse,
    CreditAccountVariables
  >(CREDIT_ACCOUNT, {
    client: generalApolloClient,
    variables: payload,
    skip: skip || !payload.customerId,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    creditAccount: data?.creditAccount || null,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to get the current customer's credit account details
 * Returns credit account info including available credit, used credit, etc.
 */
export const useCreditAccountInfo = () => {
  const {creditAccount, loading, error, refetch} = useCreditAccount();

  const availableCredit = creditAccount?.available_credit || 0;
  const usedCredit = creditAccount?.used_credit || 0;
  const creditLimit = creditAccount?.credit_limit || 0;
  const isApproved = creditAccount?.is_approved || false;
  const status = creditAccount?.status || null;

  return {
    creditAccount,
    availableCredit,
    usedCredit,
    creditLimit,
    isApproved,
    status,
    loading,
    error,
    refetch,
  };
};
