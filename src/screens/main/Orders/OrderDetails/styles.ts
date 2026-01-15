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
        addressCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: 0,
          padding: ms(16),
        },
        addressCardContent: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
        addressName: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
          marginBottom: verticalScale(4),
        },
        addressText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          lineHeight: rf(16),
        },
        addressTextContainer: {
          flex: 1,
          marginLeft: isRTL ? 0 : scale(8),
          marginRight: isRTL ? scale(8) : 0,
        },
        emptyContainer: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          paddingVertical: verticalScale(40),
        },

        emptyText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(16),
        },
        generalInfoContainer: {
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: verticalScale(12),
        },
        generalInfoText: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
        },
        loadingContainer: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        },
        locationIconContainer: {
          marginRight: isRTL ? 0 : scale(8),
          marginTop: verticalScale(3),
        },
        orderIdContainer: {
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: verticalScale(12),
        },
        orderIdText: {
          color: commonColors.success,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        orderInfoCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: 0,
          padding: ms(16),
        },
        orderInfoDivider: {
          backgroundColor: colors.border,
          height: 1,
          marginVertical: verticalScale(8),
        },
        orderInfoLabel: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        orderInfoRow: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: verticalScale(8),
        },
        orderInfoRowLast: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginBottom: 0,
        },
        orderInfoValue: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
        },
        paymentCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: 0,
          padding: ms(16),
        },
        paymentCardContent: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
        paymentIconContainer: {
          marginTop: verticalScale(3),
        },
        paymentText: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(14),
        },
        paymentTextContainer: {
          flex: 1,
          marginLeft: isRTL ? 0 : scale(12),
          marginRight: isRTL ? scale(12) : 0,
        },
        priceContainer: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: 0,
          padding: ms(16),
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
        productCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          padding: ms(16),
        },
        productDetails: {
          flex: 1,
          justifyContent: 'center',
          marginLeft: isRTL ? 0 : scale(16),
          marginRight: isRTL ? scale(16) : 0,
        },
        productFooter: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
        productImage: {
          borderRadius: ms(8),
          height: ms(82),
          overflow: 'hidden',
          width: ms(82),
        },
        productImagePlaceholder: {
          backgroundColor: colors.border,
          borderRadius: ms(8),
          height: ms(82),
          width: ms(82),
        },
        productName: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          lineHeight: rf(20),
        },
        productPrice: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
        },
        productQuantity: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        productsList: {
          paddingBottom: 0,
        },
        scrollContent: {
          flexGrow: 1,
          paddingBottom: verticalScale(20),
        },
        scrollView: {
          flex: 1,
        },
        separator: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          marginHorizontal: scale(8),
        },
        statusCircle: {
          alignItems: 'center',
          backgroundColor: commonColors.success + '20',
          borderRadius: ms(12),
          height: ms(24),
          justifyContent: 'center',
          width: ms(24),
        },
        statusCirclePending: {
          backgroundColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 2,
          height: ms(24),
          width: ms(24),
        },
        statusContent: {
          flex: 1,
          marginLeft: isRTL ? 0 : scale(16),
          marginRight: isRTL ? scale(16) : 0,
        },
        statusDate: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginTop: verticalScale(4),
        },
        statusDatePending: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginTop: verticalScale(4),
        },
        statusHeader: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        },
        statusItem: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: verticalScale(16),
        },
        statusLeft: {
          alignItems: 'center',
          width: ms(24),
        },
        statusLine: {
          backgroundColor: commonColors.success,
          flex: 1,
          marginTop: verticalScale(4),
          width: 2,
        },
        statusTimelineContainer: {
          marginBottom: verticalScale(12),
          marginHorizontal: scale(16),
          marginTop: 0,
        },
        statusTitle: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(14),
        },
        statusTitlePending: {
          color: colors.textSecondary,
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
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
