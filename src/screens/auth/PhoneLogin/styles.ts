import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {moderateScale, ms, rf, s, vs} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme ?? 'light'];

  return useMemo(
    () =>
      StyleSheet.create({
        buttonSection: {
          marginBottom: vs(32),
          marginTop: vs(8),
        },
        connectionInfo: {
          backgroundColor: colors.error || commonColors.error,
          borderRadius: ms(12),
          marginBottom: vs(20),
          paddingHorizontal: s(16),
          paddingVertical: vs(12),
        },
        connectionText: {
          color: commonColors.white,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          textAlign: 'center',
        },
        container: {
          flex: 1,
        },
        content: {
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: s(20),
        },
        countryCodeContainer: {
          width: moderateScale(110),
        },
        countryCodeDD: {
          width: '100%',
        },
        countryCodeInput: {
          paddingRight: moderateScale(8),
        },
        description: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(15),
          lineHeight: rf(22),
          marginTop: vs(8),
        },
        devButton: {
          backgroundColor: commonColors.warning,
          borderRadius: ms(18),
          elevation: 4,
          height: vs(52),
          marginTop: vs(12),
          shadowColor: commonColors.warning,
          shadowOffset: {
            height: 4,
            width: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
        devButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.semiBold,
        },
        devDivider: {
          backgroundColor: colors.textSecondary,
          height: 1,
          marginBottom: vs(16),
          marginTop: vs(24),
          opacity: 0.3,
        },
        devInput: {
          marginBottom: vs(12),
          marginTop: vs(12),
        },
        devSection: {
          marginTop: vs(24),
        },
        devTitle: {
          color: commonColors.warning,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(14),
          marginBottom: vs(8),
          textAlign: 'center',
        },
        errorMessageText: {
          color: colors.error || commonColors.error,
          fontFamily: fontFamily.regular,
          fontSize: rf(13),
          marginTop: vs(8),
          textAlign: isRTL ? 'right' : 'left',
        },
        errorText: {
          color: colors.error || commonColors.error,
          fontFamily: fontFamily.medium,
          fontSize: rf(13),
          marginTop: vs(8),
        },
        formSection: {
          marginBottom: vs(32),
        },
        inputLabel: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(15),
          marginBottom: vs(12),
        },
        keyboardView: {
          flex: 1,
        },
        nextButton: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(18),
          elevation: 4,
          height: vs(52),
          shadowColor: commonColors.primary,
          shadowOffset: {
            height: 4,
            width: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
        nextButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.semiBold,
        },
        otpSection: {
          marginBottom: vs(32),
        },
        phoneInput: {
          flex: 1,
        },
        phoneInputContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(12),
          marginBottom: vs(4),
        },
        resendLink: {
          color: commonColors.primary,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(14),
          marginTop: vs(16),
          textAlign: 'center',
        },
        resendText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(13),
          marginTop: vs(16),
          textAlign: 'center',
        },
        title: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(28),
          letterSpacing: -0.5,
          marginBottom: vs(4),
        },
        titleSection: {
          marginBottom: vs(40),
          marginTop: vs(20),
        },
        topSection: {
          flex: 1,
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
