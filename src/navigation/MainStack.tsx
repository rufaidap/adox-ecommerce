import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';



import MainTabNavigator from './MainTabNavigator';
import {MainStackParamList} from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} id={undefined}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};
