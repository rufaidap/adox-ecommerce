import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  // eslint-disable-next-line no-restricted-imports
  FlatList, // FlatList needed for banner carousel with refs and pagingEnabled
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';

import {ImageComp} from '@/components';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';
import {ms} from '@/styles/scaling';

import useRTLStyles from './styles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CONTAINER_MARGIN = ms(16);
const BANNER_WIDTH = SCREEN_WIDTH - CONTAINER_MARGIN * 2;

interface BannerImage {
  id: string;
  image: number; // require() result for local images
  url?: string; // Optional URL for remote images
}

interface PromotionalBannerProps {
  images?: BannerImage[];
  autoScrollInterval?: number; // Auto-scroll interval in milliseconds
  onBannerPress?: (image: BannerImage) => void;
}

/**
 * PromotionalBanner - Image slider component for promotional banners
 * Supports auto-scrolling, pagination dots, and RTL layouts
 *
 * @component
 * @example
 * <PromotionalBanner
 *   images={[
 *     { id: '1', image: require('@/assets/images/banner/1.png') },
 *     { id: '2', image: require('@/assets/images/banner/2.png') },
 *   ]}
 *   autoScrollInterval={3000}
 *   onBannerPress={(image) => console.log('Banner pressed', image)}
 * />
 */
const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  images = [],
  autoScrollInterval = 3000,
  onBannerPress,
}) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);
  const flatListRef = useRef<FlatList<BannerImage>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Default banner images if none provided
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const banner1 = require('@/assets/images/banner/1.png');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const banner2 = require('@/assets/images/banner/2.png');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const banner3 = require('@/assets/images/banner/3.png');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const banner4 = require('@/assets/images/banner/4.png');

  const defaultImages: BannerImage[] = [
    {id: '1', image: banner1},
    {id: '2', image: banner2},
    {id: '3', image: banner3},
    {id: '4', image: banner4},
  ];

  const bannerImages = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    if (bannerImages.length <= 1) {
      return;
    }

    // Auto-scroll functionality
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % bannerImages.length;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, autoScrollInterval);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bannerImages.length, autoScrollInterval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / BANNER_WIDTH);
    setCurrentIndex(index);
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const renderBannerItem = ({item}: {item: BannerImage}) => (
    <TouchableOpacity
      activeOpacity={onBannerPress ? 0.8 : 1}
      onPress={() => onBannerPress?.(item)}
      style={styles.bannerItem}>
      <ImageComp
        source={item.url || item.image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  if (bannerImages.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={bannerImages}
        renderItem={renderBannerItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: BANNER_WIDTH,
          offset: BANNER_WIDTH * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          });
        }}
      />
      {bannerImages.length > 1 && (
        <View style={styles.paginationContainer}>
          {bannerImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
              onPress={() => handleDotPress(index)}
              activeOpacity={0.7}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default PromotionalBanner;
