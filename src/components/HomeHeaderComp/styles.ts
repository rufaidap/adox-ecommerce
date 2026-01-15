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
        header: {
          backgroundColor: colors.background,
          paddingBottom: verticalScale(12),
          paddingHorizontal: scale(16),
        },
        headerIcons: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(16),
        },
        headerTop: {
          alignItems: 'flex-start',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: verticalScale(12),
        },
        heartIcon: {
          backgroundColor: colors.inputBorder,
          borderRadius: ms(12),
          height: ms(24),
          width: ms(24),
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
        locationAddress: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
        },
        locationContainer: {
          alignItems: 'flex-start',
          flex: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
        },
        locationCountry: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
          marginBottom: verticalScale(2),
        },
        locationIcon: {
          backgroundColor: commonColors.background,
          height: ms(25),
          marginLeft: isRTL ? scale(8) : 0,
          marginRight: isRTL ? 0 : scale(8),
          padding: ms(4),
          width: ms(25),
        },
        locationTextContainer: {
          backgroundColor: commonColors.background,
          flex: 1,
          justifyContent: 'flex-start',
          marginLeft: isRTL ? scale(8) : 0,
          marginRight: isRTL ? 0 : scale(8),
        },
        locationTextSubContainer: {
          alignItems: 'center',
          flexDirection: 'row',
          gap: ms(2),
        },
        // Search Bar Styles
        scanIcon: {
          backgroundColor: colors.inputBorder,
          borderRadius: ms(12),
          height: ms(24),
          marginLeft: isRTL ? 0 : scale(12),
          marginRight: isRTL ? scale(12) : 0,
          width: ms(24),
        },
        searchContainer: {
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderColor: colors.inputBorder,
          borderRadius: ms(12),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
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
        searchIcon: {
          backgroundColor: colors.inputBorder,
          borderRadius: ms(10),
          height: ms(20),
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
          width: ms(20),
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
        searchPlaceholder: {
          color: colors.inputPlaceholder,
          flex: 1,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
