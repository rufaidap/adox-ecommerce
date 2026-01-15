import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, View, Switch} from 'react-native';

import {valibotResolver} from '@hookform/resolvers/valibot';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';
import {Controller, useForm} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import {boolean, minLength, nonEmpty, object, pipe, string} from 'valibot';

import {
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
} from '@/api/graphql/addresses/hooks';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
// import ImageComp from '@/components/ImageComp/ImageComp';
import PhoneInputWithCountryCode from '@/components/PhoneInputWithCountryCode';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import type {MainStackParamList} from '@/navigation/types';
import {Colors, commonColors, ThemeType} from '@/styles/colors';
import {validateGraphQlError} from '@/utils/validateGraphqlError';
import type {CustomError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';

type AddAddressRouteProp = RouteProp<MainStackParamList, 'AddAddress'>;

const addressSchema = object({
  name: pipe(string(), nonEmpty(t('PLEASE_ENTER_NAME'))),
  phoneNumber: pipe(
    string(),
    nonEmpty(t('PLEASE_ENTER_PHONE_NUMBER')),
    minLength(9, t('PHONE_NUMBER_INVALID'))
  ),
  city: pipe(string(), nonEmpty(t('PLEASE_ENTER_CITY'))),
  houseNo: pipe(string(), nonEmpty(t('PLEASE_ENTER_HOUSE_NO_BUILDING_NAME'))),
  zipcode: string(),
  roadName1: string(),
  label: string(),
  state: string(),
  country: string(),
  landmark: string(),
  deliveryInstructions: string(),
  isDefault: boolean(),
});

type AddressFormData = {
  name: string;
  phoneNumber: string;
  zipcode: string;
  city: string;
  houseNo: string;
  roadName1: string;
  label: string;
  state: string;
  country: string;
  landmark: string;
  deliveryInstructions: string;
  isDefault: boolean;
};

const AddAddress = observer(() => {
  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const styles = useRTLStyles(isRTL, theme as ThemeType);
  const navigation = useNavigation();
  const route = useRoute<AddAddressRouteProp>();

  const addressData = route.params?.addressData;
  const isEditMode = !!addressData;

  const [countryCode, setCountryCode] = useState('+966');

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<AddressFormData>({
    resolver: valibotResolver(addressSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      zipcode: '',
      city: '',
      houseNo: '',
      roadName1: '',
      label: '',
      state: '',
      country: '',
      landmark: '',
      deliveryInstructions: '',
      isDefault: false,
    },
  });

  const {createCustomerAddress, loading: createLoading} =
    useCreateCustomerAddress();
  const {updateCustomerAddress, loading: updateLoading} =
    useUpdateCustomerAddress();

  const loading = createLoading || updateLoading;

  // Pre-fill form when editing
  useEffect(() => {
    if (addressData) {
      setValue('name', addressData.contact_name || '');
      const phone = addressData.contact_phone || '';
      // Remove country code if present. Assuming country code is +966 for now as per previous logic
      // Ideally we should extract it properly.
      const phoneWithoutCode = phone.startsWith('+966')
        ? phone.substring(4)
        : phone;
      setValue('phoneNumber', phoneWithoutCode);
      setValue('zipcode', addressData.postal_code || '');
      setValue('city', addressData.city || '');
      setValue('houseNo', addressData.address_line1 || '');
      setValue('houseNo', addressData.address_line1 || '');
      setValue('roadName1', addressData.address_line2 || '');
      setValue('label', addressData.label || '');
      setValue('state', addressData.state || '');
      setValue('country', addressData.country || '');
      setValue('landmark', addressData.landmark || '');
      setValue('deliveryInstructions', addressData.delivery_instructions || '');
      setValue('isDefault', addressData.is_default || false);
    }
  }, [addressData, setValue]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      const fullPhoneNumber = `${countryCode}${data.phoneNumber.trim()}`;

      let response;

      if (isEditMode && addressData?.id) {
        // Update existing address
        const updateData = {
          id: addressData.id,
          contact_name: data.name.trim(),
          contact_phone: fullPhoneNumber,
          address_line1: data.houseNo.trim(),
          address_line2: data.roadName1.trim() || null,
          city: data.city.trim(),
          postal_code: data.zipcode.trim() || null,
          landmark: data.landmark.trim() || null,
          state: data.state.trim() || null,
          country: data.country.trim() || null,
          label: data.label.trim() || null,
          delivery_instructions: data.deliveryInstructions.trim() || null,
          is_default: data.isDefault,
        };

        response = await updateCustomerAddress({
          variables: {
            address: updateData,
          },
        });
      } else {
        // Create new address
        const createData = {
          contact_name: data.name.trim(),
          contact_phone: fullPhoneNumber,
          address_line1: data.houseNo.trim(),
          address_line2: data.roadName1.trim() || null,
          city: data.city.trim(),
          postal_code: data.zipcode.trim() || null,
          landmark: data.landmark.trim() || null,
          state: data.state.trim() || null,
          country: data.country.trim() || null,
          label: data.label.trim() || null,
          delivery_instructions: data.deliveryInstructions.trim() || null,
          is_default: data.isDefault,
        };

        response = await createCustomerAddress({
          variables: {
            address: createData,
          },
        });
      }

      if (response.errors && response.errors.length > 0) {
        const firstError = response.errors[0] as {
          message?: string;
          errors?: Record<string, {message?: string}>;
        };
        const errorKey = isEditMode
          ? 'FAILED_TO_UPDATE_ADDRESS'
          : 'FAILED_TO_CREATE_ADDRESS';
        let errorMessage = firstError.message || t(errorKey);
        let userFriendlyMessage = t(errorKey);

        if (firstError.errors && typeof firstError.errors === 'object') {
          const fieldErrors = Object.values(firstError.errors);
          if (fieldErrors.length > 0) {
            const firstFieldError = fieldErrors[0] as {message?: string};
            if (firstFieldError?.message) {
              errorMessage = firstFieldError.message;

              if (
                errorMessage.includes('Referenced customers does not exist') ||
                errorMessage.includes('Foreign key constraint') ||
                errorMessage.includes('customer_id')
              ) {
                userFriendlyMessage = t('CUSTOMER_NOT_FOUND_ERROR');
              } else if (errorMessage.includes('Foreign key constraint')) {
                userFriendlyMessage = t('FOREIGN_KEY_CONSTRAINT_ERROR');
              }
            }
          }
        }

        Alert.alert(t('ERROR'), userFriendlyMessage);
        return;
      }

      const hasSuccessData = isEditMode
        ? (response as any).data?.updateCustomerAddress
        : (response as any).data?.createCustomerAddress;

      if (hasSuccessData) {
        showMessage({
          type: 'success',
          message: t('SUCCESS'),
          description: isEditMode
            ? t('ADDRESS_UPDATED_SUCCESSFULLY')
            : t('ADDRESS_CREATED_SUCCESSFULLY'),
        });

        navigation.goBack();
      } else {
        Alert.alert(
          t('ERROR'),
          isEditMode
            ? t('FAILED_TO_UPDATE_ADDRESS')
            : t('FAILED_TO_CREATE_ADDRESS')
        );
      }
    } catch (error: unknown) {
      const errorData = validateGraphQlError(error as CustomError);
      const errorMessage =
        errorData?.message ||
        (error instanceof Error ? error.message : '') ||
        t('FAILED_TO_CREATE_ADDRESS');

      Alert.alert(t('ERROR'), errorMessage);
    }
  };

  return (
    <WrapperContainer>
      <HeaderComp
        showBack={true}
        title={isEditMode ? 'EDIT_ADDRESS' : 'ADD_ADDRESS'}
        customStyle={styles.headerStyle}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  placeholder="ENTER_NAME"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.name}
                  touched={!!errors.name}
                />
              )}
            />
          </View>

          {/* Phone Number Field */}
          <View style={styles.inputGroup}>
            <PhoneInputWithCountryCode
              control={control}
              name="phoneNumber"
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              placeholder="PHONE_NUMBER_PLACEHOLDER"
              error={errors.phoneNumber?.message}
              touched={!!errors.phoneNumber}
            />
          </View>

          {/* Zipcode and City - Side by Side */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Controller
                control={control}
                name="zipcode"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    placeholder="ENTER_ZIPCODE"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    error={!!errors.zipcode}
                    touched={!!errors.zipcode}
                  />
                )}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Controller
                control={control}
                name="city"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    placeholder="ENTER_CITY"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.city}
                    touched={!!errors.city}
                  />
                )}
              />
            </View>
          </View>

          {/* House No., Building Name */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="houseNo"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  placeholder="ENTER_HOUSE_NO_BUILDING_NAME"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.houseNo}
                  touched={!!errors.houseNo}
                />
              )}
            />
          </View>

          {/* Road name, Area - First Field */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="roadName1"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  placeholder="ENTER_ROAD_NAME_AREA"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.roadName1}
                  touched={!!errors.roadName1}
                />
              )}
            />
          </View>

          {/* Landmark */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="landmark"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  placeholder="ENTER_LANDMARK"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.landmark}
                  touched={!!errors.landmark}
                />
              )}
            />
          </View>

          {/* State and Country - Side by Side */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Controller
                control={control}
                name="state"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    placeholder="ENTER_STATE"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.state}
                    touched={!!errors.state}
                  />
                )}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Controller
                control={control}
                name="country"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    placeholder="ENTER_COUNTRY"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.country}
                    touched={!!errors.country}
                  />
                )}
              />
            </View>
          </View>

          {/* Label */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="label"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  placeholder="ADDRESS_LABEL_PLACEHOLDER"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.label}
                  touched={!!errors.label}
                />
              )}
            />
          </View>

          {/* Delivery Instructions */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="deliveryInstructions"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  placeholder="DELIVERY_INSTRUCTIONS_PLACEHOLDER"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.deliveryInstructions}
                  touched={!!errors.deliveryInstructions}
                  multiline
                  inputStyle={styles.textArea}
                />
              )}
            />
          </View>

          {/* Is Default Switch */}
          <View style={styles.switchContainer}>
            <TextComp
              text="SET_AS_DEFAULT_ADDRESS"
              style={styles.switchLabel}
            />
            <Controller
              control={control}
              name="isDefault"
              render={({field: {onChange, value}}) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{
                    false: commonColors.gray200,
                    true: Colors[theme].primary,
                  }}
                  thumbColor={commonColors.white}
                />
              )}
            />
          </View>

          {/* Use Current Location */}
          {/* <TouchableOpacity
            style={styles.locationButton}
            onPress={handleUseCurrentLocation}>
            <ImageComp source={gpsIcon} style={styles.gpsIcon} />
            <TextComp text="USE_CURRENT_LOCATION" style={styles.locationText} />
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Save Address Button */}
      <View style={styles.buttonContainer}>
        <ButtonComp
          title={t('SAVE_ADDRESS')}
          onPress={handleSubmit(onSubmit)}
          style={styles.saveButton}
          textStyle={styles.saveButtonText}
          loading={loading}
          disabled={loading}
        />
      </View>
    </WrapperContainer>
  );
});

export default AddAddress;
