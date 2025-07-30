import {ActivityIndicator, Keyboard, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import ICWarningRounded from '../components/icons/ICWarningRounded';
import {
  KYCFormFieldType,
  KYCPersonalType,
  KYCIDType,
  KYCIDErrorType,
  KYCPersonalErrorType,
} from '../constants/Types';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useAPI} from '../services/api';
// import RNFetchBlob from 'rn-fetch-blob';
import {useThemeColor} from '../hooks/useThemeColor';
import {StackActions, useNavigation} from '@react-navigation/native';
import trimStringInObject from '../utils/trimStringInObject';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

const KYCPersonal = () => {
  const dispatch = useDispatch();
  const {apiRequest} = useAPI();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');

  const navigation = useNavigation();

  const [IDFormState, setIDFormState] = useState<KYCIDType>({
    nik: '',
    tglRegistrasiKTP: '',
    tglKadaluwarsaKTP: '',
    fotoKTP: '',
    fotoSelfieKTP: '',
    passport: '',
    isKtpLifetime: null,
  });
  const [personalFormState, setPersonalFormState] = useState<KYCPersonalType>({
    namaDepan: '',
    namaBelakang: '',
    email: '',
    phone: '',
    tempatLahir: '',
    tglLahir: '',
    jenisKelamin: '',
    agama: '',
    pendidikan: '',
  });
  const [IDFormError, setIDFormError] = useState<KYCIDErrorType>({
    nik: [],
    tglRegistrasiKTP: [],
    tglKadaluwarsaKTP: [],
    fotoKTP: [],
    fotoSelfieKTP: [],
    passport: [],
    isKtpLifetime: [],
  });
  const [personalFormError, setPersonalFormError] =
    useState<KYCPersonalErrorType>({
      namaDepan: [],
      namaBelakang: [],
      email: [],
      phone: [],
      tempatLahir: [],
      tglLahir: [],
      jenisKelamin: [],
      agama: [],
      pendidikan: [],
    });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const genderOption = [
    {id: 1, label: 'Laki-laki'},
    {id: 2, label: 'Perempuan'},
  ];

  const religionOption = [
    {id: 1, label: 'Islam'},
    {id: 2, label: 'Katolik'},
    {id: 3, label: 'Protestan'},
    {id: 4, label: 'Hindu'},
    {id: 5, label: 'Budha'},
    {id: 6, label: 'Konghucu'},
    {id: 7, label: 'Lainnya'},
  ];

  const educationOption = [
    {id: 1, label: 'SD'},
    {id: 2, label: 'SMP'},
    {id: 3, label: 'SMA / SMK'},
    {id: 4, label: 'Diploma I'},
    {id: 5, label: 'Diploma III'},
    {id: 6, label: 'Sarjana (S1)'},
    {id: 7, label: 'Magister (S2)'},
    {id: 8, label: 'Doktor (S3)'},
  ];

  const ktpPeriodOption = [
    {id: true, label: 'Seumur Hidup'},
    {id: false, label: 'Sementara'},
  ];

  const IDForm: KYCFormFieldType[] = [
    {
      name: 'nik',
      label: 'Nomor Induk Kependudukan (NIK)',
      placeholder: 'Masukkan NIK',
      type: 'text',
      required: true,
    },
    {
      name: 'tglRegistrasiKTP',
      label: 'Tanggal Registrasi KTP',
      placeholder: 'DD/MM/YYYY',
      type: 'date',
    },
    {
      name: 'isKtpLifetime',
      label: 'Tanggal Kadaluwarsa KTP',
      type: 'dropdown',
      option: ktpPeriodOption,
      placeholder: 'Sementara',
    },
    ...(IDFormState.isKtpLifetime
      ? []
      : [
          {
            name: 'tglKadaluwarsaKTP',
            label: '',
            placeholder: 'DD/MM/YYYY',
            type: 'date',
          },
        ]),
    {
      name: 'fotoKTP',
      label: 'Foto KTP',
      type: 'picture',
      required: true,
    },
    {
      name: 'fotoSelfieKTP',
      label: 'Foto Selfie Memegang KTP',
      type: 'picture',
      required: true,
      subLabel: 'Jangan menutupi wajah',
      subLabelIcon: <ICWarningRounded color={textColor2} />,
    },
  ];

  const PersonalForm: KYCFormFieldType[] = [
    {
      name: 'namaDepan',
      label: 'Nama Depan',
      type: 'text',
      required: true,
    },
    {
      name: 'namaBelakang',
      label: 'Nama Belakang',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      disable: true,
    },
    {
      name: 'phone',
      label: 'Nomor Telepon',
      type: 'phone',
      required: true,
      disable: true,
    },
    {
      name: 'tempatLahir',
      label: 'Tempat Lahir',
      type: 'text',
      required: true,
    },
    {
      name: 'tglLahir',
      label: 'Tanggal Lahir',
      placeholder: 'DD/MM/YYYY',
      type: 'date',
      required: true,
    },
    {
      name: 'jenisKelamin',
      label: 'Jenis Kelamin',
      type: 'radio-button',
      required: true,
      option: genderOption,
    },
    {
      name: 'agama',
      label: 'Agama',
      type: 'dropdown',
      required: true,
      option: religionOption,
    },
    {
      name: 'pendidikan',
      label: 'Pendidikan Terakhir',
      type: 'dropdown',
      required: true,
      option: educationOption,
    },
  ];

  const getData = async () => {
    setPageLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/biodata/pribadi',
        authorization: true,
      });
      setIDFormState({
        nik: res.ktp?.nik || '',
        tglRegistrasiKTP: res.ktp?.tgl_registrasi || '',
        tglKadaluwarsaKTP: res.ktp?.tgl_kadaluarsa_ktp || '',
        fotoKTP: res.ktp?.foto_ktp || '',
        fotoSelfieKTP: res.ktp?.foto_selfie_ktp || '',
        isKtpLifetime: res.ktp?.is_ktp_lifetime || '',
        passport: res.ktp?.no_passport || '',
      });
      setPersonalFormState({
        namaDepan: res.firstname,
        namaBelakang: res.lastname,
        email: res.email,
        phone: res.phone,
        tempatLahir: res.tempat_lahir,
        tglLahir: res.tgl_lahir,
        jenisKelamin: res.jenis_kelamin_id,
        agama: res.agama_id,
        pendidikan: res.pendidikan_id,
      });
    } catch (error) {
      console.log('getData error', error);
    } finally {
      setPageLoading(false);
    }
  };

  const submit = async () => {
    Keyboard.dismiss();
    setSubmitLoading(true);
    try {
      // let KTPBase64 =
      //   Platform.OS === 'ios'
      //     ? IDFormState.fotoKTP
      //       ? IDFormState.fotoKTP.replace('file://', '')
      //       : IDFormState.fotoKTP
      //     : '';
      // let SelfieKTPBase64 =
      //   Platform.OS === 'ios'
      //     ? IDFormState.fotoSelfieKTP
      //       ? IDFormState.fotoSelfieKTP.replace('file://', '')
      //       : IDFormState.fotoSelfieKTP
      //     : '';

      // if (KTPBase64 && !KTPBase64.includes('http') && KTPBase64) {
      //   await RNFetchBlob.fs.readFile(KTPBase64, 'base64').then(data => {
      //     KTPBase64 = data;
      //   });
      // }
      // if (
      //   SelfieKTPBase64 &&
      //   !SelfieKTPBase64.includes('http') &&
      //   SelfieKTPBase64
      // ) {
      //   await RNFetchBlob.fs.readFile(SelfieKTPBase64, 'base64').then(data => {
      //     SelfieKTPBase64 = data;
      //   });
      // }
      let body = trimStringInObject({
        firstname: personalFormState.namaDepan,
        lastname: personalFormState.namaBelakang,
        tempat_lahir: personalFormState.tempatLahir,
        tgl_lahir: personalFormState.tglLahir
          ? new Date(personalFormState.tglLahir).getFullYear() +
            '-' +
            (new Date(personalFormState.tglLahir).getMonth() + 1) +
            '-' +
            new Date(personalFormState.tglLahir).getDate()
          : '',
        jenis_kelamin_id: personalFormState.jenisKelamin,
        agama_id: personalFormState.agama,
        pendidikan_id: personalFormState.pendidikan,
        ktp: {
          nik: IDFormState.nik,
          tgl_registrasi: IDFormState.tglRegistrasiKTP
            ? new Date(IDFormState.tglRegistrasiKTP).getFullYear() +
              '-' +
              (new Date(IDFormState.tglRegistrasiKTP).getMonth() + 1) +
              '-' +
              new Date(IDFormState.tglRegistrasiKTP).getDate()
            : '1900-01-01',
          is_ktp_lifetime: true,
          tgl_kadaluarsa_ktp: IDFormState.tglKadaluwarsaKTP
            ? new Date(IDFormState.tglKadaluwarsaKTP).getFullYear() +
              '-' +
              (new Date(IDFormState.tglKadaluwarsaKTP).getMonth() + 1) +
              '-' +
              new Date(IDFormState.tglKadaluwarsaKTP).getDate()
            : '1900-01-01',
          foto_ktp: IDFormState.fotoKTP,
          foto_selfie_ktp: IDFormState.fotoSelfieKTP,
          no_passport: IDFormState.passport || '',
        },
      });
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/biodata/pribadi',
        authorization: true,
        body,
      });
      navigation.dispatch(StackActions.replace('KYC', {screen: 'KYCAddress'}));
    } catch (err: any) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as {
          status: number;
          data?: any;
        };
        if (error?.status === 422) {
          console.log('submit error', error);
          setIDFormError(prev => ({
            ...prev,
            nik: error?.data?.errors?.ktp?.nik || [],
            tglRegistrasiKTP: error?.data?.errors?.ktp?.tgl_registrasi || [],
            tglKadaluwarsaKTP:
              error?.data?.errors?.ktp?.tgl_kadaluarsa_ktp || [],
            isKtpLifetime: error?.data?.errors?.ktp?.is_ktp_lifetime || [],
            fotoKTP: error?.data?.errors?.ktp?.foto_ktp || [],
            fotoSelfieKTP: error?.data?.errors?.ktp?.foto_selfie_ktp || [],
            passport: error?.data?.errors?.ktp?.no_passport || [],
          }));
          setPersonalFormError(prev => ({
            ...prev,
            namaDepan: error?.data?.errors?.firstname || [],
            namaBelakang: error?.data?.errors?.lastname || [],
            email: [],
            phone: [],
            tempatLahir: error?.data?.errors?.tempat_lahir || [],
            tglLahir: error?.data?.errors?.tgl_lahir || [],
            jenisKelamin: error?.data?.errors?.jenis_kelamin_id || [],
            agama: error?.data?.errors?.agama_id || [],
            pendidikan: error?.data?.errors?.pendidikan_id || [],
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
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Biodata Pribadi"
          instruction="Silakan lengkapi informasi pribadi yang dibutuhkan. Jangan khawatir, kami menjaga kerahasiaan data Anda"
          percentage={0}
        />
        <Gap height={40} />
        {pageLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <Text style={styles.heading}>Tanda Pengenal</Text>
            <Gap height={16} />
            <FormBuilder
              fields={IDForm}
              state={IDFormState}
              onChange={setIDFormState}
              error={IDFormError}
            />
            <Gap height={40} />
            <Text style={styles.heading}>Data Pribadi</Text>
            <Gap height={16} />
            <FormBuilder
              fields={PersonalForm}
              state={personalFormState}
              onChange={setPersonalFormState}
              error={personalFormError}
            />
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={submit}
              loading={submitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCPersonal;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
