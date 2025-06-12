import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import BlurOverlay from './BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import ICUser from './icons/ICUser';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';

const HomeKycStatus = ({
  status,
  screen,
}: {
  status: boolean | null;
  screen:
    | 'KYCScreen'
    | 'KYCPersonal'
    | 'KYCAddress'
    | 'KYCFamily'
    | 'KYCOccupation'
    | 'KYCTax'
    | 'KYCBank'
    | 'KYCRisk'
    | 'KYCTerms'
    | 'KYCWaiting';
}) => {
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.8).light
            .background,
        },
      ]}>
      {/* <BlurOverlay /> */}
      <View style={styles.contentContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>KYC Belum Terverifikasi</Text>
          <Text style={[styles.desc, {color: textColor2}]}>
            Harap lengkapi data KYC Anda
          </Text>
        </View>
        <TouchableOpacity
          style={{width: 80, alignItems: 'center'}}
          onPress={() =>
            status === null
              ? navigation.navigate('KYC', {
                  screen: screen === 'KYCPersonal' ? 'KYCScreen' : screen,
                })
              : null
          }>
          {/* navigation.navigate('KYC', {
                  screen: screen === 'KYCPersonal' ? 'KYCScreen' : screen,
                }) */}
          <ICUser color={tint} type="outline" />
          <Text style={[styles.desc, {color: tint}]}>Isi Data KYC</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeKycStatus;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  contentContainer: {
    zIndex: 2,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
});
