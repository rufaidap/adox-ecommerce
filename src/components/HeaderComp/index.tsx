import React, {ReactNode, memo} from 'react';
import {TouchableOpacity, View, ViewStyle, TextStyle} from 'react-native';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {
  ArrowBackIosRoundedIcon,
  ArrowForwardIosRoundedIcon,
} from '@/assets/icons';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {Colors} from '@/styles/colors';
import {ms} from '@/styles/scaling';
import {HIT_SLOP} from '@/utils';

import useRTLStyles from './styles';

interface HeaderCompProps {
  title?: string;
  showBack?: boolean;
  customStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  onBackPress?: () => void;
}

const HeaderComp = ({
  title,
  showBack = true,
  customStyle,
  titleTextStyle,
  leftAccessory = <></>,
  rightAccessory = <></>,
  onBackPress,
}: HeaderCompProps) => {
  // const {userData} = authStore;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {
    theme,
    // toggleTheme
  } = useTheme();
  const isRTL = useIsRTL();
  const styles = useRTLStyles(isRTL, theme);

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const {defaultTheme} = settingsStore;
  // const { isFirstTime } = authStore;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  // const changedTheme = async () => {
  //   const newTheme = defaultTheme.myTheme === 'light' ? 'dark' : 'light';
  //   await secureStorage.setItem('THEME', newTheme);
  //   toggleTheme();
  //   closeModal();
  // };

  // const changedLanguage = (language: LanguageInterface) => {
  //     changeLanguageState(language);
  //     closeModal();
  // }

  // const closeModal = () => {
  //   setIsModalVisible(false);
  // };

  // const onLogout = () => {
  //   navigation.navigate('Profile');
  // };

  return (
    <View>
      <View style={[styles.container, customStyle]}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBackPress}
            hitSlop={HIT_SLOP}
            style={styles.backIcon}>
            {isRTL ? (
              <ArrowForwardIosRoundedIcon
                width={ms(20)}
                height={ms(20)}
                fill={Colors[theme].text}
              />
            ) : (
              <ArrowBackIosRoundedIcon
                width={ms(20)}
                height={ms(20)}
                fill={Colors[theme].text}
              />
            )}
          </TouchableOpacity>
        )}
        {leftAccessory && leftAccessory}
        {title && (
          <TextComp text={title} style={[styles.titleText, titleTextStyle]} />
        )}
        {rightAccessory ? rightAccessory : <View />}
        {/*  
            {headerRightShare && (
              <TouchableOpacity
                style={[styles.circle, {backgroundColor: commonColors.gray50}]}
                hitSlop={HIT_SLOP}>
                <Entypo name="share" size={20} color={colors.primary} />
              </TouchableOpacity>
            )}
          */}

        {/* {__DEV__ && (
        <Pressable onPress={() => setIsModalVisible(true)}>
          <SettingsIcon fill={colors.text} width={20} height={20} />
        </Pressable>
      )} */}

        {/* <ModalComp isVisible={isModalVisible} onClose={closeModal}>
          <View style={styles.modalContainer}>
            <TextComp text="SETTINGS" style={styles.modalTitle} />
            <View style={styles.section}>
              <TextComp text="LANGUAGE" style={styles.sectionTitle} />
              <View style={styles.optionRow}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    isRTL && styles.optionButtonActive,
                  ]}
                  //({ name: 'Arabic', sortName: 'ar' })}
                  hitSlop={HIT_SLOP}>
                  <TextComp
                    text="ARABIC"
                    style={[
                      styles.optionText,
                      isRTL && styles.optionTextActive,
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    !isRTL && styles.optionButtonActive,
                  ]}
                  // onPress={() => changedLanguage({ name: 'English', sortName: 'en' })}
                  hitSlop={HIT_SLOP}>
                  <TextComp
                    text="ENGLISH"
                    style={[
                      styles.optionText,
                      !isRTL && styles.optionTextActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <TextComp
                text="THEME"
                style={styles.sectionTitle}
                isDynamic={false}
              />
              <View style={styles.optionRow}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    theme === 'light' && styles.optionButtonActive,
                  ]}
                  onPress={changedTheme}
                  hitSlop={HIT_SLOP}>
                  <TextComp
                    text="LIGHT"
                    style={[
                      styles.optionText,
                      theme === 'light' && styles.optionTextActive,
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    theme === 'dark' && styles.optionButtonActive,
                  ]}
                  onPress={changedTheme}
                  hitSlop={HIT_SLOP}>
                  <TextComp
                    text="DARK"
                    style={[
                      styles.optionText,
                      theme === 'dark' && styles.optionTextActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {userData ? <ButtonComp title="LOGOUT" onPress={onLogout} /> : null}
          </View>
        </ModalComp> */}
      </View>
    </View>
  );
};

export default memo(HeaderComp);
