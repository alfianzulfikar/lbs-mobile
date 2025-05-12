import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import {KYCFormFieldType} from '../constants/Types';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {
  occupationOption,
  sumberPenghasilanOption,
  tujuanInvestasiOption,
} from '../constants/KYC';
import {useKYCOccupation} from '../api/kycOccupation';

const KYCOccupation = () => {
  const tint = useThemeColor({}, 'tint');
  const {
    getOccupation,
    occupation,
    occupationError,
    occupationLoading,
    occupationSubmitLoading,
    setOccupation,
    submitOccupation,
  } = useKYCOccupation();

  const OccupationForm: KYCFormFieldType[] = [
    {
      name: 'titlePekerjaan',
      label: 'Pekerjaan',
      placeholder: 'Pilih Pekerjaan',
      type: 'dropdown',
      option: occupationOption,
      required: true,
    },
    {
      name: 'namaPerusahaan',
      label: 'Nama Perusahaan',
      placeholder: 'Masukkan nama perusahaan',
      type: 'text',
    },
    {
      name: 'alamatPerusahaan',
      label: 'Alamat Perusahaan',
      placeholder: 'Masukkan alamat lengkap perusahaan',
      type: 'text',
    },
    {
      name: 'totalAssetUser',
      label: 'Total Aset Pribadi',
      placeholder: '0',
      type: 'number',
      required: true,
    },
    {
      name: 'sumberDanaUser',
      label: 'Sumber Penghasilan',
      type: 'checkbox',
      option: sumberPenghasilanOption,
      required: true,
    },
    {
      name: 'tujuanInvestasi',
      label: 'Tujuan Investasi',
      type: 'checkbox',
      option: tujuanInvestasiOption,
      required: true,
    },
  ];

  useEffect(() => {
    getOccupation();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Informasi Pekerjaan"
          instruction="Harap melengkapi data pekerjaan, sumber penghasilan, tujuan investasi, dan penghasilan per tahun."
          percentage={40}
          backScreen="KYCFamily"
        />
        <Gap height={40} />
        {occupationLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <FormBuilder
              fields={OccupationForm}
              state={occupation}
              error={occupationError}
              onChange={setOccupation}
            />
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={submitOccupation}
              loading={occupationSubmitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCOccupation;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
