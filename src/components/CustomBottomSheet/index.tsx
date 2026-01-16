import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  ReactNode,
} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//import CloseIcon from '@/assets/images/close.svg';
import TextComp from '@/components/TextComp';
import {useTheme} from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import {Colors, ThemeColors} from '@/styles/colors';
import {ms, vs} from '@/styles/scaling';

import useStyles from './styles';

export interface CustomBottomSheetRef {
  present: () => void;
  close: () => void;
}

interface CustomBottomSheetProps {
  title?: string;
  showCloseIcon?: boolean;
  children: ReactNode;
}

const renderBackdrop = (renderProps: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...renderProps}
    disappearsOnIndex={-1}
    appearsOnIndex={1}
    opacity={0.5}
  />
);

const CustomBottomSheet = forwardRef<
  CustomBottomSheetRef,
  CustomBottomSheetProps
>(({title = '', showCloseIcon = false, children}, ref) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {top: safeTop, bottom: safeBottom} = useSafeAreaInsets();
  const {theme} = useTheme();
  const isRTL = useIsRTL();
  const colors = Colors[theme];
  const styles = useStyles(theme, colors as ThemeColors, isRTL);

  useImperativeHandle(
    ref,
    () => ({
      present() {
        bottomSheetRef.current?.present();
      },
      close() {
        bottomSheetRef.current?.close();
      },
    }),
    []
  );

  return (
    <BottomSheetModal
      index={0}
      enablePanDownToClose
      enableOverDrag={false}
      handleIndicatorStyle={{backgroundColor: colors.secondary}}
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      enableContentPanningGesture={false}
      enableDynamicSizing={true}
      topInset={safeTop + vs(15)}>
      <BottomSheetView style={{paddingBottom: safeBottom || vs(15)}}>
        <View style={styles.headerContainer}>
          {showCloseIcon ? (
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={styles.closeButton}>
              {/* <CloseIcon
                width={ms(14.25)}
                height={ms(14.25)}
                fill={colors.text}
              /> */}
            </TouchableOpacity>
          ) : null}
          <TextComp
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.headerText}
            text={title || 'Choose option'}
          />
        </View>
        <View style={{padding: vs(15)}}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default memo(CustomBottomSheet);
