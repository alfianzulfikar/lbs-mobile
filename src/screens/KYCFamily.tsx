import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import ICWarningRounded from '../components/icons/ICWarningRounded';
import {KYCFormFieldType} from '../constants/Types';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {useKYCFamily} from '../api/kycFamily';
import {useCallingCode} from '../api/callingCode';

const KYCFamily = () => {
  const tint = useThemeColor({}, 'tint');
  const {
    family,
    familyError,
    familyLoading,
    familySubmitLoading,
    getFamily,
    submitFamily,
    setFamily,
  } = useKYCFamily();

  const {callingCodeLoading, getCallingCodes, callingCodeList} =
    useCallingCode();

  const statusOption = [
    {id: 1, label: 'Single'},
    {id: 2, label: 'Menikah'},
    {id: 3, label: 'Duda'},
    {id: 4, label: 'Janda'},
  ];

  const heirRelationshipOption = [
    {id: 1, label: 'Ayah Kandung'},
    {id: 2, label: 'Ibu Kandung'},
    {id: 3, label: 'Suami / Istri'},
    {id: 4, label: 'Anak'},
    {id: 5, label: 'Lainnya'},
  ];

  const FamilyForm: KYCFormFieldType[] = [
    {
      name: 'statusPernikahanId',
      label: 'Status Pernikahan',
      type: 'dropdown',
      option: statusOption,
      required: true,
    },
    {
      name: 'namaPasangan',
      label: 'Nama Lengkap Pasangan',
      type: 'text',
      // required: true,
    },
    {
      name: 'namaGadisIbuKandung',
      label: 'Nama Gadis Ibu Kandung',
      type: 'text',
      required: true,
    },
    {
      name: 'namaAhliWaris',
      label: 'Nama Ahli Waris',
      type: 'text',
      required: true,
    },
    {
      name: 'hubunganDenganAhliWaris',
      label: 'Hubungan Dengan Ahli Waris',
      type: 'dropdown',
      option: heirRelationshipOption,
      required: true,
    },
    {
      name: 'tlpAhliWaris',
      label: 'Nomor Telepon Ahli Waris',
      type: 'text',
      required: true,
      customInput: 'phone',
    },
  ];

  useEffect(() => {
    getFamily();
    getCallingCodes();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Biodata Keluarga"
          instruction="Selanjutnya harap melengkapi data keluarga dan informasi mengenai ahli waris. Kami akan menjaga kerahasiaan informasi ini."
          percentage={30}
          backScreen="KYCAddress"
        />
        <Gap height={40} />
        {familyLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <FormBuilder
              fields={FamilyForm}
              state={family}
              error={familyError}
              onChange={setFamily}
              callingCodeList={callingCodeList}
              callingCodeLoading={callingCodeLoading}
            />
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={submitFamily}
              loading={familySubmitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCFamily;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
