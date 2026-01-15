import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import BoxImage from '@/assets/images/box.png';
import {ImageComp, TextComp} from '@/components';
import {commonColors} from '@/styles/colors';
import {ms, vs} from '@/styles/scaling';

interface EmptyComponentProps {
  loading?: boolean;
  emptyText?: string;
  showIcon?: boolean;
}

const EmptyComponent = ({
  loading = false,
  emptyText = '',
  showIcon = false,
}: EmptyComponentProps) => {
  return (
    <View style={styles.emptyStateContainer}>
      {loading ? (
        <ActivityIndicator size={'large'} color={commonColors.primary} />
      ) : (
        <>
          {showIcon && (
            <ImageComp
              source={BoxImage}
              style={{height: vs(240), width: vs(240)}}
            />
          )}
          <TextComp text={emptyText} style={styles.emptyStateText} />
        </>
      )}
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: vs(300),
    padding: ms(20),
  },
  emptyStateText: {
    color: commonColors.textSecondary,
    fontFamily: 'Inter-Medium',
    fontSize: ms(16),
    marginTop: vs(20),
    textAlign: 'center', // Assuming Inter font is used based on system prompt suggestion or generic
  },
});
