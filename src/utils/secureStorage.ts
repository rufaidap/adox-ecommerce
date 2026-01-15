import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

// Storage keys
export const STORAGE_KEYS: {[key: string]: string} = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  IS_FIRST_TIME: 'is_first_time',
  LANGUAGE: 'language',
  THEME: 'theme',
};

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await RNSecureStorage.setItem(STORAGE_KEYS[key], value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      //console.log('Error storing value:', error);
    }
  },

  async getItem(key: string): Promise<string | null> {
    const storageKey = STORAGE_KEYS[key];

    if (!storageKey) {
      //console.log('Invalid storage key:', STORAGE_KEYS[key]);
      return null;
    }
    try {
      return await RNSecureStorage.getItem(STORAGE_KEYS[key]);
    } catch (error) {
      //console.log(`Error retrieving value: ${STORAGE_KEYS[key]}`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await RNSecureStorage.removeItem(STORAGE_KEYS[key]);
    } catch (error) {
      // console.log('Error removing value:', error);
    }
  },

  async setObject(key: string, value: object): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await RNSecureStorage.setItem(STORAGE_KEYS[key], jsonValue, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      //console.log('Error storing object:', error);
    }
  },

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await RNSecureStorage.getItem(STORAGE_KEYS[key]);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      //console.log('Error retrieving object:', error);
      return null;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await RNSecureStorage.clear();
    } catch (error) {
      //console.log('Error clearing all:', error);
    }
  },
};
