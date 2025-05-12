import {useState} from 'react';
import {KYCBankErrorType, KYCBankType} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import trimStringInObject from '../utils/trimStringInObject';

export const useKYCBank = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const [bank, setBank] = useState<KYCBankType>({
    bankId: '',
    namaPemilikRekeningBank: '',
    rekeningBank: '',
  });
  const [bankError, setBankError] = useState<KYCBankErrorType>({
    bankId: [],
    namaPemilikRekeningBank: [],
    rekeningBank: [],
  });
  const [bankLoading, setBankLoading] = useState(false);
  const [bankSubmitLoading, setBankSubmitLoading] = useState(false);

  const getBank = async () => {
    setBankLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/akun-bank',
        authorization: true,
      });
      setBank({
        bankId: res.rekening_user?.bank?.id || '',
        namaPemilikRekeningBank: res.rekening_user?.nama_pemilik || '',
        rekeningBank: res.rekening_user?.rekening || '',
      });
    } catch {
    } finally {
      setBankLoading(false);
    }
  };

  const submitBank = async () => {
    setBankSubmitLoading(true);
    try {
      const body = trimStringInObject({
        bank_id: bank.bankId,
        nama_pemilik: bank.namaPemilikRekeningBank,
        rekening: bank.rekeningBank,
      });
      const res = await apiRequest({
        method: 'post',
        endpoint: '/user/add-akun-bank',
        authorization: true,
        body,
      });
      navigation.dispatch(
        StackActions.replace('KYCStack', {screen: 'KYCRisk'}),
      );
    } catch (error: any) {
      console.log('bank error', error);
      if (error?.status === 422) {
        setBankError({
          bankId: error?.data?.errors?.bank_id || [],
          rekeningBank: error?.data?.errors?.rekening || [],
          namaPemilikRekeningBank: error?.data?.errors?.nama_pemilik || [],
        });
      }
    } finally {
      setBankSubmitLoading(false);
    }
  };

  return {
    bank,
    bankError,
    setBank,
    setBankError,
    getBank,
    submitBank,
    bankLoading,
    bankSubmitLoading,
  };
};
