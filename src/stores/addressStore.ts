import {makeAutoObservable, runInAction} from 'mobx';

import {
  CUSTOMER_ADDRESSES,
  CREATE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS,
} from '@/api/graphql/addresses';
import type {
  CustomerAddress,
  CustomerAddressesVariables,
  CreateCustomerAddressVariables,
  UpdateCustomerAddressVariables,
  DeleteCustomerAddressVariables,
} from '@/api/graphql/addresses';
import {generalApolloClient} from '@/api/graphql/apolloClient';
import authStore from '@/stores/authStore';

import {secureStorage} from '../utils/secureStorage';

// Legacy Address interface for backward compatibility
export interface Address {
  id: string;
  name: string;
  address: string;
  phoneNumber?: string;
  zipcode?: string;
  city?: string;
  houseNo?: string;
  roadName1?: string;
  countryCode?: string;
}

class AddressStore {
  addresses: CustomerAddress[] = [];
  selectedAddress: CustomerAddress | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Get customer ID from auth store
   */
  private getCustomerId = (): string | undefined => {
    return authStore.userData?.id as string | undefined;
  };

  /**
   * Transform CustomerAddress to legacy Address format (for backward compatibility)
   */
  private transformToLegacyAddress = (
    customerAddress: CustomerAddress
  ): Address => {
    return {
      id: customerAddress.id,
      name: customerAddress.contact_name || '',
      address:
        `${customerAddress.address_line1 || ''} ${
          customerAddress.address_line2 || ''
        }`.trim() || '',
      phoneNumber: customerAddress.contact_phone || undefined,
      zipcode: customerAddress.postal_code || undefined,
      city: customerAddress.city || undefined,
      houseNo: customerAddress.address_line1 || undefined,
      roadName1: customerAddress.address_line2 || undefined,
    };
  };

  /**
   * Transform legacy Address to CustomerAddress format for create
   */
  private transformToCustomerAddress = (
    address: Partial<Address>,
    customerId?: string
  ): Partial<CreateCustomerAddressVariables['address']> => {
    return {
      customer_id: customerId || null,
      contact_name: address.name || null,
      contact_phone: address.phoneNumber || null,
      address_line1: address.houseNo || address.address || null,
      address_line2: address.roadName1 || null,
      city: address.city || null,
      postal_code: address.zipcode || null,
      label: address.name || null,
    };
  };

  /**
   * Transform legacy Address to CustomerAddress format for update
   */
  private transformToCustomerAddressForUpdate = (
    address: Partial<Address>
  ): Partial<UpdateCustomerAddressVariables['address']> => {
    const result: Partial<UpdateCustomerAddressVariables['address']> = {
      contact_name: address.name || null,
      contact_phone: address.phoneNumber || null,
      address_line1: address.houseNo || address.address || null,
      address_line2: address.roadName1 || null,
      city: address.city || null,
      postal_code: address.zipcode || null,
      label: address.name || null,
    };
    return result;
  };

  /**
   * Load shipping addresses from API
   */
  loadShippingAddress = async () => {
    this.loading = true;
    this.error = null;

    try {
      const customerId = this.getCustomerId();

      if (!customerId) {
        runInAction(() => {
          this.addresses = [];
          this.loading = false;
        });
        return;
      }

      const variables: CustomerAddressesVariables = {
        customerId,
      };

      const response = await generalApolloClient.query({
        query: CUSTOMER_ADDRESSES,
        variables,
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      });

      if (response.data?.customerAddresses?.data) {
        const addresses = response.data.customerAddresses.data;

        // Save to secure storage for offline access
        await secureStorage.setObject('SHIPPING_ADDRESSES', addresses);

        runInAction(() => {
          this.addresses = addresses;
          this.loading = false;
        });
      } else {
        runInAction(() => {
          this.addresses = [];
          this.loading = false;
        });
      }
    } catch (error: unknown) {
      // Try to load from secure storage as fallback
      try {
        const savedAddresses = await secureStorage.getObject(
          'SHIPPING_ADDRESSES'
        );

        if (savedAddresses && Array.isArray(savedAddresses)) {
          runInAction(() => {
            this.addresses = savedAddresses;
            this.loading = false;
          });
          return;
        }
      } catch {
        // Ignore storage errors
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load shipping addresses';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
        this.addresses = [];
      });
    }
  };

  /**
   * Create a new customer address
   */
  createAddress = async (
    addressData: Partial<CreateCustomerAddressVariables['address']>
  ) => {
    this.loading = true;
    this.error = null;

    try {
      const customerId = this.getCustomerId();

      if (!customerId) {
        throw new Error('Customer ID is required');
      }

      const variables: CreateCustomerAddressVariables = {
        address: {
          ...addressData,
          customer_id: customerId,
        },
      };

      const response = await generalApolloClient.mutate({
        mutation: CREATE_CUSTOMER_ADDRESS,
        variables,
        errorPolicy: 'all',
      });

      if (response.data?.createCustomerAddress) {
        const newAddress = response.data.createCustomerAddress;

        runInAction(() => {
          this.addresses.push(newAddress);
          this.loading = false;
        });

        // Update secure storage
        await secureStorage.setObject('SHIPPING_ADDRESSES', this.addresses);

        return newAddress;
      } else {
        throw new Error('Failed to create address');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create address';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      throw error;
    }
  };

  /**
   * Update an existing customer address
   */
  updateAddress = async (
    id: string,
    addressData: Partial<UpdateCustomerAddressVariables['address']>
  ) => {
    this.loading = true;
    this.error = null;

    try {
      const variables: UpdateCustomerAddressVariables = {
        address: {
          ...addressData,
          id,
        },
      };

      const response = await generalApolloClient.mutate({
        mutation: UPDATE_CUSTOMER_ADDRESS,
        variables,
        errorPolicy: 'all',
      });

      if (response.data?.updateCustomerAddress) {
        const updatedAddress = response.data.updateCustomerAddress;

        runInAction(() => {
          const index = this.addresses.findIndex(addr => addr.id === id);
          if (index !== -1) {
            this.addresses[index] = updatedAddress;
          }
          this.loading = false;
        });

        // Update secure storage
        await secureStorage.setObject('SHIPPING_ADDRESSES', this.addresses);

        return updatedAddress;
      } else {
        throw new Error('Failed to update address');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update address';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      throw error;
    }
  };

  /**
   * Delete a customer address
   */
  deleteAddress = async (id: string) => {
    this.loading = true;
    this.error = null;

    try {
      const variables: DeleteCustomerAddressVariables = {
        address: {
          id,
        },
      };

      await generalApolloClient.mutate({
        mutation: DELETE_CUSTOMER_ADDRESS,
        variables,
        errorPolicy: 'all',
      });

      runInAction(() => {
        this.addresses = this.addresses.filter(addr => addr.id !== id);
        if (this.selectedAddress?.id === id) {
          this.selectedAddress = null;
        }
        this.loading = false;
      });

      // Update secure storage
      await secureStorage.setObject('SHIPPING_ADDRESSES', this.addresses);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete address';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      throw error;
    }
  };

  /**
   * Add a new address (legacy method for backward compatibility)
   */
  addAddress = async (address: Address) => {
    const customerId = this.getCustomerId();
    const addressData = this.transformToCustomerAddress(address, customerId);
    await this.createAddress(addressData);
  };

  /**
   * Update an existing address (legacy method for backward compatibility)
   */
  updateAddressLegacy = async (id: string, updatedAddress: Address) => {
    const addressData =
      this.transformToCustomerAddressForUpdate(updatedAddress);
    await this.updateAddress(id, addressData);
  };

  /**
   * Remove an address (legacy method for backward compatibility)
   */
  removeAddress = async (id: string) => {
    await this.deleteAddress(id);
  };

  /**
   * Set selected address
   */
  setSelectedAddress = (address: CustomerAddress | null) => {
    runInAction(() => {
      this.selectedAddress = address;
    });
  };

  /**
   * Clear all addresses
   */
  clearAddresses = () => {
    runInAction(() => {
      this.addresses = [];
      this.selectedAddress = null;
    });
  };
}

const addressStore = new AddressStore();
export default addressStore;
