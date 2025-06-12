import {useState} from 'react';
import {useAPI} from '../services/api';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

export const useRegister = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // verifikasi
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState({
    firstname: [],
    lastname: [],
    email: [],
    phone: [],
    password: [],
    confirmPassword: [],
    otp_methods: [],
  });

  // otp
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState([]);

  const submitVerification = async (
    token: string,
    body: {
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      password: string;
      confirmPassword: string;
      otp_methods: string;
    },
  ) => {
    setVerificationLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: `/auth/verify-register/${token}`,
        body,
      });
      console.log('verif success', res);
      navigation.navigate('OTP', {
        phone: body.phone,
        register: {body, token},
      });
    } catch (error: any) {
      if (error.status === 422) {
        setVerificationError({
          firstname: error.data.errors.firstname || [],
          lastname: error.data.errors.lastname || [],
          email: error.data.errors.email || [],
          phone: error.data.errors.phone || [],
          password: error.data.errors.password || [],
          confirmPassword: error.data.errors.confirmPassword || [],
          otp_methods: error.data.errors.otp_methods || [],
        });
      } else if (error.status === 400) {
        dispatch(
          setAlert({
            title:
              error.data.errors?.msg || `Token tidak valid (${error.status})`,
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      }
    } finally {
      setVerificationLoading(false);
    }
  };

  const submitOTP = async (token: string, body: any) => {
    setOtpLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: `/auth/register/${token}`,
        body,
      });
      Alert.alert(
        'Registrasi akun berhasil',
        'Silakan masuk dengan akun yang telah terdaftar',
        [
          {
            text: 'Lanjutkan',
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Auth'}],
                }),
              );
            },
          },
        ],
      );
    } catch (error: any) {
      console.log(error);
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
      setOtpLoading(false);
    }
  };

  const resendOTP = async (
    token: string,
    body: {
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      password: string;
      confirmPassword: string;
      otp_methods: string;
    },
  ) => {
    setOtpLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: `/auth/verify-register/${token}`,
        body,
      });
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
      setOtpLoading(false);
    }
  };

  return {
    otpLoading,
    verificationLoading,
    submitOTP,
    submitVerification,
    resendOTP,
    verificationError,
    otpError,
  };
};
