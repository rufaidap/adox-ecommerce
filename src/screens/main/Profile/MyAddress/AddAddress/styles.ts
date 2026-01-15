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
        buttonContainer: {
          backgroundColor: colors.background,
          bottom: 0,
          left: 0,
          paddingBottom: verticalScale(20),
          paddingHorizontal: scale(16),
          paddingTop: verticalScale(12),
          position: 'absolute',
          right: 0,
        },
        countryCodeContainer: {
          alignItems: 'center',
          backgroundColor: colors.inputBackground,
          borderColor: colors.inputBorder,
          borderRadius: ms(7),
          borderWidth: ms(1),
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(8),
          justifyContent: 'center',
          minWidth: scale(80),
          paddingHorizontal: scale(12),
          paddingVertical: verticalScale(12),
        },
        countryCodeText: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
        },
        formContainer: {
          gap: verticalScale(16),
          paddingHorizontal: scale(16),
          paddingTop: verticalScale(16),
        },
        gpsIcon: {
          height: ms(20),
          width: ms(20),
        },
        halfWidth: {
          flex: 1,
        },
        headerStyle: {
          justifyContent: 'flex-start',
          paddingTop: ms(1),
        },
        inputGroup: {
          width: '100%',
        },
        locationButton: {
          alignItems: 'center',
          backgroundColor: colors.inputBackground,
          borderColor: colors.inputBorder,
          borderRadius: ms(7),
          borderWidth: ms(1),
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(8),
          padding: ms(12),
        },
        locationText: {
          color: commonColors.secondary,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
        },
        phoneInput: {
          flex: 1,
        },
        phoneInputContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(8),
        },
        rowContainer: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          gap: scale(12),
        },
        saveButton: {
          backgroundColor: commonColors.primary,
          borderRadius: ms(18),
          height: verticalScale(50),
        },
        saveButtonText: {
          color: commonColors.white,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(16),
        },
        scrollViewContent: {
          flexGrow: 1,
          paddingBottom: verticalScale(100),
        },
        switchContainer: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: verticalScale(8),
        },
        switchLabel: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
        },
        textArea: {
          height: ms(80),
          textAlignVertical: 'top',
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
