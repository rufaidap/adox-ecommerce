/* eslint-disable @typescript-eslint/no-explicit-any */
import {Platform} from 'react-native';

import {secureStorage} from '@/utils/secureStorage';

const GRAPHQL_API_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:4000'
    : 'http://localhost:4000'
  : process.env.BASE_URL;

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{message: string; extensions?: any}>;
}

export const graphqlRequest = async <T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<GraphQLResponse<T>> => {
  try {
    const token = await secureStorage.getItem('AUTH_TOKEN');
    let authToken = '';
    if (token) {
      try {
        authToken = JSON.parse(token);
      } catch {
        authToken = token;
      }
    }

    const response = await fetch(`${GRAPHQL_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? {Authorization: `Bearer ${authToken}`} : {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL Error');
    }

    return result;
  } catch (error: any) {
    throw error;
  }
};
