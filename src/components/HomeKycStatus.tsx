import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import BlurOverlay from './BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import ICUser from './icons/ICUser';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import LinearGradient from 'react-native-linear-gradient';

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
  const primaryColor = colorScheme === 'dark' ? '#FEE099' : '#D09A1B';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.8)[
            colorScheme
          ].background,
          borderWidth: 1,
          borderColor: primaryColor,
        },
      ]}>
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['rgba(254, 224, 153, 0.2)', 'rgba(0, 0, 0, 0.2)']
            : ['rgba(247, 236, 209, 0.8)', 'rgba(255, 255, 255, 0.5)']
        }
        locations={[0, 0.4]}>
        <View style={styles.contentContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>KYC Belum Terverifikasi</Text>
            <Text style={[styles.desc, {color: textColor2}]}>
              Harap lengkapi data KYC Anda
            </Text>
          </View>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center'}}
            onPress={
              () =>
                status === null
                  ? navigation.navigate('KYC', {
                      screen: screen === 'KYCPersonal' ? 'KYCScreen' : screen,
                    })
                  : null
              // navigation.navigate('KYC', {
              //   screen: 'KYCScreen',
              // })
            }>
            <ICUser color={primaryColor} type="outline" />
            <Text
              style={[
                styles.desc,
                {color: primaryColor, textAlign: 'center', fontWeight: '600'},
              ]}>
              Klik Di sini
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* <BlurOverlay /> */}
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
    alignItems: 'center',
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
