import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {RootStackParamList} from '../constants/Types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'NotificationDetail'>;

const NotificationDetail = ({route}: Props) => {
  const {description, title, code, slug} = route.params;
  return (
    <ScreenWrapper background backgroundType="gradient">
      <Gap height={24} />
      <Header
        title={
          title.includes('KYC')
            ? 'Status KYC'
            : title.includes('pesanan')
            ? 'Status Pemesanan'
            : 'Notifikasi'
        }
      />
      <View style={{marginTop: 40, paddingHorizontal: 24}}>
        <Text>{description}</Text>
      </View>
      {(code || slug) && (
        <>
          <Gap flex={1} />
          <Gap height={24} />
          <Button title={slug ? 'Detail Bisnis' : 'Selesaikan Pembayaran'} />
        </>
      )}
    </ScreenWrapper>
  );
};

export default NotificationDetail;

const styles = StyleSheet.create({});
