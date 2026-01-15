import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme?: ThemeType) => {
  const colors = Colors[theme || 'light'];

  return useMemo(
    () =>
      StyleSheet.create({
        addressContainer: {
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          marginBottom: verticalScale(18),
          marginHorizontal: scale(16),
          marginTop: verticalScale(16),
          padding: ms(16),
        },
        addressHeader: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: verticalScale(4),
        },
        addressName: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(14),
          marginLeft: isRTL ? 0 : scale(3),
          marginRight: isRTL ? scale(8) : 0,
        },
        addressText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          lineHeight: rf(16),
          marginBottom: verticalScale(8),
          marginLeft: isRTL ? 0 : scale(20),
          marginRight: isRTL ? scale(28) : 0,
          textAlign: isRTL ? 'right' : 'left',
        },
        changeButton: {
          alignSelf: isRTL ? 'flex-end' : 'flex-start',
          marginLeft: isRTL ? 0 : scale(20),
          marginRight: isRTL ? scale(28) : 0,
        },
        changeText: {
          color: commonColors.secondary,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(12),
        },
        contactButton: {
          marginLeft: isRTL ? 0 : 'auto',
          marginRight: isRTL ? 'auto' : 0,
        },
        contactText: {
          color: commonColors.secondary,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(13),
        },
        deleteButton: {
          alignItems: 'center',
          justifyContent: 'center',
          padding: ms(8),
        },
        emptyContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: verticalScale(40),
        },
        emptySubText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          marginTop: verticalScale(8),
          textAlign: 'center',
        },
        emptyText: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(18),
          textAlign: 'center',
        },
        headerStyle: {
          justifyContent: 'flex-start',
          paddingTop: ms(1),
        },
        helpContainer: {
          alignItems: 'center',
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginHorizontal: scale(16),
          marginTop: verticalScale(14),
          padding: ms(16),
        },
        helpEmoji: {
          fontSize: rf(20),
          marginLeft: isRTL ? scale(8) : 0,
          marginRight: isRTL ? 0 : scale(8),
        },
        helpText: {
          color: colors.text,
          flex: 1,
          fontFamily: fontFamily.bold,
          fontSize: rf(13),
          textAlign: isRTL ? 'right' : 'left',
        },
        itemActions: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        },
        itemContainer: {
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: verticalScale(10),
          marginHorizontal: scale(16),
          padding: ms(12),
        },
        itemDetails: {
          flex: 1,
          marginLeft: isRTL ? 0 : scale(12),
          marginRight: isRTL ? scale(12) : 0,
        },
        itemImage: {
          borderRadius: ms(8),
          height: verticalScale(100),
          width: verticalScale(100),
        },
        itemImageContainer: {
          borderRadius: ms(8),
          height: verticalScale(100),
          width: scale(100),
        },
        itemName: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          lineHeight: rf(18),
          marginBottom: verticalScale(4),
          textAlign: isRTL ? 'right' : 'left',
        },
        itemPrice: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(16),
          marginBottom: verticalScale(8),
          textAlign: isRTL ? 'right' : 'left',
        },
        paymentButton: {
          alignItems: 'center',
          backgroundColor: commonColors.primary,
          borderRadius: ms(14),
          height: verticalScale(48),
          justifyContent: 'center',
          width: '100%',
        },
        paymentButtonContainer: {
          paddingHorizontal: scale(16),
        },
        paymentButtonContent: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(8),
          justifyContent: 'center',
        },
        paymentButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
          lineHeight: rf(19),
        },
        priceContainer: {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          elevation: 4,
          marginHorizontal: scale(16),
          marginTop: verticalScale(8),
          padding: ms(16),
          shadowColor: colors.shadowCard,
          shadowOffset: {
            height: 2,
            width: 0,
          },
          shadowOpacity: 1,
          shadowRadius: ms(4),
        },
        priceDetailsTitle: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
          marginBottom: verticalScale(3),
          marginHorizontal: scale(16),
          marginTop: verticalScale(8),
          textAlign: isRTL ? 'right' : 'left',
        },
        priceDivider: {
          backgroundColor: colors.border,
          height: 1,
          marginBottom: verticalScale(12),
          marginTop: verticalScale(12),
        },
        priceLabel: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(13),
          textAlign: isRTL ? 'right' : 'left',
        },
        priceRow: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        },
        priceValue: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(13),
          textAlign: isRTL ? 'left' : 'right',
        },

        quantityButtonText: {
          color: commonColors.secondary,
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
          paddingVertical: verticalScale(2),
        },
        quantityContainer: {
          alignItems: 'center',
          borderColor: commonColors.secondary,
          borderRadius: ms(4),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          paddingHorizontal: scale(20),
        },
        quantityText: {
          color: commonColors.secondary,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          marginHorizontal: scale(12),
        },
        scrollContent: {
          paddingBottom: verticalScale(20),
        },
        scrollView: {
          flex: 1,
        },
        sectionTitle: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
          marginBottom: verticalScale(16),
          marginHorizontal: scale(16),
          textAlign: isRTL ? 'right' : 'left',
        },
        totalLabel: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(15),
          textAlign: isRTL ? 'right' : 'left',
        },

        totalValue: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(15),
          textAlign: isRTL ? 'left' : 'right',
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
