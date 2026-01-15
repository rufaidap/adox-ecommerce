/**
 * @file checkStorage.ts
 * @description Utility functions for managing and retrieving persisted application state from secure storage.
 * This module is responsible for initializing the app with user preferences stored in secure storage.
 */

import i18next from 'i18next';

import authStore from '@/stores/authStore';
import settingsStore from '@/stores/settingStore';

import {secureStorage} from './secureStorage';

/**
 * Retrieves persisted application state from secure storage and initializes the MobX stores.
 *
 * @async
 * @function getLocalItem
 * @description This function runs at application startup to:
 *  1. Check if the app is running for the first time
 *  2. Load and apply the user's preferred language
 *  3. Load and apply the user's preferred theme
 *
 * @throws {Error} Will log any errors encountered during retrieval
 * @returns {Promise<void>}
 *
 * @example
 * // Called in App.tsx useEffect
 * getLocalItem();
 */

export const getLocalItem = async (): Promise<void> => {
  try {
    // Check if this is the first time the app has been run
    const isFirstTime: string | null = await secureStorage.getItem(
      'IS_FIRST_TIME'
    );

    /// console.log('isFirstTime', isFirstTime);

    // Get saved language preferences
    const language: {sortName: string} | null = await secureStorage.getObject(
      'LANGUAGE'
    );
    // console.log('language', language);

    // Get saved theme preferences
    const theme: string | null = await secureStorage.getItem('THEME');
    // console.log('theme', theme);

    // Load saved user data and auth token from secure storage
    const savedUserData: string | null = await secureStorage.getItem(
      'USER_DATA'
    );
    const savedAuthToken: string | null = await secureStorage.getItem(
      'AUTH_TOKEN'
    );

    // Restore user data and auth token if they exist
    if (savedUserData && savedAuthToken) {
      try {
        const userData = JSON.parse(savedUserData);
        let authToken = savedAuthToken;

        // Handle case where token might be double-stringified
        try {
          authToken = JSON.parse(authToken);
        } catch {
          // Token is already a string, use as is
        }

        // Restore authentication state
        await authStore.setUserData(userData, authToken);
      } catch (error) {
        // If parsing fails, clear corrupted data
        await secureStorage.removeItem('USER_DATA');
        await secureStorage.removeItem('AUTH_TOKEN');
      }
    }

    // Update first time flag in MobX store
    if (isFirstTime) {
      authStore.changeFirstTime(true);
    }

    // Apply saved language if it exists
    // Apply saved language if it exists
    if (language) {
      // Change i18next language
      i18next.changeLanguage(language.sortName);
      // Update MobX store with language preference
      const matchingLanguage = settingsStore.languages.find(
        l => l.sortName === language.sortName
      );
      if (matchingLanguage) {
        settingsStore.saveDefaultLanguage(matchingLanguage);
      }
    }

    // Apply saved theme if it exists, otherwise set default light theme
    if (theme) {
      settingsStore.saveDefaultTheme({myTheme: theme});
    } else {
      // Set default theme if none exists
      const systemTheme = 'light';
      await secureStorage.setItem('THEME', systemTheme);
      settingsStore.saveDefaultTheme({myTheme: systemTheme});
    }
  } catch (error) {
    // console.log(error);
  }
};
