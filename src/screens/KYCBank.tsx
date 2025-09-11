import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import {KYCFormFieldType} from '../constants/Types';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import BlurOverlay from '../components/BlurOverlay';
import {useKYCBank} from '../api/kycBank';
import {useBank} from '../api/bank';
import ICWarning from '../components/icons/ICWarning';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const KYCBank = () => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const {kycStep} = useSelector((item: RootState) => item.user);

  const {
    bank,
    bankError,
    bankLoading,
    bankSubmitLoading,
    getBank,
    submitBank,
    setBank,
  } = useKYCBank();
  const {KYCBankList, getKYCBankList, KYCBankListLoading} = useBank();

  const BankForm: KYCFormFieldType[] = [
    {
      name: 'bankId',
      label: 'Nama Bank',
      placeholder: 'Pilih bank',
      type: 'dropdown',
      option: KYCBankList,
      loading: KYCBankListLoading,
      required: true,
    },
    {
      name: 'rekeningBank',
      label: 'Nomor Rekening',
      placeholder: 'Masukkan nomor rekening bank',
      type: 'text',
      required: true,
    },
    {
      name: 'namaPemilikRekeningBank',
      label: 'Nama Pemilik Rekening',
      placeholder: 'Masukkan nama pemilik rekening bank',
      type: 'text',
      required: true,
    },
  ];

  useEffect(() => {
    getBank();
    getKYCBankList();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Informasi Bank"
          instruction="Selanjutnya, silakan lengkapi data akun bank agar kami dapat memudahkan proses pengiriman dana."
          percentage={60}
          backScreen="KYCTax"
          nextScreen={kycStep === 'KYCRisk' ? 'KYCRisk' : undefined}
          currentScreen="KYCBank"
        />
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
          <View style={{paddingVertical: 14, paddingHorizontal: 18, zIndex: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ICWarning />
              <Gap width={4} />
              <Text
                style={[styles.text, {color: textColor2, fontWeight: '600'}]}>
                Harap Diperhatikan!
              </Text>
            </View>
            <Gap height={16} />
            <Text style={[styles.text, {color: textColor2}]}>
              Mohon isi sesuai data yang terdaftar di bank Anda, karena rekening
              ini akan digunakan sebagai penerima dana bagi hasil / dividen,
              pengembalian pokok sukuk dan refund.
            </Text>
            <Gap height={16} />
            <Text style={[styles.text, {color: textColor2}]}>
              Jika data tidak sesuai, akan berpotensi terjadinya penolakan atau
              gagal transfer ke rekening tersebut.
            </Text>
          </View>
        </View>
        <Gap height={40} />
        {bankLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <FormBuilder
              fields={BankForm}
              state={bank}
              error={bankError}
              onChange={setBank}
            />
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={() => submitBank(kycStep)}
              loading={bankSubmitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCBank;

const styles = StyleSheet.create({
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
