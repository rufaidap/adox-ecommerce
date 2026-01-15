import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, s, vs} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme ?? 'light'];

  return useMemo(
    () =>
      StyleSheet.create({
        buttonSection: {
          marginBottom: vs(24),
        },
        container: {
          flex: 1,
          paddingHorizontal: s(16),
        },
        content: {
          flex: 1,
          justifyContent: 'space-between',
          marginTop: vs(24),
        },
        formSection: {
          marginBottom: vs(24),
        },
        greyText: {
          color: colors.inputPlaceholder,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
        },
        header: {
          // paddingHorizontal: 0,
          // paddingVertical: 0,
        },
        inputLabel: {
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
          marginBottom: vs(10),
        },
        nextButton: {
          backgroundColor: commonColors.primary,
          height: vs(48),
        },
        signUpLink: {
          color: commonColors.secondary,
          fontFamily: fontFamily.medium,
          fontSize: rf(12),
          letterSpacing: 0.5,
          textAlign: 'center',
          textDecorationLine: 'underline',
        },
        signUpPrompt: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(6),
        },
        termsText: {
          color: colors.inputPlaceholder,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          textAlign: 'center',
        },
        title: {
          fontFamily: fontFamily.bold,
          fontSize: rf(22),
          marginBottom: vs(12),
          textTransform: 'uppercase',
        },
        titleSection: {
          marginBottom: vs(32),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
