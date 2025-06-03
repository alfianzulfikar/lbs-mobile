import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import Input from '../components/Input';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useAPI} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotificationAPI} from '../api/notification';
import {useNotification} from '../services/notification';
import {useUser} from '../api/user';

type Props = {
  route: {
    params: {
      targetRoute?: {
        mainRoute: string;
        options?: {screen?: string; params: any};
      };
    };
  };
};

const Login = ({route}: Props) => {
  const pageProps = route?.params || {};
  const {targetRoute} = pageProps;
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');
  const {apiRequest} = useAPI();

  const navigation = useNavigation();
  const {registerFCMToken} = useNotificationAPI();
  const {requestNotificationPermission} = useNotification();
  const {getUser} = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/auth/login',
        method: 'post',
        body: {
          email,
          password,
        },
      });
      await AsyncStorage.setItem('access_token', res.access_token);
      await AsyncStorage.setItem('refresh_token', res.refresh_token);

      const fcmToken = await AsyncStorage.getItem('fcm_token');
      const granted = await requestNotificationPermission();

      const userRes = await getUser();
      const user = userRes?.user;

      if (granted) {
        await registerFCMToken({
          name: user?.firstname
            ? user?.lastname
              ? user.firstname + ' ' + user.lastname
              : user.firstname
            : '',
          email: user?.email,
          fcmToken: fcmToken || '',
          platform: Platform.OS,
        });
      }

      if (targetRoute) {
        navigation.dispatch(
          StackActions.replace(targetRoute.mainRoute, {
            screen: targetRoute.options?.screen,
            params: targetRoute.options?.params,
          }),
        );
      } else {
        navigation.dispatch(StackActions.replace('MainTab'));
      }
    } catch (error: any) {
      const data = error?.data;
      let errorString = '';
      let errorKey = '';
      if (data?.errors?.msg) {
        errorKey = 'msg';
      } else if (data?.errors?.email) {
        errorKey = 'email';
      }
      if (errorKey) {
        data.errors[errorKey].map((item: string, index: number) => {
          errorString += (index == 0 ? '' : ' ') + item;
        });
      }
      if (error?.status === 422) {
        Alert.alert(errorString || 'Terjadi kesalahan.');
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      return () => {};
    }, []),
  );

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <View style={[styles.container, {paddingTop: 24}]}>
        <Text style={[styles.heading, {color: textColor}]}>Masuk Akun LBS</Text>
        {/* <Text style={[styles.desc, {color: textColor3}]}>
            Gunakan nama sesuai KTP dan pastikan email Anda aktif untuk proses
            verifikasi.
          </Text> */}
        <Gap height={40} />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(value: string) => setEmail(value)}
        />
        <Gap height={16} />
        <Input
          type="password"
          label="Kata Sandi"
          value={password}
          onChange={(value: string) => setPassword(value)}
        />
        <Text
          style={[styles.forgot, {color: tint}]}
          onPress={() =>
            navigation.navigate('Auth', {screen: 'ForgotPassword'})
          }>
          Lupa kata sandi?
        </Text>
        <Gap flex={1} />
        <Button title="Masuk Akun" onPress={submit} loading={loading} />
        <Text style={[styles.link, {color: textColor2}]}>
          Belum Punya Akun?{' '}
          <Text
            style={{fontWeight: '700', color: tint}}
            onPress={() => navigation.navigate('Auth', {screen: 'Register'})}>
            Daftar Sekarang
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

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
    marginVertical: 16,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 24,
  },
});
