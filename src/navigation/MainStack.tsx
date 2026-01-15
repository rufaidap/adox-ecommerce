import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  AddAddress,
  Cart,
  Checkout,
  PaymentSuccessful,
  MyAddress,
  OrderDetails,
  Orders,
  PaymentDetails,
  ProductListing,
  Search,
} from '@/screens';

import MainTabNavigator from './MainTabNavigator';
import {MainStackParamList} from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} id={undefined}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessful} />
      <Stack.Screen name="ProductListing" component={ProductListing} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
