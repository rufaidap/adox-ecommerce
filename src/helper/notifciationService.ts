import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  requestPermission,
} from '@react-native-firebase/messaging';

import {secureStorage} from '@/utils/secureStorage';

const messagingInstance = getMessaging();

export async function requestUserPermission() {
  const authStatus = await requestPermission(messagingInstance);
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
}

const getFCMToken = async () => {
  try {
    const fcmToken = await secureStorage.getItem('FCM_TOKEN');
    if (fcmToken) {
      return fcmToken;
    }
    const token = await getToken(messagingInstance);
    if (token) {
      await secureStorage.setItem('FCM_TOKEN', token);
    }
    return token;
  } catch (error) {
    // Error during token generation - silently fail
    return null;
  }
};
