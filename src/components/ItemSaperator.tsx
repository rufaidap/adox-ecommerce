import React from 'react';
import {View, StyleSheet} from 'react-native';

import {moderateScale} from '@/styles/scaling';

const ItemSaperator: React.FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: moderateScale(10),
    width: moderateScale(10),
  },
});

export default ItemSaperator;
