/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  View,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {t} from 'i18next';

import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf} from '@/styles/scaling';

interface TextInputCompProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  error?: boolean;
  touched?: boolean;
  placeholder?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const TextInputComp: React.FC<TextInputCompProps> = ({
  containerStyle,
  inputStyle,
  error,
  touched,
  placeholder,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const themeType: ThemeType =
    theme === 'light' || theme === 'dark' ? theme : 'light';
  const styles = useRTLStyles(isRTL, themeType);
  const colors = Colors[themeType];

  return (
    <View
      style={[
        styles.container,
        error && touched && styles.errorContainer,
        containerStyle,
      ]}>
      <TextInput
        style={[
          styles.input,
          error && touched && styles.errorInput,
          inputStyle,
        ]}
        placeholderTextColor={colors.inputPlaceholder}
        placeholder={placeholder ? t(placeholder) : undefined}
        textAlign={isRTL ? 'right' : 'left'}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          disabled={!onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderRadius: ms(7),
      borderWidth: ms(1),
      flexDirection: isRTL ? 'row-reverse' : 'row',
      padding: ms(12),
    },
    errorContainer: {
      borderColor: commonColors.error,
    },

    errorInput: {
      color: commonColors.error,
    },
    input: {
      color: colors.text,
      flex: 1,
      fontFamily: fontFamily.regular,
      fontSize: rf(14),
      margin: 0,
      padding: 0,
    },
  });
};

export default React.memo(TextInputComp);
