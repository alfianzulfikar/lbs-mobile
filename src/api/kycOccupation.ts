import {useState} from 'react';
import {KYCOccupationErrorType, KYCOccupationType} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import trimStringInObject from '../utils/trimStringInObject';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

export const useKYCOccupation = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [occupation, setOccupation] = useState<KYCOccupationType>({
    titlePekerjaan: null,
    namaPerusahaan: '',
    alamatPerusahaan: '',
    totalAssetUser: null,
    sumberDanaUser: [],
    tujuanInvestasi: [],
  });
  const [occupationError, setOccupationError] =
    useState<KYCOccupationErrorType>({
      titlePekerjaan: [],
      namaPerusahaan: [],
      alamatPerusahaan: [],
      totalAssetUser: [],
      sumberDanaUser: [],
      tujuanInvestasi: [],
    });
  const [occupationLoading, setOccupationLoading] = useState(false);
  const [occupationSubmitLoading, setOccupationSubmitLoading] = useState(false);

  const getOccupation = async () => {
    setOccupationLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/pekerjaan',
        authorization: true,
      });
      let tempSumberDana = occupation.sumberDanaUser || [];
      let tempTujuanInvestasi = occupation.tujuanInvestasi || [];
      if (res.sumber_dana) {
        res.sumber_dana.map((item: any) => {
          tempSumberDana.push(item.id);
        });
      }
      if (res.tujuan_investasi) {
        res.tujuan_investasi.map((item: any) => {
          tempTujuanInvestasi.push(item.id);
        });
      }
      setOccupation({
        titlePekerjaan: res.pekerjaan?.title || null,
        namaPerusahaan: res.pekerjaan?.nama_perusahaan || '',
        alamatPerusahaan: res.pekerjaan?.alamat || '',
        totalAssetUser: res.pekerjaan?.total_asset_user || null,
        sumberDanaUser: tempSumberDana || [],
        tujuanInvestasi: tempTujuanInvestasi || [],
      });
    } catch {
    } finally {
      setOccupationLoading(false);
    }
  };

  const submitOccupation = async () => {
    Keyboard.dismiss();
    setOccupationSubmitLoading(true);
    try {
      const body = trimStringInObject({
        title_pekerjaan: occupation.titlePekerjaan,
        nama_perusahaan: occupation.namaPerusahaan,
        alamat_perusahaan: occupation.alamatPerusahaan || null,
        total_asset_user: occupation.totalAssetUser,
        sumber_dana_user: occupation.sumberDanaUser,
        tujuan_investasi: occupation.tujuanInvestasi,
      });
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/pekerjaan',
        authorization: true,
        body,
      });
      navigation.dispatch(StackActions.replace('KYC', {screen: 'KYCTax'}));
    } catch (error: any) {
      console.log('occupation error', error);
      if (error?.status === 422) {
        setOccupationError({
          titlePekerjaan: error?.data?.errors?.title_pekerjaan || null,
          namaPerusahaan: error?.data?.errors?.nama_perusahaan || '',
          alamatPerusahaan: error?.data?.errors?.alamat_perusahaan || '',
          totalAssetUser: error?.data?.errors?.total_asset_user || null,
          sumberDanaUser: error?.data?.errors?.sumber_dana_user || [],
          tujuanInvestasi: error?.data?.errors?.tujuan_investasi || [],
        });
        dispatch(
          setAlert({
            title: 'Terdapat kesalahan. Periksa kembali.',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      }
    } finally {
      setOccupationSubmitLoading(false);
    }
  };

  return {
    occupation,
    occupationError,
    setOccupationError,
    getOccupation,
    submitOccupation,
    occupationLoading,
    occupationSubmitLoading,
    setOccupation,
  };
};
