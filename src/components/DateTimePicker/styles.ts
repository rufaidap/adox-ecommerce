import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {ThemeColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf} from '@/styles/scaling';

const useStyles = (theme: ThemeType, colors: ThemeColors) => {
  return useMemo(
    () =>
      StyleSheet.create({
        errorLabelStyle: {
          color: colors.error,
          fontFamily: fontFamily.regular,
          fontSize: ms(10),
          includeFontPadding: false,
          marginTop: ms(5),
          textAlign: 'left',
        },
        inputStyle: {
          color: colors.textSecondary,
          flex: 1,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          includeFontPadding: false,
          marginLeft: ms(10),
          paddingVertical: ms(5),
        },
        labelStyle: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          includeFontPadding: false,
          paddingBottom: ms(8),
          textAlign: 'left',
        },
        pickerContainer: {
          alignItems: 'center',
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: ms(1),
          flexDirection: 'row',
          padding: ms(10),
        },
      }),
    [theme, colors]
  );
};

export default useStyles;
