import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import InitialPageArt from '@/assets/images/initalPage.svg';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {AuthStackParamList} from '@/navigation/types';
import settingsStore from '@/stores/settingStore';

import useRTLStyles from './styles';

type OnBoardNavigation = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

const OnBoard: React.FC = () => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as 'light' | 'dark');
  const navigation = useNavigation<OnBoardNavigation>();

  const handleToggleLanguage = async () => {
    const current = settingsStore.defaultLanguage;

    const nextLanguage =
      current.sortName === 'en'
        ? settingsStore.languages.find(lang => lang.sortName === 'ar')
        : settingsStore.languages.find(lang => lang.sortName === 'en');

    if (nextLanguage) {
      await settingsStore.changeLanguageState(nextLanguage);
    }
  };

  const handleGetStarted = () => {
    navigation.navigate({name: 'PhoneLogin', params: {}});
  };

  const handleLogin = () => {
    navigation.navigate({name: 'PhoneLogin', params: {}});
  };

  return (
    <WrapperContainer style={styles.container}>
      <InitialPageArt width="100%" />

      <View style={styles.content}>
        <View style={styles.textSection}>
          <TextComp text="ONBOARD_TITLE" style={styles.title} />
          <TextComp text="ONBOARD_SUBTITLE" style={styles.subtitle} />
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleLanguage}
            style={styles.languageButton}>
            <View style={styles.languageContent}>
              <TextComp text="عربي" style={styles.languageText} />
            </View>
          </TouchableOpacity>

          <ButtonComp
            title="GET_STARTED"
            onPress={handleGetStarted}
            style={styles.primaryButton}
          />

          <View style={styles.loginRow}>
            <TextComp text="ALREADY_HAVE_ACCOUNT" style={styles.loginHint} />
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
              <TextComp text="LOG_IN" style={styles.loginLink} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default observer(OnBoard);
