import React, {useCallback, useMemo} from 'react';
// eslint-disable-next-line no-restricted-imports
import {View, TouchableOpacity, FlatList} from 'react-native';

import {useBrands} from '@/api/graphql/brands/hooks';
import {ImageComp} from '@/components';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';
import {ms} from '@/styles/scaling';

import type {BrandItem, BrandsCompProps} from './BrandsComp.types';
import useRTLStyles from './styles';
import {transformBrands} from '../../utils/transformBrands';

/**
 * BrandsComp - Component for displaying brands in a horizontal scrollable list
 * Fetches brands from API if not provided via props
 *
 * @component
 * @example
 * <BrandsComp
 *   onBrandPress={(brand) => console.log('Brand pressed', brand)}
 *   onSeeAllPress={() => navigation.navigate('AllBrands')}
 * />
 */
const BrandsComp: React.FC<BrandsCompProps> = ({
  brands: brandsProp,
  onBrandPress,
  // onSeeAllPress,
  size = 8,
  page = 1,
}) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  // Fetch brands from API if not provided via props
  const {brands: apiBrands, loading: brandsLoading} = useBrands({
    size,
    page,
    skip: !!brandsProp,
  });

  // Transform API brands to component format
  const transformedBrands = useMemo(
    () => transformBrands(apiBrands),
    [apiBrands]
  );

  // Use provided brands or transformed API brands
  const brands = brandsProp || transformedBrands;

  const renderBrandItem = useCallback(({item}: {item: BrandItem}) => {
    const BrandIcon = item.Icon;
    const hasLogo = item.logo && item.logo.trim() !== '';

    const iconSize = ms(42); // Base size, could be adjusted to be proportional to width

    return (
      <TouchableOpacity
        style={styles.brandItem}
        onPress={() => onBrandPress?.(item)}
        activeOpacity={0.7}>
        <View style={styles.brandImageContainer}>
          {hasLogo ? (
            <ImageComp source={item.logo!} style={styles.brandImage} />
          ) : BrandIcon ? (
            <BrandIcon width={iconSize} height={iconSize} />
          ) : (
            <View style={styles.brandPlaceholder} />
          )}
        </View>
      </TouchableOpacity>
    );
  }, []);
  // Don't render if loading or no brands
  if (brandsLoading || brands.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <TextComp text="BRANDS" style={styles.sectionTitle} />
        {/* <TouchableOpacity activeOpacity={0.7} onPress={onSeeAllPress}>
          <TextComp text="SEE_ALL" style={styles.seeAllText} />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={brands}
        renderItem={renderBrandItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.brandsList}
      />
    </View>
  );
};

export default BrandsComp;
