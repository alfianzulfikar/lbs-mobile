import {useState} from 'react';
import {
  KYCAddressErrorType,
  KYCAddressKTPErrorType,
  KYCAddressKTPType,
  KYCAddressType,
  KYCStep,
} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import trimStringInObject from '../utils/trimStringInObject';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';
import {setKYCStep} from '../slices/user';

export const useKYCAddress = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addressKTP, setAddressKTP] = useState<KYCAddressKTPType>({
    provinsiKTP: null,
    kotaKTP: null,
    kecamatanKTP: null,
    alamatKTP: '',
    kodePosKTP: '',
    isAddressSame: null,
  });
  const [address, setAddress] = useState<KYCAddressType>({
    provinsi: null,
    kota: null,
    kecamatan: null,
    alamat: '',
    kodePos: '',
  });
  const [addressKTPError, setAddressKTPError] =
    useState<KYCAddressKTPErrorType>({
      provinsiKTP: [],
      kotaKTP: [],
      kecamatanKTP: [],
      alamatKTP: [],
      kodePosKTP: [],
      isAddressSame: [],
    });
  const [addressError, setAddressError] = useState<KYCAddressErrorType>({
    provinsi: [],
    kota: [],
    kecamatan: [],
    alamat: [],
    kodePos: [],
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressSubmitLoading, setAddressSubmitLoading] = useState(false);

  const getAddress = async () => {
    setAddressLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/alamat',
        authorization: true,
      });
      setAddressKTP({
        provinsiKTP: res?.ktp?.provinsi_id_ktp,
        kotaKTP: res?.ktp?.kota_id_ktp,
        kecamatanKTP: res?.ktp?.kecamatan_id_ktp,
        alamatKTP: res?.ktp?.alamat_ktp,
        kodePosKTP: res?.ktp?.kodepos_ktp,
        isAddressSame: res?.is_address_same,
      });
      setAddress({
        provinsi: res?.sekarang?.provinsi_id,
        kota: res?.sekarang?.kota_id,
        kecamatan: res?.sekarang?.kecamatan_id,
        alamat: res?.sekarang?.alamat_sekarang,
        kodePos: res?.sekarang?.kodepos,
      });
    } catch {
    } finally {
      setAddressLoading(false);
    }
  };

  const submitAddress = async (kycStep?: KYCStep) => {
    Keyboard.dismiss();
    setAddressSubmitLoading(true);
    try {
      if (addressKTP.isAddressSame === null) {
        setAddressKTPError(prev => ({...prev, isAddressSame: ['Harus diisi']}));
      } else {
        const body = trimStringInObject({
          provinsi_id_ktp: addressKTP.provinsiKTP,
          kota_id_ktp: addressKTP.kotaKTP,
          kecamatan_id_ktp: addressKTP.kecamatanKTP,
          alamat_ktp: addressKTP.alamatKTP,
          kodepos_ktp: addressKTP.kodePosKTP,
          provinsi_id: addressKTP.isAddressSame
            ? addressKTP.provinsiKTP
            : address.provinsi,
          kota_id: addressKTP.isAddressSame ? addressKTP.kotaKTP : address.kota,
          kecamatan_id: addressKTP.isAddressSame
            ? addressKTP.kecamatanKTP
            : address.kecamatan,
          alamat_sekarang: addressKTP.isAddressSame
            ? addressKTP.alamatKTP
            : address.alamat,
          kodepos: addressKTP.isAddressSame
            ? addressKTP.kodePosKTP
            : address.kodePos,
        });
        const res = await apiRequest({
          method: 'put',
          endpoint: '/user/edit/alamat',
          authorization: true,
          body,
        });
        if (kycStep === 'KYCAddress') dispatch(setKYCStep('KYCFamily'));
        navigation.dispatch(StackActions.replace('KYC', {screen: 'KYCFamily'}));
      }
    } catch (err: any) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as {
          status: number;
          data?: any;
        };

        if (error.status === 422) {
          if (error?.status === 422) {
            setAddressKTPError(prev => ({
              ...prev,
              provinsiKTP: error?.data?.errors?.provinsi_id_ktp || [],
              kotaKTP: error?.data?.errors?.kota_id_ktp || [],
              kecamatanKTP: error?.data?.errors?.kecamatan_id_ktp || [],
              alamatKTP: error?.data?.errors?.alamat_ktp || [],
              kodePosKTP: error?.data?.errors?.kodepos_ktp || [],
              isAddressSame: error?.data?.errors?.is_address_same || [],
            }));
            setAddressError(prev => ({
              ...prev,
              provinsi: error?.data?.errors?.provinsi_id || [],
              kota: error?.data?.errors?.kota_id || [],
              kecamatan: error?.data?.errors?.kecamatan_id || [],
              alamat: error?.data?.errors?.alamat_sekarang || [],
              kodePos: error?.data?.errors?.kodepos || [],
            }));
          }
          dispatch(
            setAlert({
              title: 'Terdapat kesalahan. Periksa kembali.',
              desc: '',
              type: 'danger',
              showAlert: true,
            }),
          );
        }
      }
    } finally {
      setAddressSubmitLoading(false);
    }
  };

  return {
    addressKTP,
    setAddressKTP,
    addressKTPError,
    address,
    setAddress,
    addressError,
    getAddress,
    submitAddress,
    addressLoading,
    addressSubmitLoading,
  };
};
