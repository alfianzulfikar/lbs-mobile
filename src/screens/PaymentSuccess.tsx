import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from '../components/BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from '../components/Gap';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import {useTransaction} from '../api/transaction';
import numberFormat from '../utils/numberFormat';
import LottieView from 'lottie-react-native';
import Skeleton from '../components/Skeleton';
import capitalize from '../utils/capitalize';

type InfoType = {
  label: string;
  value: string | number;
};

type Props = {
  route: {
    params: {
      paymentCode: string;
      type: string;
    };
  };
};
const PaymentSuccess = ({route}: Props) => {
  const {paymentCode, type} = route.params;
  const {getTransactionDetail, transactionDetail, transactionDetailLoading} =
    useTransaction();
  const [informationContent, setInformationContent] = useState<InfoType[]>([]);
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  let colorScheme = useColorScheme();

  const navigation = useNavigation();

  useEffect(() => {
    getTransactionDetail({paymentCode, type});
  }, []);

  useEffect(() => {
    const jenisBisnis = capitalize(transactionDetail.jenisBisnis);
    setInformationContent(
      transactionDetail.isIPO
        ? [
            {
              label: `${jenisBisnis} Terkait`,
              value: transactionDetail.merkDagang,
            },
            {
              label: `Kode ${jenisBisnis}`,
              value: transactionDetail.kodeEfek,
            },
            {
              label: `Nominal Pembelian`,
              value: transactionDetail.nominal
                ? 'Rp' + numberFormat(transactionDetail.nominal)
                : '',
            },
            {
              label: 'Harga Per Lembar',
              value: transactionDetail.hargaPerLembar
                ? 'Rp' + numberFormat(transactionDetail.hargaPerLembar)
                : '',
            },
            {
              label: 'Jumlah Lembar',
              value: transactionDetail.jumlahLembar
                ? numberFormat(transactionDetail.jumlahLembar)
                : '',
            },
            {
              label: 'Status Transaksi',
              value: transactionDetail.statusTransaksi,
            },
          ]
        : [
            {
              label: 'Kode Saham',
              value: transactionDetail.kodeEfek,
            },
            {
              label: 'Nama Bisnis',
              value: transactionDetail.merkDagang,
            },
            {
              label: 'Harga Per Lembar',
              value: transactionDetail.hargaPerLembar
                ? 'Rp' + numberFormat(transactionDetail.hargaPerLembar)
                : '',
            },
            {
              label: 'Jumlah Lembar',
              value: transactionDetail.jumlahLembar
                ? numberFormat(transactionDetail.jumlahLembar)
                : '',
            },
            {
              label: `Nominal ${type}`,
              value: transactionDetail.nominal
                ? 'Rp' + numberFormat(transactionDetail.nominal)
                : '',
            },
            {
              label: 'Biaya Admin Bank',
              value: transactionDetail.biayaAdminBank
                ? 'Rp' + numberFormat(transactionDetail.biayaAdminBank)
                : '',
            },
            {
              label: 'Biaya Platform',
              value: transactionDetail.biayaPlatform
                ? 'Rp' + numberFormat(transactionDetail.biayaPlatform)
                : '',
            },
            {
              label: `Total ${
                !type ? '' : type === 'Pembelian' ? 'Pembayaran' : 'Penerimaan'
              }`,
              value: transactionDetail.totalTransaksi
                ? 'Rp' + numberFormat(transactionDetail.totalTransaksi)
                : '',
            },
            {
              label: 'Status Transaksi',
              value: transactionDetail.statusTransaksi,
            },
          ],
    );
  }, [transactionDetail]);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}
      scrollView>
      {transactionDetailLoading ? (
        <View style={{padding: 24}}>
          <Skeleton aspectRatio={4 / 5} />
        </View>
      ) : (
        <View style={[styles.container, {paddingTop: 40}]}>
          <Text style={styles.heading}>
            {type && type === 'Penjualan'
              ? 'Order Jual Diproses'
              : 'Pembayaran Berhasil'}
          </Text>
          <Text style={styles.desc}>
            {type
              ? `Cek status order secara berkala untuk mengetahui progress ${type.toLowerCase()} ${capitalize(
                  transactionDetail.jenisBisnis,
                )}.`
              : 'Selamat! Ikhtiar Anda meraih finansial yang berkah sudah dimulai.'}
          </Text>
          <LottieView
            autoPlay
            style={{
              width: 280,
              height: 280,
              backgroundColor: 'transparent',
              alignSelf: 'center',
            }}
            source={require('../assets/animations/alhamdulillah.json')}
            loop={true}
          />
          <View
            style={[
              styles.card,
              {
                backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.6 : 0.7)[
                  colorScheme
                ].background,
              },
            ]}>
            <BlurOverlay />
            <View style={styles.cardContent}>
              {informationContent.map((infoItem, infoId) => (
                <View key={infoId}>
                  <Text style={[styles.infoLabel, {color: textColor2}]}>
                    {infoItem.label}
                  </Text>
                  <Text style={[styles.infoValue, {color: textColor}]}>
                    {infoItem.value}
                  </Text>
                  {infoId !== informationContent.length - 1 && (
                    <Gap height={16} />
                  )}
                </View>
              ))}
            </View>
          </View>
          <Gap height={40} />
          <Button
            title="Kembali ke Beranda"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.dispatch(
                  CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}),
                );
              }
            }}
          />
          <Gap height={40} />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    // marginTop: 46,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  card: {
    overflow: 'hidden',
    borderRadius: 24,
    marginTop: 40,
  },
  cardContent: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  infoLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 4,
  },
});
