import {ThemeType, createShadowStyle, Colors} from '@/styles/colors';

/**
 * Utility functions for handling dark mode visibility issues
 */

/**
 * Creates a theme-aware card style with proper borders and shadows
 * @param theme - Current theme ('light' | 'dark')
 * @param shadowType - Type of shadow to apply
 * @param elevation - Shadow elevation level
 * @returns Style object with borders and shadows
 */
export const createCardStyle = (
  theme: ThemeType,
  shadowType: 'elegant' | 'card' | 'dark' | 'light' = 'card',
  elevation: number = 3
) => {
  const colors = Colors[theme];

  return {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...createShadowStyle(theme, shadowType, elevation),
  };
};

/**
 * Creates a theme-aware button style with proper borders and shadows
 * @param theme - Current theme ('light' | 'dark')
 * @param variant - Button variant
 * @param elevation - Shadow elevation level
 * @returns Style object with borders and shadows
 */
export const createButtonStyle = (
  theme: ThemeType,
  variant: 'primary' | 'secondary' | 'outline' | 'destructive' = 'primary',
  elevation: number = 2
) => {
  const colors = Colors[theme];

  const baseStyle = {
    borderWidth: 1,
    ...createShadowStyle(theme, 'elegant', elevation),
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      };
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: colors.secondary,
        borderColor: colors.border,
      };
    case 'outline':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderColor: colors.primary,
      };
    case 'destructive':
      return {
        ...baseStyle,
        backgroundColor: colors.destructive,
        borderColor: colors.destructive,
      };
    default:
      return baseStyle;
  }
};

/**
 * Creates a theme-aware input style with proper borders
 * @param theme - Current theme ('light' | 'dark')
 * @param isFocused - Whether the input is focused
 * @returns Style object with borders
 */
export const createInputStyle = (
  theme: ThemeType,
  isFocused: boolean = false
) => {
  const colors = Colors[theme];

  return {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: isFocused ? colors.primary : colors.border,
    ...createShadowStyle(theme, 'card', 1),
  };
};

/**
 * Creates a theme-aware modal/overlay style
 * @param theme - Current theme ('light' | 'dark')
 * @returns Style object for modals
 */
export const createModalStyle = (theme: ThemeType) => {
  const colors = Colors[theme];

  return {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...createShadowStyle(theme, 'dark', 8),
  };
};

/**
 * Creates a theme-aware separator/divider style
 * @param theme - Current theme ('light' | 'dark')
 * @param thickness - Thickness of the separator
 * @returns Style object for separators
 */
export const createSeparatorStyle = (
  theme: ThemeType,
  thickness: number = 1
) => {
  const colors = Colors[theme];

  return {
    backgroundColor: colors.border,
    height: thickness,
    width: '100%',
  };
};

/**
 * Creates a theme-aware badge/notification style
 * @param theme - Current theme ('light' | 'dark')
 * @param variant - Badge variant
 * @returns Style object for badges
 */
export const createBadgeStyle = (
  theme: ThemeType,
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info' = 'primary'
) => {
  const colors = Colors[theme];

  const baseStyle = {
    borderWidth: 1,
    borderColor: colors.background,
    ...createShadowStyle(theme, 'dark', 2),
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
      };
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: colors.secondary,
      };
    case 'success':
      return {
        ...baseStyle,
        backgroundColor: colors.success,
      };
    case 'warning':
      return {
        ...baseStyle,
        backgroundColor: colors.warning,
      };
    case 'error':
      return {
        ...baseStyle,
        backgroundColor: colors.error,
      };
    case 'info':
      return {
        ...baseStyle,
        backgroundColor: colors.info,
      };
    default:
      return baseStyle;
  }
};

/**
 * Gets appropriate text color for a given background color in the current theme
 * @param theme - Current theme ('light' | 'dark')
 * @param backgroundColor - Background color to check against
 * @returns Appropriate text color
 */
export const getContrastingTextColor = (
  theme: ThemeType,
  backgroundColor: string
) => {
  const colors = Colors[theme];

  // If background is light, use dark text; if dark, use light text
  const isLightBackground =
    backgroundColor === colors.surface ||
    backgroundColor === colors.background ||
    backgroundColor === 'transparent';

  return isLightBackground ? colors.text : colors.surface;
};

/**
 * Creates a theme-aware elevation style for different component types
 * @param theme - Current theme ('light' | 'dark')
 * @param componentType - Type of component
 * @returns Style object with appropriate elevation
 */
export const createElevationStyle = (
  theme: ThemeType,
  componentType: 'card' | 'button' | 'modal' | 'tooltip' | 'badge' = 'card'
) => {
  const elevationMap = {
    card: 3,
    button: 2,
    modal: 8,
    tooltip: 6,
    badge: 2,
  };

  return createShadowStyle(theme, 'card', elevationMap[componentType]);
};
