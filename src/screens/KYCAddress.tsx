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
import {useKYCAddress} from '../api/kycAddress';
import {useAddress} from '../api/address';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const KYCAddress = () => {
  const tint = useThemeColor({}, 'tint');
  const {
    getAddress,
    addressKTP,
    address,
    addressKTPError,
    addressError,
    addressLoading,
    setAddressKTP,
    setAddress,
    submitAddress,
    addressSubmitLoading,
  } = useKYCAddress();
  const {
    getProvinceList,
    getCityList,
    getRegionList,
    provinceKTPList,
    cityKTPList,
    regionKTPList,
    provinceKTPListLoading,
    cityKTPListLoading,
    regionKTPListLoading,
    provinceList,
    cityList,
    regionList,
    provinceListLoading,
    cityListLoading,
    regionListLoading,
  } = useAddress();
  const {kycStep} = useSelector((item: RootState) => item.user);

  const isSameAddressOption = [
    {id: true, label: 'Ya'},
    {id: false, label: 'Tidak'},
  ];

  const AddressKTPForm: KYCFormFieldType[] = [
    {
      name: 'provinsiKTP',
      label: 'Provinsi',
      type: 'dropdown',
      option: provinceKTPList,
      required: true,
      loading: provinceKTPListLoading,
      onChangeAdditionalValue: {kotaKTP: null, kecamatanKTP: null},
    },
    {
      name: 'kotaKTP',
      label: 'Kota',
      type: 'dropdown',
      option: cityKTPList,
      required: true,
      loading: cityKTPListLoading,
      onChangeAdditionalValue: {kecamatanKTP: null},
    },
    {
      name: 'kecamatanKTP',
      label: 'Kecamatan',
      type: 'dropdown',
      option: regionKTPList,
      required: true,
      loading: regionKTPListLoading,
    },
    {
      name: 'alamatKTP',
      label: 'Alamat',
      type: 'text',
      required: true,
    },
    {
      name: 'kodePosKTP',
      label: 'Kode Pos',
      type: 'text',
      required: true,
    },
    {
      name: 'isAddressSame',
      label: 'Apakah Alamat Tinggal sama dengan KTP?',
      type: 'radio-button',
      option: isSameAddressOption,
      required: true,
    },
  ];

  const AddressForm: KYCFormFieldType[] = [
    {
      name: 'provinsi',
      label: 'Provinsi',
      type: 'dropdown',
      option: provinceList,
      required: true,
      loading: provinceListLoading,
      disable: addressKTP.isAddressSame ? true : false,
    },
    {
      name: 'kota',
      label: 'Kota',
      type: 'dropdown',
      option: cityList,
      required: true,
      loading: cityListLoading,
      disable: addressKTP.isAddressSame ? true : false,
    },
    {
      name: 'kecamatan',
      label: 'Kecamatan',
      type: 'dropdown',
      option: regionList,
      required: true,
      loading: regionListLoading,
      disable: addressKTP.isAddressSame ? true : false,
    },
    {
      name: 'alamat',
      label: 'Alamat',
      type: 'text',
      required: true,
      disable: addressKTP.isAddressSame ? true : false,
    },
    {
      name: 'kodePos',
      label: 'Kode Pos',
      type: 'text',
      required: true,
      disable: addressKTP.isAddressSame ? true : false,
    },
  ];

  useEffect(() => {
    getAddress();
    getProvinceList('ktp');
    getProvinceList('current');
  }, []);

  useEffect(() => {
    if (addressKTP.provinsiKTP) {
      getCityList('ktp', addressKTP.provinsiKTP);
    }
  }, [addressKTP.provinsiKTP]);

  useEffect(() => {
    if (addressKTP.provinsiKTP && addressKTP.kotaKTP) {
      getRegionList('ktp', addressKTP.provinsiKTP, addressKTP.kotaKTP);
    }
  }, [addressKTP.kotaKTP]);

  useEffect(() => {
    if (address.provinsi) {
      getCityList('current', address.provinsi);
    }
  }, [address.provinsi]);

  useEffect(() => {
    if (address.provinsi && address.kota) {
      getRegionList('current', address.provinsi, address.kota);
    }
  }, [address.kota]);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Alamat"
          instruction="Selanjutnya harap melengkapi data alamat. Kami akan menjaga kerahasiaan informasi ini."
          percentage={20}
          backScreen="KYCPersonal"
          nextScreen={
            [
              'KYCFamily',
              'KYCOccupation',
              'KYCTax',
              'KYCBank',
              'KYCRisk',
            ].includes(kycStep || '')
              ? 'KYCFamily'
              : undefined
          }
          currentScreen="KYCAddress"
        />
        <Gap height={40} />
        {addressLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <Text style={styles.heading}>Alamat Sesuai KTP</Text>
            <Gap height={16} />
            <FormBuilder
              fields={AddressKTPForm}
              state={addressKTP}
              onChange={setAddressKTP}
              error={addressKTPError}
            />
            <View
              style={{
                height: addressKTP.isAddressSame === false ? 'auto' : 0,
                overflow: 'hidden',
              }}>
              <Gap height={40} />
              <Text style={styles.heading}>Alamat Tinggal</Text>
              <Gap height={16} />
              <FormBuilder
                fields={AddressForm}
                state={address}
                onChange={setAddress}
                error={addressError}
              />
            </View>
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={() => submitAddress(kycStep)}
              loading={addressSubmitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCAddress;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
