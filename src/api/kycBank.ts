import {useState} from 'react';
import {KYCBankErrorType, KYCBankType, KYCStep} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import trimStringInObject from '../utils/trimStringInObject';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';
import {setKYCStep} from '../slices/user';

export const useKYCBank = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  const submitBank = async (kycStep?: KYCStep) => {
    Keyboard.dismiss();
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
      if (kycStep === 'KYCBank') dispatch(setKYCStep('KYCRisk'));
      navigation.dispatch(StackActions.replace('KYC', {screen: 'KYCRisk'}));
    } catch (err: any) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as {
          status: number;
          data?: any;
        };
        if (error?.status === 422) {
          setBankError({
            bankId: error?.data?.errors?.bank_id || [],
            rekeningBank: error?.data?.errors?.rekening || [],
            namaPemilikRekeningBank: error?.data?.errors?.nama_pemilik || [],
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
