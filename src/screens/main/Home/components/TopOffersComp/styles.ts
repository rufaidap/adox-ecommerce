import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        offersList: {
          gap: scale(12),
          paddingHorizontal: scale(16),
        },
        section: {
          marginBottom: verticalScale(24),
        },
        sectionHeader: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: verticalScale(12),
          paddingHorizontal: scale(16),
        },
        sectionTitle: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(16),
        },
        seeAllText: {
          color: commonColors.primary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
