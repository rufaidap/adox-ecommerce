import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {
  Colors,
  commonColors,
  createShadowStyle,
  ThemeType,
} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale, verticalScale, vs} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        addButton: {
          alignItems: 'center',
          backgroundColor: commonColors.white,
          borderColor: commonColors.primaryHover,
          borderRadius: ms(8),
          borderWidth: 1,
          justifyContent: 'center',
          minWidth: scale(64),
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(8),
          width: '100%',
        },
        addButtonText: {
          color: commonColors.primaryHover,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(12),
        },
        amountWithCurrencyContainer: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(8),
        },
        appreciationMessage: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          marginBottom: verticalScale(32),
          marginTop: verticalScale(16),
          paddingHorizontal: scale(16),
          textAlign: 'center',
        },
        container: {
          backgroundColor: colors.background,
          flex: 1,
        },
        currencyIcon: {},
        dateText: {
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
        },
        dateTimeContainer: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'center',
          marginBottom: verticalScale(16),
          marginTop: verticalScale(8),
        },
        dateTimeSeparator: {
          backgroundColor: colors.textSecondary,
          borderRadius: ms(2),
          height: ms(4),
          marginHorizontal: scale(8),
          width: ms(4),
        },
        dividerContainer: {
          marginBottom: verticalScale(16),
          marginTop: verticalScale(16),
          width: '100%',
        },
        dividerSvg: {},
        favouriteButton: {
          position: 'absolute',
          right: isRTL ? undefined : scale(0),
        },
        paymentAmount: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(32),
        },
        paymentAmountContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: verticalScale(8),
        },
        paymentCard: {
          backgroundColor: colors.surface,
          borderBottomWidth: 10,
          borderColor: colors.border,
          borderRadius: ms(33),
          borderWidth: 1,
          marginBottom: verticalScale(24),
          marginHorizontal: scale(16),
          marginTop: verticalScale(24),
          padding: scale(20),
        },
        paymentInfoItem: {
          alignItems: isRTL ? 'flex-end' : 'flex-start',
        },
        paymentInfoItemRight: {
          alignItems: 'center',
        },
        paymentInfoLabel: {
          color: colors.textSecondary,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(14),
          marginBottom: verticalScale(4),
        },
        paymentInfoRow: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginTop: verticalScale(16),
          width: '100%',
        },
        paymentInfoValue: {
          fontFamily: fontFamily.semiBold,
          fontSize: rf(12),
        },
        priceContainer: {
          width: '100%',
        },
        priceSymbol: {
          height: vs(12),
        },
        priceText: {
          fontSize: rf(14),
        },
        productCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          overflow: 'hidden',
          padding: scale(12),
          width: '100%',
          ...createShadowStyle(theme, 'card', 1),
        },
        productCardWrapper: {
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
          width: scale(140),
        },
        productFooter: {
          alignItems: 'flex-start',
          flexDirection: 'column',
          gap: verticalScale(8),
          marginTop: verticalScale(4),
        },
        productImage: {
          height: '100%',
          width: '100%',
        },
        productImageContainer: {
          aspectRatio: 1,
          backgroundColor: colors.surface,
          borderRadius: ms(8),
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        },
        productName: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginBottom: 0,
          marginTop: verticalScale(8),
          paddingHorizontal: scale(8),
          textAlign: isRTL ? 'right' : 'left',
        },
        productPlaceholder: {
          height: '100%',
          width: '100%',
        },
        productsList: {
          paddingHorizontal: scale(16),
        },
        scrollContent: {
          paddingBottom: verticalScale(32),
          paddingTop: verticalScale(24),
        },
        sectionHeader: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: verticalScale(16),
          paddingHorizontal: scale(16),
        },
        sectionTitle: {
          fontFamily: fontFamily.semiBold,
          fontSize: rf(18),
        },
        seeAllText: {
          color: commonColors.primary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        successIcon: {
          height: scale(104),
          width: scale(104),
        },
        successIconContainer: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        successTitle: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(22),
          marginBottom: verticalScale(24),
          textAlign: 'center',
        },
        timeText: {
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
        },
        topSellingSection: {
          backgroundColor: commonColors.cardMint,
          marginTop: verticalScale(8),
          paddingVertical: verticalScale(16),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
