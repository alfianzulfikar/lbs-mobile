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

const KYCWaiting = () => {
  const textColor2 = useThemeColor({}, 'text');
  const navigation = useNavigation();

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <Gap flex={1} />
        <View style={styles.imageWrapper}>
          <LottieView
            autoPlay
            style={{
              width: 280,
              height: 280,
              backgroundColor: 'transparent',
            }}
            source={require('../assets/animations/kyc-waiting.json')}
            loop={true}
          />
        </View>
        <Text style={styles.heading}>Menunggu Verifikasi Internal</Text>
        <Text style={[styles.desc, {color: textColor2}]}>
          Data KYC sedang dalam tahap review oleh internal LBS Urun Dana. Harap
          menunggu hasil verifikasi internal maksimum 3x24 jam.
        </Text>
        <Gap flex={1} />
        <Gap height={24} />
        <Button title="Selesai" onPress={() => navigation.goBack()} />
        <Gap height={24} />
      </View>
    </ScreenWrapper>
  );
};

export default KYCWaiting;

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
    fontWeight: '600',
    lineHeight: 24,
  },
  listDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
