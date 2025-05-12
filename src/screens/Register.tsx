import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import Input from '../components/Input';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useAPI} from '../services/api';

const Register = () => {
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');

  const navigation = useNavigation();
  const {apiRequest} = useAPI();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [error, setError] = useState({
    firstname: [],
    lastname: [],
    email: [],
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/auth/request-register',
        body: form,
      });
      navigation.navigate('AuthStack', {
        screen: 'SendEmail',
        params: {message: ''},
      });
    } catch (error: any) {
      if (error?.status === 422) {
        setError({
          firstname: error?.data?.errors?.firstname || [],
          lastname: error?.data?.errors?.lastname || [],
          email: error?.data?.errors?.email || [],
        });
      }
      console.log('submit error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <View style={[styles.container, {paddingTop: 24}]}>
        <Text style={[styles.heading, {color: textColor}]}>Register</Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          Gunakan nama sesuai KTP dan pastikan email Anda aktif untuk proses
          verifikasi.
        </Text>
        <Gap height={40} />
        <Input
          label="Nama Depan"
          value={form.firstname}
          onChange={value => setForm(prev => ({...prev, firstname: value}))}
          error={error.firstname}
        />
        <Gap height={16} />
        <Input
          label="Nama Belakang"
          value={form.lastname}
          onChange={value => setForm(prev => ({...prev, lastname: value}))}
          error={error.lastname}
        />
        <Gap height={16} />
        <Input
          type="email"
          label="Email"
          value={form.email}
          onChange={value => setForm(prev => ({...prev, email: value}))}
          error={error.email}
        />
        <Gap flex={1} />
        <Gap height={24} />
        <Button title="Buat Akun" onPress={submit} loading={loading} />
        <Text style={[styles.link, {color: textColor2}]}>
          Sudah Punya Akun?{' '}
          <Text
            style={{fontWeight: '700', color: tint}}
            onPress={() => navigation.navigate('AuthStack', {screen: 'Login'})}>
            Masuk Sekarang
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
  forgot: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 16,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 24,
  },
});
