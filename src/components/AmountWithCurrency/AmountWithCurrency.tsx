import React, {memo, useMemo} from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';

import {CurrencyIcon} from '@/assets/icons';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import {Colors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf, vs} from '@/styles/scaling';

interface AmountWithCurrencyProps {
  amound?: number;
  style?: object;
  symbolStyle?: object;
  amountStyle?: object;
  isDiscountAmount?: boolean;
  gap?: number;
}

const AmountWithCurrency = ({
  amound = 0,
  style = {},
  symbolStyle = {},
  amountStyle = {},
  isDiscountAmount: _isDiscountAmount = false,
  gap,
}: AmountWithCurrencyProps) => {
  const {theme} = useTheme();
  const colors = Colors[theme];
  const isRTL = I18nManager.isRTL;

  const containerStyle = useMemo(
    () => ({
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: gap !== undefined ? gap : vs(7),
    }),
    [isRTL, gap]
  );

  return (
    <View style={[containerStyle, style]}>
      <CurrencyIcon
        height={vs(16)}
        style={[baseStyles.symbolStyle, symbolStyle]}
        width={vs(16) * (120 / 130)}
      />
      <TextComp
        isDynamic
        style={[baseStyles.amountStyle, {color: colors.text}, amountStyle]}
        text={Number(amound)?.toFixed(2)}
      />
    </View>
  );
};

export default memo(AmountWithCurrency);

const baseStyles = StyleSheet.create({
  amountStyle: {
    fontFamily: fontFamily.bold,
    fontSize: rf(16),
    includeFontPadding: false,
    textAlign: 'left',
  },
  symbolStyle: {
    aspectRatio: 120 / 130,
    height: vs(5),
  },
});
