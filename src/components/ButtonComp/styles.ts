import {StyleSheet} from 'react-native';

import {commonColors, ThemeColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {moderateScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, colors: ThemeColors) => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.buttonPrimary,
      borderColor: colors.buttonPrimary,
      borderRadius: moderateScale(10),
      borderWidth: 1,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: moderateScale(8),
      justifyContent: 'center',
      paddingHorizontal: moderateScale(16),
    },
    buttonDisabled: {
      backgroundColor: colors.buttonDisabled,
      borderColor: colors.buttonDisabled,
    },
    buttonOutline: {
      backgroundColor: commonColors.transparent,
      borderColor: colors.buttonPrimary,
    },
    buttonSecondary: {
      backgroundColor: colors.buttonSecondary,
      borderColor: colors.buttonSecondary,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: commonColors.white,
      fontFamily: fontFamily.medium,
      fontSize: moderateScale(16),
      lineHeight: moderateScale(19),
      textAlign: 'center',
    },
    textDisabled: {
      color: colors.textSecondary,
    },
    textOutline: {
      color: colors.buttonPrimary,
    },
    textSecondary: {
      color: colors.secondaryForeground,
    },
  });
};

export default useRTLStyles;
