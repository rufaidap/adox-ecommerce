import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        cartIconContainer: {
          backgroundColor: colors.surface,
          borderRadius: ms(8),
          height: ms(82),
          marginLeft: isRTL ? scale(16) : 0,
          marginRight: isRTL ? 0 : scale(16),
          marginTop: verticalScale(3),
          overflow: 'hidden',
          width: ms(82),
        },
        container: {
          backgroundColor: colors.background,
          flex: 1,
        },
        dateRow: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          marginTop: verticalScale(4),
        },
        deliveryDate: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(12),
          lineHeight: rf(16),
        },
        emptyContainer: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: scale(24),
        },
        emptyMessage: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          marginTop: verticalScale(8),
          textAlign: 'center',
        },
        emptyTitle: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(18),
          textAlign: 'center',
        },
        itemsCount: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          lineHeight: rf(16),
          marginTop: verticalScale(4),
        },
        listContainer: {
          flexGrow: 1,
          marginHorizontal: scale(16),
          marginTop: verticalScale(16),
          paddingBottom: verticalScale(120), // Tab bar height (72) + margin (16) + padding (24) + safe area + extra spacing
        },
        loadingContainer: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        },
        logoImage: {
          height: '100%',
          width: '100%',
        },
        orderCard: {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          padding: ms(16),
        },
        orderContent: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginTop: verticalScale(12),
        },
        orderDetails: {
          flex: 1,
          justifyContent: 'flex-start',
        },
        orderHeader: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        },
        orderId: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(15),
        },
        orderPrice: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
        },
        statusText: {
          fontFamily: fontFamily.semiBold,
          fontSize: rf(15),
          textTransform: 'capitalize',
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
