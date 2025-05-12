import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import {bottomHeight} from '../utils/getNotchHeight';

const BottomSheet = ({
  setShow,
  children,
  snapPoints,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  snapPoints?: string[];
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor2 = useThemeColor({}, 'text2');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const snapPointsMemo = useMemo(() => snapPoints || ['25%', '50%', '75%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        onPress={() => {
          bottomSheetModalRef.current?.dismiss();
        }}
      />
    ),
    [],
  );

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      index={1}
      onDismiss={() => setShow(false)}
      backdropComponent={renderBackdrop}
      snapPoints={snapPointsMemo}
      backgroundStyle={{backgroundColor}}
      handleIndicatorStyle={{backgroundColor: textColor2}}>
      {/* <BottomSheetView style={styles.bottomSheetContainer}>
        <Gap height={8} />
        {children}
      </BottomSheetView> */}
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bottomSheetContainer}>
        <Gap height={8} />
        {children}
        <Gap height={40} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
  },
});
