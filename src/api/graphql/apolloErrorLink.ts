import {Observable} from '@apollo/client';
import {onError, ErrorResponse} from '@apollo/client/link/error';

import authStore from '@/stores/authStore';
import * as RootNavigation from '@/utils/RootNavigation';

const logoutAndClearStorage = (): void => {
  authStore.clearDataAction();
  RootNavigation.clearAuth();
};

const refreshAccessToken = async (): Promise<string | false> => {
  //   const storedUrl = await AsyncStorage.getItem('url');
  //   if (!authStore?.refreshToken) {
  //     logoutAndClearStorage();
  //     return false;
  //   }
  //   let refresh = `Bearer ${authStore?.refreshToken}`;
  //   let body = {refresh: refresh};
  //   try {
  //     let response = await fetch(`${storedUrl}/api/refresh_token`, {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(body),
  //     });
  //     const result = await response.json();
  //     if (result?.data) {
  //       await authStore.setAccessToken(result?.data?.access_token);
  //       await authStore.setRefreshToken(result?.data?.refresh_token);
  //       return result?.data?.access_token;
  //     } else {
  //       logoutAndClearStorage();
  //     }
  //   } catch (error) {
  //     logoutAndClearStorage();
  //     return error;
  //   }
  return false;
};

export const apolloErrorLink = onError(
  ({graphQLErrors, operation, forward}: ErrorResponse) => {
    if (graphQLErrors?.[0]?.extensions?.code === 'UNAUTHENTICATED') {
      return new Observable(observer => {
        // Create an Observable for retrying the request
        (async () => {
          try {
            const newToken = await refreshAccessToken(); // Attempt to refresh the token

            if (newToken) {
              operation.setContext(({headers = {}}) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}`, // Update headers with new token
                },
              }));
            }
          } catch (error) {
            logoutAndClearStorage();
          }

          const subscriber = {
            next: observer.next.bind(observer), // Pass the next value to the observer
            error: observer.error.bind(observer), // Pass the error to the observer
            complete: observer.complete.bind(observer), // Complete the observer
          };
          forward(operation).subscribe(subscriber); // Retry the request and subscribe to the results
        })();
      });
    }
    // if (networkError) { }
  }
);
