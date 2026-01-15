import {showMessage} from 'react-native-flash-message';

import authStore from '@/stores/authStore';

import * as RootNavigation from '../utils/RootNavigation';

interface GraphQLError {
  message: string;
  [key: string]: unknown;
}

interface NetworkError {
  statusCode?: number;
  result?: {
    errors?: GraphQLError[];
  };
}

export interface CustomError {
  graphQLErrors?: {
    errors?: Record<string, string>;
    extensions?: {
      errors?: Record<string, string>;
    };
    message?: string;
  }[];
  networkError?: NetworkError;
  message?: string;
  protocolErrors?: {message?: string}[];
}

export const validateGraphQlError = (
  error: CustomError
): Record<string, string> | null => {
  // Check for errors in graphQLErrors[0].errors (direct)
  const graphQlError = error?.graphQLErrors?.[0]?.errors;

  if (graphQlError && Object.keys(graphQlError).length) {
    return graphQlError;
  }

  // Check for errors in graphQLErrors[0].extensions.errors (nested)
  const extensionsError = error?.graphQLErrors?.[0]?.extensions?.errors;

  if (extensionsError && Object.keys(extensionsError).length) {
    return extensionsError;
  }

  // Check for errors in networkError.result.errors[0].errors
  const networkErrorData = error?.networkError?.result?.errors?.[0] as {
    errors?: Record<string, string>;
  };

  if (networkErrorData?.errors && Object.keys(networkErrorData.errors).length) {
    return networkErrorData.errors;
  } else if (error?.networkError?.statusCode === 401) {
    authStore.clearDataAction();
    RootNavigation.clearAuth();
    showMessage({
      type: 'danger',
      message: 'Authentication Error',
      description: 'Your session has expired. Please login again.',
    });
    return null;
  } else if (error?.networkError?.result?.errors?.length) {
    showMessage({
      type: 'danger',
      message: 'Network Error',
      description:
        error?.networkError?.result?.errors?.[0]?.message || 'Network Error',
    });

    return null;
  } else if (error?.networkError) {
    // Handle network connectivity issues
    showMessage({
      type: 'danger',
      message: 'Connection Error',
      description:
        'Unable to connect to server. Please check your internet connection.',
    });
    return null;
  }

  // Handle WebSocket specific errors
  if (
    error?.message === 'Socket closed' ||
    error?.message?.includes('Socket')
  ) {
    // Don't show error message for socket closed - it will reconnect automatically
    // eslint-disable-next-line no-console
    console.log('WebSocket connection issue - will reconnect automatically');
    return null;
  }

  // Handle protocol errors (WebSocket related)
  if (error?.protocolErrors && error.protocolErrors.length > 0) {
    // eslint-disable-next-line no-console
    console.log('WebSocket protocol error - will reconnect automatically');
    return null;
  }

  // Generic error handling
  const errorMessage = error?.message || 'An unexpected error occurred';
  showMessage({
    type: 'danger',
    message: 'Error',
    description: errorMessage,
  });
  return null;
};
