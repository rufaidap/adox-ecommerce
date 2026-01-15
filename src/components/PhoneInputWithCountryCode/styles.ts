import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf} from '@/styles/scaling';

const fs = rf;

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: ms(10),
        },
        countryCodeContainer: {
          width: ms(90),
        },
        countryCodeDD: {
          width: '100%',
        },
        countryCodeInput: {
          paddingRight: ms(8),
        },
        errorText: {
          color: commonColors.error,
          fontFamily: fontFamily.regular,
          fontSize: fs(12),
          marginTop: ms(4),
        },
        label: {
          fontFamily: fontFamily.medium,
          fontSize: fs(16),
        },
        phoneInput: {
          flex: 1,
        },
        phoneInputContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(8),
        },
      }),
    [isRTL, theme]
  );
};

export default useRTLStyles;
