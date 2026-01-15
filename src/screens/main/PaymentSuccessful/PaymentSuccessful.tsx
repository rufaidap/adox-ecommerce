import React from 'react';
import {Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList} from 'react-native-gesture-handler';
import Svg, {Line} from 'react-native-svg';

import {CurrencyIcon} from '@/assets/icons';
import {ImageComp} from '@/components';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import {Colors} from '@/styles/colors';
import {scale, vs} from '@/styles/scaling';

import useRTLStyles from './styles';
import TopSellingProduct from './TopSellingProduct';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const successIcon = require('@/assets/images/Success/success.jpg');

// Mock data for top selling products
const TOP_SELLING_PRODUCTS = [
  {
    id: '1',
    name: 'Nutella Hazelnut Spread With Cocoa 400 g',
    price: 12.5,
    image: null,
    type: 'simple',
  },
  {
    id: '2',
    name: 'Jungle Muesli Nuts & Seeds 400 g',
    price: 15.75,
    image: null,
    type: 'simple',
  },
  {
    id: '3',
    name: 'Bake City Co Protein Cho Chip 113q',
    price: 8.99,
    image: null,
    type: 'simple',
  },
];

const PaymentSuccessful = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'PaymentSuccessful'>>();
  const {amount, date, time, paymentId, paymentMethod} = route.params || {};

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const colors = Colors[theme];
  const styles = useRTLStyles(isRTL, theme);
  const screenWidth = Dimensions.get('window').width;
  const dividerWidth = screenWidth - scale(16) * 2 - scale(20) * 2;

  const handleProductPress = () => {
    // Navigate to product details
    // navigation.navigate('ProductDetails', { productId: product.id });
  };

  const renderProductItem = ({item}: {item: any}) => (
    <View style={styles.productCardWrapper}>
      <TopSellingProduct
        item={item}
        styles={styles}
        colors={colors}
        onPress={handleProductPress}
        onFavouritePress={() => {
          // Handle favourite
        }}
      />
    </View>
  );

  return (
    <WrapperContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <ImageComp
            source={successIcon}
            style={styles.successIcon}
            resizeMode="contain"
          />
        </View>

        {/* Success Title */}
        <TextComp text="PAYMENT_SUCCESSFUL" style={styles.successTitle} />

        {/* Payment Details Card */}
        <View style={styles.paymentCard}>
          <View style={styles.paymentAmountContainer}>
            <View style={styles.amountWithCurrencyContainer}>
              <CurrencyIcon
                height={vs(31.29)}
                style={styles.currencyIcon}
                width={scale(28)}
              />
              <TextComp
                isDynamic
                text={amount ? amount.toFixed(2) : '0.00'}
                style={styles.paymentAmount}
              />
            </View>
          </View>
          <View style={styles.dateTimeContainer}>
            <TextComp isDynamic text={date || ''} style={styles.dateText} />
            <View style={styles.dateTimeSeparator} />
            <TextComp isDynamic text={time || ''} style={styles.timeText} />
          </View>
          <View style={styles.dividerContainer}>
            <Svg height={1} style={styles.dividerSvg} width={dividerWidth}>
              <Line
                stroke={colors.border}
                strokeDasharray="4 4"
                strokeWidth={1}
                x1="0"
                x2={dividerWidth}
                y1="0.5"
                y2="0.5"
              />
            </Svg>
          </View>
          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoItem}>
              <TextComp text="PAYMENT_ID" style={styles.paymentInfoLabel} />
              <TextComp
                isDynamic
                text={paymentId || ''}
                style={styles.paymentInfoValue}
              />
            </View>
            <View style={styles.paymentInfoItemRight}>
              <TextComp text="PAYMENT_METHOD" style={styles.paymentInfoLabel} />
              <TextComp
                isDynamic
                text={paymentMethod || ''}
                style={styles.paymentInfoValue}
              />
            </View>
          </View>
        </View>

        {/* Appreciation Message */}
        <TextComp text="APPRECIATE_VISIT" style={styles.appreciationMessage} />

        {/* Top Selling Products Section */}
        <View style={styles.topSellingSection}>
          <View style={styles.sectionHeader}>
            <TextComp text="TOP_SELLING_PRODUCT" style={styles.sectionTitle} />
            <TouchableOpacity activeOpacity={0.7}>
              <TextComp text="SEE_ALL" style={styles.seeAllText} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={TOP_SELLING_PRODUCTS}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default PaymentSuccessful;
