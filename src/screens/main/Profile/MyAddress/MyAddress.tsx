import React, {useCallback, useMemo, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';

import {
  useCustomerAddresses,
  useDeleteCustomerAddress,
} from '@/api/graphql/addresses/hooks';
import {CustomerAddress} from '@/api/graphql/addresses/types';
import {DeleteIcon, LocationIcon} from '@/assets/icons';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import type {MainStackParamList} from '@/navigation/types';
import addressStore from '@/stores/addressStore';
import authStore from '@/stores/authStore';
import {ThemeType} from '@/styles/colors';
import {ms, verticalScale} from '@/styles/scaling';

import {Address} from './address.types';
import useRTLStyles from './styles';

type MyAddressScreenNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;
type MyAddressRouteProp = RouteProp<MainStackParamList, 'MyAddress'>;

const MyAddress = observer(() => {
  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const styles = useRTLStyles(isRTL, theme as ThemeType);
  const navigation = useNavigation<MyAddressScreenNavigationProp>();
  const route = useRoute<MyAddressRouteProp>();

  // Check if we're in selection mode (coming from Checkout)
  const isSelectionMode = route.params?.selectMode === true;

  // Get customer ID from auth store
  const customerId = authStore.userData?.id as string | undefined;

  // State for deleting address
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
    null
  );

  // Fetch addresses from API
  const {addresses: apiAddresses, refetch} = useCustomerAddresses({
    customerId,
    size: 50,
    page: 1,
  });

  // Delete address hook
  const {deleteCustomerAddress} = useDeleteCustomerAddress();

  // Refetch addresses when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (customerId) {
        refetch();
      }
    }, [customerId, refetch])
  );

  // Format address string from API fields
  const formatAddress = (
    address_line1: string | null,
    address_line2: string | null,
    city: string | null,
    state: string | null,
    postal_code: string | null,
    country: string | null
  ): string => {
    const parts = [
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
    ].filter(part => part && part.trim() !== '');

    return parts.join(', ');
  };

  // Transform API addresses to component format
  const addresses = useMemo<Address[]>(() => {
    return apiAddresses.map(apiAddress => ({
      id: apiAddress.id,
      name: apiAddress.contact_name || apiAddress.label || '',
      address: formatAddress(
        apiAddress.address_line1,
        apiAddress.address_line2,
        apiAddress.city,
        apiAddress.state,
        apiAddress.postal_code,
        apiAddress.country
      ),
    }));
  }, [apiAddresses]);

  const handleAddNewAddress = () => {
    navigation.navigate('AddAddress', undefined);
  };

  const handleEditAddress = (address: CustomerAddress) => {
    navigation.navigate('AddAddress', {
      addressId: address.id,
      addressData: {
        id: address.id,
        contact_name: address.contact_name,
        contact_phone: address.contact_phone,
        address_line1: address.address_line1,
        address_line2: address.address_line2,
        city: address.city,
        postal_code: address.postal_code,
        state: address.state,
        country: address.country,
        landmark: address.landmark,
      },
    });
  };

  const handleSelectAddress = (address: CustomerAddress) => {
    // Set the selected address in the store
    addressStore.setSelectedAddress(address);
    // Navigate back to Checkout
    navigation.goBack();
  };

  const handleAddressPress = (address: CustomerAddress) => {
    if (isSelectionMode) {
      handleSelectAddress(address);
    } else {
      handleEditAddress(address);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    Alert.alert(t('DELETE_ADDRESS'), t('DELETE_ADDRESS_CONFIRM'), [
      {
        text: t('CANCEL'),
        style: 'cancel',
      },
      {
        text: t('DELETE'),
        style: 'destructive',
        onPress: async () => {
          try {
            setDeletingAddressId(addressId);

            const response = await deleteCustomerAddress({
              variables: {
                address: {
                  id: addressId,
                },
              },
            });

            if (response.data?.deleteCustomerAddress) {
              Alert.alert(t('SUCCESS'), t('DELETE_ADDRESS_SUCCESS'));
              // Refetch addresses
              refetch();
              // If the deleted address was selected, clear selection
              if (addressStore.selectedAddress?.id === addressId) {
                addressStore.setSelectedAddress(null);
              }
            } else {
              Alert.alert(t('ERROR'), t('DELETE_ADDRESS_FAILED'));
            }
          } catch (error) {
            Alert.alert(
              t('ERROR'),
              error instanceof Error
                ? error.message
                : t('DELETE_ADDRESS_FAILED')
            );
          } finally {
            setDeletingAddressId(null);
          }
        },
      },
    ]);
  };

  return (
    <WrapperContainer>
      <HeaderComp
        showBack={true}
        title="MY_ADDRESS"
        customStyle={styles.headerStyle}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewContainer}>
        <View style={styles.contentContainer}>
          {/* Add New Address Button */}
          <ButtonComp
            onPress={handleAddNewAddress}
            title={t('+ ADD_NEW_ADDRESS')}
            // leftIcon={<PlusIcon />}
            height={verticalScale(48)}
            style={styles.addButton}
            textStyle={styles.addButtonText}
          />

          {/* Saved Address Section */}
          {addresses.length > 0 && (
            <View style={styles.savedAddressSection}>
              <TextComp text="SAVED_ADDRESS" style={styles.sectionTitle} />

              {/* Address Cards */}
              {apiAddresses.map(address => (
                <TouchableOpacity
                  key={address.id}
                  style={[
                    styles.addressCard,
                    isSelectionMode &&
                      addressStore.selectedAddress?.id === address.id &&
                      styles.selectedAddressCard,
                  ]}
                  onPress={() => handleAddressPress(address)}>
                  <View style={styles.addressCardContent}>
                    <View style={styles.locationIconContainer}>
                      <LocationIcon width={ms(20)} height={ms(20)} />
                    </View>
                    <View style={styles.addressTextContainer}>
                      <TextComp
                        isDynamic
                        text={address.contact_name || address.label || ''}
                        style={styles.addressName}
                      />
                      {address.address_line1 && (
                        <TextComp
                          isDynamic
                          text={address.address_line1}
                          style={styles.addressText}
                        />
                      )}
                      {address.address_line2 && (
                        <TextComp
                          isDynamic
                          text={address.address_line2}
                          style={styles.addressText}
                        />
                      )}
                      {(address.city ||
                        address.state ||
                        address.postal_code) && (
                        <TextComp
                          isDynamic
                          text={[
                            address.city,
                            address.state,
                            address.postal_code,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                          style={styles.addressText}
                        />
                      )}
                      {address.country && (
                        <TextComp
                          isDynamic
                          text={address.country}
                          style={styles.addressText}
                        />
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={e => {
                        e?.stopPropagation?.();
                        handleDeleteAddress(address.id);
                      }}
                      disabled={deletingAddressId === address.id}>
                      <DeleteIcon
                        width={ms(20)}
                        height={ms(20)}
                        fill={
                          deletingAddressId === address.id ? '#ccc' : '#FF3B30'
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </WrapperContainer>
  );
});

export default MyAddress;
