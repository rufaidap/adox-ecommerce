import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, commonColors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, verticalScale} from '@/styles/scaling';

const fs = rf;

const useRTLStyles = (isRTL: boolean, theme: ThemeType = 'light') => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        backButton: {
          marginBottom: ms(24),
        },
        backIcon: {
          height: ms(24),
          width: ms(24),
        },
        container: {
          backgroundColor: colors.background,
          flex: 1,
        },
        containerStyle: {
          borderColor: commonColors.border,
          borderRadius: ms(10),
          borderWidth: ms(1),
          padding: ms(15),
        },
        countryCodeContainer: {
          width: ms(110),
        },
        countryCodeDD: {
          width: '100%',
        },
        countryCodeInput: {
          paddingRight: ms(8),
        },
        errorText: {
          color: commonColors.error,
          fontFamily: fontFamily.regular,
          fontSize: fs(12),
          marginTop: ms(4),
        },
        formContainer: {
          gap: ms(12),
        },
        header: {
          marginBottom: verticalScale(16),
        },
        headerContainer: {
          marginBottom: ms(20),
          marginTop: ms(20),
        },
        headerSubtitle: {
          color: commonColors.gray300,
          fontFamily: fontFamily.regular,
          fontSize: fs(14),
        },
        headerTitle: {
          fontFamily: fontFamily.medium,
          fontSize: fs(20),
          marginBottom: ms(5),
          textTransform: 'uppercase',
        },
        inputGroup: {
          gap: ms(10),
        },
        inputStyle: {
          fontFamily: fontFamily.regular,
          fontSize: fs(15),
        },
        label: {
          fontFamily: fontFamily.medium,
          fontSize: fs(16),
        },
        loginContainer: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(6),
        },
        loginLink: {
          color: commonColors.secondary,
          fontFamily: fontFamily.semiBold,
          fontSize: fs(12),
          lineHeight: ms(17),
          textDecorationLine: 'underline',
        },
        loginText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.medium,
          fontSize: fs(12),
          lineHeight: ms(17),
        },
        phoneInput: {
          flex: 1,
        },
        phoneInputContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: ms(8),
        },
        photoUploadButton: {
          alignItems: 'center',
          backgroundColor: commonColors.secondary,
          borderRadius: ms(25),
          height: ms(50),
          justifyContent: 'center',
          width: ms(50),
        },

        photoUploadContainer: {
          // alignItems: 'center',
          backgroundColor: commonColors.background,
          borderColor: commonColors.border,
          borderRadius: ms(7),
          borderStyle: 'dashed',
          borderWidth: ms(2),
          justifyContent: 'center',
          minHeight: ms(150),
        },

        photoUploadPlaceholder: {
          alignItems: 'center',
          gap: ms(12),
          justifyContent: 'center',
        },
        photoUploadText: {
          color: commonColors.gray300,
          fontFamily: fontFamily.regular,
          fontSize: fs(15),
        },
        scrollView: {
          flex: 1,
          paddingHorizontal: ms(16),
        },
        submitButton: {
          marginTop: ms(10),
        },
        uploadedPhoto: {
          borderRadius: ms(7),
          height: ms(150),
          width: '100%',
        },
        tabContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          backgroundColor: commonColors.gray50,
          borderRadius: ms(8),
          padding: ms(4),
          marginBottom: ms(20),
        },
        tabButton: {
          flex: 1,
          paddingVertical: ms(10),
          alignItems: 'center',
          borderRadius: ms(6),
        },
        tabButtonActive: {
          backgroundColor: commonColors.white, // Or secondary color
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 2,
        },
        tabText: {
          fontFamily: fontFamily.medium,
          fontSize: fs(14),
          color: commonColors.gray500,
        },
        tabTextActive: {
          color: commonColors.primary,
          fontFamily: fontFamily.semiBold,
        },
      }),
    [isRTL, theme, colors]
  ); // Dependencies array includes all variables used in the styles
};

export default useRTLStyles;
