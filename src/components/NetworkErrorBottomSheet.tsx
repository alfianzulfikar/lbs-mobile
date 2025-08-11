import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import CustomBottomSheet from './BottomSheet';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {setShowNetworkError} from '../slices/globalError';

const NetworkErrorBottomSheet = ({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');

  return (
    <CustomBottomSheet
      onDismiss={() =>
        dispatch(
          setShowNetworkError({showNetworkError: false, title: '', desc: ''}),
        )
      }>
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
        {title || 'Koneksi Anda Terputus'}
      </Text>
      <Text style={[styles.emptyDesc, {color: textColor2}]}>
        {desc ||
          'Aplikasi tidak dapat mengakses internet. Silakan periksa jaringan Wi-Fi atau data seluler Anda, dan coba beberapa saat lagi.'}
      </Text>
      <Gap flex={1} />
      <Gap height={24} />
      <Button
        title="Tutup"
        onPress={() =>
          dispatch(
            setShowNetworkError({showNetworkError: false, title: '', desc: ''}),
          )
        }
      />
    </CustomBottomSheet>
  );
};

export default NetworkErrorBottomSheet;

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
