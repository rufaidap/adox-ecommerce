import {ApolloClient, HttpLink, InMemoryCache, from} from '@apollo/client';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';
import {setContext} from '@apollo/client/link/context';
import {BASE_URL} from '@env';

import authStore from '@/stores/authStore';

import {apolloErrorLink} from './apolloErrorLink';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          keyArgs: ['product', 'search', 'minPrice', 'maxPrice'],
          merge(existing, incoming) {
            if (!existing || !incoming) {
              return incoming;
            }
            const merged = existing.data ? [...existing.data] : [];
            if (incoming.data) {
              // Avoid duplicates if needed, but usually pagination doesn't have them
              // Simple merge for now
              return {
                ...incoming,
                data: [...merged, ...incoming.data],
              };
            }
            return incoming;
          },
        },
      },
    },
  },
});

const GRAPHQL_API_URL = BASE_URL;

if (!GRAPHQL_API_URL) {
  throw new Error('BASE_URL is not defined in environment variables');
}

const generalServerLink = new HttpLink({
  uri: `${GRAPHQL_API_URL}/graphql`,
});

// Auth middleware using setContext (properly handles async)
const authMiddleware = setContext(async (_, {headers = {}}) => {
  const {auth_token} = authStore;

  let token = auth_token || '';

  if (token) {
    token = `Bearer ${token}`;
  }

  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

export const generalApolloClient = new ApolloClient({
  link: from([apolloErrorLink, authMiddleware, generalServerLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
