import {useMemo} from 'react';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {ThemeColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf, s, vs} from '@/styles/scaling';

interface StyleProps {
  container: ViewStyle;
  loadingText: TextStyle;
  logo: ImageStyle;
}

const useRTLStyles = (colors: ThemeColors) => {
  return useMemo(
    () =>
      StyleSheet.create<StyleProps>({
        container: {
          alignItems: 'center',
          backgroundColor: colors.background,
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: s(24),
          rowGap: vs(16),
        },
        loadingText: {
          color: colors.textSecondary,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
        },
        logo: {
          height: vs(120),
          width: s(200),
        },
      }),
    [colors]
  );
};

export default useRTLStyles;
