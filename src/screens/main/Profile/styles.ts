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
        avatarContainer: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        avatarImage: {
          borderRadius: ms(25),
          height: ms(70),
          width: ms(70),
        },
        editButton: {
          marginLeft: isRTL ? scale(8) : 'auto',
          marginRight: isRTL ? 'auto' : scale(8),
        },
        headerStyle: {
          justifyContent: 'flex-start',
          paddingTop: ms(1),
        },
        infoContainer: {
          alignItems: 'flex-start',
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(16),
          borderWidth: 1,
          elevation: ms(8),
          marginHorizontal: scale(16),
          marginTop: verticalScale(10),
          paddingHorizontal: scale(8),
          paddingVertical: verticalScale(6),
          shadowColor: colors.shadowDark,
          shadowOffset: {
            height: ms(4),
            width: ms(0),
          },
          shadowOpacity: 0.25,
          shadowRadius: ms(12),
        },
        logoutContainer: {
          marginHorizontal: scale(16),
          marginTop: verticalScale(10),
        },
        logoutContent: {
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(18),
          borderWidth: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(6),
          justifyContent: 'flex-start',
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(14),
          shadowColor: colors.shadowCard,
          shadowOffset: {
            height: ms(2),
            width: ms(0),
          },
          shadowOpacity: 0.12,
          shadowRadius: ms(8),
        },
        logoutDisabled: {
          opacity: 0.5,
        },
        logoutIconWrapper: {
          alignItems: 'center',
          backgroundColor: colors.card,
          borderRadius: ms(14),
          height: ms(40),
          justifyContent: 'center',
          width: ms(40),
        },
        logoutLabel: {
          color: colors.error,
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
        },
        manage: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(6),
          justifyContent: 'flex-start',
          width: '100%',
        },
        name: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          textAlign: isRTL ? 'right' : 'left',
        },
        phone: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginTop: verticalScale(4),
        },
        profileSection: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(16),
          borderWidth: 1,
          marginHorizontal: scale(16),
          marginTop: verticalScale(10),
          overflow: 'hidden',
        },
        scrollviewContainer: {
          flexGrow: 1,
          paddingBottom: verticalScale(120), // Tab bar height (72) + margin (16) + padding (24) + safe area + extra spacing
        },
        sectionTitle: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
          marginBottom: verticalScale(8),
          marginHorizontal: scale(20),
          marginTop: verticalScale(18),
          textAlign: isRTL ? 'right' : 'left',
        },

        settingsSection: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(16),
          borderWidth: 1,
          marginHorizontal: scale(16),
          marginTop: verticalScale(10),
          overflow: 'hidden',
        },
        settingsTitle: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(16),
          marginBottom: verticalScale(8),
          marginHorizontal: scale(20),
          marginTop: verticalScale(18),
          textAlign: isRTL ? 'right' : 'left',
        },
        version: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(14),
        },
        walletAmount: {
          color: commonColors.white,
          fontFamily: fontFamily.bold,
          fontSize: rf(28),
        },
        walletAmountContainer: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(5),
          marginTop: verticalScale(8),
        },
        walletCard: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(16),
          marginHorizontal: scale(16),
          marginTop: verticalScale(16),
          overflow: 'hidden',
          paddingHorizontal: scale(20),
          paddingVertical: verticalScale(20),
          position: 'relative',
        },
        walletIcon: {
          bottom: verticalScale(-20),
          left: isRTL ? scale(-20) : undefined,
          opacity: 0.15,
          position: 'absolute',
          right: isRTL ? undefined : scale(-20),
        },
        walletIconImage: {
          height: ms(92),
          width: ms(89),
        },
        walletTitle: {
          color: commonColors.white,
          fontFamily: fontFamily.medium,
          fontSize: rf(16),
        },
      }),
    [isRTL, theme, colors]
  );
};

const useAccountItemStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        borderDivider: {
          backgroundColor: colors.border,
          height: StyleSheet.hairlineWidth,
          marginLeft: scale(56),
        },
        container: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        },
        iconContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: isRTL ? scale(12) : 0,
          marginRight: isRTL ? 0 : scale(12),
        },
        label: {
          color: colors.text,
          fontFamily: fontFamily.regular,
          fontSize: rf(16),
        },
        labelBold: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
        },
        leftContent: {
          alignItems: 'center',
          flex: 1,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
        rightOption: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        subtitle: {
          color: colors.textSecondary,
          fontFamily: fontFamily.regular,
          fontSize: rf(12),
          marginTop: ms(4),
        },
        textContainer: {
          flex: 1,
        },
        touchable: {
          paddingLeft: isRTL ? scale(26) : scale(18),
          paddingRight: isRTL ? scale(16) : scale(26),
          paddingVertical: ms(12),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
export {useAccountItemStyles};
