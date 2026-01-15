/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {ImageComp} from '@/components';
import {useTheme} from '@/context/ThemeContext';
import {Category, Home, Orders, Profile, WhatsApp} from '@/screens';
import {Colors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf} from '@/styles/scaling';

import MyTabBar from './MyTabBar';
import {ICON_SIZE, TAB_HEIGHT} from './tabBarConfig';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const {theme} = useTheme();
  const colors = Colors[theme];

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      fontSize: rf(10),
      fontFamily: fontFamily.semiBold,
      color: colors.text,
    },
    tabBarStyle: {
      borderTopWidth: 1,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      id={undefined}
      initialRouteName={'Home'}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="WhatsApp"
        component={WhatsApp}
        options={{
          tabBarIcon: () => (
            <ImageComp
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              source={require('@/assets/images/bottom-tab/whatsapp.png')}
              style={{
                height: TAB_HEIGHT * 0.7,
                width: TAB_HEIGHT * 0.7,
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <ImageComp
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              source={require('@/assets/images/bottom-tab/home.png')}
              style={{
                aspectRatio: 442 / 488,
                height: ICON_SIZE,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: () => (
            <ImageComp
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              source={require('@/assets/images/bottom-tab/category.png')}
              style={{
                height: ICON_SIZE,
                width: ICON_SIZE,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: () => (
            <ImageComp
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              source={require('@/assets/images/bottom-tab/orders.png')}
              style={{
                height: ICON_SIZE,
                width: ICON_SIZE,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <ImageComp
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              source={require('@/assets/images/bottom-tab/profile.png')}
              style={{
                height: ICON_SIZE,
                width: ICON_SIZE,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
