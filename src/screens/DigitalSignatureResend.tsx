import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';

const DigitalSignatureResend = () => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <ScreenWrapper background backgroundType="gradient">
      <View style={[styles.container, {paddingTop: 24}]}>
        <Text style={[styles.desc, {color: textColor2}]}>
          Periksa kembali email Anda, klik link yang tersedia untuk verifikasi
          kode OTP.
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default DigitalSignatureResend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
  },
  desc: {
    fontSize: 18,
    lineHeight: 28,
    marginTop: 8,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
});
