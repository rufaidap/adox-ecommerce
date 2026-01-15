// Common colors that don't change with theme - Elegant Wedding Theme
export const commonColors = {
  // Brand Colors - Elegant Wedding Palette
  primary: '#ED1925', // Primary Red
  primaryHover: '#018345', // Primary Hover Green
  secondary: '#018345', // Secondary Green
  accent: '#E8E0D6', // Elegant Rose Gold (15 20% 90%)

  // Status Colors for Rental States
  statusAvailable: '#2ECC71', // Available (140 80% 45%)
  statusOnRent: '#F39C12', // On Rent (25 95% 53%)
  statusBooked: '#3498DB', // Booked (217 91% 60%)
  statusWash: '#F1C40F', // Wash (46 87% 65%)
  statusPickup: '#9B59B6', // Pickup (264 83% 70%)

  // System Status Colors
  success: '#2ECC71',
  error: '#E74C3C', // Destructive (0 84.2% 60.2%)
  warning: '#F39C12',
  info: '#3498DB',
  textSecondary: '#737373', // Secondary text color
  text: '#0A0A0A', // Primary text color
  border: '#E5E5E5', // Border color
  card: '#FFFFFF', // Card background default
  background: '#FEFEFE', // App background
  cardMint: '#E8FFF2', // Light mint card background
  disabledText: '#9E9E9E', // Disabled text color

  // Grayscale - Elegant tones
  black: '#0A0A0A', // Dark foreground (20 14.3% 4.1%)
  white: '#FEFEFE', // Light background (40 20% 99%)
  gray50: '#F9F9F9', // Muted light (60 4.8% 95.9%)
  gray100: '#E5E5E5', // Border light (20 5.9% 90%)
  gray200: '#CCCCCC',
  gray300: '#9E9E9E',
  gray400: '#666666',
  gray500: '#454545',
  gray600: '#2C2C2C',
  gray700: '#1A1A1A',

  // Opacity
  blackOpacity60: 'rgba(10, 10, 10, 0.6)',
  whiteOpacity60: 'rgba(254, 254, 254, 0.6)',

  // Transparent
  transparent: 'transparent',

  // Onboarding
  onboardSoftPink: '#FFF5F5',

  // Banner Colors
  bannerBlue: '#007AFF', // Blue banner background
  bannerOliveGreen: '#6B8E23', // Olive green button
  invoiceButtonYellow: '#FFFDEA', // Light yellow for invoice buttons
} as const;

const lightColors = {
  ...commonColors,
  // Base - Light Theme
  background: '#FEFEFE', // Light background (40 20% 99%)
  foreground: '#0A0A0A', // Dark foreground (20 14.3% 4.1%)
  surface: '#F5F5F5', // Card background (0 0% 100%)
  text: '#0A0A0A', // Primary text (20 14.3% 4.1%)
  textSecondary: '#737373', // Muted foreground (25 5.3% 44.7%)

  // Card System
  card: '#FFFFFF', // Card background (0 0% 100%)
  cardForeground: '#0A0A0A', // Card text (20 14.3% 4.1%)

  // Popover System
  popover: '#FFFFFF', // Popover background (0 0% 100%)
  popoverForeground: '#0A0A0A', // Popover text (20 14.3% 4.1%)

  // Primary Colors
  primary: commonColors.primary, // Champagne Gold
  primaryForeground: '#0A0A0A', // Text on primary (20 14.3% 4.1%)
  primaryHover: commonColors.primaryHover, // Hover state

  // Secondary Colors
  secondary: commonColors.secondary, // Soft Rose (350 20% 96%)
  secondaryForeground: '#0A0A0A', // Text on secondary (20 14.3% 4.1%)

  // Muted Colors
  muted: '#F9F9F9', // Muted background (60 4.8% 95.9%)
  mutedForeground: '#737373', // Muted text (25 5.3% 44.7%)

  // Accent Colors
  accent: '#E8E0D6', // Elegant rose gold (15 20% 90%)
  accentForeground: '#0A0A0A', // Text on accent (20 14.3% 4.1%)

  // Destructive
  destructive: '#E74C3C', // Error color (0 84.2% 60.2%)
  destructiveForeground: '#FEFEFE', // Text on destructive (210 40% 98%)

  // Components
  inputBackground: '#FFFFFF',
  inputBorder: '#E5E5E5', // Border color (20 5.9% 90%)
  inputPlaceholder: commonColors.blackOpacity60,
  inputText: commonColors.black,
  statusBar: 'dark-content',

  // Buttons
  buttonPrimary: commonColors.primary,
  buttonSecondary: commonColors.secondary,
  buttonDisabled: commonColors.gray200,

  // Icons
  iconPrimary: commonColors.gray500,
  iconSecondary: commonColors.gray300,

  // Borders and Rings
  border: '#E5E5E5', // Border color (20 5.9% 90%)
  ring: commonColors.primary, // Focus ring color

  // Sidebar Colors (Light Theme)
  sidebarBackground: '#FAFAFA', // Sidebar background (0 0% 98%)
  sidebarForeground: '#404040', // Sidebar text (240 5.3% 26.1%)
  sidebarPrimary: '#1A1A1A', // Sidebar primary (240 5.9% 10%)
  sidebarPrimaryForeground: '#FAFAFA', // Text on sidebar primary (0 0% 98%)
  sidebarAccent: '#F5F5F5', // Sidebar accent (240 4.8% 95.9%)
  sidebarAccentForeground: '#1A1A1A', // Text on sidebar accent (240 5.9% 10%)
  sidebarBorder: '#E8E8E8', // Sidebar border (220 13% 91%)
  sidebarRing: '#3498DB', // Sidebar ring (217.2 91.2% 59.8%)

  // Shadow Colors (Light Theme)
  shadowElegant: 'rgba(244, 208, 63, 0.2)', // Primary shadow with 20% opacity
  shadowCard: 'rgba(10, 10, 10, 0.08)', // Card shadow with 8% opacity
  shadowDark: 'rgba(0, 0, 0, 0.15)', // Dark shadow
  shadowLight: 'rgba(255, 255, 255, 0.15)', // Light shadow

  // System Colors
  success: commonColors.success,
  error: commonColors.error,
  warning: commonColors.warning,
  info: commonColors.info,
} as const;

const darkColors = {
  ...commonColors,
  // Base - Dark Theme
  background: '#0A0A0A', // Dark background (20 14.3% 4.1%)
  foreground: '#F9F9F9', // Light foreground (60 9.1% 97.8%)
  surface: '#0A0A0A', // Dark surface (20 14.3% 4.1%)
  text: '#F9F9F9', // Light text (60 9.1% 97.8%)
  textSecondary: '#A3A3A3', // Muted foreground (24 5.4% 63.9%)

  // Card System
  card: '#0A0A0A', // Dark card background (20 14.3% 4.1%)
  cardForeground: '#F9F9F9', // Light card text (60 9.1% 97.8%)

  // Popover System
  popover: '#0A0A0A', // Dark popover background (20 14.3% 4.1%)
  popoverForeground: '#F9F9F9', // Light popover text (60 9.1% 97.8%)

  // Primary Colors
  primary: commonColors.primary, // Champagne Gold (same in both themes)
  primaryForeground: '#0A0A0A', // Dark text on primary (20 14.3% 4.1%)
  primaryHover: commonColors.primaryHover, // Hover state

  // Secondary Colors
  secondary: commonColors.secondary, // Dark secondary (12 6.5% 15.1%)
  secondaryForeground: '#F9F9F9', // Light text on secondary (60 9.1% 97.8%)

  // Muted Colors
  muted: '#262626', // Dark muted background (12 6.5% 15.1%)
  mutedForeground: '#A3A3A3', // Muted text (24 5.4% 63.9%)

  // Accent Colors
  accent: '#262626', // Dark accent (12 6.5% 15.1%)
  accentForeground: '#F9F9F9', // Light text on accent (60 9.1% 97.8%)

  // Destructive
  destructive: '#B91C1C', // Dark destructive (0 62.8% 30.6%)
  destructiveForeground: '#F9F9F9', // Light text on destructive (60 9.1% 97.8%)

  // Components
  inputBackground: '#262626', // Dark input background (12 6.5% 15.1%)
  inputBorder: '#262626', // Dark input border (12 6.5% 15.1%)
  inputPlaceholder: commonColors.whiteOpacity60,
  inputText: commonColors.white,
  statusBar: 'light-content',

  // Buttons
  buttonPrimary: commonColors.primary,
  buttonSecondary: commonColors.secondary,
  buttonDisabled: commonColors.gray500,

  // Icons
  iconPrimary: commonColors.gray300,
  iconSecondary: commonColors.gray400,

  // Borders and Rings
  border: '#262626', // Dark border (12 6.5% 15.1%)
  ring: commonColors.primary, // Focus ring color (same as light)

  // Sidebar Colors (Dark Theme)
  sidebarBackground: '#1A1A1A', // Dark sidebar background (240 5.9% 10%)
  sidebarForeground: '#F5F5F5', // Light sidebar text (240 4.8% 95.9%)
  sidebarPrimary: '#3B82F6', // Sidebar primary (224.3 76.3% 48%)
  sidebarPrimaryForeground: '#FFFFFF', // Text on sidebar primary (0 0% 100%)
  sidebarAccent: '#262626', // Sidebar accent (240 3.7% 15.9%)
  sidebarAccentForeground: '#F5F5F5', // Text on sidebar accent (240 4.8% 95.9%)
  sidebarBorder: '#262626', // Sidebar border (240 3.7% 15.9%)
  sidebarRing: '#3498DB', // Sidebar ring (217.2 91.2% 59.8%)

  // Shadow Colors (Dark Theme)
  shadowElegant: 'rgba(244, 208, 63, 0.3)', // Primary shadow with 30% opacity for dark mode
  shadowCard: 'rgba(0, 0, 0, 0.4)', // Card shadow with 40% opacity for dark mode
  shadowDark: 'rgba(0, 0, 0, 0.6)', // Dark shadow with higher opacity
  shadowLight: 'rgba(255, 255, 255, 0.1)', // Light shadow for dark mode

  // System Colors
  success: commonColors.success,
  error: commonColors.error,
  warning: commonColors.warning,
  info: commonColors.info,
} as const;

export const Colors = {
  light: lightColors,
  dark: darkColors,
} as const;

// Type for theme colors
export type ThemeColors = {
  [K in keyof typeof lightColors]: string;
};

// Type for common colors
export type CommonColors = typeof commonColors;

// Type for theme names
export type ThemeType = keyof typeof Colors;

// Helper to get all available colors
export type AppColors = ThemeColors & CommonColors;

// Additional utility colors for gradients and shadows
export const gradientColors = {
  primaryGradient: ['#F4D03F', '#E8C547'], // Champagne Gold gradient
  elegantGradient: ['#FEFEFE', '#E8E0D6'], // Elegant background gradient
  statusGradients: {
    available: ['#2ECC71', '#27AE60'],
    onRent: ['#F39C12', '#E67E22'],
    booked: ['#3498DB', '#2980B9'],
    wash: ['#F1C40F', '#F39C12'],
    pickup: ['#9B59B6', '#8E44AD'],
  },
} as const;

// Helper function to get theme-aware shadow colors
export const getShadowColors = (theme: ThemeType) => {
  const colors = Colors[theme];
  return {
    elegant: colors.shadowElegant,
    card: colors.shadowCard,
    dark: colors.shadowDark,
    light: colors.shadowLight,
  };
};

// Helper function to create theme-aware shadow styles for React Native
export const createShadowStyle = (
  theme: ThemeType,
  shadowType: 'elegant' | 'card' | 'dark' | 'light' = 'card',
  elevation: number = 4
) => {
  const shadowColors = getShadowColors(theme);
  const shadowColor = shadowColors[shadowType];

  if (theme === 'light') {
    // iOS shadow style
    return {
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: elevation,
      elevation: elevation, // Android shadow
    };
  } else {
    // Dark mode - more prominent shadows
    return {
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: elevation * 1.5,
      elevation: elevation * 1.5, // Android shadow
    };
  }
};

// Helper function to get rental status color
export const getRentalStatusColor = (
  status: 'available' | 'on-rent' | 'booked' | 'wash' | 'pickup'
): string => {
  const statusMap = {
    'available': commonColors.statusAvailable,
    'on-rent': commonColors.statusOnRent,
    'booked': commonColors.statusBooked,
    'wash': commonColors.statusWash,
    'pickup': commonColors.statusPickup,
  };
  return statusMap[status] || commonColors.gray400;
};

// Helper function to get rental status gradient
export const getRentalStatusGradient = (
  status: 'available' | 'on-rent' | 'booked' | 'wash' | 'pickup'
): readonly string[] => {
  const gradientMap = {
    'available': gradientColors.statusGradients.available,
    'on-rent': gradientColors.statusGradients.onRent,
    'booked': gradientColors.statusGradients.booked,
    'wash': gradientColors.statusGradients.wash,
    'pickup': gradientColors.statusGradients.pickup,
  };
  return (
    gradientMap[status] ||
    ([commonColors.gray400, commonColors.gray500] as const)
  );
};
