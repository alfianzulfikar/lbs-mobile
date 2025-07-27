import {
  Alert,
  Image,
  NativeModules,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Text from './Text';
import CustomBottomSheet from './BottomSheet';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {setShowRootError} from '../slices/globalError';

const RootErrorBottomSheet = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');

  const {AppExitModule} = NativeModules;

  return (
    <CustomBottomSheet
      onDismiss={() => {
        if (Platform.OS === 'android') {
          AppExitModule.exitApp();
        }
      }}>
      <View style={styles.emptyContainer}>
        <Image
          source={
            colorScheme === 'dark'
              ? require('../assets/images/empty-network-dark.png')
              : require('../assets/images/empty-network-light.png')
          }
          style={{width: 160, height: 160}}
          resizeMode="cover"
        />
      </View>
      <Text style={[styles.emptyTitle, {color: textColor}]}>
        Peringatan Keamanan
      </Text>
      <Text style={[styles.emptyDesc, {color: textColor2}]}>
        Untuk alasan keamanan, aplikasi LBS tidak dapat berjalan di perangkat
        yang di-
        <Text style={{fontStyle: 'italic'}}>
          {Platform.OS === 'android' ? 'root' : 'jailbreak'}
        </Text>
        . Mohon gunakan perangkat lain.
      </Text>
      <Gap flex={1} />
      <Gap height={24} />
      <Button
        title="Tutup"
        onPress={() => {
          if (Platform.OS === 'android') {
            AppExitModule.exitApp();
          }
        }}
      />
    </CustomBottomSheet>
  );
};

export default RootErrorBottomSheet;

const styles = StyleSheet.create({
  emptyContainer: {
    width: '100%',
    height: 136,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});
