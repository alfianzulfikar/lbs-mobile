import {useState} from 'react';
import {KYCFamilyErrorType, KYCFamilyType} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import {heirRelationshipOption} from '../constants/KYC';
import trimStringInObject from '../utils/trimStringInObject';

export const useKYCFamily = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const [family, setFamily] = useState<KYCFamilyType>({
    statusPernikahanId: null,
    namaPasangan: '',
    namaGadisIbuKandung: '',
    namaAhliWaris: '',
    hubunganDenganAhliWaris: null,
    tlpAhliWaris: '',
  });
  const [familyError, setFamilyError] = useState<KYCFamilyErrorType>({
    statusPernikahanId: [],
    namaPasangan: [],
    namaGadisIbuKandung: [],
    namaAhliWaris: [],
    hubunganDenganAhliWaris: [],
    tlpAhliWaris: [],
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
      setFamily({
        statusPernikahanId: res.keluarga.pernikahan.id,
        hubunganDenganAhliWaris: heirRelationshipOption.find(
          item => item.label === res.keluarga.hubungan_dengan_ahli_waris,
        )?.id,
        tlpAhliWaris: res.keluarga.tlp_ahli_waris,
        namaAhliWaris: res.keluarga.nama_ahli_waris,
        namaGadisIbuKandung: res.keluarga.nama_gadis_ibu_kandung,
        namaPasangan: res.keluarga.nama_pasangan,
      });
    } catch {
    } finally {
      setFamilyLoading(false);
    }
  };

  const submitFamily = async () => {
    setFamilySubmitLoading(true);
    try {
      const body = trimStringInObject({
        nama_pasangan:
          family.statusPernikahanId == 2 ? family.namaPasangan : '',
        nama_gadis_ibu_kandung: family.namaGadisIbuKandung,
        nama_ahli_waris: family.namaAhliWaris,
        hubungan_dengan_ahli_waris: heirRelationshipOption.find(
          item => item.id === family.hubunganDenganAhliWaris,
        )?.label,
        tlp_ahli_waris: family.tlpAhliWaris,
        status_pernikahan_id: family.statusPernikahanId,
      });
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/biodata/keluarga',
        authorization: true,
        body,
      });
      navigation.dispatch(
        StackActions.replace('KYCStack', {screen: 'KYCOccupation'}),
      );
    } catch (error: any) {
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
