import {
  ActivityIndicator,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import {KYCFormFieldType} from '../constants/Types';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {
  kodePajakOption,
  occupationOption,
  sumberPenghasilanOption,
  tujuanInvestasiOption,
} from '../constants/KYC';
import {useKYCOccupation} from '../api/kycOccupation';
import ICInfo from '../components/icons/ICInfo';
import {useKYCTax} from '../api/kycTax';
import Input from '../components/Input';
import InputWrapper from '../components/InputWrapper';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import BlurOverlay from '../components/BlurOverlay';

const KYCTax = () => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');

  const {
    getTax,
    setTax,
    setTax2,
    submitTax,
    tax,
    taxError,
    tax2,
    tax2Error,
    taxLoading,
    taxSubmitLoading,
  } = useKYCTax();

  const sidOption = [
    {id: true, label: 'Ya'},
    {id: false, label: 'Tidak'},
  ];

  const TaxForm: KYCFormFieldType[] = [
    {
      name: 'kodePajakId',
      label: 'Kode Akun Pajak',
      placeholder: 'Pilih Kode',
      type: 'dropdown',
      option: kodePajakOption,
      required: true,
    },
    {
      name: 'npwp',
      label: 'Nomor NPWP',
      placeholder: 'Masukkan NPWP',
      type: 'text',
    },
    {
      name: 'penghasilanPerTahunSebelumPajak',
      label: 'Penghasilan Per Tahun (Sebelum Pajak)',
      subLabel:
        'Penghasilan per tahun akan berpengaruh pada limit pemesanan saham',
      subLabelIcon: <ICInfo color={textColor2} />,
      placeholder: '0',
      type: 'number',
      required: true,
    },
    {
      name: 'tglRegistrasi',
      label: 'Tanggal Registrasi NPWP',
      placeholder: '',
      type: 'date',
    },
    {
      name: 'hasSID',
      label: 'Apakah kamu memiliki SID',
      type: 'radio-button',
      option: sidOption,
      required: true,
    },
  ];
  const Tax2Form: KYCFormFieldType[] = [
    {
      name: 'rekeningSid',
      label: 'Nomor SID',
      placeholder: 'Masukkan nomor SID',
      type: 'text',
    },
    {
      name: 'tglRegistrasiSid',
      label: 'Tanggal Registrasi SID',
      placeholder: '',
      type: 'date',
    },
    {
      name: 'fotoRekeningSid',
      label: 'Foto Kepemilikan SID',
      type: 'picture',
      pictureType: 'option',
    },
  ];

  useEffect(() => {
    getTax();
  }, []);

  useEffect(() => {
    if (!tax.hasSID) {
      setTax2(prev => ({
        ...prev,
        fotoRekeningSid: '',
        rekeningSid: '',
        tglRegistrasiSid: '',
      }));
    }
  }, [tax.hasSID]);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Informasi Pajak"
          instruction="Kami membutuhkan informasi pajak untuk memastikan kepatuhan. Jangan khawatir, kami menjaga privasi Anda."
          percentage={50}
          backScreen="KYCOccupation"
        />
        <Gap height={40} />
        {taxLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <FormBuilder
              fields={TaxForm}
              state={tax}
              error={taxError}
              onChange={setTax}
            />
            {/* <Gap height={24} />
            <Input
              type="radio-button"
              label="Apakah kamu memiliki SID?"
              option={sidOption}
              value={hasSID}
              onChange={setHasSID}
              required
            /> */}
            <View style={{height: tax.hasSID ? 'auto' : 0, overflow: 'hidden'}}>
              <Gap height={24} />
              <FormBuilder
                fields={Tax2Form}
                state={tax2}
                error={tax2Error}
                onChange={setTax2}
              />
            </View>
            <Gap height={24} />
            <View
              style={[
                styles.cardContainer,
                {
                  backgroundColor: RGBAColors(0.4)[colorScheme].background,
                  borderColor: RGBAColors(colorScheme === 'dark' ? 0.2 : 0.1)[
                    colorScheme
                  ].text,
                },
              ]}>
              <BlurOverlay />
              <View
                style={{paddingVertical: 14, paddingHorizontal: 18, zIndex: 2}}>
                <Text style={[styles.text, {color: textColor2}]}>
                  Anda dapat berinvestasi tanpa Batasan limit tahunan jika:
                </Text>
                <View style={{marginTop: 4}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.numbering, {color: textColor2}]}>
                      1.
                    </Text>
                    <Text style={[styles.text, {flex: 1, color: textColor2}]}>
                      Memiliki rekening efek selama 2 tahun atau lebih
                      (dibuktikan dengan memiliki Single Investor Identification
                      (SID))
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.numbering, {color: textColor2}]}>
                      2.
                    </Text>
                    <Text style={[styles.text, {flex: 1, color: textColor2}]}>
                      atau merupakan wakil/karyawan badan hukum
                    </Text>
                  </View>
                </View>
                <Text style={[styles.text, {color: textColor2, marginTop: 4}]}>
                  Untuk dapat berinvestasi tanpa limit tahunan dapat menghubungi{' '}
                  <Text
                    style={[
                      styles.text,
                      {
                        // marginLeft: 4,
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                        color: tint,
                      },
                    ]}
                    onPress={() =>
                      Linking.openURL(
                        "https://api.whatsapp.com/send?phone=6281290569559&text=Assalamu'alaikum, saya ingin berkonsultasi terkait limit tahunan.",
                      )
                    }>
                    Customer Service
                  </Text>
                  {/* <TouchableOpacity>
                  </TouchableOpacity> */}
                </Text>
              </View>
            </View>
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={submitTax}
              loading={taxSubmitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCTax;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
  },
  numbering: {
    fontSize: 14,
    lineHeight: 20,
    width: 20,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
