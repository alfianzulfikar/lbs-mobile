import {useState} from 'react';
import {
  KYCTax2ErrorType,
  KYCTax2Type,
  KYCTaxErrorType,
  KYCTaxType,
} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import trimStringInObject from '../utils/trimStringInObject';
import {Keyboard} from 'react-native';

export const useKYCTax = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const [tax, setTax] = useState<KYCTaxType>({
    kodePajakId: null,
    npwp: '',
    penghasilanPerTahunSebelumPajak: null,
    tglRegistrasi: '',
  });
  const [taxError, setTaxError] = useState<KYCTaxErrorType>({
    kodePajakId: [],
    npwp: [],
    penghasilanPerTahunSebelumPajak: [],
    tglRegistrasi: [],
  });
  const [tax2, setTax2] = useState<KYCTax2Type>({
    rekeningSid: '',
    fotoRekeningSid: '',
    tglRegistrasiSid: '',
  });
  const [tax2Error, setTax2Error] = useState<KYCTax2ErrorType>({
    rekeningSid: [],
    fotoRekeningSid: [],
    tglRegistrasiSid: [],
  });
  const [taxLoading, setTaxLoading] = useState(false);
  const [taxSubmitLoading, setTaxSubmitLoading] = useState(false);

  const getTax = async () => {
    setTaxLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/pajak-user',
        authorization: true,
      });
      setTax({
        kodePajakId: res?.pajak?.kode_pajak.id || null,
        npwp: res?.pajak?.npwp || '',
        penghasilanPerTahunSebelumPajak:
          res?.pajak?.penghasilan_per_tahun_sebelum_pajak || null,
        tglRegistrasi: res?.pajak?.tgl_registrasi || '',
        hasSID: res?.pajak?.rekening_sid ? true : false,
      });
      setTax2({
        rekeningSid: res?.pajak?.rekening_sid || '',
        tglRegistrasiSid: res?.pajak?.tgl_registrasi_sid || '',
        fotoRekeningSid: res?.pajak?.rekening_sid
          ? res?.pajak?.foto_rekening_sid || ''
          : '',
      });
    } catch {
    } finally {
      setTaxLoading(false);
    }
  };

  const submitTax = async () => {
    Keyboard.dismiss();
    setTaxSubmitLoading(true);
    try {
      setTaxError(prev => ({
        ...prev,
        hasSID: [],
      }));
      setTax2Error(prev => ({
        ...prev,
        fotoRekeningSid: [],
        tglRegistrasiSid: [],
      }));
      if (tax.hasSID === null || tax.hasSID === undefined) {
        setTaxError(prev => ({
          ...prev,
          hasSID: ['Wajib diisi'],
        }));
        return;
      } else if (tax.hasSID) {
        if (tax2.rekeningSid) {
          if (!(tax2.fotoRekeningSid && tax2.tglRegistrasiSid)) {
            setTax2Error(prev => ({
              ...prev,
              fotoRekeningSid: !tax2.fotoRekeningSid
                ? ['Sertakan foto SID']
                : [],
              tglRegistrasiSid: !tax2.tglRegistrasiSid
                ? ['Sertakan tanggal registrasi SID']
                : [],
            }));
            return;
          }
        }
      }
      const body = trimStringInObject({
        foto_rekening_sid: tax2.fotoRekeningSid,
        kode_pajak_id: tax.kodePajakId,
        npwp: tax.npwp,
        penghasilan_per_tahun_sebelum_pajak: String(
          tax.penghasilanPerTahunSebelumPajak,
        ).replaceAll('.', ''),
        rekening_sid: tax2.rekeningSid,
        tgl_registrasi: tax.tglRegistrasi
          ? new Date(tax.tglRegistrasi).getFullYear() +
            '-' +
            (new Date(tax.tglRegistrasi).getMonth() + 1) +
            '-' +
            new Date(tax.tglRegistrasi).getDate()
          : '1960-01-01',
        tgl_registrasi_sid: tax2.tglRegistrasiSid
          ? new Date(tax2.tglRegistrasiSid).getFullYear() +
            '-' +
            (new Date(tax2.tglRegistrasiSid).getMonth() + 1) +
            '-' +
            new Date(tax2.tglRegistrasiSid).getDate()
          : '1960-01-01',
      });
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/pajak-user',
        authorization: true,
        body,
      });
      navigation.dispatch(StackActions.replace('KYC', {screen: 'KYCBank'}));
    } catch (err: any) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as {
          status: number;
          data?: any;
        };
        if (error?.status === 422) {
          setTaxError(prev => ({
            kodePajakId: error?.data?.errors?.kode_pajak_id || [],
            penghasilanPerTahunSebelumPajak:
              error?.data?.errors?.penghasilan_per_tahun_sebelum_pajak || [],
            npwp: error?.data?.errors?.npwp || [],
            tglRegistrasi: error?.data?.errors?.tgl_registrasi || [],
          }));
          setTax2Error(prev => ({
            rekeningSid: error?.data?.errors?.rekening_sid || [],
            fotoRekeningSid: error?.data?.errors?.foto_rekening_sid || [],
            tglRegistrasiSid: error?.data?.errors?.tgl_registrasi_sid || [],
          }));
        }
      }
    } finally {
      setTaxSubmitLoading(false);
    }
  };

  return {
    tax,
    taxError,
    tax2,
    tax2Error,
    getTax,
    submitTax,
    taxLoading,
    taxSubmitLoading,
    setTax,
    setTax2,
  };
};
