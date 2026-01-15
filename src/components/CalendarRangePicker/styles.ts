import {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';

import {ThemeColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, vs} from '@/styles/scaling';

const useStyles = (theme: ThemeType, colors: ThemeColors) => {
  return useMemo(
    () =>
      StyleSheet.create({
        applyButton: {
          borderRadius: vs(8),
        },
        applyButtonContainer: {
          flex: 0.49,
        },
        bottomContain: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        calendarIconContainer: {
          marginRight: ms(10),
        },
        calendarTxtContainer: {
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: vs(10),
          borderWidth: vs(1),
          flexDirection: 'row',
          marginBottom: ms(10),
          paddingHorizontal: vs(10),
          paddingVertical: Platform.OS === 'ios' ? vs(1) : vs(8),
        },
        clearText: {
          color: colors.text,
        },
        container: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: ms(10),
          borderWidth: vs(1),
          marginBottom: ms(10),
          paddingBottom: vs(15),
        },
        dayCount: {
          color: colors.text,
          fontFamily: fontFamily?.semiBold || fontFamily?.regular || 'System',
          fontSize: vs(15),
          includeFontPadding: false,
        },
        dayLabelsWrapper: {
          borderBottomWidth: 0,
          borderTopWidth: 0,
        },
        filterButton: {
          alignItems: 'center',
          borderColor: colors.border,
          borderRadius: vs(20),
          borderWidth: vs(1),
          flexDirection: 'row',
          gap: vs(5),
          paddingHorizontal: vs(9),
          paddingVertical: vs(5),
        },
        filterText: {
          color: colors.textSecondary,
          fontFamily: fontFamily?.semiBold || fontFamily?.regular || 'System',
          fontSize: vs(12),
        },
        headerWrapper: {
          padding: ms(10),
        },
        inputStyle: {
          color: colors.textSecondary,
          flex: 1,
          fontFamily: fontFamily?.regular || 'System',
          fontSize: vs(15),
          includeFontPadding: false,
        },
        monthTitleStyle: {
          color: colors.text,
          fontFamily: fontFamily?.bold || fontFamily?.regular || 'System',
          fontSize: vs(16),
          includeFontPadding: false,
        },
        selectedFilterButton: {
          backgroundColor: colors.surface,
          borderColor: colors.primary,
        },
        selectedFilterText: {
          color: colors.primary,
        },
        skipButton: {
          alignItems: 'center',
          borderColor: colors.primary,
          borderRadius: vs(8),
          borderWidth: 0.7,
          flex: 0.49,
          paddingVertical: vs(8),
        },
        textStyle: {
          color: colors.text,
          fontFamily: fontFamily?.regular || 'System',
          fontSize: vs(15),
          includeFontPadding: false,
        },
        yearTitleStyle: {
          color: colors.text,
          fontFamily: fontFamily?.bold || fontFamily?.regular || 'System',
          fontSize: vs(16),
          includeFontPadding: false,
        },
      }),
    [theme, colors]
  );
};

export default useStyles;
