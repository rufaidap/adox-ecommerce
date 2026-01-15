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
        container: {
          flex: 1,
        },
        maxButton: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(8),
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
          backgroundColor: commonColors.primary,
          borderRadius: ms(12),
          padding: ms(16),
        },
        paymentButtonContainer: {
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(16),
        },
        paymentButtonContent: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(8),
          justifyContent: 'center',
        },
        paymentButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
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
          paddingTop: verticalScale(16),
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
        walletBalance: {
          color: colors.text,
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
