import React, {useEffect, useRef} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Animated, Image, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import Logo from '@/assets/images/logo/logo.png';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import {RootStackParamList} from '@/navigation/types';
import authStore from '@/stores/authStore'; 
import {Colors} from '@/styles/colors';
import {secureStorage} from '@/utils/secureStorage';

import useRTLStyles from './styles';

const AnimatedImage = Animated.createAnimatedComponent(Image);

type IntroProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

const Intro: React.FC<IntroProps> = ({navigation}) => {
  const {theme} = useTheme();
  const colors = Colors[theme ?? 'light'];
  const styles = useRTLStyles(colors);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  useEffect(() => {
    getLatestData();
  }, []);

  const navigateToScreen = (screenName: string) => {
    setTimeout(() => {
      navigation.replace(screenName as 'Main' | 'Auth');
    }, 2500);
  };

  const getLatestData = async () => {
    try {
      const user = await secureStorage.getItem('USER_DATA');
      const accessToken = await secureStorage.getItem('AUTH_TOKEN');

      if (!user) {
        navigateToScreen('Auth');
        return;
      }

      // Parse user data
      let userData;
      try {
        userData = JSON.parse(user);
      } catch {
        // If parsing fails, navigate to auth
        navigateToScreen('Auth');
        return;
      }

      // Parse access token
      let token = accessToken;
      if (token) {
        try {
          token = JSON.parse(token);
        } catch {
          // Token is already a string, use as is
        }
      }

      // Set user and token in authStore
      authStore.setUser(userData);
      if (token) {
        await authStore.setAccessToken(token);
      }

      // Load user details, cart items, and shipping address
      await authStore.loadUserDetails();
      

      navigateToScreen('Main');
    } catch (error) {
      // On error, navigate to auth
      navigateToScreen('Auth');
    }
  };

  return (
    <WrapperContainer>
      <View style={styles.container}>
        <AnimatedImage
          source={Logo as unknown as number}
          style={[styles.logo, {transform: [{scale: scaleValue}]}]}
          resizeMode="contain"
        />
      </View>
    </WrapperContainer>
  );
};

export default observer(Intro);
