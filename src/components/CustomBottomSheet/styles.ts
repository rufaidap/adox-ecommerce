import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {ThemeColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, scale} from '@/styles/scaling';

const useStyles = (theme: ThemeType, colors: ThemeColors, isRTL: boolean) => {
  return useMemo(
    () =>
      StyleSheet.create({
        closeButton: {
          marginLeft: isRTL ? 0 : scale(16),
          marginRight: isRTL ? scale(16) : 0,
        },
        headerContainer: {
          alignItems: 'center',
          backgroundColor: colors.background,
          borderBottomWidth: ms(1),
          borderColor: colors.border,
          flexDirection: 'row',
          paddingBottom: ms(14),
        },
        headerText: {
          color: colors.text,
          flex: 1,
          fontFamily: fontFamily.bold,
          fontSize: ms(18),
          includeFontPadding: false,
          lineHeight: ms(22),
          textAlign: 'center',
        },
      }),
    [theme, colors, isRTL]
  );
};

export default useStyles;
