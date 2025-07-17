import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import OTPInput from '../components/OTPInput';
import {useThemeColor} from '../hooks/useThemeColor';
import {useAPI} from '../services/api';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import LoadingModal from '../components/LoadingModal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../constants/Types';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

type Props = NativeStackScreenProps<OrderStackParamList, 'DigitalSignature'>;

const DigitalSignature = ({route}: Props) => {
  const {kode, token} = route.params;

  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');

  const [otpValue, setOtpValue] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
  });
  const [error, setError] = useState([]);
  const [countdown, setCountdown] = useState('');
  const [loading, setLoading] = useState(false);

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

  const submit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/auth/digital-signature-validation',
        authorization: true,
        body: {
          token,
          kode,
          otp: Object.values(otpValue).join(''),
        },
      });
      console.log('submit res', res);
      if (res.statusCode === 401) {
        dispatch(
          setAlert({
            title: res.message || 'Gagal',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      } else {
        navigation.dispatch(
          StackActions.replace('Order', {screen: 'DigitalSignatureSuccess'}),
        );
      }
    } catch (error: any) {
      if (error?.status === 422) {
        console.log('resend otp', error?.data?.errors);
        dispatch(
          setAlert({
            title: 'Maaf, terjadi kesalahan',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      } else if (error?.status === 403) {
        dispatch(
          setAlert({
            title: error?.data?.errors?.msg || 'Maaf, permintaan tertolak',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      } else {
        dispatch(
          setAlert({
            title: 'Terjadi kesalahan pada sistem',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/auth/resend-digital-signature-validation',
        authorization: true,
        body: {
          kode,
        },
      });
      navigation.dispatch(
        StackActions.replace('Order', {screen: 'DigitalSignatureResend'}),
      );
    } catch (error: any) {
      dispatch(
        setAlert({
          title: `Terjadi kesalahan [Error: ${error?.status || 'system'}]`,
          desc: '',
          type: 'danger',
          showAlert: true,
        }),
      );
    } finally {
      setLoading(false);
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
      submit();
    }
  }, [otpValue.otp6]);

  useEffect(() => {
    startCountdown(180);
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Digital Signature" />
      <View style={styles.container}>
        <Text style={styles.desc}>
          Masukan kode OTP yang tertera pada email
        </Text>
        <Gap height={40} />
        <OTPInput value={otpValue} setValue={setOtpValue} error={error} />
        <Text style={[styles.link, {color: textColor2}]}>
          Tidak mendapatkan email?{' '}
        </Text>
        {countdown !== '00:00' ? (
          <Text style={{fontWeight: '400', color: textColor2}}>
            Kirim ulang dalam{' '}
            <Text style={{fontWeight: '700'}}>{countdown}</Text>
          </Text>
        ) : (
          <Text style={{fontWeight: '600', color: tint}} onPress={resendOTP}>
            Kirim ulang OTP
          </Text>
        )}
      </View>

      {loading && <LoadingModal />}
    </ScreenWrapper>
  );
};

export default DigitalSignature;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  desc: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    marginTop: 40,
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 24,
  },
});
