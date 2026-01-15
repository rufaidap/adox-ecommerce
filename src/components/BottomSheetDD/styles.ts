import {StyleSheet} from 'react-native';

import {commonColors, ThemeType} from '@/styles/colors';
import {moderateScale} from '@/styles/scaling';

export default (isRTL: boolean, _theme: ThemeType) =>
  StyleSheet.create({
    bottomSheetInputContainer: {
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
    },
    containerStyle: {
      marginBottom: moderateScale(16),
    },
    contentContainer: {
      paddingBottom: moderateScale(16),
    },
    contentText: {
      color: commonColors.text,
      flex: 1,
      fontSize: moderateScale(16),
    },
    emptyStateContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: moderateScale(16),
    },
    emptyStateText: {
      color: commonColors.textSecondary,
      fontSize: moderateScale(16),
    },
    errorLabelStyle: {
      color: commonColors.error,
      fontSize: moderateScale(12),
      marginTop: moderateScale(4),
    },
    headerContainer: {
      borderBottomWidth: 1,
      borderColor: commonColors.border,
      padding: moderateScale(16),
    },
    headerText: {
      color: commonColors.text,
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    inputContainer: {
      alignItems: 'center',
      borderColor: commonColors.border,
      borderRadius: moderateScale(8),
      borderWidth: 1,
      flex: 1,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      paddingHorizontal: moderateScale(14),
    },
    inputLabelStyle: {
      color: commonColors.text,
      fontSize: moderateScale(14),
      marginBottom: moderateScale(8),
    },
    inputStyle: {
      flex: 1,
      fontSize: moderateScale(14),
      paddingVertical: moderateScale(14),
    },
    itemContainer: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: commonColors.border,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(16),
    },
    normalContainer: {
      borderBottomWidth: 1,
      borderColor: commonColors.border,
      borderRadius: 0,
    },
    searchInputContainer: {
      marginTop: moderateScale(12),
    },
  });
