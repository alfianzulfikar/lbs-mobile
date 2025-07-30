import {StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import LottieView from 'lottie-react-native';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';

const KYCWaiting = () => {
  const textColor2 = useThemeColor({}, 'text');
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <View
          style={[styles.imageWrapper, {height: height / 3, maxHeight: 180}]}>
          <LottieView
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../assets/animations/kyc-waiting.json')}
            loop={true}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>Menunggu Verifikasi Internal</Text>
          <Text style={[styles.desc, {color: textColor2}]}>
            Data KYC sedang dalam tahap review oleh internal LBS Urun Dana.
            Harap menunggu hasil verifikasi internal maksimum 1x24 jam.
          </Text>
          <Gap flex={1} />
          <Gap height={24} />
          <Button title="Selesai" onPress={() => navigation.goBack()} />
          <Gap height={24} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default KYCWaiting;

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
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
