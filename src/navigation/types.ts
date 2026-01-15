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
  Signup: {
    phoneNumber?: string;
    firebaseId?: string;
  };
  Onboarding: undefined;
  PhoneLogin: {
    errorMessage?: string;
  };
  OTPVerification: {
    phoneNumber: string;
    confirmation?: FirebaseAuthTypes.ConfirmationResult;
  };
};

export type MainTabParamList = {
  WhatsApp: undefined;
  Home: undefined;
  Orders: undefined;
  Category: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  Cart: undefined;
  Checkout: undefined;
  PaymentDetails: undefined;
  PaymentSuccessful: {
    amount: number;
    date: string;
    time: string;
    paymentId: string;
    paymentMethod: string;
  };
  MyAddress:
    | {
        selectMode?: boolean;
      }
    | undefined;
  AddAddress:
    | {
        addressId?: string;
        addressData?: {
          id: string;
          contact_name: string | null;
          contact_phone: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          postal_code: string | null;
          state: string | null;
          country: string | null;
          landmark: string | null;
          label: string | null;
          delivery_instructions: string | null;
          is_default: boolean | null;
        };
      }
    | undefined;
  Orders: undefined;
  OrderDetails: {
    orderId?: string;
    orderNo?: string;
  };
  ProfileUpdate: undefined;
  ChangePassword: undefined;
  ProductListing: {
    label?: string;
    categoryId?: string;
    brandId?: string;
    search?: string;
    filter?: ProductFilter;
  };
  Search:
    | {
        type?: 'products' | 'categories';
      }
    | undefined;
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
