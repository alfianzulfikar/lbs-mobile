import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import Input from '../components/Input';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import Label from '../components/Label';
import {useAPI} from '../services/api';
import {jwtDecode} from 'jwt-decode';
import {useCallingCode} from '../api/callingCode';
import {useRegister} from '../api/register';
import ErrorText from '../components/ErrorText';
import CheckBox from '../components/CheckBox';
import ContactAndPromotionExplanation from '../components/ContactAndPromotionExplanation';

type Props = {
  route: {
    params: {
      token: string;
    };
  };
};

const AccountVerification = ({route}: Props) => {
  const {token} = route.params;
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');

  const navigation = useNavigation();
  const {apiRequest} = useAPI();
  const {callingCodeLoading, getCallingCodes, callingCodeList} =
    useCallingCode();
  const {submitVerification, verificationLoading, verificationError} =
    useRegister();

  const decode: {firstname?: string; lastname?: string; email?: string} =
    jwtDecode(token);
  const firstname = decode?.firstname || '';
  const lastname = decode?.lastname || '';
  const email = decode?.email || '';

  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [method, setMethod] = useState('whatsapp');
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [canBeContactedAgreement, setCanBeContactedAgreement] = useState(false);
  const [showContactAndPromotion, setShowContactAndPromotion] = useState(false);

  const radioOption = [
    {name: 'WhatsApp', value: 'whatsapp'},
    {name: 'SMS', value: 'sms'},
  ];

  const handleSubmit = async () => {
    const stringPhone = String(phone);
    const body = {
      firstname,
      lastname,
      email,
      phone: `${code}-${
        stringPhone
          ? stringPhone.charAt(0) === '0'
            ? stringPhone.slice(1)
            : stringPhone
          : ''
      }`,
      password,
      confirmPassword: cpassword,
      otp_methods: method,
      can_call: canBeContactedAgreement,
    };
    submitVerification(token, body);
  };

  useEffect(() => {
    getCallingCodes();
  }, []);

  useEffect(() => {
    if (callingCodeList.length > 0) {
      setCode('62');
    }
  }, [callingCodeList]);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <View style={styles.container}>
        <Gap height={24} />
        <Text style={[styles.heading, {color: textColor}]}>
          Verifikasi Akun
        </Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          Masukkan nomor HP aktif dan buat kata sandi.
        </Text>
        <Gap height={40} />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={value => {}}
          disable
          error={verificationError.email}
        />
        <Gap height={16} />
        <Input
          type="password"
          label="Kata Sandi"
          value={password}
          onChange={value => setPassword(value)}
          error={verificationError.password}
        />
        <Gap height={16} />
        <Input
          type="password"
          label="Ulangi Kata Sandi"
          value={cpassword}
          onChange={value => setCpassword(value)}
          error={verificationError.confirmPassword}
        />
        <Gap height={16} />
        <Label title="Nomor Telepon" />
        <Gap height={8} />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 100}}>
            <Input
              label=""
              value={code}
              onChange={value => setCode(value)}
              type="dropdown"
              loading={callingCodeLoading}
              option={callingCodeList}
            />
          </View>
          <Gap width={8} />
          <View style={{flex: 1}}>
            <Input
              label=""
              value={phone}
              onChange={value => setPhone(value)}
              type="number"
            />
          </View>
        </View>
        <Gap height={4} />
        <ErrorText error={verificationError.phone} />
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
        <Gap height={4} />
        <ErrorText error={verificationError.otp_methods} />
        <Gap height={16} />
        <CheckBox
          customLabel={
            <Text style={{fontSize: 16, color: textColor2, marginLeft: 8}}>
              Dengan mendaftar anda telah menyetujui{' '}
              <Text
                style={{
                  color: tint,
                  textDecorationLine: 'underline',
                  fontWeight: '700',
                  lineHeight: 24,
                }}
                onPress={() =>
                  navigation.navigate('Auth', {screen: 'TermsAndConditions'})
                }>
                Syarat & Ketentuan
              </Text>{' '}
              serta{' '}
              <Text
                style={{
                  color: tint,
                  textDecorationLine: 'underline',
                  fontWeight: '700',
                }}
                onPress={() =>
                  navigation.navigate('Auth', {screen: 'PrivacyPolicy'})
                }>
                Kebijakan Privasi
              </Text>{' '}
              LBS Urun Dana.
            </Text>
          }
          value={termsAgreement}
          onChange={() => setTermsAgreement(prev => !prev)}
          color={textColor}
          onlyPressOnBox
        />
        <Gap height={16} />
        <CheckBox
          customLabel={
            <Text
              style={{
                fontSize: 16,
                color: textColor2,
                marginLeft: 8,
                lineHeight: 24,
              }}>
              Saya telah membaca dan menyetujui bahwa PT LBS Urun Dana dapat
              menghubungi saya melalui WhatsApp, email, atau telepon untuk
              memberikan informasi, promosi, dan peluang investasi sesuai dengan{' '}
              <Text
                style={{
                  color: tint,
                  textDecorationLine: 'underline',
                  fontWeight: '700',
                }}
                onPress={() => setShowContactAndPromotion(true)}>
                Kebijakan Kontak & Promosi
              </Text>{' '}
              yang berlaku.
            </Text>
          }
          value={canBeContactedAgreement}
          onChange={() => setCanBeContactedAgreement(prev => !prev)}
          color={textColor}
          onlyPressOnBox
        />
        <Gap flex={1} minHeight={40} />
        <Button
          title="Selanjutnya"
          onPress={handleSubmit}
          loading={verificationLoading}
          disabled={!termsAgreement}
        />
        <Gap height={64} />
      </View>

      {showContactAndPromotion && (
        <ContactAndPromotionExplanation
          onDismiss={() => setShowContactAndPromotion(false)}
        />
      )}
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
