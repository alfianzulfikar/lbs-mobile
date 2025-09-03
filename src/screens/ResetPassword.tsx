import {Alert, Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import Input from '../components/Input';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAPI} from '../services/api';

type Props = {
  route: {
    params: {
      token: string;
    };
  };
};

const ResetPassword = ({route}: Props) => {
  const {token} = route.params;

  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');

  const navigation = useNavigation();
  const {apiRequest} = useAPI();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    password: [],
    confirmPassword: [],
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/auth/reset-password/' + token,
        body: form,
      });

      Alert.alert('Kata sandi berhasil diganti', undefined, [
        {
          text: 'Login',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Auth'}],
              }),
            );
          },
        },
      ]);
    } catch (error: any) {
      if (error?.status === 422) {
        setError({
          password: error?.data?.errors?.password || [],
          confirmPassword: error?.data?.errors?.confirmPassword || [],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <View style={[styles.container, {paddingTop: 24}]}>
        <Text style={[styles.heading, {color: textColor}]}>
          Atur Ulang Kata Sandi
        </Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          Masukkan kata sandi baru.
        </Text>
        <Gap height={40} />
        <Input
          type="password"
          label="Kata Sandi"
          value={form.password}
          onChange={value => setForm(prev => ({...prev, password: value}))}
          error={error.password}
        />
        <Gap height={16} />
        <Input
          type="password"
          label="Ulangi Kata Sandi"
          value={form.confirmPassword}
          onChange={value =>
            setForm(prev => ({...prev, confirmPassword: value}))
          }
          error={error.confirmPassword}
        />
        <Gap flex={1} />
        <Gap height={24} />
        <Button title="Kirim" onPress={submit} loading={loading} />
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;

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
