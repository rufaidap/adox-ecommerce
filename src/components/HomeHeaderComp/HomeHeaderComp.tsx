import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {t} from 'i18next';
import {observer} from 'mobx-react-lite';

import { 
  SearchIcon,
} from '@/assets/icons';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL'; 
import {Colors, ThemeType} from '@/styles/colors';
import {ms} from '@/styles/scaling';

import useRTLStyles from './styles';

interface HomeHeaderCompProps {
 
}

/**
 * HomeHeaderComp - Reusable header component for home screen
 * Includes location selector, favourites, cart with badge, and search bar
 *
 * @component
 * @example
 * <HomeHeaderComp
 *   onLocationPress={() => console.log('Location pressed')}
 *   onFavouritesPress={() => console.log('Favourites pressed')}
 *   onCartPress={() => navigation.navigate('Cart')}
 *   onSearchPress={() => navigation.navigate('Search')}
 * />
 */
const HomeHeaderComp: React.FC<HomeHeaderCompProps> = observer(
  () => {
    const isRTL = useIsRTL();
    const {theme} = useTheme();
    const themeType = theme as ThemeType;
    const styles = useRTLStyles(isRTL, themeType);
    
    return (
      <View style={styles.header}>
        {/* <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={onLocationPress}
            activeOpacity={0.7}>
            <View style={styles.locationIcon}>
              <LocationIcon width={ms(25)} height={ms(25)} />
            </View>
            <View style={styles.locationTextContainer}>
              <View style={styles.locationTextSubContainer}>
                <TextComp text="SAUDI_ARABIA" style={styles.locationCountry} />
                <DownArrowIcon width={ms(18)} height={ms(18)} />
              </View>
              <TextComp
                text="LOCATION_ADDRESS"
                style={styles.locationAddress}
                numberOfLines={1}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onFavouritesPress}
              activeOpacity={0.7}>
              <FavouritesIcon width={ms(17)} height={ms(17)} />
              <TextComp text="FAVOURITES" style={styles.iconLabel} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onCartPress}
              activeOpacity={0.7}>
              <CartIcons width={ms(22)} height={ms(22)} />
             
              <TextComp text="CART" style={styles.iconLabel} />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Search Bar */}
        <TouchableOpacity
          activeOpacity={0.9}
          //onPress={onSearchPress}
          style={styles.searchContainer}>
          <SearchIcon
            width={ms(17)}
            height={ms(19)}
            style={styles.searchIconWrapper}
          />
          <View style={styles.searchInput}>
            <TextComp
              text={t('SEARCH_STORES_PRODUCTS')}
              style={{
                color: Colors[themeType].inputPlaceholder,
                fontSize: ms(14),
              }}
            />
          </View>
          {/* <View style={styles.searchDivider} />
          <TouchableOpacity onPress={onScanPress} activeOpacity={0.7}>
            <ScanIcon width={ms(23)} height={ms(23)} />
          </TouchableOpacity> */}
        </TouchableOpacity>
      </View>
    );
  }
);

export default HomeHeaderComp;
