import {memo, useCallback, useMemo, useRef, useState, FC} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {commonColors, ThemeType} from '@/styles/colors';
import {moderateScale} from '@/styles/scaling';

import TextComp from '../TextComp';
import TextInputComp from '../TextInputComp';
import useRTLStyles from './styles';

interface Item {
  id: string | number;
  value: string | number | null;
  label: string;
  name?: string;
  displayLabel?: string;
}

interface BottomSheetDDProps {
  inputType?: 'line' | 'normal';
  data: Item[];
  label?: string;
  loading?: boolean;
  placeholder?: string;
  value: string | number | (string | number)[] | null;
  onChange: (value: string | number | (string | number)[]) => void;
  selectedItem?: (item: string) => void;
  error?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  downArrow?: boolean;
  inputContainer?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
  curvedDesign?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  emptyTxt?: string;
  onEndReached?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const keyExtractor = (item: Item) => String(item?.id || item?.value);

const renderBackdrop = (renderProps: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...renderProps}
    disappearsOnIndex={-1}
    appearsOnIndex={1}
    opacity={0.5}
  />
);

const ITEM_HEIGHT = moderateScale(52);

const getItemLayout = (
  _: ArrayLike<Item> | null | undefined,
  index: number
) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const BottomSheetDD: FC<BottomSheetDDProps> = ({
  inputType = 'line',
  data = [],
  label = '',
  loading = false,
  placeholder = '',
  value = null,
  onChange = () => {},
  selectedItem = () => {},
  error = '',
  multiple = false,
  searchable = false,
  disabled = false,
  downArrow = true,
  inputContainer = {},
  inputStyle = {},
  leftAccessory = <View />,
  rightAccessory = <View />,
  curvedDesign = false,
  labelStyle,
  emptyTxt,
  onEndReached = () => {},
  containerStyle = {},
}) => {
  const [searchText, setSearchText] = useState('');

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {bottom, top} = useSafeAreaInsets();

  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const renderItem = useCallback(
    ({item}: {item: Item}) => {
      const handlePress = () => {
        if (!multiple) {
          onChange(item?.value || item?.id);
          if (selectedItem) {
            selectedItem(item?.label || item?.name || '');
          }
          bottomSheetRef.current?.close();
        } else {
          const currentValue = Array.isArray(value) ? value : [];
          const tmpValue = [...currentValue];
          if (tmpValue.includes(item?.value as string | number)) {
            const index = tmpValue.indexOf(item?.value as string | number);
            tmpValue.splice(index, 1);
          } else {
            tmpValue.push(item?.value as string | number);
          }
          onChange(tmpValue);
        }
      };

      const isSelected = multiple
        ? Array.isArray(value) && value.includes(item?.value as string | number)
        : item?.value === value;

      return (
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
          <TextComp
            adjustsFontSizeToFit
            style={styles.contentText}
            text={item?.label}
            isDynamic={true}
          />

          {isSelected && (
            <MaterialIcons
              name="check-circle"
              size={moderateScale(20)}
              color={commonColors.primary}
            />
          )}
        </TouchableOpacity>
      );
    },
    [
      value,
      onChange,
      multiple,
      selectedItem,
      styles.itemContainer,
      styles.contentText,
    ]
  );

  const selectedLabel = useMemo(() => {
    // Helper to translate placeholder if it's a translation key
    const translatePlaceholder = (text: string | undefined): string => {
      if (!text) return '';
      // Check if it looks like a translation key (uppercase with underscores)
      if (/^[A-Z_]+$/.test(text)) {
        return t(text);
      }
      return text;
    };

    if (multiple) {
      const arrayValue = Array.isArray(value) ? value : [];
      if (!arrayValue.length) {
        return translatePlaceholder(placeholder) || translatePlaceholder(label);
      }
      return data
        ?.filter(item => arrayValue.includes(item?.value as string | number))
        ?.map(item => item?.displayLabel || item?.label);
    }
    const foundItem = data?.find(item => item?.value === value);
    if (foundItem) {
      return foundItem?.displayLabel || foundItem?.label;
    }
    return translatePlaceholder(placeholder) || translatePlaceholder(label);
  }, [value, data, label, multiple, placeholder]);

  const filteredData = useMemo(() => {
    if (!searchText) {
      return data;
    }
    return data?.filter(item =>
      String(item?.label || '')
        .toLowerCase()
        .includes(String(searchText).toLowerCase())
    );
  }, [searchText, data]);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label ? (
        <TextComp style={[styles.inputLabelStyle, labelStyle]} text={label} />
      ) : null}
      <View style={styles.bottomSheetInputContainer}>
        <TouchableOpacity
          disabled={loading || disabled}
          style={[
            styles.inputContainer,
            inputContainer,
            error && {borderColor: commonColors.error},
            curvedDesign && {borderRadius: moderateScale(100)},
            inputType === 'normal' && styles.normalContainer,
          ]}
          onPress={() => {
            bottomSheetRef.current?.present();
          }}>
          {leftAccessory}
          <TextComp
            numberOfLines={1}
            style={[
              styles.inputStyle,
              inputStyle,
              {color: value ? commonColors.text : commonColors.textSecondary},
              curvedDesign && {paddingVertical: moderateScale(11)},
            ]}
            text={'' + selectedLabel}
            isDynamic={true}
          />

          {loading ? (
            <ActivityIndicator color={commonColors.secondary} />
          ) : (
            downArrow && (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={moderateScale(24)}
                color={commonColors.text}
              />
            )
          )}
        </TouchableOpacity>
        {rightAccessory}
      </View>

      {error ? <TextComp style={styles.errorLabelStyle} text={error} /> : null}
      <BottomSheetModal
        index={0}
        enablePanDownToClose
        enableOverDrag={false}
        handleIndicatorStyle={{backgroundColor: commonColors.secondary}}
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
        topInset={top + moderateScale(15)}>
        <BottomSheetFlatList
          showsVerticalScrollIndicator={true}
          getItemLayout={getItemLayout}
          contentContainerStyle={[
            styles.contentContainer,
            {paddingBottom: bottom || moderateScale(12)},
          ]}
          data={filteredData}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <TextComp
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.headerText}
                text={label || placeholder || 'CHOOSE_OPTION'}
              />

              {searchable && (
                <TextInputComp
                  value={searchText}
                  onChangeText={setSearchText}
                  containerStyle={styles.searchInputContainer}
                  placeholder={t('SEARCH')}
                />
              )}
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              {loading ? (
                <ActivityIndicator color={commonColors.primary} />
              ) : (
                <TextComp
                  style={styles.emptyStateText}
                  text={emptyTxt || 'Nothing to show'}
                />
              )}
            </View>
          }
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onEndReached}
        />
      </BottomSheetModal>
    </View>
  );
};

export default memo(BottomSheetDD);
