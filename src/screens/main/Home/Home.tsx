import React from 'react';


import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

 
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import type {MainTabScreenNavigationProp} from '@/navigation/types';
import {ThemeType} from '@/styles/colors';


import useRTLStyles from './styles';
import HomeHeaderComp from '@/components/HomeHeaderComp/HomeHeaderComp';

type HomeNavigationProp = MainTabScreenNavigationProp<'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const {bottom: safeAreaBottom} = useSafeAreaInsets();
  const styles = useRTLStyles(isRTL, theme as ThemeType, safeAreaBottom);

 


  return (
    <WrapperContainer>
      <HomeHeaderComp />

    </WrapperContainer>
  );
};

export default Home;
