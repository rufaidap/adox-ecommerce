import {makeAutoObservable, runInAction} from 'mobx';

import {Customer} from '@/models/User';
import * as RootNavigation from '@/utils/RootNavigation';

import {secureStorage} from '../utils/secureStorage';

interface UserData extends Partial<Customer> {
  uid?: string;
  displayName?: string;
  phoneNumber?: string;
  [key: string]: unknown;
}

class AuthStore {
  userData: UserData | null = null;
  isFirstTime = false;
  auth_token = '';
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return this.userData !== null;
  }

  private async handleAuthStateChange(user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    phoneNumber: string | null;
    getIdToken: () => Promise<string>;
  }) {
    try {
      const token = await user.getIdToken();
      const userData: UserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
      };

      runInAction(() => {
        this.userData = userData;
        this.auth_token = token;
      });

      await this.saveUserData(userData);
      await this.saveAuthToken(token);
    } catch (error) {
      // console.error('Error handling auth state change:', error);
    }
  }

  saveUserData = async (user: UserData | null) => {
    this.userData = user;
    try {
      if (user) {
        await secureStorage.setItem('USER_DATA', JSON.stringify(user));
        // console.log('Saved to secure storage');
      } else {
        await secureStorage.removeItem('USER_DATA');
        // console.log('User removed from secure storage');
      }
    } catch (error) {
      // console.log('Storage operation failed:', error);
    }
  };

  changeFirstTime(isFirst: boolean) {
    this.isFirstTime = isFirst;
  }

  saveAuthToken = async (token: string) => {
    this.auth_token = token;

    try {
      if (token) {
        await secureStorage.setItem('AUTH_TOKEN', JSON.stringify(token));
        // console.log('Token Saved to secure storage');
      } else {
        await secureStorage.removeItem('AUTH_TOKEN');
        // console.log('User token removed from secure storage');
      }
    } catch (error) {
      // console.log('Storage operation failed:', error);
    }
  };

  clearData() {
    this.userData = null;
    this.isFirstTime = false;
    this.auth_token = '';
  }

  async changeFirstTimeState(isFirstTime: boolean) {
    await secureStorage.setItem('IS_FIRST_TIME', isFirstTime.toString());
    this.changeFirstTime(isFirstTime);
  }

  async clearDataAction() {
    await secureStorage.clearAll();
    this.clearData();
  }

  // Set user data after successful login/registration
  setUserData = async (user: UserData, token?: string) => {
    runInAction(() => {
      this.userData = user;
      if (token) {
        this.auth_token = token;
      }
    });

    await this.saveUserData(user);
    if (token) {
      await this.saveAuthToken(token);
    }
  };

  // Set loading state
  setLoading = (loading: boolean) => {
    runInAction(() => {
      this.loading = loading;
    });
  };

  // Set error state
  setError = (error: string | null) => {
    runInAction(() => {
      this.error = error;
    });
  };

  // Logout user
  logoutUser = async () => {
    try {
      // Clear store state first
      runInAction(() => {
        this.userData = null;
        this.auth_token = '';
      });

      // Clear storage - await to ensure it completes before navigation
      await secureStorage.removeItem('USER_DATA');
      await secureStorage.removeItem('AUTH_TOKEN');

      // Navigate to auth screen after storage is cleared
      RootNavigation.clearAuth();
      // await generalApolloClient.cache.reset();
    } catch (error) {
      //
      throw error;
    }
  };

  // Wrapper methods for compatibility
  setUser = async (user: UserData | null) => {
    if (user) {
      await this.setUserData(user, undefined);
    } else {
      // Clear user data if null
      runInAction(() => {
        this.userData = null;
      });
      await this.saveUserData(null);
    }
  };

  setAccessToken = async (token: string) => {
    await this.saveAuthToken(token);
  };

  // Load user details from API
  loadUserDetails = async () => {
    if (!this.userData?.id) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      // TODO: Replace with actual GraphQL API call when available
      // const response = await generalApolloClient.query({
      //   query: GET_CUSTOMER_DETAILS,
      //   variables: { id: this.userData.id },
      //   fetchPolicy: 'network-only',
      // });

      // For now, user data is already loaded from storage
      runInAction(() => {
        this.loading = false;
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load user details';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
    }
  };
}

const authStore = new AuthStore();
export default authStore;
