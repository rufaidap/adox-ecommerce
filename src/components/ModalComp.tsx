/* eslint-disable react-native/no-unused-styles */
import React, {FC, ReactNode} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

import Modal, {type SupportedAnimation} from 'react-native-modal';

import {useTheme} from '@/context/ThemeContext';
import {Colors, ThemeType} from '@/styles/colors';
import {moderateScale} from '@/styles/scaling';

interface ModalCompProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
  animationIn?: SupportedAnimation;
  animationOut?: SupportedAnimation;
  backdropTransitionOutTiming?: number;
  animationInTiming?: number;
  animationOutTiming?: number;
}

const ModalComp: FC<ModalCompProps> = ({
  isVisible,
  onClose,
  children,
  containerStyle,
  backdropOpacity = 0.5,
  animationIn = 'slideInUp' as SupportedAnimation,
  animationOut = 'slideOutDown' as SupportedAnimation,
  backdropTransitionOutTiming = 300,
  animationInTiming = 300,
  animationOutTiming = 300,
}) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={backdropOpacity}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      useNativeDriver
      style={styles.modal}
      statusBarTranslucent>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.handle} />
        {children}
      </View>
    </Modal>
  );
};

const useStyles = (theme: ThemeType) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderTopLeftRadius: moderateScale(24),
      borderTopRightRadius: moderateScale(24),
      elevation: 5,
      minHeight: moderateScale(100),
      padding: moderateScale(20),
      paddingTop: moderateScale(12),
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    handle: {
      alignSelf: 'center',
      backgroundColor: colors.textSecondary,
      borderRadius: moderateScale(2),
      height: moderateScale(4),
      marginBottom: moderateScale(16),
      opacity: 0.3,
      width: moderateScale(40),
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
};

export default ModalComp;
