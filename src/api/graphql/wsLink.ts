import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';

import authStore from '@/stores/authStore';
import {logger} from '@/utils/helper';

// Fallback URL if environment variable is not set
const SUBSCRIPTION_URL = process.env.GRAPHQL_SUBSCRIPTION_URL
  ? `${process.env.GRAPHQL_SUBSCRIPTION_URL}/graphql`
  : 'wss://api.gateco.com/graphql';

/**
 * WebSocket client configuration with automatic reconnection
 * Handles background/foreground app state changes gracefully
 */
const wsClient = createClient({
  url: SUBSCRIPTION_URL,
  connectionParams: () => {
    const {auth_token} = authStore;
    return {
      Authorization: auth_token ? `Bearer ${auth_token}` : '',
    };
  },
  retryAttempts: Infinity, // Keep trying to reconnect
  retryWait: async retries => {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s, 30s, ...
    const delay = Math.min(1000 * Math.pow(2, retries), 30000);
    return new Promise(resolve => setTimeout(resolve, delay));
  },
  shouldRetry: () => true, // Always retry on connection loss
  on: {
    connected: () => {
      // console.log('WebSocket connected');
    },
    closed: () => {
      // console.log('WebSocket connection closed');
    },
    error: error => {
      logger('WebSocket error:', error);
    },
  },
});

/**
 * GraphQL WebSocket link for subscriptions
 */
export const wsLink = new GraphQLWsLink(wsClient);

/**
 * WebSocket client instance for manual reconnection if needed
 */
export {wsClient};
