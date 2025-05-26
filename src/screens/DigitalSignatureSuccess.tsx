import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useThemeColor} from '../hooks/useThemeColor';

const DigitalSignatureSuccess = () => {
  const navigation = useNavigation();
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <ScreenWrapper background backgroundType="gradient">
      <View style={[styles.container, {paddingTop: 24}]}>
        <Text style={[styles.desc, {color: textColor2}]}>
          Selamat, verifikasi OTP Digital Signature berhasil
        </Text>
        <Gap flex={1} />
        <Gap height={24} />
        <Button
          title="Beranda"
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainTab'}],
              }),
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default DigitalSignatureSuccess;

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
