/* eslint-disable react-native/no-unused-styles */
import React, {useState, useEffect, useMemo} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';

import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import {
  Product,
  ProductAttribute,
  ProductAttributeOption,
  ProductVariation,
} from '@/models/Product';
import {Colors, commonColors, ThemeType, ThemeColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {moderateScale} from '@/styles/scaling';

interface VariationSelectorProps {
  product: Product;
  onVariationChange: (
    variation: ProductVariation | null,
    attributes: Record<string, string>
  ) => void;
  onValidationChange: (isValid: boolean) => void;
}

const VariationSelector: React.FC<VariationSelectorProps> = ({
  product,
  onVariationChange,
  onValidationChange,
}) => {
  const {theme} = useTheme();
  const colors = Colors[theme];
  const styles = useStyles(theme, colors as ThemeColors);

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  // Find matching variation based on selected attributes
  const selectedVariation = useMemo(() => {
    if (!product.variations || product.variations.length === 0) {
      return null;
    }

    return (
      product.variations.find(variation => {
        const variationAttrs = variation.attributes;
        const selectedKeys = Object.keys(selectedAttributes);
        const variationKeys = Object.keys(variationAttrs);

        if (selectedKeys.length !== variationKeys.length) {
          return false;
        }

        return selectedKeys.every(
          key => variationAttrs[key] === selectedAttributes[key]
        );
      }) || null
    );
  }, [selectedAttributes, product.variations]);

  // Validate if all required attributes are selected
  useEffect(() => {
    if (!product.attributes || product.attributes.length === 0) {
      onValidationChange(true);
      return;
    }

    const requiredAttributes = product.attributes.filter(attr => attr.required);
    const allRequiredSelected = requiredAttributes.every(
      attr => selectedAttributes[attr.id]
    );

    onValidationChange(allRequiredSelected);
  }, [selectedAttributes, product.attributes, onValidationChange]);

  // Notify parent of variation change
  useEffect(() => {
    onVariationChange(selectedVariation, selectedAttributes);
  }, [selectedVariation, selectedAttributes, onVariationChange]);

  const handleAttributeOptionSelect = (
    attributeId: string,
    optionId: string
  ) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: optionId,
    }));
  };

  const isOptionSelected = (attributeId: string, optionId: string) => {
    return selectedAttributes[attributeId] === optionId;
  };

  const getOptionStyle = (attributeId: string, optionId: string) => {
    const isSelected = isOptionSelected(attributeId, optionId);
    return [styles.option, isSelected && styles.selectedOption];
  };

  const getOptionTextStyle = (attributeId: string, optionId: string) => {
    const isSelected = isOptionSelected(attributeId, optionId);
    return [styles.optionText, isSelected && styles.selectedOptionText];
  };

  if (!product.attributes || product.attributes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {product.attributes.map((attribute: ProductAttribute) => (
        <View key={attribute.id} style={styles.attributeContainer}>
          <TextComp
            isDynamic
            text={`${attribute.name}${attribute.required ? ' *' : ''}`}
            style={styles.label}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.optionsContainer}>
            {attribute.options
              .filter((option: ProductAttributeOption) => option.available)
              .map((option: ProductAttributeOption) => (
                <TouchableOpacity
                  key={option.id}
                  style={getOptionStyle(attribute.id, option.id)}
                  onPress={() =>
                    handleAttributeOptionSelect(attribute.id, option.id)
                  }>
                  <TextComp
                    isDynamic
                    text={option.displayName}
                    style={getOptionTextStyle(attribute.id, option.id)}
                  />
                  {option.priceModifier && option.priceModifier > 0 && (
                    <TextComp
                      isDynamic
                      text={` (+₹${option.priceModifier})`}
                      style={styles.priceModifier}
                    />
                  )}
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

const useStyles = (theme: ThemeType, colors: typeof Colors.light) => {
  return StyleSheet.create({
    attributeContainer: {
      marginBottom: moderateScale(20),
    },
    container: {
      marginVertical: moderateScale(16),
    },
    label: {
      color: colors.text,
      fontFamily: fontFamily.bold,
      fontSize: moderateScale(16),
      marginBottom: moderateScale(8),
    },
    option: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: moderateScale(8),
      borderWidth: 1,
      marginBottom: moderateScale(8),
      marginRight: moderateScale(10),
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(8),
    },
    optionText: {
      color: colors.text,
      fontFamily: fontFamily.medium,
      fontSize: moderateScale(14),
    },
    optionsContainer: {
      flexDirection: 'row',
      paddingVertical: moderateScale(4),
    },
    priceModifier: {
      color: colors.textSecondary,
      fontFamily: fontFamily.regular,
      fontSize: moderateScale(12),
    },
    selectedOption: {
      backgroundColor: commonColors.primary,
      borderColor: commonColors.primary,
    },
    selectedOptionText: {
      color: commonColors.white,
    },
  });
};

export default VariationSelector;
