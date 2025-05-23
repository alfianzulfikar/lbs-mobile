import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {bottomHeight, notchHeight} from '../utils/getNotchHeight';
import {useThemeColor} from '../hooks/useThemeColor';
import Input from '../components/Input';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Label from '../components/Label';

const AccountVerification = () => {
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('wa');

  const radioOption = [
    {name: 'WhatsApp', value: 'wa'},
    {name: 'SMS', value: 'sms'},
  ];

  const submit = async () => {
    // navigation.navigate('PaymentSuccess');
  };
  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <View style={styles.container}>
        <Gap height={24} />
        <Text style={[styles.heading, {color: textColor}]}>
          Account Verification
        </Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          Description Text for this page. Inform user to check their email
        </Text>
        <Gap height={40} />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={value => setEmail(value)}
        />
        <Gap height={16} />
        <Input
          type="password"
          label="Kata Sandi"
          value={password}
          onChange={value => setPassword(value)}
        />
        <Gap height={16} />
        <Input
          type="password"
          label="Ulangi Kata Sandi"
          value={cpassword}
          onChange={value => setCpassword(value)}
        />
        <Gap height={16} />
        <Input
          label="Nomor Telepon"
          value={phone}
          onChange={value => setPhone(value)}
        />
        <Gap height={16} />
        <Label title="Opsi Pengiriman OTP" />
        <Gap height={8} />
        {radioOption.map((item, radioId) => (
          <View key={item.value}>
            <Input
              type="otp-method"
              value={item.name}
              onPress={() => setMethod(item.value)}
              isActive={method === item.value}
            />
            {radioId !== radioOption.length - 1 && <Gap height={8} />}
          </View>
        ))}
        <Gap flex={1} minHeight={40} />
        <Button title="Selanjutnya" onPress={submit} />
        <Gap height={64} />
      </View>
    </ScreenWrapper>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({
  container: {
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
});
