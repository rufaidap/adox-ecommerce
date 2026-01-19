
import {makeAutoObservable, runInAction} from 'mobx';
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

// Temporary CustomerAddress type
export interface CustomerAddress {
    id: string;
    contact_name?: string | null;
    contact_phone?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    postal_code?: string | null;
    [key: string]: any;
}

class AddressStore {
  addresses: CustomerAddress[] = [];
  selectedAddress: CustomerAddress | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private getCustomerId = (): string | undefined => {
    return authStore.userData?.id as string | undefined;
  };

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

        // TODO: Implement REST API call
        console.log('loadShippingAddress not implemented yet');

        const savedAddresses = await secureStorage.getObject('SHIPPING_ADDRESSES');
        runInAction(() => {
            if (Array.isArray(savedAddresses)) {
                this.addresses = savedAddresses;
            }
            this.loading = false;
        });

    } catch (error: any) {
        runInAction(() => {
            this.error = error.message;
            this.loading = false;
        });
    }
  };

  createAddress = async (addressData: any) => {
    this.loading = true;
    try {
         // TODO: Implement REST API call
         console.log('createAddress not implemented yet');
         throw new Error('Not implemented');
    } catch(error: any) {
         runInAction(() => {
             this.error = error.message;
             this.loading = false;
         });
         throw error;
    }
  };

  updateAddress = async (id: string, addressData: any) => {
    this.loading = true;
    try {
         // TODO: Implement REST API call
         console.log('updateAddress not implemented yet');
         throw new Error('Not implemented');
    } catch(error: any) {
         runInAction(() => {
             this.error = error.message;
             this.loading = false;
         });
         throw error;
    }
  };

  deleteAddress = async (id: string) => {
     this.loading = true;
     try {
          // TODO: Implement REST API call
          console.log('deleteAddress not implemented yet');
          throw new Error('Not implemented');
     } catch(error: any) {
          runInAction(() => {
              this.error = error.message;
              this.loading = false;
          });
          throw error;
     }
  };

  addAddress = async (address: Address) => {
    console.log('addAddress not implemented');
    // Implementation pending
  };

  updateAddressLegacy = async (id: string, updatedAddress: Address) => {
    console.log('updateAddressLegacy not implemented');
    // Implementation pending
  };

  removeAddress = async (id: string) => {
    await this.deleteAddress(id);
  };

  setSelectedAddress = (address: CustomerAddress | null) => {
    runInAction(() => {
      this.selectedAddress = address;
    });
  };

  clearAddresses = () => {
    runInAction(() => {
      this.addresses = [];
      this.selectedAddress = null;
    });
  };
}

const addressStore = new AddressStore();
export default addressStore;
