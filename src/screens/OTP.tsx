import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import OTPInput from '../components/OTPInput';

const OTP = () => {
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const tint = useThemeColor({}, 'tint');
  const [otpValue, setOtpValue] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
  });
  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Input OTP" />
      <View style={styles.container}>
        <Text style={[styles.desc, {color: textColor}]}>
          Masukkan kode OTP yang telah dikirimkan melalui WhatsApp ke nomor
          08123456789
        </Text>
        <Gap height={40} />
        <OTPInput value={otpValue} setValue={setOtpValue} />
        <Text style={[styles.link, {color: textColor2}]}>
          Tidak mendapatkan pesan?{' '}
          <Text style={{fontWeight: '600', color: tint}}>Kirim ulang OTP</Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default OTP;

const styles = StyleSheet.create({
  desc: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    marginTop: 40,
  },
  container: {
    paddingHorizontal: 24,
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 24,
  },
});
