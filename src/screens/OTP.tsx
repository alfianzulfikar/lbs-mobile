import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import OTPInput from '../components/OTPInput';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import LoadingModal from '../components/LoadingModal';
import {useMarket} from '../api/market';

type Props = {
  route: {
    params: {
      phone?: string;
      market?: {
        id: number;
        body: {
          price: number;
          volume: number;
          otp_methods: 'whatsapp' | 'sms';
        };
      };
    };
  };
};

const OTP = ({route}: Props) => {
  const {market, phone: phoneParam} = route.params;
  const {phone: phoneState} = useSelector((item: RootState) => item.user);
  const phone =
    phoneParam || phoneState.split('-').length > 1
      ? '0' + phoneState.split('-')[1]
      : '';
  const {sell, otpLoading, resendOTP, otpError} = useMarket();

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
  const [countdown, setCountdown] = useState('');

  const startCountdown = (duration: number) => {
    let timer = duration,
      minutes,
      seconds;
    const interval = setInterval(() => {
      minutes = Math.floor(timer / 60);
      seconds = Math.round(timer % 60);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      setCountdown(minutes + ':' + seconds);

      if (--timer < 0) {
        clearInterval(interval);
        setCountdown('00:00');
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    if (market)
      sell(market?.id, {
        price: market.body.price,
        volume: market.body.volume,
        otp_methods: market.body.otp_methods,
        otp: Object.values(otpValue).join(''),
      });
  };

  const handleResend = async () => {
    setOtpValue({
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    });
    if (market) {
      try {
        await resendOTP(market?.id, market?.body);
        startCountdown(20);
      } catch {}
    }
  };

  useEffect(() => {
    if (
      otpValue.otp1 &&
      otpValue.otp2 &&
      otpValue.otp3 &&
      otpValue.otp4 &&
      otpValue.otp5 &&
      otpValue.otp6
    ) {
      handleSubmit();
    }
  }, [otpValue.otp6]);

  useEffect(() => {
    startCountdown(20);
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Input OTP" />
      <View style={styles.container}>
        <Text style={[styles.desc, {color: textColor}]}>
          Masukkan kode OTP yang telah dikirimkan melalui WhatsApp ke nomor{' '}
          {phone}
        </Text>
        <Gap height={40} />
        <OTPInput value={otpValue} setValue={setOtpValue} error={otpError} />
        <Text style={[styles.link, {color: textColor2}]}>
          Tidak mendapatkan pesan?{' '}
        </Text>
        {countdown !== '00:00' ? (
          <Text style={{fontWeight: '400', color: textColor2}}>
            Kirim ulang dalam{' '}
            <Text style={{fontWeight: '700'}}>{countdown}</Text>
          </Text>
        ) : (
          <Text style={{fontWeight: '600', color: tint}} onPress={handleResend}>
            Kirim ulang OTP
          </Text>
        )}
      </View>
      {otpLoading && <LoadingModal />}
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
