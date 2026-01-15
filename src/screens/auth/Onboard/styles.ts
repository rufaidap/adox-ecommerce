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
        actionsSection: {
          gap: vs(12),
          marginBottom: vs(32),
          width: '100%',
        },

        container: {
          backgroundColor: commonColors.onboardSoftPink,
          flex: 1,
        },
        content: {
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: s(24),
        },
        languageButton: {
          backgroundColor: colors.card,
          borderColor: commonColors.gray100,
          borderRadius: ms(18),
          borderWidth: 1,
          height: vs(53),
          justifyContent: 'center',
          width: '100%',
        },
        languageContent: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(8),
          justifyContent: 'center',
        },
        languageText: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(16),
        },
        loginHint: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(13),
        },
        loginLink: {
          color: commonColors.secondary,
          fontFamily: fontFamily.medium,
          fontSize: rf(12),
          marginLeft: isRTL ? 0 : s(4),
          marginRight: isRTL ? s(4) : 0,
        },
        loginRow: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'center',
          marginTop: vs(8),
        },
        primaryButton: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(18),
          height: vs(53),
          width: '100%',
        },
        subtitle: {
          color: commonColors.gray300,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          lineHeight: rf(22),
          marginTop: vs(8),
          textAlign: isRTL ? 'right' : 'left',
        },
        textSection: {
          marginBottom: vs(24),
          marginTop: vs(26),
          paddingHorizontal: s(10),
        },
        title: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(25),
          textAlign: isRTL ? 'right' : 'left',
        },
      }),
    [colors, isRTL, theme]
  );
};

export default useRTLStyles;
