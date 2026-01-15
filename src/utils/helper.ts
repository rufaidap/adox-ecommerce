import {createRef} from 'react';

// import NetInfo from '@react-native-community/netinfo';
import {format} from 'date-fns';
import {arSA, enUS} from 'date-fns/locale';
import i18n from 'i18next';

import {ms} from '@/styles/scaling';

// export const isNetworkConnected = async (): Promise<boolean> => {
//   const state = await NetInfo.refresh();
//   return state.isConnected || false;
// };

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export const logger = (...args: unknown[]): void => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export const stringifiedLogger = (data: unknown): void => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data, null, 2));
  }
};

export const scaled = (value: number): {height: number; width: number} => {
  return {
    height: ms(value),
    width: ms(value),
  };
};

export function boxShadow(
  color: string,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2
): object {
  return {
    elevation: radius,
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
}

export function delay(milliSec: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliSec));
}

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(parseInt(dateString, 10));
    const locale = i18n.language === 'ar' ? arSA : enUS;
    return format(date, 'MMM dd, yyyy', {locale});
  } catch (error) {
    return dateString;
  }
};

export const loader = createRef<unknown>();
