import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from '../components/BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from '../components/Gap';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';

type InfoType = {
  label: string;
  value: string;
};

const PaymentSuccess = () => {
  const [informationContent, setInformationContent] = useState<InfoType[]>([]);
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  let colorScheme = useColorScheme();

  const navigation = useNavigation();

  const getDetail = async () => {
    setInformationContent([
      {
        label: 'Sukuk Terkait',
        value: '',
      },
      {
        label: 'Kode Sukuk',
        value: '',
      },
      {
        label: 'Kode Transaksi',
        value: '',
      },
      {
        label: 'Nominal',
        value: '',
      },
      {
        label: 'Biaya Platform',
        value: '',
      },
      {
        label: 'Bank Kustodian',
        value: '',
      },
    ]);
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {paddingTop: 24}]}>
          <Text style={styles.heading}>Pembayaran Berhasil</Text>
          <Text style={styles.desc}>
            Description of the text can be write here that contain maximum 2
            lines.
          </Text>
          <View
            style={[
              styles.card,
              {backgroundColor: RGBAColors(0.4).light.background},
            ]}>
            <BlurOverlay />
            <View style={styles.cardContent}>
              {informationContent.map((infoItem, infoId) => (
                <View key={infoId}>
                  <Text style={[styles.infoLabel, {color: textColor2}]}>
                    {infoItem.label}
                  </Text>
                  <Text style={[styles.infoValue, {color: textColor}]}>
                    {infoItem.value}
                  </Text>
                  {infoId !== informationContent.length - 1 && (
                    <Gap height={16} />
                  )}
                </View>
              ))}
            </View>
          </View>
          <Gap height={40} />
          <Button
            title="Kembali ke Beranda"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: 46,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  card: {
    overflow: 'hidden',
    borderRadius: 24,
    marginTop: 40,
  },
  cardContent: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  infoLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 4,
  },
});
