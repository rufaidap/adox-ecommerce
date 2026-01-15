/**
 * @file ThemeContext.tsx
 * @description Theme context provider for managing app-wide light/dark theme.
 * Handles theme switching, persistence, and system theme detection.
 */

import React, {createContext, useContext, useEffect, useState} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

import {observer} from 'mobx-react-lite';

import settingsStore from '@/stores/settingStore';
import {ThemeType} from '@/styles/colors';

/**
 * Context for theme management with default values
 */
interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * Theme provider component that manages theme state and provides it to child components
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to theme context
 * @returns {JSX.Element} Provider component with theme context
 *
 * @example
 * // In App.tsx
 * <ThemeProvider>
 *   <YourApp />
 * </ThemeProvider>
 */
export const ThemeProvider = observer(
  ({children}: {children: React.ReactNode}) => {
    // Get system color scheme (light/dark)
    const colorScheme: ColorSchemeName = Appearance.getColorScheme();

    // Get user's theme preference from MobX store
    const {defaultTheme} = settingsStore;

    /**
     * Initialize theme state with priority:
     * 1. User-selected theme from MobX store
     * 2. System color scheme
     * 3. Default to 'light' theme
     */
    const [theme, setTheme] = useState<ThemeType>(
      (defaultTheme?.myTheme as ThemeType) ||
        (colorScheme === 'dark' ? 'dark' : 'light')
    );

    /**
     * Toggle between light and dark themes
     * @function toggleTheme
     */
    const toggleTheme = () => {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    /**
     * Effect to update theme when the MobX store changes
     * This happens when user explicitly changes theme in settings
     */
    useEffect(() => {
      if (defaultTheme?.myTheme) {
        setTheme(defaultTheme.myTheme as ThemeType);
      }
    }, [defaultTheme?.myTheme]);

    /**
     * Effect to handle system theme changes
     * Only applies if user hasn't explicitly set a theme preference
     */
    useEffect(() => {
      const subscription = Appearance.addChangeListener(
        ({colorScheme: systemColorScheme}) => {
          if (!defaultTheme?.myTheme) {
            setTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
          }
        }
      );
      return () => subscription.remove();
    }, [defaultTheme?.myTheme]);

    return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    );
  }
);

/**
 * Custom hook for consuming the theme context
 *
 * @function useTheme
 * @returns {ThemeContextProps} Theme context object with current theme and toggle function
 *
 * @example
 * // In a component
 * const { theme, toggleTheme } = useTheme();
 *
 * // Use theme to style components
 * const backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
 */
export const useTheme = () => useContext(ThemeContext);
