import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useAPI} from '../services/api';
import {KYCBackScreen} from '../constants/Types';
import {useDispatch} from 'react-redux';
import {setUser} from '../slices/user';

export const useUser = () => {
  const {apiRequest} = useAPI();
  const dispatch = useDispatch();

  const [profile1, setProfile1] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    kycStatus: boolean | null;
    image: string;
    canBeCalled: boolean;
  }>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    kycStatus: false,
    image: '',
    canBeCalled: false,
  });
  const [profile2, setProfile2] = useState({
    bankName: '',
    bankAccountNumber: '',
    bankOwnerName: '',
    sid: '',
    sre: '',
    saham: 0,
    sukuk: 0,
    sisaLimit: 0,
    totalLimit: 0,
  });
  const [kycScreen, setKycScreen] = useState<KYCBackScreen>('KYCPersonal');
  const [kycProgressLoading, setKycProgressLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const getUser = async () => {
    setUserLoading(true);
    const accessToken = await AsyncStorage.getItem('access_token');
    try {
      const res = await apiRequest({
        endpoint: '/auth/me',
        authorization: true,
      });
      const newProfile1 = {
        firstname: res.user.firstname,
        lastname: res.user.lastname,
        email: res.user.email,
        phone: res.user.phone,
        kycStatus: res.user.is_kyc,
        image: res.user.image_file,
        canBeCalled: res.user.can_call,
      };
      setProfile1(newProfile1);
      dispatch(setUser(newProfile1));
      return res;
    } catch {
    } finally {
      setUserLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const res = await apiRequest({
        endpoint: '/user/profile',
        authorization: true,
      });
      if (res?.rekening_user) {
        setProfile2({
          bankName: res.rekening_user.bank.name,
          bankAccountNumber: res.rekening_user.rekening,
          bankOwnerName: res.rekening_user.nama_pemilik,
          sid: res.sid,
          sre: res.sre,
          saham: res.nilai_saham,
          sukuk: res.nilai_sukuk,
          sisaLimit: res.sisa_limit,
          totalLimit: res.total_limit,
        });
      }
    } catch {}
  };

  const getKycProgress = async () => {
    setKycProgressLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/check-kyc',
        authorization: true,
      });
      setKycScreen(
        res?.is_bank
          ? 'KYCRisk'
          : res?.is_pajak
          ? 'KYCBank'
          : res?.is_pekerjaan
          ? 'KYCTax'
          : res?.is_biodata_keluarga
          ? 'KYCOccupation'
          : res?.is_alamat
          ? 'KYCFamily'
          : res?.is_biodata_pribadi
          ? 'KYCAddress'
          : 'KYCPersonal',
      );
    } catch (error) {
    } finally {
      setKycProgressLoading(false);
    }
  };

  return {
    user: {...profile1, ...profile2, kycScreen},
    getUser,
    getProfile,
    getKycProgress,
    kycProgressLoading,
    userLoading,
  };
};
