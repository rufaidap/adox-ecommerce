import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf, scale, verticalScale, windowWidth} from '@/styles/scaling';

const numVisibleItems = 4.75;
const horizontalPadding = scale(16);
const gap = scale(12);
const availableWidth = windowWidth - horizontalPadding;
// Calculate width to show exactly 4.75 items (including the gaps between the visible items)
const BRAND_ITEM_WIDTH =
  (availableWidth - Math.floor(numVisibleItems) * gap) / numVisibleItems;

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        brandImage: {
          height: '100%',
          width: '100%',
        },
        brandImageContainer: {
          aspectRatio: 1,
          backgroundColor: colors.surface,
          borderRadius: scale(16),
          justifyContent: 'center',
          marginBottom: verticalScale(8),
          overflow: 'hidden',
          padding: scale(5),
          width: BRAND_ITEM_WIDTH,
        },
        brandItem: {
          aspectRatio: 1,
          marginLeft: isRTL ? scale(8) : 0,
          marginRight: isRTL ? 0 : scale(8),
          width: BRAND_ITEM_WIDTH,
        },
        brandPlaceholder: {
          backgroundColor: colors.inputBorder,
          height: '100%',
          width: '100%',
        },
        brandsList: {
          gap: gap,
          paddingHorizontal: horizontalPadding,
        },
        section: {
          marginBottom: verticalScale(24),
        },
        sectionHeader: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: verticalScale(12),
          paddingHorizontal: horizontalPadding,
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
