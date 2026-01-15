import {useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import {ms, scale, verticalScale} from '@/styles/scaling';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BANNER_ASPECT_RATIO = 160 / 349;

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];
  const containerMargin = scale(16);
  const bannerWidth = SCREEN_WIDTH - containerMargin * 2;

  return useMemo(
    () =>
      StyleSheet.create({
        bannerImage: {
          borderRadius: ms(16),
          height: '100%',
          width: '100%',
        },
        bannerItem: {
          borderRadius: ms(16),
          height: bannerWidth * BANNER_ASPECT_RATIO,
          width: bannerWidth,
        },
        container: {
          marginBottom: verticalScale(24),
          marginHorizontal: containerMargin,
        },
        paginationContainer: {
          alignItems: 'center',
          alignSelf: 'center',
          bottom: ms(7),
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(8),
          position: 'absolute',
        },
        paginationDot: {
          backgroundColor: commonColors.gray300,
          borderRadius: ms(10),
          height: ms(5),
          width: ms(5),
        },
        paginationDotActive: {
          backgroundColor: commonColors.primary,
          width: ms(10),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
