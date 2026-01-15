/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {memo, useEffect, useState, FC, ReactNode} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
  LayoutChangeEvent,
} from 'react-native';

import FastImage, {
  FastImageProps,
  Priority,
  Source,
} from 'react-native-fast-image';

export interface ImageProps extends Omit<FastImageProps, 'source' | 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
  style?: ImageStyle;
  priority?: Priority;
  uploading?: boolean;
  width?: number;
  height?: number;
  children?: ReactNode;
  showIndicator?: boolean;
  indicatorSize?: number;
  source: Source | number | string;
  loaderColor?: string;
}

const ImageComp: FC<ImageProps> = memo(props => {
  const {
    children,
    containerStyle,
    indicatorSize = 20,
    loaderColor,
    priority,
    resizeMode,
    showIndicator = true,
    source,
    style,
    uploading = false,
    width,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState<{width: number; height: number} | null>(
    null
  );

  useEffect(() => {
    if (typeof uploading !== 'undefined' && uploading !== loading) {
      setLoading(uploading);
    }
  }, [loading, uploading]);

  const onLayout = (e: LayoutChangeEvent) => {
    const {height, width: layoutWidth} = e.nativeEvent.layout;
    if (layout && layout.height === height && layout.width === layoutWidth) {
      return;
    }
    setLayout(e.nativeEvent.layout);
  };

  const shouldShowIndicator =
    showIndicator &&
    typeof source === 'string' &&
    (source.startsWith('http') || source.startsWith('https'));

  let indicator = null;
  if (loading && shouldShowIndicator) {
    indicator = (
      <View style={styles.indicator}>
        <ActivityIndicator
          color={loaderColor}
          size={indicatorSize}
          animating={loading}
        />
      </View>
    );
  }

  let imageSource: Source | number = {
    priority: priority || FastImage.priority.normal,
    uri: source as string,
  };

  if (typeof source !== 'string') {
    // Local image
    imageSource = source;
  }

  let imageStyle: ImageStyle | Record<string, unknown> = style || {};

  if ((imageStyle as ImageStyle).flex === 1 && layout) {
    imageStyle = {...style} as ImageStyle;
    delete (imageStyle as ImageStyle).flex;
    imageStyle = {...imageStyle, ...layout};
  }

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <FastImage
        style={imageStyle as any}
        source={imageSource}
        resizeMode={resizeMode || FastImage.resizeMode.contain}
        onLoadStart={() => {
          setLoading(true);
        }}
        onError={() => {
          setLoading(false);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        {...rest}>
        {children}
      </FastImage>
      {indicator}
    </View>
  );
});

export default ImageComp;

const styles = StyleSheet.create({
  container: {},
  indicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
