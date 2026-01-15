/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
import React, {useMemo} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
// import cartStore from '@/stores/cartStore';
import {Colors, ThemeType, createShadowStyle} from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import {ms, rf, s} from '@/styles/scaling';

import {
  SECOND_TAB_WIDTH,
  SINGLE_TAB_HEIGHT,
  SINGLE_TAB_WIDTH,
  SPACING_BETWEEN_SEC_TAB_MENU,
  TAB_HEIGHT,
} from './tabBarConfig';

// create a component
const MyTabBar = observer(
  ({state, descriptors, navigation}: BottomTabBarProps) => {
    const {t} = useTranslation();
    const isRTL = useIsRTL();
    const {theme} = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];
    // const cartItemsCount = cartStore.itemsCount;

    // Separate WhatsApp route from other routes
    const whatsAppRoute = state?.routes.find(
      route => route.name === 'WhatsApp'
    );
    const otherRoutes = state?.routes.filter(
      route => route.name !== 'WhatsApp'
    );

    const renderTab = (route: any, _index: number, _isWhatsApp: boolean) => {
      const {options} = descriptors[route.key];
      const routeIndex =
        state?.routes.findIndex(r => r.key === route.key) ?? -1;
      const isFocused = state.index === routeIndex;
      const isWhatsAppRoute = route.name === 'WhatsApp';

      const onPress = () => {
        // Show confirmation dialog for WhatsApp
        if (isWhatsAppRoute) {
          Alert.alert(t('OPEN_WHATSAPP'), t('OPEN_WHATSAPP_CONFIRM'), [
            {
              text: t('CANCEL'),
              style: 'cancel',
            },
            {
              text: t('OK'),
              onPress: () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              },
            },
          ]);
          return;
        }

        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({type: 'tabLongPress', target: route.key});
      };

      const icon = options.tabBarIcon
        ? options.tabBarIcon({
            focused: isFocused,
            color: isWhatsAppRoute
              ? colors.secondary
              : isFocused
              ? colors.primary
              : colors.inputPlaceholder,
            size: TAB_HEIGHT / 2,
          })
        : null;

      return (
        <TouchableOpacity
          key={route.key}
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={
            'tabBarTestID' in options
              ? (options.tabBarTestID as string | undefined)
              : undefined
          }
          onPress={onPress}
          onLongPress={onLongPress}
          style={
            isWhatsAppRoute
              ? styles.whatsAppContainer
              : [styles.subContainer, isFocused && styles.activeTabContainer]
          }>
          <View style={styles.iconContainer}>
            {icon}
            {/* {route.name === 'Cart' && cartItemsCount > 0 && (
              <View style={styles.badge}>
                <TextComp
                  style={styles.badgeText}
                  text={cartItemsCount > 99 ? '99+' : cartItemsCount.toString()}
                />
              </View>
            )} */}
          </View>
          {!isWhatsAppRoute && (
            <TextComp
              text={route.name}
              style={{
                color: isFocused ? colors.text : '#A3A4A3',
                fontSize: rf(10),
                fontFamily: fontFamily.semiBold,
              }}
            />
          )}
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView edges={['bottom']} style={styles.wrapper}>
        <View style={styles.tabBarRow}>
          {whatsAppRoute && renderTab(whatsAppRoute, 0, true)}
          <View style={styles.container}>
            {otherRoutes?.map((route, index) =>
              renderTab(route, index + 1, false)
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
);

// define your styles

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
  const colors = Colors[theme];
  return useMemo(
    () =>
      StyleSheet.create({
        activeTabContainer: {
          backgroundColor: '#ECECEC',
          borderRadius: SINGLE_TAB_HEIGHT,
          padding: SPACING_BETWEEN_SEC_TAB_MENU,
        },
        // badge: {
        //   alignItems: 'center',
        //   backgroundColor: colors.error,
        //   borderColor: colors.background,
        //   borderRadius: ms(10),
        //   borderWidth: ms(1),
        //   height: vs(20),
        //   justifyContent: 'center',
        //   minWidth: s(20),
        //   paddingHorizontal: s(4),
        //   position: 'absolute',
        //   right: -s(8),
        //   top: -s(8),
        //   ...createShadowStyle(theme, 'dark', 2),
        // },
        // badgeText: {
        //   color: colors.surface,
        //   fontFamily: 'System',
        //   fontSize: rf(10),
        //   fontWeight: 'bold',
        // },
        container: {
          alignItems: 'center',
          backgroundColor:
            theme === 'dark'
              ? 'rgba(26, 26, 26, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
          borderRadius: TAB_HEIGHT,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          height: TAB_HEIGHT,
          justifyContent: 'space-around',
          padding: SPACING_BETWEEN_SEC_TAB_MENU,
          width: SECOND_TAB_WIDTH,
          ...createShadowStyle(theme, 'card', 8),
        },
        iconContainer: {
          position: 'relative',
        },
        subContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: SINGLE_TAB_WIDTH,
        },
        tabBarRow: {
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: 'center',
          paddingHorizontal: s(16),
        },
        whatsAppContainer: {
          alignItems: 'center',
          backgroundColor: colors.secondary,
          borderRadius: ms(28),
          height: TAB_HEIGHT,
          justifyContent: 'center',
          marginLeft: isRTL ? s(8) : 0,
          marginRight: isRTL ? 0 : s(8),
          width: TAB_HEIGHT,
          ...createShadowStyle(theme, 'card', 4),
        },
        wrapper: {
          alignItems: 'center',
          backgroundColor: 'transparent',
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
        },
      }),
    [isRTL, theme, colors]
  );
};

//make this component available to the app
export default MyTabBar;
