import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Colors, ThemeType} from '@/styles/colors';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background,
          flex: 1,
        },
      }),
    [isRTL, theme, colors]
  );
};

export default useRTLStyles;
