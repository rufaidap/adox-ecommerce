import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        cartBadge: {
          alignItems: 'center',
          backgroundColor: commonColors.error,
          borderRadius: ms(10),
          height: ms(20),
          justifyContent: 'center',
          left: isRTL ? -scale(4) : undefined,
          minWidth: ms(20),
          paddingHorizontal: scale(4),
          position: 'absolute',
          right: isRTL ? undefined : -scale(4),
          top: -verticalScale(4),
        },
        cartBadgeText: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(10),
        },
        categoriesContainer: {
          backgroundColor: commonColors.transparent,
        },
        categoryImageContainer: {
          backgroundColor: colors.muted,
          borderRadius: ms(16),
          borderWidth: 0,
        },
        headerIcons: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(16),
        },
        iconButton: {
          alignItems: 'center',
          position: 'relative',
        },
        iconLabel: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(10),
          marginTop: verticalScale(4),
        },
        productRow: {
          gap: scale(12),
          justifyContent: 'space-between',
          marginBottom: verticalScale(12),
        },
        productsList: {
          paddingHorizontal: scale(16),
        },
        productsSection: {
          marginTop: verticalScale(24),
        },
        scrollContent: {
          paddingBottom: verticalScale(40),
        },
        scrollView: {
          flex: 1,
        },
        searchContainer: {
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderColor: colors.inputBorder,
          borderRadius: ms(12),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginHorizontal: scale(16),
          marginTop: verticalScale(16),
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(12),
        },
        searchDivider: {
          borderLeftColor: isRTL
            ? commonColors.transparent
            : colors.inputBorder,
          borderLeftWidth: isRTL ? 0 : ms(1),
          borderRightColor: isRTL
            ? colors.inputBorder
            : commonColors.transparent,
          borderRightWidth: isRTL ? ms(1) : 0,
          height: ms(20),
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
        },
        searchIconWrapper: {
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
        },
        searchInput: {
          color: colors.text,
          flex: 1,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          padding: 0,
        },
        sectionTitle: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(16),
          marginBottom: verticalScale(12),
          paddingHorizontal: scale(16),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
