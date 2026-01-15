import React, {ReactNode, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {observer} from 'mobx-react-lite';

import {
  AvatarIcon,
  CartLogoIcon,
  ChevronRightIcon,
  ContactIcon,
  DeleteUserIcon,
  EditIcon,
  FAQIcon,
  InfoIcon,
  LanguageIcon,
  LocationIcon,
  LogoutIcon,
  NotificationIcon,
  PackageIcon,
  PasswordIcon,
  PaymentIcon,
  PrivacyPolicyIcon,
  UserIcon,
} from '@/assets/icons';
import {ImageComp} from '@/components';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import type {MainTabScreenNavigationProp} from '@/navigation/types';
import authStore from '@/stores/authStore';
import {commonColors, ThemeType} from '@/styles/colors';
import {ms} from '@/styles/scaling';

import useRTLStyles, {useAccountItemStyles} from './styles';

const Profile = observer(() => {
  const {userData} = authStore;
  // console.log(userData, 'userData');

  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const styles = useRTLStyles(isRTL, theme as ThemeType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<MainTabScreenNavigationProp<'Profile'>>();

  const onLogout = () => {
    Alert.alert(t('LOGOUT_CONFIRM'), t('LOGOUT_CONFIRM_MESSAGE'), [
      {
        text: t('CANCEL'),
        style: 'cancel',
      },
      {
        text: t('OK'),
        onPress: async () => {
          setIsSubmitting(true);
          try {
            // OneSignal.logout(); // Uncomment if OneSignal is available
            await authStore.logoutUser();
            // Navigation is handled by logoutUser via RootNavigation.clearAuth()
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Logout error:', error);
            setIsSubmitting(false);
          }
        },
      },
    ]);
  };

  interface AccountItemProps {
    label: string;
    onPress?: (() => void) | null;
    rightOption?: ReactNode;
    labelColor?: string;
    leftIcon?: ReactNode;
    subtitle?: string;
  }

  const AccountItem: React.FC<AccountItemProps> = ({
    label,
    onPress,
    rightOption,
    labelColor,
    leftIcon,
    subtitle,
  }) => {
    const accountItemStyles = useAccountItemStyles(isRTL, theme as ThemeType);

    const content = (
      <View style={accountItemStyles.container}>
        <View style={accountItemStyles.leftContent}>
          {leftIcon && (
            <View style={accountItemStyles.iconContainer}>{leftIcon}</View>
          )}
          <View style={accountItemStyles.textContainer}>
            <TextComp
              text={label}
              style={[
                subtitle
                  ? accountItemStyles.labelBold
                  : accountItemStyles.label,
                labelColor ? {color: labelColor} : {},
              ]}
            />
            {subtitle && (
              <TextComp
                isDynamic
                style={accountItemStyles.subtitle}
                text={subtitle}
              />
            )}
          </View>
        </View>
        {rightOption && (
          <View style={accountItemStyles.rightOption}>{rightOption}</View>
        )}
      </View>
    );

    if (onPress) {
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={accountItemStyles.touchable}>
            {content}
          </TouchableOpacity>
          <View style={accountItemStyles.borderDivider} />
        </View>
      );
    }

    return (
      <View>
        <View style={accountItemStyles.touchable}>{content}</View>
        <View style={accountItemStyles.borderDivider} />
      </View>
    );
  };

  return (
    <WrapperContainer>
      <HeaderComp showBack={false} title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollviewContainer]}>
        <View style={styles.walletCard}>
          <TextComp style={styles.walletTitle} text="MY_WALLET" />
          <View style={styles.walletAmountContainer}>
            <PaymentIcon
              color={commonColors.white}
              height={ms(28)}
              width={ms(28)}
            />
            <TextComp isDynamic style={styles.walletAmount} text="3,234.93" />
          </View>
          <View style={styles.walletIcon}>
            <ImageComp
              resizeMode="contain"
              source={CartLogoIcon}
              style={styles.walletIconImage}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          {userData && (
            <View style={styles.manage}>
              <View style={styles.avatarContainer}>
                <ImageComp
                  resizeMode="cover"
                  source={AvatarIcon}
                  style={styles.avatarImage}
                />
              </View>
              <View>
                <TextComp
                  isDynamic
                  style={styles.name}
                  text={userData?.owner_name || 'Farshad'}
                />
                <TextComp
                  isDynamic
                  style={styles.phone}
                  text={String(userData?.whatsapp_number || '+966 348 306 063')}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileUpdate')}
                style={styles.editButton}>
                <EditIcon
                  color={commonColors.textSecondary}
                  height={ms(26)}
                  width={ms(26)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.profileSection}>
          <TextComp style={styles.sectionTitle} text="MY_PROFILE" />
          <AccountItem
            label={t('MY_INFORMATION')}
            leftIcon={
              <ImageComp
                resizeMode="contain"
                source={UserIcon}
                style={{height: ms(22), width: ms(22)}}
              />
            }
            // onPress={() => {
            //   navigation.navigate('MyAddress');
            // }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('MY_INFORMATION_SUBTITLE')}
          />

          <AccountItem
            label={t('MY_ADDRESS')}
            leftIcon={
              <LocationIcon
                color={commonColors.textSecondary}
                height={ms(22)}
                width={ms(22)}
              />
            }
            onPress={() => {
              navigation.navigate('MyAddress');
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('MY_ADDRESS_SUBTITLE')}
          />

          <AccountItem
            label={t('MY_ORDERS_PLANS')}
            leftIcon={
              <ImageComp
                resizeMode="contain"
                source={PackageIcon}
                style={{height: ms(22), width: ms(22)}}
              />
            }
            onPress={() => {
              navigation.navigate('Orders');
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('MY_ORDERS_PLANS_SUBTITLE')}
          />
        </View>

        <View style={styles.settingsSection}>
          <TextComp style={styles.settingsTitle} text="SETTINGS_PREFERENCE" />

          <AccountItem
            label={t('NOTIFICATIONS')}
            leftIcon={
              <NotificationIcon
                color={commonColors.textSecondary}
                height={ms(22)}
                width={ms(22)}
              />
            }
            onPress={() => {
              // Navigate to Notifications screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('NOTIFICATIONS_SUBTITLE')}
          />

          <AccountItem
            label={t('BUSINESS_INFORMATION')}
            leftIcon={
              <ImageComp
                resizeMode="contain"
                source={InfoIcon}
                style={{height: ms(22), width: ms(22)}}
              />
            }
            onPress={() => {
              // Navigate to Business Information screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('BUSINESS_INFORMATION_SUBTITLE')}
          />

          <AccountItem
            label={t('LANGUAGE')}
            leftIcon={
              <LanguageIcon
                color={commonColors.textSecondary}
                height={ms(22)}
                width={ms(22)}
              />
            }
            onPress={() => {
              // Navigate to Language screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('LANGUAGE_SUBTITLE')}
          />

          <AccountItem
            label={t('CHANGE_PASSWORD')}
            leftIcon={
              <ImageComp
                resizeMode="contain"
                source={PasswordIcon}
                style={{height: ms(22), width: ms(22)}}
              />
            }
            onPress={() => navigation.navigate('ChangePassword')}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('CHANGE_PASSWORD_SUBTITLE')}
          />

          <AccountItem
            label={t('DELETE_ACCOUNT')}
            // labelColor={commonColors.error}
            leftIcon={
              <ImageComp
                resizeMode="contain"
                source={DeleteUserIcon}
                style={{height: ms(22), width: ms(22)}}
              />
            }
            onPress={() => {
              // Navigate to Delete Account screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('DELETE_ACCOUNT_SUBTITLE')}
          />

          <AccountItem
            label={t('PRIVACY_POLICY')}
            leftIcon={
              <PrivacyPolicyIcon
                color={commonColors.textSecondary}
                height={ms(22)}
                width={ms(22)}
              />
            }
            onPress={() => {
              // Navigate to Privacy Policy screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('PRIVACY_POLICY_SUBTITLE')}
          />

          <AccountItem
            label={t('CONTACT')}
            leftIcon={
              <ContactIcon
                color={commonColors.textSecondary}
                height={ms(22)}
                width={ms(22)}
              />
            }
            onPress={() => {
              // Navigate to Contact screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('CONTACT_SUBTITLE')}
          />

          <AccountItem
            label={t('FAQ')}
            leftIcon={
              <FAQIcon
                color={commonColors.textSecondary}
                height={ms(22)}
                width={ms(22)}
              />
            }
            onPress={() => {
              // Navigate to FAQ screen
            }}
            rightOption={
              <ImageComp
                resizeMode="contain"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            }
            subtitle={t('FAQ_SUBTITLE')}
          />
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isSubmitting}
            onPress={onLogout}
            style={[
              styles.logoutContent,
              isSubmitting ? styles.logoutDisabled : {},
            ]}>
            <View style={styles.logoutIconWrapper}>
              {isSubmitting ? (
                <ActivityIndicator color={commonColors.error} size="small" />
              ) : (
                <LogoutIcon
                  width={ms(26)}
                  height={ms(26)}
                  stroke={commonColors.error}
                />
              )}
            </View>
            <TextComp style={styles.logoutLabel} text="LOGOUT" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
});

export default Profile;
