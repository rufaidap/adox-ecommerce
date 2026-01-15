import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, ThemeType} from '@/styles/colors';
import {moderateScale} from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        contentContainerStyle: {
          flexGrow: 1,
          padding: moderateScale(15),
        },
        infoRow: {
          alignItems: 'center',
          backgroundColor: colors.background,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: moderateScale(4),
        },
      }),
    [isRTL, colors]
  );
};

export type MyFlatListStyles = ReturnType<typeof useRTLStyles>;

export default useRTLStyles;
