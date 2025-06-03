import {StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Button from '../components/Button';
import Text from '../components/Text';
import {useThemeColor} from '../hooks/useThemeColor';
import {StackActions, useNavigation} from '@react-navigation/native';

const AccountVerificationExpired = () => {
  const textColor = useThemeColor({}, 'text');
  const textColor3 = useThemeColor({}, 'text3');

  const navigation = useNavigation();

  const register = async () => {
    navigation.dispatch(StackActions.replace('Auth', {screen: 'Register'}));
  };

  return (
    <ScreenWrapper background backgroundType="gradient">
      <View style={[styles.container, {paddingTop: 40}]}>
        <Text style={[styles.heading, {color: textColor}]}>
          Gagal Verifikasi Email
        </Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          Maaf, Anda tidak dapat ke tahap selanjutnya karena link verifikasi
          telah kedaluwarsa. Silakan melakukan registrasi kembali.
        </Text>
        <Gap flex={1} />
        <Gap height={24} />
        <Button title="Daftar Ulang" onPress={register} />
      </View>
    </ScreenWrapper>
  );
};

export default AccountVerificationExpired;

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
  link: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
});
