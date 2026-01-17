import React from 'react';
import {ScrollView, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {email, minLength, nonEmpty, object, pipe, string} from 'valibot';
import {t} from 'i18next';

import TextInputComp from '@/components/TextInputComp';
import TextComp from '@/components/TextComp';
import ButtonComp from '@/components/ButtonComp';
import PhoneInputWithCountryCode from '@/components/PhoneInputWithCountryCode';
import DocumentUpload from '@/components/DocumentUpload';
import {commonColors} from '@/styles/colors';
import {moderateScale, vs} from '@/styles/scaling';

const schema = object({
  name: pipe(string(), nonEmpty(t('PLEASE_ENTER_NAME'))),
  shortName: string(),
  email: pipe(string(), nonEmpty(t('PLEASE_ENTER_EMAIL')), email(t('INVALID_EMAIL'))),
  companyName: pipe(string(), nonEmpty(t('PLEASE_ENTER_COMPANY_NAME'))),
  phoneNumber: pipe(string(), nonEmpty(t('PLEASE_ENTER_PHONE_NUMBER'))),
  whatsappNumber: string(),
  brandName: string(),
  contactPersonName: string(),
  nationalUnifiedNumber: string(),
  country: string(),
  address: string(),
  crNumber: string(),
  vatNumber: string(),
  licenseNumber: string(),
  nationalAddressCode: string(),
});

type FormData = {
  name: string;
  shortName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  whatsappNumber: string;
  brandName: string;
  contactPersonName: string;
  nationalUnifiedNumber: string;
  country: string;
  address: string;
  crNumber: string;
  vatNumber: string;
  licenseNumber: string;
  nationalAddressCode: string;
  // Files
  crFile?: string;
  licenseFile?: string;
  vatFile?: string;
  nationalAddressFile?: string;
};

interface CustomerFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({onSubmit, loading}) => {
  const {control, handleSubmit, formState: {errors}, setValue} = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: '',
      shortName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      whatsappNumber: '',
    }
  });

  const onFormSubmit = (data: FormData) => {
    // Collect files manually if not in react-hook-form state
    // For now I'll assume they are handled via checking state or I should add them to RHF
    onSubmit(data);
  };

  return (
    <View style={{paddingBottom: 40}}>
      {/* Primary Contact */}
      <TextComp text={t('PRIMARY_CONTACT')} style={{fontWeight: 'bold', fontSize: 16, marginBottom: 12, marginTop: 10}} />
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('NAME')}
            error={!!errors.name}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
      <Controller
        control={control}
        name="shortName"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('SHORT_NAME')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />

      <TextComp text={t('EMAIL')} style={{fontWeight: 'bold', fontSize: 16, marginBottom: 12}} />
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('ENTER_EMAIL')}
            keyboardType="email-address"
             error={!!errors.email}
             containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />

       <TextComp text={t('COMPANY_NAME')} style={{fontWeight: 'bold', fontSize: 16, marginBottom: 12}} />
      <Controller
        control={control}
        name="companyName"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('ENTER_COMPANY_NAME')}
             error={!!errors.companyName}
             containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />

       <TextComp text={t('MOBILE')} style={{fontWeight: 'bold', fontSize: 16, marginBottom: 12}} />
       <PhoneInputWithCountryCode
          control={control}
          name="phoneNumber"
          placeholder={t('PHONE_NUMBER')}
           containerStyle={{marginBottom: vs(10)}}
        />
        <PhoneInputWithCountryCode
          control={control}
          name="whatsappNumber"
          placeholder={t('WHATSAPP')}
           containerStyle={{marginBottom: vs(10)}}
        />

      {/* General Information */}
      <TextComp text={t('GENERAL_INFORMATION')} style={{fontWeight: 'bold', fontSize: 16, marginBottom: 12, marginTop: 10}} />
       <Controller
        control={control}
        name="brandName"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('BRAND_NAME')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
       <Controller
        control={control}
        name="contactPersonName"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('CONTACT_PERSON_NAME')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
       <Controller
        control={control}
        name="nationalUnifiedNumber"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('NATIONAL_UNIFIED_NUMBER')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
       <Controller
        control={control}
        name="country"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('ENTER_COUNTRY')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
       <Controller
        control={control}
        name="address"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('ENTER_ADDRESS')}
            multiline
            containerStyle={{height: 100, marginBottom: vs(10)}}
            inputStyle={{height: 100, textAlignVertical: 'top'}}
          />
        )}
      />

      {/* Documents */}
      <TextComp text={t('DOCUMENTS')} style={{fontWeight: 'bold', fontSize: 16, marginBottom: 12, marginTop: 10}} />
      
      {/* CR */}
       <Controller
        control={control}
        name="crNumber"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('CR_NUMBER')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
      <DocumentUpload label={t('CHOOSE_CR_FILE')} onUpload={(url) => setValue('crFile', url)} />

       {/* License */}
       <Controller
        control={control}
        name="licenseNumber"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('LICENSE_NUMBER')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
      <DocumentUpload label={t('CHOOSE_LICENSE_FILE')} onUpload={(url) => setValue('licenseFile', url)} />

       {/* VAT */}
       <Controller
        control={control}
        name="vatNumber"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('VAT_NUMBER')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
      <DocumentUpload label={t('CHOOSE_VAT_FILE')} onUpload={(url) => setValue('vatFile', url)} />
      
       {/* National Address */}
       <Controller
        control={control}
        name="nationalAddressCode"
        render={({field: {onChange, value}}) => (
          <TextInputComp
            value={value}
            onChangeText={onChange}
            placeholder={t('NATIONAL_ADDRESS_CODE')}
            containerStyle={{marginBottom: vs(10)}}
          />
        )}
      />
      <DocumentUpload label={t('CHOOSE_NATIONAL_ADDRESS_FILE')} onUpload={(url) => setValue('nationalAddressFile', url)} />


      <ButtonComp
        title={t('ADD_CUSTOMER')}
        onPress={handleSubmit(onFormSubmit)}
        loading={loading}
        disabled={loading}
        style={{marginTop: 20}}
      />
    </View>
  );
};

export default CustomerForm;
