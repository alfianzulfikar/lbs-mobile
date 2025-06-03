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
import {useRegister} from '../api/register';

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
      register?: {
        body: {
          firstname: string;
          lastname: string;
          email: string;
          phone: string;
          password: string;
          confirmPassword: string;
          otp_methods: string;
        };
        // request_id: string;
        token: string;
      };
    };
  };
};

const OTP = ({route}: Props) => {
  const {market, phone: phoneParam, register} = route.params;
  const {phone: phoneState} = useSelector((item: RootState) => item.user);
  const phone = market
    ? phoneState && phoneState.split('-').length > 1
      ? '0' + phoneState.split('-')[1]
      : ''
    : phoneParam && phoneParam.split('-').length > 1
    ? '0' + phoneParam.split('-')[1]
    : '';

  // market
  const {
    sell,
    otpLoading: marketOtpLoading,
    resendOTP: resendMarketOTP,
    otpError: marketOtpError,
  } = useMarket();

  // register
  const {
    otpLoading: registerOtpLoading,
    submitOTP,
    resendOTP: resendRegisterOTP,
    otpError: registerOtpError,
  } = useRegister();

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
    if (market) {
      sell(market?.id, {
        price: market.body.price,
        volume: market.body.volume,
        otp_methods: market.body.otp_methods,
        otp: Object.values(otpValue).join(''),
      });
    } else if (register) {
      submitOTP(register.token, {
        ...register.body,
        code: Object.values(otpValue).join(''),
        request_id: 'a', // hardcode request_id
      });
    }
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
    try {
      if (market) {
        await resendMarketOTP(market?.id, market?.body);
      } else if (register) {
        await resendRegisterOTP(register?.token, register?.body);
      }
      startCountdown(180);
    } catch {}
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
    startCountdown(180);
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Input OTP" />
      <View style={styles.container}>
        <Text style={[styles.desc, {color: textColor}]}>
          Masukkan kode OTP yang telah dikirimkan melalui{' '}
          {market
            ? market.body.otp_methods === 'sms'
              ? 'SMS'
              : 'WhatsApp'
            : register?.body.otp_methods === 'sms'
            ? 'SMS'
            : 'WhatsApp'}{' '}
          ke nomor {phone}
        </Text>
        <Gap height={40} />
        <OTPInput
          value={otpValue}
          setValue={setOtpValue}
          error={market ? marketOtpError : registerOtpError}
        />
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
      {(marketOtpLoading || registerOtpLoading) && <LoadingModal />}
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
