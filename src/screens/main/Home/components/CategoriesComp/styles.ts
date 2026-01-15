import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf, scale, verticalScale, windowWidth} from '@/styles/scaling';

const numVisibleItems = 4.75;
const horizontalPadding = scale(16);
const gap = scale(16);
const availableWidth = windowWidth - horizontalPadding;
// Calculate width to show exactly 4.75 items (including the gaps between the visible items)
const CATEGORY_ITEM_WIDTH =
  (availableWidth - Math.floor(numVisibleItems) * gap) / numVisibleItems;

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        categoriesList: {
          gap: gap,
          paddingHorizontal: horizontalPadding,
        },
        categoryColumn: {
          gap: verticalScale(12),
        },
        categoryImage: {
          height: '100%',
          width: '100%',
        },
        categoryImageContainer: {
          aspectRatio: 1,
          backgroundColor: colors.card,
          borderColor: colors.inputBorder,
          borderRadius: scale(12),
          borderWidth: 1,
          justifyContent: 'center',
          marginBottom: verticalScale(8),
          overflow: 'hidden',
          padding: scale(8),
          width: CATEGORY_ITEM_WIDTH,
        },
        categoryItem: {
          alignItems: 'center',
          width: CATEGORY_ITEM_WIDTH,
        },
        categoryName: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(11),
          textAlign: 'center',
        },
        categoryPlaceholder: {
          backgroundColor: colors.inputBorder,
          height: '100%',
          width: '100%',
        },
        columnWrapper: {
          justifyContent: 'space-between',
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
