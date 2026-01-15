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
        addButton: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(18),
          marginBottom: verticalScale(20),
        },
        addButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.semiBold,
        },
        addressCard: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: 1,
          marginBottom: verticalScale(10),
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
          marginLeft: isRTL ? 0 : scale(5),
          marginRight: isRTL ? scale(12) : 0,
        },
        contentContainer: {
          marginHorizontal: scale(16),
          marginTop: verticalScale(16),
        },
        deleteButton: {
          alignItems: 'center',
          justifyContent: 'center',
          padding: ms(8),
        },
        headerStyle: {
          justifyContent: 'flex-start',
          paddingTop: ms(1),
        },
        locationIconContainer: {
          marginTop: verticalScale(3),
        },
        plusIcon: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(20),
          lineHeight: rf(20),
        },
        savedAddressSection: {
          marginTop: verticalScale(8),
        },
        scrollviewContainer: {
          flexGrow: 1,
          paddingBottom: verticalScale(20),
        },
        sectionTitle: {
          color: colors.text,
          fontFamily: fontFamily.bold,
          fontSize: rf(16),
          marginBottom: verticalScale(16),
          textAlign: isRTL ? 'right' : 'left',
        },
        selectedAddressCard: {
          borderColor: commonColors.primary,
          borderWidth: 2,
        },
        subtitle: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
          marginTop: verticalScale(8),
          textAlign: isRTL ? 'right' : 'left',
        },
        title: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(20),
          textAlign: isRTL ? 'right' : 'left',
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
