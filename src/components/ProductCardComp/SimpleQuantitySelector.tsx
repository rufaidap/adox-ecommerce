import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import DeleteWhiteIcon from '@/assets/images/Delete_white.svg';
import TextComp from '@/components/TextComp';
import useIsRTL from '@/hooks/useIsRTL';
import {commonColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, scale} from '@/styles/scaling';

interface SimpleQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove?: () => void;
  inline?: boolean;
}

const SimpleQuantitySelector: React.FC<SimpleQuantitySelectorProps> = ({
  quantity: initialQuantity,
  onQuantityChange,
  onRemove,
  inline = false,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const isRTL = useIsRTL();

  // Sync local state with prop changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const containerStyle = [
    styles.container,
    inline && styles.containerInline,
    inline && (isRTL ? styles.containerInlineRtl : styles.containerInlineLtr),
    !inline && (isRTL ? styles.containerRtl : styles.containerLtr),
  ];

  const iconStyle = inline ? styles.iconTextInline : styles.iconText;
  const quantityStyle = inline
    ? styles.quantityTextInline
    : styles.quantityText;

  return (
    <View style={containerStyle}>
      {quantity === 1 ? (
        <TouchableOpacity
          onPress={handleRemove}
          activeOpacity={0.7}
          style={styles.button}>
          {inline ? (
            <TextComp isDynamic text="−" style={iconStyle} />
          ) : (
            <DeleteWhiteIcon width={ms(16)} height={ms(16)} />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleDecrease}
          activeOpacity={0.7}
          style={styles.button}>
          <TextComp isDynamic text="−" style={iconStyle} />
        </TouchableOpacity>
      )}

      <TextComp isDynamic text={quantity.toString()} style={quantityStyle} />

      <TouchableOpacity
        onPress={handleIncrease}
        activeOpacity={0.7}
        style={styles.button}>
        <TextComp isDynamic text="+" style={iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default SimpleQuantitySelector;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: ms(20),
  },
  container: {
    alignItems: 'center',
    backgroundColor: commonColors.primary,
    borderRadius: ms(8),
    bottom: scale(8),
    height: ms(35),
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    position: 'absolute',
    width: scale(99),
  },
  containerInline: {
    alignItems: 'center',
    backgroundColor: commonColors.background,
    borderColor: commonColors.secondary,
    borderRadius: ms(8),
    borderWidth: ms(1),
    height: ms(40),
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    position: 'relative',
    width: '100%',
  },
  containerInlineLtr: {
    flexDirection: 'row',
  },
  containerInlineRtl: {
    flexDirection: 'row-reverse',
  },
  containerLtr: {
    flexDirection: 'row',
    right: scale(5),
  },
  containerRtl: {
    flexDirection: 'row-reverse',
    left: scale(5),
  },
  iconText: {
    color: commonColors.white,
    fontFamily: fontFamily.regular,
    fontSize: rf(18),
    textAlign: 'center',
  },
  iconTextInline: {
    color: commonColors.secondary,
    fontFamily: fontFamily.regular,
    fontSize: rf(16),
    textAlign: 'center',
  },
  quantityText: {
    color: commonColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: rf(14),
    lineHeight: rf(20),
    textAlign: 'center',
  },
  quantityTextInline: {
    color: commonColors.secondary,
    fontFamily: fontFamily.semiBold,
    fontSize: rf(14),
    lineHeight: rf(20),
    textAlign: 'center',
  },
});
