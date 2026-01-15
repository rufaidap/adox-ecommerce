import React, {useEffect} from 'react';
import {Linking, View} from 'react-native';

import {observer} from 'mobx-react-lite';

import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import authStore from '@/stores/authStore';
import {ThemeType} from '@/styles/colors';
import {logger} from '@/utils/helper';

import useRTLStyles from './styles';

/**
 * WhatsApp redirect screen that opens WhatsApp with the user's number
 */
const WhatsApp = observer(() => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  useEffect(() => {
    const openWhatsApp = async () => {
      const userData = authStore.userData;
      const whatsappNumber = userData?.whatsapp_number || '+966348306063';
      // Remove any spaces, dashes, or plus signs for the URL
      const cleanNumber = whatsappNumber.replace(/[\s\-+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanNumber}`;

      try {
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        if (canOpen) {
          await Linking.openURL(whatsappUrl);
        } else {
          // Fallback to WhatsApp web
          await Linking.openURL('https://web.whatsapp.com');
        }
      } catch (error) {
        logger('Error opening WhatsApp:', error);
      }
    };

    openWhatsApp();
  }, []);

  return <View style={styles.container} />;
});

export default WhatsApp;
