import React, {useMemo, useState} from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';

import {Controller, Control, FieldValues, Path} from 'react-hook-form';

import BottomSheetDD from '@/components/BottomSheetDD';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';
import {COUNTRIES} from '@/utils/countries';

import useRTLStyles from './styles';

interface PhoneInputWithCountryCodeProps<T extends FieldValues> {
  control?: Control<T>;
  name?: Path<T>;
  value?: string;
  onChangeText?: (text: string) => void;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  placeholder?: string;
  error?: string | boolean;
  touched?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  phoneInputStyle?: ViewStyle;

  disabled?: boolean;
  placeholderTextColor?: string;
}

function PhoneInputWithCountryCode<T extends FieldValues>({
  control,
  name,
  value,
  onChangeText,
  countryCode: externalCountryCode,
  onCountryCodeChange,
  placeholder = 'PHONE_NUMBER_PLACEHOLDER',
  error,
  touched,
  label,
  labelStyle,
  containerStyle,
  phoneInputStyle,

  disabled = false,
  placeholderTextColor,
}: PhoneInputWithCountryCodeProps<T>) {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const [internalCountryCode, setInternalCountryCode] = useState('+966');
  const countryCode = externalCountryCode ?? internalCountryCode;
  const setCountryCode = onCountryCodeChange ?? setInternalCountryCode;

  // Prepare country data for BottomSheetDD
  const countryData = useMemo(
    () =>
      COUNTRIES.map((country, index) => ({
        id: index,
        value: country.dial_code,
        label: `${country.flag} ${country.label} (${country.dial_code})`,
        displayLabel: `${country.flag} ${country.dial_code}`,
        name: country.label,
      })),
    []
  );

  const hasError = !!error && touched !== false;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <TextComp text={label} style={[styles.label, labelStyle]} />}
      <View style={[styles.phoneInputContainer, phoneInputStyle]}>
        <View style={styles.countryCodeContainer}>
          <BottomSheetDD
            data={countryData}
            value={countryCode}
            onChange={(selectedValue: string | number | (string | number)[]) =>
              setCountryCode(selectedValue as string)
            }
            placeholder="SELECT_COUNTRY"
            searchable={true}
            containerStyle={styles.countryCodeDD}
            inputContainer={styles.countryCodeInput}
            disabled={disabled}
          />
        </View>
        <View style={styles.phoneInput}>
          {control && name ? (
            <Controller
              control={control}
              name={name}
              render={({field: {onChange, value: fieldValue}}) => (
                <TextInputComp
                  placeholder={placeholder}
                  value={fieldValue}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  error={hasError}
                  touched={touched}
                  editable={!disabled}
                  placeholderTextColor={placeholderTextColor}
                />
              )}
            />
          ) : (
            <TextInputComp
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              keyboardType="phone-pad"
              error={hasError}
              touched={touched}
              editable={!disabled}
              placeholderTextColor={placeholderTextColor}
            />
          )}
        </View>
      </View>
      {error && typeof error === 'string' && (
        <TextComp text={error} style={styles.errorText} />
      )}
    </View>
  );
}

export default PhoneInputWithCountryCode;
