import React from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {email, nonEmpty, object, pipe, string} from 'valibot';
import {t} from 'i18next';

import TextInputComp from '@/components/TextInputComp';
import TextComp from '@/components/TextComp';
import ButtonComp from '@/components/ButtonComp';
import PhoneInputWithCountryCode from '@/components/PhoneInputWithCountryCode';
import {moderateScale, vs} from '@/styles/scaling';

const schema = object({
  name: pipe(string(), nonEmpty(t('PLEASE_ENTER_NAME'))),
  email: pipe(string(), nonEmpty(t('PLEASE_ENTER_EMAIL')), email(t('INVALID_EMAIL'))),
  companyName: pipe(string(), nonEmpty(t('PLEASE_ENTER_COMPANY_NAME'))),
  phoneNumber: pipe(string(), nonEmpty(t('PLEASE_ENTER_PHONE_NUMBER'))),
  brandName: string(),
  contactPersonName: string(),
  nationalUnifiedNumber: string(),
  country: string(),
  address: string(),
});

type FormData = {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  brandName: string;
  contactPersonName: string;
  nationalUnifiedNumber: string;
  country: string;
  address: string;
};

interface SupplierFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const SupplierForm: React.FC<SupplierFormProps> = ({onSubmit, loading}) => {
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      phoneNumber: '',
    }
  });

  const onFormSubmit = (data: FormData) => {
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

      <ButtonComp
        title={t('ADD_SUPPLIER')}
        onPress={handleSubmit(onFormSubmit)}
        loading={loading}
        disabled={loading}
        style={{marginTop: 20}}
      />
    </View>
  );
};

export default SupplierForm;
