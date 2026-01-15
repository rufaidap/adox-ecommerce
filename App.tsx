/**
 * @file App.tsx
 * @description Root application component that initializes core app functionality
 * including fonts, internationalization, MobX stores, and navigation.
 *
 * This component handles:
 * - Custom font loading
 * - RTL configuration (explicitly disabled for controlled management)
 * - Theme initialization and provider setup
 * - MobX stores (no provider needed - stores are singletons)
 * - Safe area handling for notched devices
 * - SplashScreen management
 */

import '@/lang';
import React, {useLayoutEffect} from 'react';
import {I18nManager, StyleSheet} from 'react-native';

import {ApolloProvider} from '@apollo/client';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import {ThemeProvider} from '@/context/ThemeContext';
// import {requestUserPermission} from '@/helper/notifciationService';
import Routes from '@/navigation/Routes';
import {getLocalItem} from '@/utils/checkStorage';

/**
 * Main application component that serves as the entry point for the app.
 *
 * @returns {JSX.Element | null} The rendered app or null during font loading
 */
const App = () => {
  /**
   * Setup effect hook that runs on component mount and when font loading status changes
   *
   * @effects
   * - Configures RTL behavior (currently disabled for manual control)
   * - Initializes storage by retrieving persisted user settings
   * - Hides the splash screen once fonts are loaded or an error occurs
   */
  useLayoutEffect(() => {
    // Disable automatic RTL handling - we manage this explicitly through i18n
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    // Initialize app from stored user preferences (theme, language, auth state)

    const init = async () => {
      await getLocalItem();
    };

    init().finally(async () => {
      setTimeout(async () => {
        BootSplash.hide({fade: true});
      }, 1500);
    });
  }, []);

  /**
   * Main app structure with providers in the following order:
   * 1. GestureHandlerRootView - Required for gesture handling (bottom sheets, etc.)
   * 2. SafeAreaProvider - Handles safe areas for notched devices
   * 3. ThemeProvider - Manages light/dark theme (uses MobX internally)
   * 4. BottomSheetModalProvider - Provides context for bottom sheet modals
   * 5. Routes - Navigation container and routing structure
   *
   * Note: MobX stores are singletons and don't require a Provider wrapper
   */
  return (
    <ApolloProvider client={generalApolloClient}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <Routes />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
