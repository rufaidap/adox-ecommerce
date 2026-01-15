import * as React from 'react';

import {NavigationContainerRef} from '@react-navigation/native';

import {RootStackParamList} from '@/navigation/types';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationRef.current?.navigate(name as any, params);
}

export function clearAuth(): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: 'Auth'}],
  });
}

export function navigateToMain(): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: 'Main'}],
  });
}
