import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import Intro from '@/screens/auth/Intro/Intro';
import {navigationRef} from '@/utils/RootNavigation';

import AuthStack from './AuthStack';
import {MainStack} from './MainStack';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = observer(() => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Intro"
        id={undefined}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;
