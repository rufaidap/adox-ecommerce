import React, {FC, ReactNode} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Text, StyleSheet, TextProps, StyleProp, TextStyle} from 'react-native';

import {useTranslation} from 'react-i18next';

import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {Colors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {rf} from '@/styles/scaling';

interface TextCompProps extends TextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  values?: Record<string, string | number>;
  isDynamic?: boolean;
}

const TextComp: FC<TextCompProps> = ({
  text,
  style,
  children,
  values,
  isDynamic = false,
  ...props
}) => {
  const {theme} = useTheme();
  const colors = Colors[theme];
  const isRTL = useIsRTL();
  const {t} = useTranslation();

  const styles = useRTLStyles(isRTL);

  // If no text, render children
  if (!text) {
    return (
      <Text style={[styles.text, {color: colors.text}, style]} {...props}>
        {children}
      </Text>
    );
  }

  // If dynamic, render text as-is (user-generated content)
  if (isDynamic) {
    return (
      <Text style={[styles.text, {color: colors.text}, style]} {...props}>
        {text}
      </Text>
    );
  }

  // Otherwise, treat text as translation key
  const translatedText = values ? t(text, values) : t(text);

  return (
    <Text style={[styles.text, {color: colors.text}, style]} {...props}>
      {translatedText}
    </Text>
  );
};

const useRTLStyles = (isRTL: boolean) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: fontFamily.regular,
      fontSize: rf(14),
      textAlign: isRTL ? 'right' : 'left',
    },
  });
  return styles;
};

export default React.memo(TextComp);
