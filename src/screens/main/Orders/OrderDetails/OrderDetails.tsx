import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';
import i18n, {t} from 'i18next';
import {observer} from 'mobx-react-lite';

import {useOrder} from '@/api/graphql/orders/hooks';
import {OrderItem, StatusLog} from '@/api/graphql/orders/types';
import {CheckmarkCircleIcon, LocationIcon} from '@/assets/icons';
import PaymentIcon from '@/assets/images/payment/payment.svg';
import AmountWithCurrency from '@/components/AmountWithCurrency';
import HeaderComp from '@/components/HeaderComp';
import ImageComp from '@/components/ImageComp/ImageComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {MainStackParamList} from '@/navigation/types';
import {commonColors, ThemeType} from '@/styles/colors';
import {ms, vs} from '@/styles/scaling';

import useRTLStyles from './styles';

type OrderDetailsRouteProp = RouteProp<MainStackParamList, 'OrderDetails'>;

const OrderDetails = observer(() => {
  const route = useRoute<OrderDetailsRouteProp>();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const {orderId, orderNo} = route.params || {};

  const {
    order,
    loading,
    error: orderError,
    refetch,
  } = useOrder({
    orderId,
    orderNo,
    skip: !orderId && !orderNo,
  });

  useEffect(() => {
    if (orderId || orderNo) {
      refetch();
    }
  }, [orderId, orderNo, refetch]);

  const parsedAddress = useMemo(() => {
    if (!order?.shipping_address) {
      return null;
    }
    try {
      return JSON.parse(order.shipping_address);
    } catch (error) {
      return null;
    }
  }, [order?.shipping_address]);

  const getImageSource = (
    coverImage: string | null | undefined
  ): string | null => {
    if (!coverImage || coverImage.trim() === '') {
      return null;
    }
    return coverImage;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString, 10));
    const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(parseInt(dateString, 10));
    const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAddress = (address: {
    contact_name?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
  }): string => {
    const parts = [
      address.address_line1,
      address.address_line2,
      address.city,
      address.state,
      address.postal_code,
      address.country,
    ].filter(part => part && part.trim() !== '');

    return parts.join(', ');
  };

  const getPaymentMethodText = (paymentMethod: string): string => {
    const methodMap: Record<string, string> = {
      WALLET: 'WALLET',
      COD: 'COD',
      CREDIT: 'CREDIT',
      DEBIT_CREDIT: 'DEBIT_CREDIT',
    };
    return methodMap[paymentMethod] || paymentMethod;
  };

  const getStatusDisplayText = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: 'PENDING',
      processing: 'PROCESSING',
      shipped: 'SHIPPED',
      delivered: 'DELIVERED',
      cancelled: 'CANCELLED',
    };
    return statusMap[status.toLowerCase()] || status.toUpperCase();
  };

  const renderStatusItem = (
    statusLog: StatusLog,
    index: number,
    totalLogs: number
  ) => {
    const isLast = index === totalLogs - 1;

    return (
      <View key={statusLog.id} style={styles.statusItem}>
        <View style={styles.statusLeft}>
          <View style={styles.statusCircle}>
            <CheckmarkCircleIcon
              fill={commonColors.success}
              height={ms(20)}
              width={ms(20)}
            />
          </View>
          {!isLast && <View style={styles.statusLine} />}
        </View>
        <View style={styles.statusContent}>
          <View style={styles.statusHeader}>
            <TextComp
              text={getStatusDisplayText(statusLog.new_status)}
              style={styles.statusTitle}
            />
          </View>
          <TextComp
            isDynamic
            text={formatDateTime(statusLog.created_at)}
            style={styles.statusDate}
          />
        </View>
      </View>
    );
  };

  const renderOrderItem = (item: OrderItem) => {
    const imageSource = getImageSource(item.product?.cover_image);
    const hasImage = imageSource && imageSource.trim() !== '';

    return (
      <View key={item.id} style={styles.productCard}>
        {hasImage ? (
          <ImageComp
            source={imageSource}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.productImagePlaceholder} />
        )}
        <View style={styles.productDetails}>
          <TextComp
            isDynamic
            text={item.product?.name || ''}
            style={styles.productName}
            numberOfLines={2}
          />
          <View style={styles.productFooter}>
            <AmountWithCurrency
              amound={item.price}
              amountStyle={styles.productPrice}
              gap={vs(3)}
            />
            <TextComp isDynamic text=" | " style={styles.separator} />
            <TextComp
              isDynamic
              text={`${t('QTY_COLON')} ${item.quantity}`}
              style={styles.productQuantity}
            />
          </View>
        </View>
      </View>
    );
  };

  if (loading && !order) {
    return (
      <WrapperContainer>
        <HeaderComp showBack={true} title="ORDER_DETAILS" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={commonColors.primary} />
        </View>
      </WrapperContainer>
    );
  }

  if (orderError) {
    return (
      <WrapperContainer>
        <HeaderComp showBack={true} title="ORDER_DETAILS" />
        <View style={styles.emptyContainer}>
          <TextComp text="ERROR_LOADING_ORDER" style={styles.emptyText} />
        </View>
      </WrapperContainer>
    );
  }

  if (!order) {
    return (
      <WrapperContainer>
        <HeaderComp showBack={true} title="ORDER_DETAILS" />
        <View style={styles.emptyContainer}>
          <TextComp text="NO_ORDERS" style={styles.emptyText} />
        </View>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer>
      <HeaderComp showBack={true} title="ORDER_DETAILS" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.orderIdContainer}>
          <TextComp
            isDynamic
            text={`${t('ORDER_ID')} - ${order.order_no}`}
            style={styles.orderIdText}
          />
        </View>

        {order.order_items && order.order_items.length > 0 ? (
          <View style={styles.productsList}>
            {order.order_items.map(item => renderOrderItem(item))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <TextComp text="NO_ITEMS_AVAILABLE" style={styles.emptyText} />
          </View>
        )}
        <View style={styles.generalInfoContainer}>
          <TextComp text="GENERAL_INFO" style={styles.generalInfoText} />
        </View>

        <View style={styles.orderInfoCard}>
          <View style={styles.orderInfoRow}>
            <TextComp text="ORDER_NUMBER" style={styles.orderInfoLabel} />
            <TextComp
              isDynamic
              text={order.order_no}
              style={styles.orderInfoValue}
            />
          </View>
          <View style={styles.orderInfoDivider} />
          <View style={styles.orderInfoRowLast}>
            <TextComp text="ORDER_DATE" style={styles.orderInfoLabel} />
            <TextComp
              isDynamic
              text={formatDate(order.created_at)}
              style={styles.orderInfoValue}
            />
          </View>
        </View>

        <View style={styles.generalInfoContainer}>
          <TextComp text="ORDER_STATUS" style={styles.generalInfoText} />
        </View>

        <View style={styles.statusTimelineContainer}>
          {order.status_logs && order.status_logs.length > 0 ? (
            [...order.status_logs]
              .sort(
                (a, b) =>
                  parseInt(a.created_at, 10) - parseInt(b.created_at, 10)
              )
              .map((statusLog, index, sortedLogs) =>
                renderStatusItem(statusLog, index, sortedLogs.length)
              )
          ) : (
            <>
              {/* Fallback: Order Confirmed Status */}
              <View style={styles.statusItem}>
                <View style={styles.statusLeft}>
                  <View style={styles.statusCircle}>
                    <CheckmarkCircleIcon
                      fill={commonColors.success}
                      height={ms(20)}
                      width={ms(20)}
                    />
                  </View>
                  {order.order_status !== 'delivered' && (
                    <View style={styles.statusLine} />
                  )}
                </View>
                <View style={styles.statusContent}>
                  <View style={styles.statusHeader}>
                    <TextComp
                      text="ORDER_CONFIRMED"
                      style={styles.statusTitle}
                    />
                  </View>
                  <TextComp
                    isDynamic
                    text={formatDateTime(order.created_at)}
                    style={styles.statusDate}
                  />
                </View>
              </View>

              {/* Fallback: Delivered Status */}
              {order.order_status === 'delivered' && order.delivered_at ? (
                <View style={styles.statusItem}>
                  <View style={styles.statusLeft}>
                    <View style={styles.statusCircle}>
                      <CheckmarkCircleIcon
                        fill={commonColors.success}
                        height={ms(20)}
                        width={ms(20)}
                      />
                    </View>
                  </View>
                  <View style={styles.statusContent}>
                    <View style={styles.statusHeader}>
                      <TextComp text="DELIVERED" style={styles.statusTitle} />
                    </View>
                    <TextComp
                      isDynamic
                      text={formatDateTime(order.delivered_at)}
                      style={styles.statusDate}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.statusItem}>
                  <View style={styles.statusLeft}>
                    <View style={styles.statusCirclePending} />
                  </View>
                  <View style={styles.statusContent}>
                    <View style={styles.statusHeader}>
                      <TextComp
                        text="DELIVERED"
                        style={styles.statusTitlePending}
                      />
                    </View>
                    {order.estimated_delivery_date && (
                      <TextComp
                        isDynamic
                        text={formatDateTime(order.estimated_delivery_date)}
                        style={styles.statusDatePending}
                      />
                    )}
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        <View style={styles.generalInfoContainer}>
          <TextComp text="DELIVERY_ADDRESS" style={styles.generalInfoText} />
        </View>
        {parsedAddress ? (
          <View style={styles.addressCard}>
            <View style={styles.addressCardContent}>
              <View style={styles.locationIconContainer}>
                <LocationIcon height={ms(20)} width={ms(20)} />
              </View>
              <View style={styles.addressTextContainer}>
                {parsedAddress.contact_name ? (
                  <TextComp
                    isDynamic
                    text={parsedAddress.contact_name}
                    style={styles.addressName}
                  />
                ) : null}
                <TextComp
                  isDynamic
                  text={formatAddress(parsedAddress)}
                  style={styles.addressText}
                />
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.generalInfoContainer}>
          <TextComp text="PAYMENT_METHOD" style={styles.generalInfoText} />
        </View>
        {order.payment_method ? (
          <View style={styles.paymentCard}>
            <View style={styles.paymentCardContent}>
              <View style={styles.paymentIconContainer}>
                <PaymentIcon height={ms(22)} width={ms(22)} />
              </View>
              <View style={styles.paymentTextContainer}>
                <TextComp
                  text={getPaymentMethodText(order.payment_method)}
                  style={styles.paymentText}
                />
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.generalInfoContainer}>
          <TextComp text="PRICE_DETAILS" style={styles.generalInfoText} />
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <TextComp text="ITEM_TOTAL" style={styles.priceLabel} />
            <AmountWithCurrency
              amound={order.subtotal}
              amountStyle={styles.priceValue}
              gap={vs(3)}
            />
          </View>
          {order.discount && order.discount > 0 ? (
            <>
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <TextComp text="DISCOUNT" style={styles.priceLabel} />
                <AmountWithCurrency
                  amound={-order.discount}
                  amountStyle={styles.priceValue}
                  gap={vs(3)}
                />
              </View>
            </>
          ) : null}
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <TextComp text="VAT" style={styles.priceLabel} />
            <AmountWithCurrency
              amound={order.vat_amount}
              amountStyle={styles.priceValue}
              gap={vs(3)}
            />
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <TextComp text="DELIVERY_CHARGES" style={styles.priceLabel} />
            <AmountWithCurrency
              amound={order.shipping_cost}
              amountStyle={styles.priceValue}
              gap={vs(3)}
            />
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <TextComp text="TOTAL_PRICE" style={styles.totalLabel} />
            <AmountWithCurrency
              amound={order.total_amount}
              amountStyle={styles.totalValue}
              gap={vs(3)}
            />
          </View>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
});

export default OrderDetails;
