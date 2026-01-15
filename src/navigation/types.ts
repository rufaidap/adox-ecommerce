import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {ProductFilter} from '@/api/graphql/products/types';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Intro: undefined;
};

export type AuthStackParamList = {
  Login: {
    errorMessage?: string;
  };
  Onboarding: undefined;
};

export type MainTabParamList = {
  Home: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
};

/**
 * Common navigation type for tab screens that need to navigate to both tab and stack screens.
 * This type combines BottomTabNavigationProp and NativeStackNavigationProp to allow navigation
 * to both tab screens (like Home, Category, Profile) and stack screens (like Cart, Checkout, etc.)
 *
 * @template T - The route name from MainTabParamList (e.g., 'Home', 'Category', 'Profile')
 *
 * @example
 * // In a tab screen component:
 * type HomeNavigationProp = MainTabScreenNavigationProp<'Home'>;
 * const navigation = useNavigation<HomeNavigationProp>();
 * // Now you can navigate to both tab screens and stack screens:
 * navigation.navigate('Cart'); // Stack screen
 * navigation.navigate('Category'); // Tab screen
 */
export type MainTabScreenNavigationProp<T extends keyof MainTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, T>,
    NativeStackNavigationProp<MainStackParamList>
  >;
