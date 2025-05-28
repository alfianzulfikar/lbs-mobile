import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ICArrowLeft from './icons/ICArrowLeft';
import {useThemeColor} from '../hooks/useThemeColor';
import BlurOverlay from './BlurOverlay';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import {StackActions, useNavigation} from '@react-navigation/native';
import Text from './Text';
import Gap from './Gap';
import Header from './Header';
import KYCProgressBar from './KYCProgressBar';
import {KYCBackScreen} from '../constants/Types';

const KYCHeader = ({
  title,
  percentage,
  instruction,
  backScreen,
}: {
  title: string;
  percentage: number;
  instruction: string;
  backScreen?: KYCBackScreen;
}) => {
  // const colorScheme = useC
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textDanger = useThemeColor({}, 'textDanger');
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: RGBAColors(0.6)[colorScheme].background},
      ]}>
      <BlurOverlay />
      <View style={{zIndex: 2}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              if (backScreen) {
                navigation.dispatch(
                  StackActions.replace('KYC', {screen: backScreen}),
                );
              } else {
                navigation.goBack();
              }
            }}>
            <ICArrowLeft color={textColor} />
          </TouchableOpacity>
          <Text style={styles.heading}>{title}</Text>
        </View>
        <Gap height={24} />
        <KYCProgressBar percentage={percentage} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <Text style={[styles.progressText, {color: textColor3}]}>
            {title === 'Biodata Pribadi'
              ? 'Mulai isi data KYC'
              : 'Lanjutkan pengisian data KYC'}
          </Text>
          <Text style={[styles.progressText, {color: textColor3}]}>
            {percentage}%
          </Text>
        </View>
        <Text style={[styles.instruction, {color: textColor2}]}>
          {instruction}
        </Text>
        <Text style={[styles.notice, {color: textDanger}]}>
          *menunjukkan data yang wajib diisi
        </Text>
      </View>
    </View>
  );
};

export default KYCHeader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  heading: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  progressText: {
    fontSize: 12,
    lineHeight: 16,
  },
  instruction: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
  },
  notice: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
