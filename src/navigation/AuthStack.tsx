import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Onboarding, OTPVerification, PhoneLogin, Signup} from '@/screens';

import {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} id={undefined}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
    </Stack.Navigator>
  );
};

export default AuthStack;
