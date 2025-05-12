import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

type Props = {
  route: {
    params: {
      message: string;
    };
  };
};

const SendEmail = ({route}: Props) => {
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');

  const navigation = useNavigation();

  const {message} = route.params;

  const submit = async () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper background backgroundType="gradient">
      <View style={[styles.container, {paddingTop: 40}]}>
        <Text style={[styles.heading, {color: textColor}]}>Periksa Email</Text>
        <Text style={[styles.desc, {color: textColor3}]}>
          {message
            ? message
            : 'Kami telah mengirimkan email verifikasi. Silakan cek inbox untuk melanjutkan!'}
        </Text>
        <Gap flex={1} />
        <Text style={[styles.link, {color: textColor2}]}>
          Tidak mendapatkan Email?
        </Text>
        <Button title="Kembali" onPress={submit} />
      </View>
    </ScreenWrapper>
  );
};

export default SendEmail;

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
