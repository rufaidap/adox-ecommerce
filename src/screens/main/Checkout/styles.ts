import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {moderateScale, ms, rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

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
        container: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          padding: moderateScale(16),
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
        invoiceButton: {
          backgroundColor: commonColors.invoiceButtonYellow,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          flex: 1,
          paddingHorizontal: scale(12),
          paddingVertical: verticalScale(18),
        },
        invoiceButtonText: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(11),
          textAlign: 'center',
        },
        invoiceButtonsContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(12),
        },
        invoiceInfoContainer: {
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
        },
        maxButton: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(6),
          marginLeft: isRTL ? 0 : scale(8),
          marginRight: isRTL ? scale(8) : 0,
          paddingHorizontal: scale(12),
          paddingVertical: verticalScale(8),
        },
        maxButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.medium,
          fontSize: rf(12),
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
        paymentDetailsContainer: {
          marginBottom: verticalScale(14),
          marginHorizontal: scale(16),
        },
        paymentOption: {
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: verticalScale(12),
          padding: ms(16),
        },
        paymentOptionText: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        priceContainer: {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          elevation: 4,
          marginHorizontal: scale(16),
          marginTop: verticalScale(10),
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
        radioButton: {
          alignItems: 'center',
          borderColor: colors.border,
          borderRadius: ms(10),
          borderWidth: 2,
          height: ms(20),
          justifyContent: 'center',
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
          width: ms(20),
        },
        radioButtonContainer: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
        radioButtonInner: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(6),
          height: ms(12),
          width: ms(12),
        },
        radioButtonSelected: {
          borderColor: commonColors.primary,
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
          marginBottom: verticalScale(12),
        },
        splitErrorText: {
          color: commonColors.error,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginTop: verticalScale(8),
          textAlign: 'center',
        },
        splitInput: {
          flex: 1,
          marginBottom: 0,
        },
        splitInputRow: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: verticalScale(12),
        },
        splitLabel: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
          minWidth: scale(80),
        },
        splitPaymentContainer: {
          backgroundColor: colors.surface,
          borderRadius: ms(12),
          marginTop: verticalScale(16),
          padding: ms(16),
        },
        splitPaymentLabel: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
          marginBottom: verticalScale(12),
        },
        splitSummary: {
          alignItems: 'center',
          borderTopColor: colors.textSecondary,
          borderTopWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginTop: verticalScale(12),
          paddingTop: verticalScale(12),
        },
        splitSummaryAmount: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
        },
        splitSummaryLabel: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
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
        walletBalance: {
          color: colors.text,
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
