import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react-lite';
import {showMessage} from 'react-native-flash-message';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import {CUSTOMER_CHECK} from '@/api/graphql/auth/queries';
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
import * as RootNavigation from '@/utils/RootNavigation';
import {validateGraphQlError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';

type PhoneLoginProps = NativeStackScreenProps<AuthStackParamList, 'PhoneLogin'>;

const PhoneLogin = observer(({route}: PhoneLoginProps) => {
  const isRTL: boolean = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as 'light' | 'dark');
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [countryCode, setCountryCode] = useState(__DEV__ ? '+91' : '+974');
  const [loader, setLoader] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [routeErrorMessage, setRouteErrorMessage] = useState<string>('');
  const [devFirebaseId, setDevFirebaseId] = useState('');
  const [devLoader, setDevLoader] = useState(false);

  useEffect(() => {
    // Store error message from route params to display above phone input
    const errorMessage = route?.params?.errorMessage;
    if (errorMessage) {
      setRouteErrorMessage(errorMessage);
      // Also show as flash message
      showMessage({
        type: 'warning',
        message: t('ERROR'),
        description: errorMessage,
        duration: 5000,
      });
    }
  }, [route?.params?.errorMessage]);

  useEffect(() => {
    // Debug: Check if __DEV__ is true
    // eslint-disable-next-line no-console
    console.log('PhoneLogin - __DEV__:', __DEV__);
  }, []);

  const getFirebaseErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as {code: string; message?: string};
      const errorCode = firebaseError.code;

      // Handle specific Firebase error codes
      switch (errorCode) {
        case 'auth/popup-closed-by-user':
        case 'auth/cancelled-popup-request':
          return t('VERIFICATION_CANCELLED_MESSAGE');
        case 'auth/invalid-phone-number':
          return t('PLEASE_ENTER_VALID_PHONE_NUMBER');
        case 'auth/too-many-requests':
          return t('FAILED_TO_SEND_OTP_MESSAGE');
        case 'auth/network-request-failed':
          return t('NO_INTERNET_CONNECTION');
        default:
          // Check if error message contains popup-closed-by-user
          if (
            firebaseError.message?.includes('popup-closed-by-user') ||
            firebaseError.message?.includes('cancelled')
          ) {
            return t('VERIFICATION_CANCELLED_MESSAGE');
          }
          return firebaseError.message || t('FAILED_TO_SEND_OTP_MESSAGE');
      }
    }

    // Fallback for non-Firebase errors
    if (error instanceof Error) {
      // Check if error message contains popup-closed-by-user
      if (
        error.message.includes('popup-closed-by-user') ||
        error.message.includes('cancelled')
      ) {
        return t('VERIFICATION_CANCELLED_MESSAGE');
      }
      return error.message;
    }

    return t('FAILED_TO_SEND_OTP_MESSAGE');
  };

  const onSubmitMobileNo = async () => {
    const mobileNo = countryCode + phoneNumber.replace(/^0/, '');

    const regx =
      // eslint-disable-next-line no-useless-escape
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (regx.test(mobileNo)) {
      setLoader(true);
      setPhoneError('');

      try {
        const confirmation = await auth().signInWithPhoneNumber(mobileNo, true);

        setLoader(false);
        navigation.navigate('OTPVerification', {
          phoneNumber: mobileNo,
          confirmation,
        });
      } catch (error: unknown) {
        const errorMessage = getFirebaseErrorMessage(error);

        setPhoneError(errorMessage);
        setLoader(false);
      }
    } else {
      setPhoneError(t('PLEASE_ENTER_VALID_PHONE_NUMBER'));
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhoneError('');
    setPhoneNumber(val);
  };

  const handleBackPress = () => {
    if (routeErrorMessage) {
      // If there's an error message, navigate to Onboarding instead
      navigation.reset({
        index: 0,
        routes: [{name: 'Onboarding'}],
      });
    } else {
      navigation.goBack();
    }
  };

  const handleDevBypassLogin = async () => {
    // eslint-disable-next-line no-console
    console.log('handleDevBypassLogin called');
    // eslint-disable-next-line no-console
    console.log('devFirebaseId:', devFirebaseId);

    // Show alert as fallback to verify button press
    Alert.alert('Dev Bypass', `Firebase ID: ${devFirebaseId || 'empty'}`);

    if (!devFirebaseId.trim()) {
      setPhoneError(t('PLEASE_ENTER_FIREBASE_ID'));
      return;
    }

    setDevLoader(true);
    setPhoneError('');

    try {
      const {data} = await generalApolloClient.query({
        query: CUSTOMER_CHECK,
        variables: {
          firebaseId: devFirebaseId.trim(),
        },
      });

      if (data?.verifyCustomer) {
        runInAction(() => {
          authStore.setUserData(
            {
              id: data.verifyCustomer.id,
              email: data.verifyCustomer.email || '',
              shop_name: data.verifyCustomer.shop_name,
              owner_name: data.verifyCustomer.owner_name,
              phoneNumber: data.verifyCustomer.whatsapp_number || '',
            },
            data.verifyCustomer.access_token || ''
          );
        });

        showMessage({
          type: 'success',
          message: t('SUCCESS'),
          description: t('LOGIN_SUCCESSFUL'),
        });

        RootNavigation.navigateToMain();
      } else if (data?.verifyCustomer === null) {
        navigation.replace('PhoneLogin', {
          errorMessage: t('ACCOUNT_PENDING_APPROVAL'),
        });
      }
    } catch (error) {
      const errorData = validateGraphQlError(error as Error);
      // Check if user doesn't exist (user_exists is returned as string from validateGraphQlError)
      if (errorData?.user_exists === 'false') {
        navigation.navigate('Signup', {
          firebaseId: devFirebaseId.trim(),
        });
        return;
      }
      // Check if there are validation errors
      if (errorData) {
        const errorMessage =
          errorData.email ||
          Object.values(errorData)[0] ||
          t('ACCOUNT_PENDING_APPROVAL');

        navigation.replace('PhoneLogin', {
          errorMessage: errorMessage as string,
        });
      } else {
        setPhoneError(
          error instanceof Error
            ? error.message
            : t('FAILED_TO_SEND_OTP_MESSAGE')
        );
      }
    } finally {
      setDevLoader(false);
    }
  };

  return (
    <WrapperContainer>
      <HeaderComp showBack onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <View style={styles.content}>
          <View style={styles.topSection}>
            <View style={styles.titleSection}>
              <TextComp text="WELCOME_BACK" style={styles.title} />
              <TextComp
                text="ENTER_PHONE_NUMBER_TO_CONTINUE"
                style={styles.description}
              />
            </View>

            <View style={styles.formSection}>
              <PhoneInputWithCountryCode
                label="PHONE_NUMBER"
                labelStyle={styles.inputLabel}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                countryCode={countryCode}
                onCountryCodeChange={setCountryCode}
                placeholder="PHONE_NUMBER_PLACEHOLDER"
                error={phoneError}
                touched={!!phoneError}
              />
              {routeErrorMessage ? (
                <TextComp
                  text={routeErrorMessage}
                  style={styles.errorMessageText}
                  isDynamic
                />
              ) : null}

              {/* Dev Bypass Section - Always visible for debugging */}
              {__DEV__ ? (
                <View style={styles.devSection}>
                  <View style={styles.devDivider} />
                  <TextComp
                    text={`DEV MODE: ${__DEV__ ? 'ON' : 'OFF'}`}
                    style={styles.devTitle}
                    isDynamic
                  />
                  <TextComp text="DEV_BYPASS_LOGIN" style={styles.devTitle} />
                  <TextInputComp
                    placeholder="FIREBASE_ID_PLACEHOLDER"
                    value={devFirebaseId}
                    onChangeText={text => {
                      // eslint-disable-next-line no-console
                      console.log('Firebase ID changed:', text);
                      setDevFirebaseId(text);
                    }}
                    containerStyle={styles.devInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <ButtonComp
                    title="DEV_BYPASS_LOGIN"
                    onPress={() => {
                      // eslint-disable-next-line no-console
                      console.log('Dev bypass button pressed');
                      Alert.alert(
                        'Button Pressed',
                        'Dev bypass button was pressed!'
                      );
                      handleDevBypassLogin();
                    }}
                    loading={devLoader}
                    disabled={devLoader || !devFirebaseId.trim()}
                    style={styles.devButton}
                    textStyle={styles.devButtonText}
                  />
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.buttonSection}>
            <ButtonComp
              title="SEND_OTP"
              onPress={onSubmitMobileNo}
              loading={loader}
              disabled={loader}
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
});

export default PhoneLogin;
