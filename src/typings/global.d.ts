import {STORAGE_KEYS} from '@/utils/secureStorage';

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'ar' | 'fr';
export type StorageKey = keyof typeof STORAGE_KEYS;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL?: string;
      NODE_ENV?: 'development' | 'production' | 'test';
    }
  }

  const process: {
    env: NodeJS.ProcessEnv;
  };
}
