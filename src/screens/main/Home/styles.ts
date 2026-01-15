import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (
  isRTL: boolean,
  theme: ThemeType,
  safeAreaBottom: number
) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        bannerContainer: {
          backgroundColor: commonColors.bannerBlue,
          borderRadius: ms(16),
          marginBottom: verticalScale(24),
          marginHorizontal: scale(16),
          overflow: 'hidden',
        },
        bannerContent: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          padding: scale(20),
        },
        bannerDot: {
          backgroundColor: commonColors.white,
          borderRadius: ms(3),
          height: ms(6),
          opacity: 0.5,
          width: ms(6),
        },
        bannerDots: {
          flexDirection: 'row',
          gap: scale(6),
        },
        bannerLeft: {
          flex: 1,
          marginLeft: isRTL ? scale(16) : 0,
          marginRight: isRTL ? 0 : scale(16),
        },
        bannerProducts: {
          backgroundColor: commonColors.white,
          borderRadius: ms(8),
          height: verticalScale(100),
          marginBottom: verticalScale(8),
          width: '100%',
        },
        bannerRight: {
          alignItems: 'center',
          width: scale(120),
        },
        bannerSubtitle: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(20),
          marginBottom: verticalScale(16),
        },
        bannerTerms: {
          color: commonColors.white,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          opacity: 0.8,
        },
        bannerTitle: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(28),
          marginBottom: verticalScale(8),
        },
        container: {
          backgroundColor: colors.background,
          flex: 1,
        },
        offersList: {
          gap: scale(12),
          paddingHorizontal: scale(16),
        },
        orderButton: {
          alignSelf: 'flex-start',
          backgroundColor: commonColors.bannerOliveGreen,
          borderRadius: ms(8),
          marginBottom: verticalScale(8),
          paddingHorizontal: scale(24),
          paddingVertical: verticalScale(12),
        },
        orderButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
        },
        scrollContent: {
          paddingBottom: verticalScale(50) + safeAreaBottom, // Tab bar height (55) + margin (16) + padding (24) + safe area + extra spacing
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
    [isRTL, theme, colors, safeAreaBottom]
  );
};

export default useRTLStyles;
