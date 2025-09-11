import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ICArrowLeft from './icons/ICArrowLeft';
import {useThemeColor} from '../hooks/useThemeColor';
import BlurOverlay from './BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import {StackActions, useNavigation} from '@react-navigation/native';
import Text from './Text';
import Gap from './Gap';
import KYCProgressBar from './KYCProgressBar';
import {KYCStep} from '../constants/Types';
import ICCaretArrowDown from './icons/ICCaretArrowDown';
import CustomBottomSheet from './BottomSheet';
import CheckBox from './CheckBox';
import DropdownInput from './DropdownInput';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const KYCHeader = ({
  title,
  percentage,
  instruction,
  backScreen,
  nextScreen,
  currentScreen,
  dropdownDisabled,
}: {
  title: string;
  percentage: number;
  instruction: string;
  backScreen?: KYCStep;
  nextScreen?: KYCStep;
  currentScreen?: KYCStep;
  dropdownDisabled?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textDanger = useThemeColor({}, 'textDanger');
  const navigation = useNavigation();
  const {kycStep} = useSelector((item: RootState) => item.user);

  const [showSteps, setShowSteps] = useState(false);

  const steps: {
    id: string;
    name: string;
    status: 'selected' | 'enabled' | 'disabled';
    screen: KYCStep;
  }[] = [
    {
      id: '1',
      name: 'Biodata Pribadi',
      status: currentScreen === 'KYCPersonal' ? 'selected' : 'enabled',
      screen: 'KYCPersonal',
    },
    {
      id: '2',
      name: 'Alamat',
      status:
        currentScreen === 'KYCAddress'
          ? 'selected'
          : [
              'KYCAddress',
              'KYCFamily',
              'KYCOccupation',
              'KYCTax',
              'KYCBank',
              'KYCRisk',
            ].includes(kycStep || '')
          ? 'enabled'
          : 'disabled',
      screen: 'KYCAddress',
    },
    {
      id: '3',
      name: 'Biodata Keluarga',
      status:
        currentScreen === 'KYCFamily'
          ? 'selected'
          : [
              'KYCFamily',
              'KYCOccupation',
              'KYCTax',
              'KYCBank',
              'KYCRisk',
            ].includes(kycStep || '')
          ? 'enabled'
          : 'disabled',
      screen: 'KYCFamily',
    },
    {
      id: '4',
      name: 'Informasi Pekerjaan',
      status:
        currentScreen === 'KYCOccupation'
          ? 'selected'
          : ['KYCOccupation', 'KYCTax', 'KYCBank', 'KYCRisk'].includes(
              kycStep || '',
            )
          ? 'enabled'
          : 'disabled',
      screen: 'KYCOccupation',
    },
    {
      id: '5',
      name: 'Informasi Pajak',
      status:
        currentScreen === 'KYCTax'
          ? 'selected'
          : ['KYCTax', 'KYCBank', 'KYCRisk'].includes(kycStep || '')
          ? 'enabled'
          : 'disabled',
      screen: 'KYCTax',
    },
    {
      id: '6',
      name: 'Informasi Bank',
      status:
        currentScreen === 'KYCBank'
          ? 'selected'
          : ['KYCBank', 'KYCRisk'].includes(kycStep || '')
          ? 'enabled'
          : 'disabled',
      screen: 'KYCBank',
    },
    {
      id: '7',
      name: 'Profil Risiko',
      status:
        currentScreen === 'KYCRisk'
          ? 'selected'
          : ['KYCRisk'].includes(kycStep || '')
          ? 'enabled'
          : 'disabled',
      screen: 'KYCRisk',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: RGBAColors(0.6)[colorScheme].background},
      ]}>
      <BlurOverlay />
      <View style={{zIndex: 2, padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setShowSteps(true)}
            disabled={dropdownDisabled}>
            <Text style={[styles.heading, {}]}>{title}</Text>
            {!dropdownDisabled && (
              <>
                <Gap width={6} />
                <ICCaretArrowDown color={textColor2} />
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (nextScreen) {
                navigation.dispatch(
                  StackActions.replace('KYC', {screen: nextScreen}),
                );
              }
            }}
            style={{
              transform: [{rotate: '180deg'}],
              opacity: nextScreen ? 1 : 0,
            }}
            disabled={!nextScreen}>
            <ICArrowLeft color={textColor} />
          </TouchableOpacity>
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

      {showSteps && (
        <CustomBottomSheet
          onDismiss={() => setShowSteps(false)}
          paddingHorizontal={0}>
          {steps.map(item => (
            <Pressable
              key={item.id}
              style={{
                paddingVertical: 20,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderColor: RGBAColors(0.1)[colorScheme].text,
                backgroundColor: RGBAColors(
                  item.status === 'selected' ? 0.1 : 0,
                )[colorScheme].text,
                opacity: item.status === 'disabled' ? 0.5 : 1,
              }}
              onPress={() =>
                navigation.dispatch(
                  StackActions.replace('KYC', {screen: item.screen}),
                )
              }
              disabled={item.status === 'disabled'}>
              <Text style={{fontSize: 16, color: textColor2}}>{item.name}</Text>
            </Pressable>
          ))}
        </CustomBottomSheet>
      )}
    </View>
  );
};

export default KYCHeader;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  heading: {
    // flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
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
