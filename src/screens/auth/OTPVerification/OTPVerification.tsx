import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Vibration,
  TouchableOpacity,
} from 'react-native';

import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react-lite';
import {showMessage} from 'react-native-flash-message';
import {OtpInput} from 'react-native-otp-entry';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import {CUSTOMER_CHECK} from '@/api/graphql/auth/queries';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {AuthStackParamList} from '@/navigation/types';
import authStore from '@/stores/authStore';
import * as RootNavigation from '@/utils/RootNavigation';
import {validateGraphQlError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';

interface OTPVerificationProps {
  route: {
    params: {
      phoneNumber: string;
      confirmation?: FirebaseAuthTypes.ConfirmationResult;
    };
  };
}

const OTPVerification = observer<OTPVerificationProps>(({route}) => {
  const {phoneNumber, confirmation} = route.params;
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loader, setLoader] = useState(false);
  const [resetTimer, setResetTimer] = useState(30);
  const [firebaseConfirmation] = useState(confirmation);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    if (resetTimer > 0 && !loader) {
      intervalRef.current = setInterval(() => {
        setResetTimer(prev => {
          const reset = prev - 1;
          if (reset <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
          return reset;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetTimer, loader]);

  const checkIfUserExists = useCallback(
    async (user: FirebaseAuthTypes.User) => {
      // eslint-disable-next-line no-console
      console.log('user', user?.uid);

      try {
        const {data} = await generalApolloClient.query({
          query: CUSTOMER_CHECK,
          variables: {
            firebaseId: user?.uid,
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
                phoneNumber: user?.phoneNumber || '',
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
          // User exists but account has issues (pending approval, deactivated, etc.)
          // Replace OTPVerification with PhoneLogin - error will be shown there
          // Using replace so back button won't go back to OTPVerification
          navigation.replace('PhoneLogin', {
            errorMessage: t('ACCOUNT_PENDING_APPROVAL'),
          });
        }
      } catch (error) {
        const errorData = validateGraphQlError(error as Error);
        // Check if user doesn't exist (user_exists will be a string "false")
        if (errorData?.user_exists === false) {
          navigation.navigate('Signup', {
            phoneNumber: user?.phoneNumber || undefined,
            firebaseId: user?.uid,
          });
          return;
        }
        // Check if there are validation errors (pending approval, deactivated, etc.)
        if (errorData) {
          // Extract error message from email field or first available field
          const errorMessage =
            errorData.email ||
            Object.values(errorData)[0] ||
            t('ACCOUNT_PENDING_APPROVAL');

          // Replace OTPVerification with PhoneLogin so back button won't go back
          navigation.replace('PhoneLogin', {
            errorMessage: errorMessage as string,
          });
        }
      } finally {
        setLoader(false);
      }
    },
    [navigation]
  );

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!firebaseConfirmation) {
      setOtpError('OTP session expired. Please request a new OTP.');
      return;
    }

    setLoader(true);
    setOtpError('');

    try {
      const userCredential = await firebaseConfirmation.confirm(otp);

      if (userCredential?.user) {
        await checkIfUserExists(userCredential.user);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Invalid OTP. Please try again.';
      setOtpError(errorMessage);
      Vibration.vibrate(50);
      setLoader(false);
    }
  };

  const handleResendOTP = async () => {
    Keyboard.dismiss();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setLoader(true);
    setOtpError('');
    setOtp('');
    setResetTimer(30);

    try {
      // Resend OTP - you'll need to pass the phone number from route params
      // or store it in a way that's accessible here
      // For now, we'll navigate back to PhoneLogin
      navigation.goBack();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to resend OTP';
      setOtpError(errorMessage);
      setLoader(false);
    }
  };

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp showBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={styles.keyboardView}>
        <View style={styles.content}>
          <View>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <TextComp text="OTP_VERIFICATION" style={styles.title} />
              <TextComp
                text="ENTER_5_DIGIT_OTP_WHATSAPP"
                style={styles.subtitle}
              />
            </View>

            {/* Phone Number Section */}
            <View style={styles.phoneNumberSection}>
              <TextComp
                text={phoneNumber}
                style={styles.phoneNumber}
                isDynamic
              />
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.editButton}>
                <TextComp text="EDIT" style={styles.editText} />
              </TouchableOpacity>
            </View>

            {/* OTP Input Section */}
            <View style={styles.otpSection}>
              <OtpInput
                numberOfDigits={6}
                onTextChange={text => {
                  setOtp(text);
                  setOtpError('');
                }}
                autoFocus={true}
                theme={{
                  containerStyle: styles.otpInput,
                  pinCodeContainerStyle: styles.otpField,
                  pinCodeTextStyle: styles.otpText,
                }}
              />
              {otpError ? (
                <TextComp text={otpError} style={styles.errorText} />
              ) : null}

              <View style={styles.resendSection}>
                <TextComp text="DIDNT_RECEIVE_OTP" style={styles.resendText} />
                {resetTimer === 0 ? (
                  <TouchableOpacity onPress={handleResendOTP} disabled={loader}>
                    <TextComp text="RESEND" style={styles.resendLink} />
                  </TouchableOpacity>
                ) : (
                  <TextComp
                    text={`${resetTimer}s`}
                    style={styles.resendTimer}
                    isDynamic
                  />
                )}
              </View>
            </View>
          </View>

          <View>
            {/* Button Section */}
            <View style={styles.buttonSection}>
              <ButtonComp
                title="VERIFY_OTP"
                onPress={handleContinue}
                style={styles.continueButton}
                loading={loader}
                disabled={loader || otp.length !== 6}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
});

export default OTPVerification;
