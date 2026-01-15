import {StyleSheet} from 'react-native';

import {FONT_FAMILY} from '@/assets/fonts';
import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, vs, moderateScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    backIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: isRTL ? ms(10) : 0,
      marginRight: isRTL ? 0 : ms(10),
    },
    badgeContainer: {
      backgroundColor: colors.primary,
      borderRadius: moderateScale(100),
      position: 'absolute',
      right: -4,
      top: -4,
    },
    badgeText: {
      color: colors.background,
      fontSize: 10,
      fontWeight: 'bold',
      paddingHorizontal: moderateScale(4),
      paddingVertical: moderateScale(1),
    },
    circle: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: moderateScale(100),
      height: ms(32),
      justifyContent: 'center',
      width: ms(32),
    },
    container: {
      alignItems: 'center',
      backgroundColor: commonColors.transparent,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      paddingBottom: moderateScale(12),
      paddingHorizontal: moderateScale(16),
      paddingTop: moderateScale(8),
      width: '100%',
    },
    filterButton: {
      alignItems: 'center',
      borderColor: colors.border,
      borderRadius: vs(10),
      borderWidth: vs(1),
      flexDirection: 'row',
      gap: vs(5),
      height: vs(30),
      marginRight: vs(10),
      paddingHorizontal: vs(9),
      paddingVertical: vs(5),
    },
    filterIcon: {
      height: '100%',
      width: '100%',
    },

    filterText: {
      color: colors.textSecondary,
      fontFamily: FONT_FAMILY.semiBold,
      fontSize: vs(12),
      includeFontPadding: false,
      textAlign: isRTL ? 'right' : 'left',
    },
    fiterContaim: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: vs(5),
      height: vs(30),
      justifyContent: 'center',
      marginLeft: vs(10),
      width: vs(30),
    },
    headerRightPressable: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: moderateScale(8),
    },

    logoutText: {
      color: colors.text,
      fontFamily: fontFamily.medium,
      fontSize: moderateScale(16),
    },
    modalContainer: {
      backgroundColor: colors.background,
      minHeight: moderateScale(100),
    },
    modalTitle: {
      fontFamily: fontFamily.bold,
      fontSize: moderateScale(24),
      marginBottom: moderateScale(24),
      textAlign: 'center',
    },
    optionButton: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.inputBorder,
      borderRadius: moderateScale(12),
      borderWidth: 1,
      flex: 1,
      padding: moderateScale(12),
    },
    optionButtonActive: {
      backgroundColor: colors.text,
      borderColor: colors.text,
    },
    optionRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: moderateScale(12),
      justifyContent: 'space-between',
    },
    optionText: {
      color: colors.text,
      fontFamily: fontFamily.medium,
      fontSize: moderateScale(16),
    },
    optionTextActive: {
      color: colors.background,
    },
    section: {
      marginBottom: moderateScale(24),
    },
    sectionTitle: {
      fontFamily: fontFamily.medium,
      fontSize: moderateScale(16),
      marginBottom: moderateScale(12),
      opacity: 0.8,
    },
    selectedFilterButton: {
      backgroundColor: colors.card,
      borderColor: colors.primary,
    },
    selectedFilterText: {
      color: colors.primary,
    },
    tabContain: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: vs(10),
    },
    tabWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: vs(10),
    },
    titleText: {
      fontFamily: fontFamily.medium,
      fontSize: moderateScale(18),
      includeFontPadding: false,
      marginTop: 0,
    },
  });
};

export default useRTLStyles;
