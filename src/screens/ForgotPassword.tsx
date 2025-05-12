import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import Gap from '../components/Gap';
import Input from '../components/Input';
import Button from '../components/Button';
import {useAPI} from '../services/api';

const ForgotPassword = () => {
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');

  const navigation = useNavigation();
  const {apiRequest} = useAPI();

  const [email, setEmail] = useState('');
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/auth/request-reset-password',
        body: {
          email,
        },
      });
      navigation.navigate('AuthStack', {
        screen: 'SendEmail',
        params: {message: res?.success?.msg || ''},
      });
    } catch (error: any) {
      if (error?.status === 422) {
        setError(error?.data?.errors?.email || []);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <View style={[styles.container, {paddingTop: 40}]}>
        <Text style={[styles.heading, {color: textColor}]}>Lupa Password</Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          Masukan email yang Anda gunakan.
        </Text>
        <Gap height={40} />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={value => setEmail(value)}
          error={error}
        />
        <Gap flex={1} />
        <Button title="Kirim" onPress={submit} loading={loading} />
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;

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
