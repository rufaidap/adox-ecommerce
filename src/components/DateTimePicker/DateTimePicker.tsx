/* eslint-disable react-native/no-unused-styles */
import {useState, FC, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {useTranslation} from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import {Colors, ThemeColors, ThemeType, commonColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf} from '@/styles/scaling';

interface DateTimePickerProps {
  value?: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  placeHolder?: string;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  onChooseDate: (date: Date) => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  error?: string;
}

const DateTimePicker: FC<DateTimePickerProps> = ({
  value: _value = '',
  label = '',
  icon: _icon = '',
  disabled = false,
  placeHolder = '',
  mode = 'date',
  minimumDate = new Date(),
  onChooseDate = () => {},
  containerStyle = {},
  style = {},
  error = '',
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();
  const {theme} = useTheme();
  const colors = Colors[theme];
  const styles = useStyles(theme, colors as ThemeColors);

  const showDatePicker = () => {
    setVisible(true);
  };

  const hideDatePicker = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onChooseDate(date);
    hideDatePicker();
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={showDatePicker}
      style={[{marginBottom: ms(15)}, containerStyle]}>
      {label ? <TextComp style={styles.labelStyle} text={label} /> : null}
      <View style={[styles.pickerContainer, style]}>
        <AntDesign name="calendar" color={colors.textSecondary} size={ms(18)} />

        <TextComp
          style={[
            styles.inputStyle,
            disabled && {color: commonColors.disabledText},
          ]}
          numberOfLines={1}
          text={placeHolder || t('SELECT_DATE')}
        />
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minimumDate}
        {...props}
      />
      {error ? <TextComp style={styles.errorLabelStyle} text={error} /> : null}
    </TouchableOpacity>
  );
};

const useStyles = (theme: ThemeType, colors: ThemeColors) => {
  return useMemo(
    () =>
      StyleSheet.create({
        errorLabelStyle: {
          color: colors.error,
          fontFamily: fontFamily.regular,
          fontSize: ms(10),
          includeFontPadding: false,
          marginTop: ms(5),
          textAlign: 'left',
        },
        inputStyle: {
          color: colors.textSecondary,
          flex: 1,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          includeFontPadding: false,
          marginLeft: ms(10),
          paddingVertical: ms(5),
        },
        labelStyle: {
          color: colors.text,
          fontFamily: fontFamily.medium,
          fontSize: rf(14),
          includeFontPadding: false,
          paddingBottom: ms(8),
          textAlign: 'left',
        },
        pickerContainer: {
          alignItems: 'center',
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: ms(12),
          borderWidth: ms(1),
          flexDirection: 'row',
          padding: ms(10),
        },
      }),
    [theme, colors]
  );
};

export default DateTimePicker;
