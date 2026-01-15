import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {
  Colors,
  commonColors,
  ThemeType,
  createShadowStyle,
} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, s, scale, verticalScale, vs} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        addToCartBottomButton: {
          alignItems: 'center',
          backgroundColor: commonColors.background,
          borderColor: commonColors.secondary,
          borderRadius: ms(8),
          borderWidth: ms(1),
          flexDirection: isRTL ? 'row-reverse' : 'row',
          height: ms(40),
          justifyContent: 'center',
          paddingHorizontal: scale(12),
        },
        addToCartBottomIcon: {
          color: commonColors.secondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(16),
          marginLeft: isRTL ? scale(4) : 0,
          marginRight: isRTL ? 0 : scale(4),
        },
        addToCartBottomText: {
          color: commonColors.secondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        addToCartButton: {
          alignItems: 'center',
          aspectRatio: 1,
          backgroundColor: commonColors.background,
          borderRadius: ms(8),
          bottom: scale(8),
          justifyContent: 'center',
          left: isRTL ? scale(8) : undefined,
          position: 'absolute',
          right: isRTL ? undefined : scale(8),
          width: ms(35),
          ...createShadowStyle(theme, 'card', 2),
        },
        addToCartIcon: {
          color: commonColors.black,
          fontFamily: fontFamily.regular,
          fontSize: rf(18),
          textAlign: 'center',
        },
        bottomButtonContainer: {
          alignSelf: 'stretch',
          marginTop: verticalScale(8),
        },
        offerImage: {
          height: '100%',
          width: '100%',
        },
        offerImageContainer: {
          aspectRatio: 1,
          backgroundColor: colors.surface,
          borderRadius: ms(14),
          marginBottom: vs(8),
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        },
        offerItem: {
          marginLeft: isRTL ? s(8) : 0,
          marginRight: isRTL ? 0 : s(8),
          width: s(110),
        },
        offerName: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          marginBottom: verticalScale(4),
          textAlign: isRTL ? 'right' : 'left',
        },
        offerPlaceholder: {
          backgroundColor: colors.inputBorder,
          height: '100%',
          width: '100%',
        },
        offerPrice: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
          textAlign: isRTL ? 'right' : 'left',
        },
        offerWeight: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginBottom: verticalScale(4),
          textAlign: isRTL ? 'right' : 'left',
        },
        productCardContainer: {
          alignSelf: 'flex-start',
          borderColor: colors.border,
          borderRadius: ms(10),
          borderWidth: ms(1),
          padding: ms(10),
          width: ms(130),
        },
        secCardImgStyle: {height: vs(110)},
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
