import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {FlatList, RefreshControl, type FlatListProps} from 'react-native';

import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {ThemeType} from '@/styles/colors';

import useRTLStyles from './styles';
import ItemSaperator from '../ItemSaperator';

type IdentifiableItem = {
  id?: string | number;
};

type MyFlatListProps<ItemT extends IdentifiableItem> = FlatListProps<ItemT>;

const MyFlatList = <ItemT extends IdentifiableItem>({
  refreshing = false,
  onRefresh,
  contentContainerStyle,
  refreshControl,
  ...props
}: MyFlatListProps<ItemT>) => {
  const isRTL = useIsRTL();
  const {theme} = useTheme();
  const styles = useRTLStyles(isRTL, theme as ThemeType);

  const resolvedRefreshControl =
    refreshControl ??
    (onRefresh ? (
      <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
    ) : undefined);

  const keyExtractor = (item: ItemT, index: number) =>
    (item?.id ?? index).toString();

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        contentContainerStyle || styles.contentContainerStyle
      }
      ItemSeparatorComponent={ItemSaperator}
      refreshControl={resolvedRefreshControl}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.8}
      {...props}
    />
  );
};

export default MyFlatList;
