import {useState} from 'react';
import {KYCFamilyErrorType, KYCFamilyType} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import {heirRelationshipOption} from '../constants/KYC';
import trimStringInObject from '../utils/trimStringInObject';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

export const useKYCFamily = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [family, setFamily] = useState<KYCFamilyType>({
    statusPernikahanId: null,
    namaPasangan: '',
    namaGadisIbuKandung: '',
    namaAhliWaris: '',
    hubunganDenganAhliWaris: null,
    tlpAhliWaris: '',
    phoneCode: '62',
  });
  const [familyError, setFamilyError] = useState<KYCFamilyErrorType>({
    statusPernikahanId: [],
    namaPasangan: [],
    namaGadisIbuKandung: [],
    namaAhliWaris: [],
    hubunganDenganAhliWaris: [],
    tlpAhliWaris: [],
    phoneCode: [],
  });
  const [familyLoading, setFamilyLoading] = useState(false);
  const [familySubmitLoading, setFamilySubmitLoading] = useState(false);

  const getFamily = async () => {
    setFamilyLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/biodata/keluarga',
        authorization: true,
      });
      const phoneState = res.keluarga.tlp_ahli_waris;
      setFamily({
        statusPernikahanId: res.keluarga.pernikahan.id,
        hubunganDenganAhliWaris: heirRelationshipOption.find(
          item => item.label === res.keluarga.hubungan_dengan_ahli_waris,
        )?.id,
        tlpAhliWaris:
          phoneState && phoneState.split('-').length > 1
            ? phoneState.split('-')[1]
            : '',
        namaAhliWaris: res.keluarga.nama_ahli_waris,
        namaGadisIbuKandung: res.keluarga.nama_gadis_ibu_kandung,
        namaPasangan: res.keluarga.nama_pasangan,
        phoneCode:
          phoneState && phoneState.split('-').length > 1
            ? phoneState.split('-')[0]
            : '',
      });
    } catch {
    } finally {
      setFamilyLoading(false);
    }
  };

  const submitFamily = async () => {
    Keyboard.dismiss();
    setFamilySubmitLoading(true);
    try {
      const tlpAhliWaris = String(family.tlpAhliWaris);
      const body = trimStringInObject({
        nama_pasangan:
          family.statusPernikahanId == 2 ? family.namaPasangan : '',
        nama_gadis_ibu_kandung: family.namaGadisIbuKandung,
        nama_ahli_waris: family.namaAhliWaris,
        hubungan_dengan_ahli_waris: heirRelationshipOption.find(
          item => item.id === family.hubunganDenganAhliWaris,
        )?.label,
        tlp_ahli_waris: `${family.phoneCode}-${
          tlpAhliWaris
            ? tlpAhliWaris.charAt(0) === '0'
              ? tlpAhliWaris.slice(1)
              : tlpAhliWaris
            : ''
        }`,
        status_pernikahan_id: family.statusPernikahanId,
      });
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/biodata/keluarga',
        authorization: true,
        body,
      });
      navigation.dispatch(
        StackActions.replace('KYC', {screen: 'KYCOccupation'}),
      );
    } catch (err: any) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as {
          status: number;
          data?: any;
        };
        if (error?.status === 422) {
          setFamilyError(prev => ({
            ...prev,
            statusPernikahanId: error?.data?.errors?.status_pernikahan_id || [],
            namaPasangan: error?.data?.errors?.nama_pasangan || [],
            namaGadisIbuKandung:
              error?.data?.errors?.nama_gadis_ibu_kandung || [],
            namaAhliWaris: error?.data?.errors?.nama_ahli_waris || [],
            hubunganDenganAhliWaris:
              error?.data?.errors?.hubungan_dengan_ahli_waris || [],
            tlpAhliWaris: error?.data?.errors?.tlp_ahli_waris || [],
          }));
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
      setFamilySubmitLoading(false);
    }
  };

  return {
    family,
    familyError,
    setFamilyError,
    getFamily,
    submitFamily,
    familyLoading,
    familySubmitLoading,
    setFamily,
  };
};
