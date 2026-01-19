//import liraries
import React, {useState, useEffect} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';


import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';
import {showMessage} from 'react-native-flash-message';

import {loginCustomer} from '@/api/rest/auth';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {AuthStackParamList} from '@/navigation/types';
import authStore from '@/stores/authStore';
import {vs} from '@/styles/scaling';
import {HIT_SLOP} from '@/utils';
import {logger} from '@/utils/helper';
import * as RootNavigation from '@/utils/RootNavigation';


import useRTLStyles from './styles';

const Login = observer(() => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();

  const styles = useRTLStyles(isRTL, theme as 'light' | 'dark');
  const [email, setEmail] = useState('alnoor.store@example.com');
  const [password, setPassword] = useState('Demo@12345');
  const [showPassword] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Navigate to main if already authenticated
    if (authStore.isAuthenticated) {
      // Navigation will be handled by RootNavigation
    }
  }, []);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert(t('ERROR'), t('PLEASE_ENTER_EMAIL'));
      return;
    }
    if (!password.trim()) {
      Alert.alert(t('ERROR'), t('PLEASE_ENTER_PASSWORD'));
      return;
    }

    setIsSubmitting(true);
    authStore.setLoading(true);
    authStore.setError(null);

    try {
      const response = await loginCustomer({
          email: email.trim(),
          password,
      });

      if (response) {
        const customer = response;

        // Save complete user data and token to authStore
        await authStore.setUserData(
          {
            id: customer.id,
            shop_name: customer.shop_name,
            owner_name: customer.owner_name,
            email: customer.email,
            whatsapp_number: customer.whatsapp_number,
            secondary_number: customer.secondary_number,
            shop_board_photo: customer.shop_board_photo,
            vat_no: customer.vat_no,
            cr_no: customer.cr_no,
            baladiya_no: customer.baladiya_no,
            is_approved: customer.is_approved,
            status: customer.status,
            created_at: customer.created_at,
            updated_at: customer.updated_at,
          },
          customer.access_token || ''
        );

        authStore.setLoading(false);

        showMessage({
          type: 'success',
          message: t('SUCCESS'),
          description: t('LOGIN_SUCCESSFUL'),
        });

        // Navigation will be handled automatically by RootNavigation
        RootNavigation.navigateToMain();
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        (error instanceof Error ? error.message : '') ||
        t('FAILED_TO_LOGIN');

      authStore.setLoading(false);
      authStore.setError(errorMessage);

      Alert.alert(t('LOGIN_FAILED'), errorMessage);
    } finally {
        setIsSubmitting(false);
        authStore.setLoading(false);
    }
  };

  const handleSignUp = () => {
    logger('inside');

    navigation.navigate('Signup');
  };

  return (
    <WrapperContainer style={styles.container}>
      {/* <HeaderComp showBack={false} customStyle={styles.header} /> */}
      <View style={styles.content}>
        <View>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <TextComp text="SIGN_IN_TO_ACCOUNT" style={styles.title} />
            <View style={styles.signUpPrompt}>
              <TextComp text="DONT_HAVE_ACCOUNT" style={styles.greyText} />
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <TextComp text="EMAIL_ID" style={styles.inputLabel} />

            <TextInputComp
              value={email}
              onChangeText={setEmail}
              placeholder="YOUR_EMAIL_ID"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={{marginBottom: vs(10)}}
            />
            <TextComp text="PASSWORD" style={styles.inputLabel} />
            <TextInputComp
              value={password}
              onChangeText={setPassword}
              placeholder="YOUR_PASSWORD"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <ButtonComp
              title="LOGIN"
              onPress={handleLogin}
              loading={authStore.loading || isSubmitting}
              disabled={authStore.loading || isSubmitting}
              style={styles.nextButton}
            />
          </View>

          <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleSignUp}>
            <TextComp text="SIGN_UP" style={styles.signUpLink} />
          </TouchableOpacity>
        </View>

        {/* Terms Section */}
        <TextComp text="TERMS_AGREEMENT" style={styles.termsText} />
      </View>
    </WrapperContainer>
  );
});

export default Login;
