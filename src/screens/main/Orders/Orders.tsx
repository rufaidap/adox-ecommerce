import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import {ORDERS} from '@/api/graphql/orders/queries';
import {Order} from '@/api/graphql/orders/types';
import {ChevronRightIcon} from '@/assets/icons';
import LogoImage from '@/assets/images/logo/logo.jpg';
import {EmptyComponent, ImageComp, MyFlatList} from '@/components';
import AmountWithCurrency from '@/components/AmountWithCurrency';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import authStore from '@/stores/authStore';
import {commonColors, ThemeType} from '@/styles/colors';
import {ms, vs} from '@/styles/scaling';
import {formatDate} from '@/utils/helper';
import {CustomError, validateGraphQlError} from '@/utils/validateGraphqlError';

import useRTLStyles from './styles';

type OrdersNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Orders'
>;

const Orders = observer(() => {
  const navigation = useNavigation<OrdersNavigationProp>();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  // Get customer ID from auth store
  const customerId = authStore.userData?.id as string | undefined;

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const page = useRef(1);
  const noMoreData = useRef(false);

  const fetchData = async () => {
    if (!customerId) return;

    setRefreshing(true);
    setLoading(true);
    page.current = 1;
    noMoreData.current = false;
    try {
      const {data} = await generalApolloClient.query({
        query: ORDERS,
        variables: {
          size: 10,
          page: page.current,
        },
        fetchPolicy: 'network-only',
      });

      if (data?.orders) {
        setOrders(data.orders.data || []);

        if (data.orders.currentPage === data.orders.totalPages) {
          noMoreData.current = true;
        } else {
          page.current = page.current + 1;
        }
      }
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      validateGraphQlError(error as CustomError);
      setRefreshing(false);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [customerId])
  );

  const onEndReached = async () => {
    if (!loadingMore && !noMoreData.current && page.current !== 1) {
      setLoadingMore(true);

      try {
        const {data} = await generalApolloClient.query({
          query: ORDERS,
          variables: {
            size: 10,
            page: page.current,
          },
          fetchPolicy: 'network-only',
        });

        if (data?.orders?.data) {
          setOrders(prev => [...prev, ...data.orders.data]);

          if (data.orders.currentPage === data.orders.totalPages) {
            noMoreData.current = true;
          } else {
            page.current = page.current + 1;
          }
        }
        setLoadingMore(false);
      } catch (error) {
        validateGraphQlError(error as CustomError);
        setLoadingMore(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return commonColors.warning;
      case 'processing':
        return commonColors.primary;
      case 'shipped':
        return commonColors.info;
      case 'delivered':
        return commonColors.success;
      case 'cancelled':
        return commonColors.error;
      default:
        return commonColors.textSecondary;
    }
  };

  const renderOrderItem = ({item}: {item: Order}) => {
    const deliveryDate = item.delivered_at
      ? formatDate(item.delivered_at)
      : item.estimated_delivery_date
      ? formatDate(item.estimated_delivery_date)
      : formatDate(item.created_at);

    // Calculate total item count from order_items
    const totalItems =
      item.order_items?.reduce(
        (sum, orderItem) => sum + orderItem.quantity,
        0
      ) || 0;

    const itemsText = totalItems === 1 ? '1 item' : `${totalItems} items`;

    return (
      <TouchableOpacity
        style={styles.orderCard}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('OrderDetails', {
            orderId: item.id,
            orderNo: item.order_no,
          });
        }}>
        <View style={styles.orderHeader}>
          <TextComp
            isDynamic
            text={`#${item.order_no}`}
            style={styles.orderId}
          />
          <TextComp
            isDynamic
            text={item.order_status}
            style={[
              styles.statusText,
              {color: getStatusColor(item.order_status)},
            ]}
          />
        </View>

        <View style={styles.orderContent}>
          <View style={styles.cartIconContainer}>
            <ImageComp
              source={LogoImage}
              resizeMode="cover"
              style={styles.logoImage}
            />
          </View>
          <View style={styles.orderDetails}>
            <AmountWithCurrency
              amound={item.total_amount}
              amountStyle={styles.orderPrice}
              gap={vs(3)}
            />
            <TextComp isDynamic text={itemsText} style={styles.itemsCount} />
            <View style={styles.dateRow}>
              <TextComp
                isDynamic
                text={deliveryDate}
                style={styles.deliveryDate}
              />
              <ImageComp
                resizeMode="cover"
                source={ChevronRightIcon}
                style={{height: ms(12), width: ms(10)}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{paddingVertical: vs(20)}}>
        <ActivityIndicator size="small" color={commonColors.primary} />
      </View>
    );
  };

  return (
    <WrapperContainer>
      <HeaderComp showBack={true} title="MY_ORDERS" />
      <MyFlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyComponent
            loading={loading && !refreshing}
            emptyText="NO_ORDERS_MESSAGE"
          />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        ListFooterComponent={renderFooter}
      />
    </WrapperContainer>
  );
});

export default Orders;
