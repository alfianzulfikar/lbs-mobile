import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import LottieView from 'lottie-react-native';
import Button from '../components/Button';
import ICKTP from '../components/icons/ICKTP';
import {useThemeColor} from '../hooks/useThemeColor';
import {StackActions, useNavigation} from '@react-navigation/native';

const KYC = () => {
  const textColor = useThemeColor({}, 'text');
  const textColor3 = useThemeColor({}, 'text3');
  const navigation = useNavigation();

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <View style={styles.imageWrapper}>
          <LottieView
            autoPlay
            style={{
              width: 280,
              height: 280,
              backgroundColor: 'transparent',
            }}
            source={require('../assets/animations/kyc.json')}
            loop={true}
          />
        </View>
        <Text style={styles.heading}>Siapkan Identitas Anda</Text>
        <Text style={styles.desc}>
          Sebelum memulai pengisian KYC, harap menyiapkan dokumen berikut:
        </Text>
        <Gap height={40} />
        <View style={{flexDirection: 'row'}}>
          <ICKTP color={textColor} />
          <View style={{marginLeft: 8, flex: 1}}>
            <Text style={styles.listTitle}>Kartu Tanda Penduduk</Text>
          </View>
        </View>
        <Gap height={24} />
        <View style={{flexDirection: 'row'}}>
          <ICKTP color={textColor} />
          <View style={{marginLeft: 8, flex: 1}}>
            <Text style={styles.listTitle}>
              Single Investor Identification (Jika Ada)
            </Text>
          </View>
        </View>
        <Gap flex={1} />
        <Gap height={24} />
        <Button
          title="Mulai isi KYC"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('KYC', {screen: 'KYCPersonal'}),
            )
          }
        />
        <Gap height={24} />
      </View>
    </ScreenWrapper>
  );
};

export default KYC;

const styles = StyleSheet.create({
  imageWrapper: {
    width: 280,
    height: 280,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    textAlign: 'center',
    marginTop: 40,
  },
  desc: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  listDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
