import React, {FC, ReactNode, memo} from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {Colors, commonColors, ThemeColors} from '@/styles/colors';
import {HIT_SLOP} from '@/utils';

import TextComp from '../TextComp';
import useRTLStyles from './styles';

interface ButtonCompProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  variant?: 'primary' | 'secondary' | 'outline';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconSize?: number;
  loading?: boolean;
}

const ButtonComp: FC<ButtonCompProps> = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  width = '100%',
  height = 48,
  variant = 'primary',
  leftIcon,
  rightIcon,
  iconSize = 24,
  loading = false,
}) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const colors = Colors[theme] as ThemeColors;
  const styles = useRTLStyles(isRTL, colors);

  const buttonStyles = [
    styles.button,
    {width, height} as ViewStyle,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'outline' && styles.buttonOutline,
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'secondary' && styles.textSecondary,
    variant === 'outline' && styles.textOutline,
    disabled && styles.textDisabled,
    textStyle,
  ];

  const iconContainerStyle = [
    styles.iconContainer,
    {width: iconSize, height: iconSize},
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={0.8}
      hitSlop={HIT_SLOP}>
      {leftIcon && <View style={iconContainerStyle}>{leftIcon}</View>}
      {loading ? (
        <ActivityIndicator color={commonColors.card} />
      ) : (
        <TextComp style={textStyles} text={title} />
      )}

      {rightIcon && <View style={iconContainerStyle}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default memo(ButtonComp);
