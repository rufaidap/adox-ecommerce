import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {useMutation} from '@apollo/client';
import {valibotResolver} from '@hookform/resolvers/valibot';
import auth from '@react-native-firebase/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';
import {Controller, useForm} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {email, minLength, nonEmpty, object, pipe, string} from 'valibot';

import {REGISTER_CUSTOMER} from '@/api/graphql/auth/mutations';
import {PlusIcon} from '@/assets/icons';
import {ImageComp} from '@/components';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import PhoneInputWithCountryCode from '@/components/PhoneInputWithCountryCode';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {AuthStackParamList} from '@/navigation/types';
import authStore from '@/stores/authStore';
import {commonColors} from '@/styles/colors';
import {COUNTRIES} from '@/utils/countries';
import {uploadSingleFile} from '@/utils/uploadSingleFile';
import {CustomError, validateGraphQlError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';

// Valibot schema for form validation
const baseSchema = {
  shopName: pipe(string(), nonEmpty(t('PLEASE_ENTER_SHOP_NAME'))),
  ownerName: pipe(string(), nonEmpty(t('PLEASE_ENTER_OWNER_NAME'))),
  email: pipe(
    string(),
    nonEmpty(t('PLEASE_ENTER_EMAIL')),
    email(t('INVALID_EMAIL_ADDRESS'))
  ),
  whatsappNumber: pipe(
    string(),
    nonEmpty(t('PLEASE_ENTER_WHATSAPP_NUMBER')),
    minLength(9, t('WHATSAPP_NUMBER_INVALID'))
  ),
  secondaryNumber: string(),
  vatNumber: string(),
  crNumber: string(),
  baladiyaNumber: string(),
};

type SignupFormData = {
  shopName: string;
  ownerName: string;
  email: string;
  whatsappNumber: string;
  secondaryNumber: string;
  vatNumber: string;
  crNumber: string;
  baladiyaNumber: string;
};

const defaultValues: SignupFormData = {
  shopName: '',
  ownerName: '',
  email: '',
  whatsappNumber: '',
  secondaryNumber: '',
  vatNumber: '',
  crNumber: '',
  baladiyaNumber: '',
};

// create a component
const Signup = observer(() => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as 'light' | 'dark');
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const route = useRoute();
  const params = route?.params;

  const [shopBoardPhoto, setShopBoardPhoto] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [countryCode, setCountryCode] = useState('+966');
  const [secondaryCountryCode, setSecondaryCountryCode] = useState('+966');

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<SignupFormData>({
    resolver: valibotResolver(object(baseSchema)),
    defaultValues,
  });

  useEffect(() => {
    if (params?.phoneNumber) {
      const phoneNumber = params.phoneNumber;

      // Sort countries by dial code length (longest first) to match longer codes first
      const sortedCountries = [...COUNTRIES].sort(
        (a, b) => b.dial_code.length - a.dial_code.length
      );

      // Try to find a matching country code at the start of the phone number
      const matchedCountry = sortedCountries.find(country =>
        phoneNumber.startsWith(country.dial_code)
      );

      if (matchedCountry) {
        // Split the phone number: extract country code and actual number
        const extractedCountryCode = matchedCountry.dial_code;
        const actualNumber = phoneNumber.substring(extractedCountryCode.length);

        setSecondaryCountryCode(extractedCountryCode);
        setValue('secondaryNumber', actualNumber);
      } else {
        // If no match found, use the params as is (fallback to original behavior)
        if (params.countryCode) {
          setSecondaryCountryCode(params.countryCode);
        }
        setValue('secondaryNumber', phoneNumber);
      }
    }
  }, [params, setValue]);

  const [registerCustomer, {loading: isSubmittingForm}] =
    useMutation(REGISTER_CUSTOMER);

  const handleImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        Alert.alert(t('ERROR'), response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setUploadingPhoto(true);
        setShopBoardPhoto(asset.uri || null);

        try {
          const file = {
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || `photo_${Date.now()}.jpg`,
          };

          const uploadResult = await uploadSingleFile(file);
          if (uploadResult.uploaded && uploadResult.uploaded_url) {
            setShopBoardPhoto(uploadResult.uploaded_url);
            showMessage({
              type: 'success',
              message: t('SUCCESS'),
              description: t('PHOTO_UPLOADED_SUCCESSFULLY'),
            });
          } else if (uploadResult.file?.uri) {
            setShopBoardPhoto(uploadResult.file.uri);
          } else {
            Alert.alert(t('ERROR'), t('FAILED_TO_UPLOAD_PHOTO'));
            setShopBoardPhoto(null);
          }
        } catch (error) {
          Alert.alert(t('ERROR'), t('FAILED_TO_UPLOAD_PHOTO'));
          setShopBoardPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    });
  };

  const onSubmit = async (data: SignupFormData) => {
    if (!shopBoardPhoto) {
      Alert.alert(t('ERROR'), t('PLEASE_UPLOAD_SHOP_BOARD_PHOTO'));
      return;
    }

    authStore.setLoading(true);
    authStore.setError(null);

    try {
      const cleanWhatsappNumber = data.whatsappNumber.replace(/^\+/, '').trim();
      const whatsappNumberWithCode = countryCode + cleanWhatsappNumber;

      const cleanSecondaryNumber = data.secondaryNumber
        ? data.secondaryNumber.replace(/^\+/, '').trim()
        : '';
      const secondaryNumberWithCode = data.secondaryNumber
        ? secondaryCountryCode + cleanSecondaryNumber
        : undefined;

      const currentUser = auth().currentUser;
      const firebaseId = currentUser?.uid || undefined;

      const payload = {
        customer: {
          shop_name: data.shopName,
          owner_name: data.ownerName,
          email: data.email,
          whatsapp_number: whatsappNumberWithCode,
          secondary_number: secondaryNumberWithCode,
          shop_board_photo: shopBoardPhoto,
          vat_no: data.vatNumber || undefined,
          cr_no: data.crNumber || undefined,
          baladiya_no: data.baladiyaNumber || undefined,
          firebase_id: firebaseId,
        },
      };

      const response = await registerCustomer({
        variables: payload,
      });

      if (response.data?.registerCustomer) {
        // After successful registration, navigate to PhoneLogin page with admin approval message
        // Every user needs to be verified by admin before they can access the app
        navigation.navigate('PhoneLogin', {
          errorMessage: t('ACCOUNT_PENDING_ADMIN_APPROVAL'),
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: unknown) {
      const errorData = validateGraphQlError(error as CustomError);

      authStore.setLoading(false);

      // Set field-specific errors if available
      if (errorData) {
        Object.keys(defaultValues).forEach(key => {
          if (errorData[key]) {
            setError(key as keyof SignupFormData, {
              type: 'manual',
              message: errorData[key],
            });
          }
        });
      }

      const errorMessage =
        errorData?.message ||
        (error as {message?: string})?.message ||
        t('FAILED_TO_CREATE_ACCOUNT');
      authStore.setError(errorMessage);
      Alert.alert(t('SIGNUP_FAILED'), errorMessage);
    }
  };

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp showBack />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.headerContainer}>
            <TextComp text="CREATE_GROCERY_STORES" style={styles.headerTitle} />
            <TextComp
              text="ENTER_YOUR_INFORMATION_BELOW"
              style={styles.headerSubtitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <PhoneInputWithCountryCode
              control={control}
              name="secondaryNumber"
              countryCode={secondaryCountryCode}
              onCountryCodeChange={setSecondaryCountryCode}
              placeholder="SECONDARY_NUMBER_PLACEHOLDER"
              placeholderTextColor={commonColors.gray300}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="shopName"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    containerStyle={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="SHOP_NAME_PLACEHOLDER"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.shopName}
                    touched={!!errors.shopName}
                    placeholderTextColor={commonColors.gray300}
                  />
                )}
              />
              {errors.shopName && (
                <TextComp
                  text={errors.shopName.message || ''}
                  style={styles.errorText}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="ownerName"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    containerStyle={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="OWNER_NAME_PLACEHOLDER"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.ownerName}
                    touched={!!errors.ownerName}
                    placeholderTextColor={commonColors.gray300}
                  />
                )}
              />
              {errors.ownerName && (
                <TextComp
                  text={errors.ownerName.message || ''}
                  style={styles.errorText}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    containerStyle={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="YOUR_EMAIL"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={!!errors.email}
                    touched={!!errors.email}
                    placeholderTextColor={commonColors.gray300}
                  />
                )}
              />
              {errors.email && (
                <TextComp
                  text={errors.email.message || ''}
                  style={styles.errorText}
                />
              )}
            </View>

            <PhoneInputWithCountryCode
              control={control}
              name="whatsappNumber"
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              placeholder="WHATSAPP_NUMBER_PLACEHOLDER"
              error={errors.whatsappNumber?.message || !!errors.whatsappNumber}
              touched={!!errors.whatsappNumber}
              placeholderTextColor={commonColors.gray300}
            />

            <Controller
              control={control}
              name="vatNumber"
              render={({field: {onChange, value}}) => (
                <TextInputComp
                  containerStyle={styles.containerStyle}
                  inputStyle={styles.inputStyle}
                  placeholder="VAT_NUMBER_PLACEHOLDER"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="default"
                  placeholderTextColor={commonColors.gray300}
                />
              )}
            />

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="crNumber"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    containerStyle={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="CR_NUMBER_PLACEHOLDER"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                    placeholderTextColor={commonColors.gray300}
                  />
                )}
              />
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="baladiyaNumber"
                render={({field: {onChange, value}}) => (
                  <TextInputComp
                    containerStyle={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="BALADIYA_NUMBER_PLACEHOLDER"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                    placeholderTextColor={commonColors.gray300}
                  />
                )}
              />
            </View>

            <View style={styles.inputGroup}>
              <TouchableOpacity
                style={styles.photoUploadContainer}
                onPress={handleImagePicker}
                disabled={uploadingPhoto}>
                {shopBoardPhoto ? (
                  <ImageComp
                    source={{uri: shopBoardPhoto}}
                    style={styles.uploadedPhoto}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.photoUploadPlaceholder}>
                    <View style={styles.photoUploadButton}>
                      <PlusIcon />
                    </View>
                    <TextComp
                      text="SHOP_BOARD_PHOTO_HINT"
                      style={styles.photoUploadText}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <ButtonComp
              title="SIGN_UP"
              onPress={handleSubmit(onSubmit)}
              loading={authStore.loading || uploadingPhoto || isSubmittingForm}
              disabled={authStore.loading || uploadingPhoto || isSubmittingForm}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
});

export default Signup;
