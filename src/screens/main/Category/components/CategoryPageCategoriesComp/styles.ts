import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, ThemeType} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf, scale, verticalScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        categoriesList: {
          gap: scale(16),
          paddingHorizontal: scale(16),
        },
        categoryColumn: {
          gap: verticalScale(16),
        },
        categoryImage: {
          height: '100%',
          width: '100%',
        },
        categoryImageContainer: {
          aspectRatio: 1,
          backgroundColor: colors.surface,
          borderRadius: scale(16),
          borderWidth: 0,
          justifyContent: 'center',
          marginBottom: verticalScale(8),
          overflow: 'hidden',
          padding: scale(8),
          width: '100%',
        },
        categoryImageContainerSelected: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        categoryItem: {
          alignItems: 'center',
          width: '100%',
        },
        categoryItemSelected: {
          opacity: 1,
        },
        categoryName: {
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          fontSize: rf(10),
          textAlign: 'center',
        },
        categoryNameSelected: {
          color: colors.primary,
        },
        categoryPlaceholder: {
          backgroundColor: colors.inputBorder,
          height: '100%',
          width: '100%',
        },
        container: {
          marginVertical: verticalScale(16),
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
