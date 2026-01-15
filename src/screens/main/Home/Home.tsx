import React from 'react';
import {ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HomeHeaderComp} from '@/components';
import WrapperContainer from '@/components/WrapperContainer';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import type {MainTabScreenNavigationProp} from '@/navigation/types';
import {ThemeType} from '@/styles/colors';

import BrandsComp from './components/BrandsComp/BrandsComp';
import CategoriesComp from './components/CategoriesComp/CategoriesComp';
import HorizontalProductList from './components/HorizontalProductList/HorizontalProductList';
import PromotionalBanner from './components/PromotionalBanner/PromotionalBanner';
import useRTLStyles from './styles';

type HomeNavigationProp = MainTabScreenNavigationProp<'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const {bottom: safeAreaBottom} = useSafeAreaInsets();
  const styles = useRTLStyles(isRTL, theme as ThemeType, safeAreaBottom);

  const handleCartPress = () => {
    // Navigate to Cart tab
    navigation.navigate('Cart');
  };

  const handleFavouritesPress = () => {
    // Navigate to favourites screen when available
  };

  const handleLocationPress = () => {
    // Handle location selection
  };

  const handleBrandPress = (_brand: unknown) => {
    // Handle brand selection
  };

  const handleCategoryPress = (_category: unknown) => {
    // Handle category selection
  };

  const handleOfferPress = (_offer: unknown) => {
    // Handle offer selection
  };

  return (
    <WrapperContainer>
      <HomeHeaderComp
        onLocationPress={handleLocationPress}
        onFavouritesPress={handleFavouritesPress}
        onCartPress={handleCartPress}
        onSearchPress={() => navigation.navigate('Search', {type: 'products'})}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <PromotionalBanner
          autoScrollInterval={3000}
          onBannerPress={_image => {
            // Handle banner press - navigate to promotion or product
          }}
        />

        {/* Brands Section */}
        <BrandsComp
          onBrandPress={handleBrandPress}
          onSeeAllPress={() => {
            navigation.navigate('ProductListing', {label: 'Brands'});
          }}
        />

        {/* Categories Section */}
        <CategoriesComp
          onCategoryPress={handleCategoryPress}
          onSeeAllPress={() => {
            navigation.navigate('Category');
          }}
        />

        <HorizontalProductList
          onOfferPress={handleOfferPress}
          onSeeAllPress={() => {
            navigation.navigate('ProductListing', {label: 'Top Offers'});
          }}
          productFilter={{is_active: true}}
          label={'Top Offers'}
        />

        <HorizontalProductList
          onOfferPress={handleOfferPress}
          onSeeAllPress={() => {
            navigation.navigate('ProductListing', {
              label: 'Top Selling Products',
            });
          }}
          productFilter={{is_active: true}}
          label={'Top Selling Products'}
          cardType={'secondary'}
        />

        <HorizontalProductList
          onOfferPress={handleOfferPress}
          onSeeAllPress={() => {
            navigation.navigate('ProductListing', {label: 'Combo Offer'});
          }}
          productFilter={{is_active: true}}
          label={'Combo Offer'}
        />

        <HorizontalProductList
          onOfferPress={handleOfferPress}
          onSeeAllPress={() => {
            navigation.navigate('ProductListing', {label: 'Best Deals'});
          }}
          productFilter={{is_active: true}}
          label={'Best Deals'}
        />
      </ScrollView>
    </WrapperContainer>
  );
};

export default Home;
