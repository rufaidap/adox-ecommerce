import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {
  moderateScale,
  responsiveFont,
  scale,
  verticalScale,
} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  // Calculate responsive OTP field width
  const screenWidth = Dimensions.get('window').width;
  const containerPadding = scale(16) * 2; // Left and right padding
  const otpGap = scale(8);
  const otpFieldsCount = 6;
  const availableWidth =
    screenWidth - containerPadding - otpGap * (otpFieldsCount - 1);
  const otpFieldWidth = Math.min(scale(56), availableWidth / otpFieldsCount);

  return useMemo(
    () =>
      StyleSheet.create({
        buttonSection: {
          marginBottom: verticalScale(24),
        },
        container: {
          backgroundColor: colors.background,
          flex: 1,
        },
        content: {
          flex: 1,
          justifyContent: 'space-between',
          marginTop: verticalScale(24),
          paddingHorizontal: scale(16),
        },
        continueButton: {
          height: verticalScale(48),
        },
        editButton: {
          marginLeft: isRTL ? 0 : scale(8),
          marginRight: isRTL ? scale(8) : 0,
        },
        editText: {
          color: commonColors.error,
          fontFamily: fontFamily.medium,
          fontSize: responsiveFont(14),
        },
        errorText: {
          color: colors.error || commonColors.error,
          fontFamily: fontFamily.regular,
          fontSize: responsiveFont(12),
          marginTop: verticalScale(12),
          textAlign: 'center',
        },
        keyboardView: {
          flex: 1,
        },
        otpField: {
          alignItems: 'center',
          backgroundColor: colors.inputBackground,
          borderColor: colors.inputBorder,
          borderRadius: moderateScale(8),
          borderWidth: 1,
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: responsiveFont(24),
          height: verticalScale(56),
          justifyContent: 'center',
          textAlign: 'center',
          width: otpFieldWidth,
        },
        otpInput: {
          alignItems: 'center',
          flexDirection: 'row',
          gap: otpGap,
          justifyContent: 'center',
          width: '100%',
        },
        otpSection: {
          alignItems: 'center',
          marginTop: verticalScale(32),
          width: '100%',
        },
        otpText: {
          textAlign: 'center',
        },
        phoneNumber: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: responsiveFont(16),
        },
        phoneNumberSection: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginTop: verticalScale(16),
        },
        resendLink: {
          color: commonColors.success,
          fontFamily: fontFamily.medium,
          fontSize: responsiveFont(14),
          textDecorationLine: 'underline',
        },
        resendSection: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'center',
          marginTop: verticalScale(16),
        },
        resendText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: responsiveFont(14),
          marginLeft: isRTL ? scale(8) : 0,
          marginRight: isRTL ? 0 : scale(8),
        },
        resendTimer: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: responsiveFont(14),
        },
        subtitle: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: responsiveFont(14),
          marginTop: verticalScale(8),
        },
        title: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: responsiveFont(24),
        },
        titleSection: {
          marginBottom: verticalScale(24),
        },
      }),
    [isRTL, theme, colors, otpFieldWidth, otpGap]
  );
};

export default useRTLStyles;
