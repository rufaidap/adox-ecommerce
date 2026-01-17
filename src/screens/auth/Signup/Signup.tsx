import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {useMutation} from '@apollo/client';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';
import {showMessage} from 'react-native-flash-message';

import {REGISTER_CUSTOMER} from '@/api/graphql/auth/mutations';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {AuthStackParamList} from '@/navigation/types';
import authStore from '@/stores/authStore';
import {CustomError, validateGraphQlError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';
import CustomerForm from './components/CustomerForm';
import SupplierForm from './components/SupplierForm';

const Signup = observer(() => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as 'light' | 'dark');
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [activeTab, setActiveTab] = useState<'customer' | 'supplier'>('customer');

  const [registerCustomer, {loading: isSubmittingForm}] =
    useMutation(REGISTER_CUSTOMER);

  const onSubmit = async (data: any) => {
    authStore.setLoading(true);
    authStore.setError(null);

    try {
      const currentUser = auth().currentUser;
      const firebaseId = currentUser?.uid || undefined;

      // Construct payload based on active tab
      // Mapping form data to backend expected keys where possible
      // Assuming backend accepts these new fields in the 'customer' input object
      // If not, they will need to be adjusted.
      
      const payload: any = {
          shop_name: data.companyName,
          owner_name: data.name, // Primary Contact Name
          email: data.email,
          secondary_number: data.phoneNumber,
          status: 'active', // Defaulting to active as per screenshot default
          firebase_id: firebaseId,
          // New fields - passing them as is, assuming backend handles them
          short_name: data.shortName,
          brand_name: data.brandName,
          contact_person_name: data.contactPersonName,
          national_unified_number: data.nationalUnifiedNumber,
          country: data.country,
          address: data.address,
      };

      if (activeTab === 'customer') {
          payload.whatsapp_number = data.whatsappNumber;
          payload.cr_no = data.crNumber;
          payload.vat_no = data.vatNumber;
          payload.baladiya_no = data.licenseNumber; // Mapping License Number to baladiya_no?
          
          payload.cr_file = data.crFile;
          payload.license_file = data.licenseFile;
          payload.vat_file = data.vatFile;
          payload.national_address_code = data.nationalAddressCode;
          payload.national_address_file = data.nationalAddressFile;
          payload.type = 'customer'; 
      } else {
          payload.type = 'supplier';
      }

      console.log('Registering with payload:', payload);

      const response = await registerCustomer({
        variables: {
            customer: payload
        },
      });

      if (response.data?.registerCustomer) {
        navigation.navigate('Login', {
          errorMessage: t('ACCOUNT_PENDING_ADMIN_APPROVAL'),
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: unknown) {
      const errorData = validateGraphQlError(error as CustomError);
      
      const errorMessage =
        errorData?.message ||
        (error as {message?: string})?.message ||
        t('FAILED_TO_CREATE_ACCOUNT');
        
      authStore.setLoading(false);
      authStore.setError(errorMessage);
      Alert.alert(t('SIGNUP_FAILED'), errorMessage);
    } finally {
        authStore.setLoading(false);
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
            <TextComp text={activeTab === 'customer' ? `+ ${t('ADD_NEW_CUSTOMER')}` : `+ ${t('ADD_NEW_SUPPLIER')}`} isDynamic={true} style={styles.headerTitle} />
            <TextComp
              text={t('ENTER_YOUR_INFORMATION_BELOW')} 
              style={styles.headerSubtitle}
            />
          </View>
          

          {/* Tab Switcher */}
          <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'customer' && styles.tabButtonActive]}
                onPress={() => setActiveTab('customer')}
              >
                  <TextComp text={t('CUSTOMERS')} style={[styles.tabText, activeTab === 'customer' && styles.tabTextActive]} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'supplier' && styles.tabButtonActive]}
                onPress={() => setActiveTab('supplier')}
              >
                  <TextComp text={t('SUPPLIERS')} style={[styles.tabText, activeTab === 'supplier' && styles.tabTextActive]} />
              </TouchableOpacity>
          </View>

          {activeTab === 'customer' ? (
              <CustomerForm onSubmit={onSubmit} loading={authStore.loading || isSubmittingForm} />
          ) : (
              <SupplierForm onSubmit={onSubmit} loading={authStore.loading || isSubmittingForm} />
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
});

export default Signup;
