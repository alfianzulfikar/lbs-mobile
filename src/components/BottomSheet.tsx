import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';

const CustomBottomSheet = ({
  setShow,
  children,
  snapPoints,
  onDismiss,
  paddingHorizontal,
}: {
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  snapPoints?: string[];
  onDismiss?: () => void;
  paddingHorizontal?: number;
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor2 = useThemeColor({}, 'text2');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  const {height} = useWindowDimensions();

  // const snapPointsMemo = useMemo(() => ['75%'], []);
  const snapPointsMemo = useMemo(() => snapPoints || ['25%', '50%', '75%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => {
          bottomSheetModalRef.current?.dismiss();
        }}
      />
    ),
    [],
  );

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    // setTimeout(() => {
    //   bottomSheetModalRef.current?.expand();
    // }, 200);
  }, []);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      index={snapPointsMemo.length - 1}
      onDismiss={() => {
        if (onDismiss) {
          onDismiss();
        } else if (setShow) {
          setShow(false);
        }
      }}
      backdropComponent={renderBackdrop}
      snapPoints={snapPointsMemo}
      backgroundStyle={{backgroundColor}}
      handleIndicatorStyle={{backgroundColor: textColor2}}
      // maxDynamicContentSize={
      //   (height *
      //     Number(snapPointsMemo[snapPointsMemo.length - 1].replace('%', ''))) /
      //   100
      // }
      >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.bottomSheetContainer,
          {paddingHorizontal: paddingHorizontal ?? 24},
        ]}
        keyboardShouldPersistTaps="handled">
        <Gap height={8} />
        {children}
        <Gap height={40} />
      </BottomSheetScrollView>
    </BottomSheetModal>
    // <BottomSheet
    //   ref={bottomSheetRef}
    //   index={0}
    //   snapPoints={snapPointsMemo}
    //   backdropComponent={renderBackdrop}
    //   enableDynamicSizing={false}
    //   onChange={handleSheetChanges}
    //   onClose={() => setShow(false)}
    //   enablePanDownToClose={true}>
    //   {/* <BottomSheetView>
    //     <Text>Awesome 🎉</Text>
    //   </BottomSheetView> */}
    //   <BottomSheetScrollView
    //     showsVerticalScrollIndicator={false}
    //     style={styles.bottomSheetContainer}>
    //     <Gap height={8} />
    //     {children}
    //     <Gap height={40} />
    //   </BottomSheetScrollView>
    // </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    paddingVertical: 24,
    paddingTop: 0,
  },
});
