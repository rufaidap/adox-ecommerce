import React, {useRef, useState, memo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';
import CalendarPicker from 'react-native-calendar-picker';
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from '@/context/ThemeContext';
import {Colors, ThemeColors} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {vs} from '@/styles/scaling';

import ButtonComp from '../ButtonComp';
import CustomBottomSheet, {CustomBottomSheetRef} from '../CustomBottomSheet';
import TextComp from '../TextComp';
import useStyles from './styles';

interface CalendarRangePickerProps {
  onApply: (dates: {
    selectedStartDate: string;
    selectedEndDate: string;
  }) => void;
  selectedStartDate: string;
  selectedEndDate: string;
}

const CalendarRangePicker: React.FC<CalendarRangePickerProps> = props => {
  const {
    onApply,
    selectedStartDate: initialSatrtDate = '',
    selectedEndDate: initialEndDate = '',
  } = props || {};

  const {t} = useTranslation();
  const {theme} = useTheme();
  const colors = Colors[theme];
  const styles = useStyles(theme, colors as ThemeColors);

  // Convert initial string dates to Date objects for internal state
  const getInitialStartDate = (): Date | null => {
    if (!initialSatrtDate) return null;
    try {
      const date = new Date(initialSatrtDate);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const getInitialEndDate = (): Date | null => {
    if (!initialEndDate) return null;
    try {
      const date = new Date(initialEndDate);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    getInitialStartDate()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    getInitialEndDate()
  );
  const minDate = React.useMemo(() => new Date(), []);

  const bottomSheetRef = useRef<CustomBottomSheetRef>(null);

  // Calculate total days only if both dates are selected
  const totalDays = React.useMemo(() => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    try {
      const diffTime = selectedEndDate.getTime() - selectedStartDate.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch (error) {
      return 0;
    }
  }, [selectedStartDate, selectedEndDate]);

  const onDateChange = (date: Date | null, type: 'START_DATE' | 'END_DATE') => {
    if (!date) return;

    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset end date when start date changes
    }
  };

  const handleApply = () => {
    const startDateStr = selectedStartDate?.toISOString() || '';
    const endDateStr = selectedEndDate?.toISOString() || '';
    onApply({selectedStartDate: startDateStr, selectedEndDate: endDateStr});
    bottomSheetRef.current?.close();
  };

  const onReset = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    onApply({selectedStartDate: '', selectedEndDate: ''});
    bottomSheetRef.current?.close();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
        style={[
          styles.filterButton,
          selectedStartDate || selectedEndDate
            ? styles.selectedFilterButton
            : undefined,
        ]}>
        <TextComp
          style={[
            styles.filterText,
            selectedStartDate || selectedEndDate
              ? styles.selectedFilterText
              : undefined,
          ]}
          text="SELECT_DATE_RANGE"
        />
        <Feather
          name="chevron-down"
          size={vs(15)}
          color={
            selectedStartDate || selectedEndDate
              ? colors.primary
              : colors.textSecondary
          }
        />
      </TouchableOpacity>
      <CustomBottomSheet ref={bottomSheetRef} title={t('SELECT_DATE_RANGE')}>
        <View style={styles.calendarTxtContainer}>
          <View style={styles.calendarIconContainer}>
            {/* <Image
              resizeMode="contain"
              style={{height: vs(20), width: vs(20)}}
              source={require('@/assets/images/icons/calendar.png')}
            /> */}
          </View>
          <TextComp
            isDynamic
            text={
              selectedStartDate && selectedEndDate
                ? `${format(selectedStartDate, 'MMM dd, yyyy')} - ${format(
                    selectedEndDate,
                    'MMM dd, yyyy'
                  )}`
                : t('SELECT_DATE_RANGE_PLACEHOLDER')
            }
            style={[
              styles.inputStyle,
              selectedStartDate && selectedEndDate
                ? {
                    color: colors.text,
                    fontFamily:
                      fontFamily?.semiBold || fontFamily?.regular || 'System',
                  }
                : undefined,
            ]}
          />
          {selectedStartDate && selectedEndDate && totalDays > 0 && (
            <TextComp
              isDynamic
              text={`${totalDays} ${totalDays === 1 ? t('DAY') : t('DAYS')}`}
              style={styles.dayCount}
            />
          )}
        </View>
        <View style={styles.container}>
          <CalendarPicker
            allowRangeSelection={true}
            minDate={minDate}
            selectedDayColor={colors.primary}
            selectedDayTextColor={colors.surface}
            todayBackgroundColor={colors.secondary}
            onDateChange={onDateChange}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            headerWrapperStyle={styles.headerWrapper}
            dayLabelsWrapper={styles.dayLabelsWrapper}
            textStyle={styles.textStyle}
            monthTitleStyle={styles.monthTitleStyle}
            yearTitleStyle={styles.yearTitleStyle}
          />
        </View>
        <View style={styles.bottomContain}>
          <TouchableOpacity onPress={onReset} style={styles.skipButton}>
            <TextComp text="CLEAR" style={styles.clearText} />
          </TouchableOpacity>
          <View style={styles.applyButtonContainer}>
            <ButtonComp
              onPress={handleApply}
              title={t('APPLY')}
              style={styles.applyButton}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default memo(CalendarRangePicker);
