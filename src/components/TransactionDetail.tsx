import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  StyleSheet,
  useAnimatedValue,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Text from './Text';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import Header from './Header';
import IconWrapper from './IconWrapper';
import ICCancel from './icons/ICCancel';
import ScreenWrapper from './ScreenWrapper';
import Gap from './Gap';
import numberFormat from '../utils/numberFormat';
import Button from './Button';
import capitalize from '../utils/capitalize';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import dateTimeFormat from '../utils/dateTimeFormat';

const TransactionDetail = ({
  setShow,
  loading,
  data,
  clearPaymentCode = () => {},
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  data: {
    kodeEfek: string;
    kodePembayaran: string;
    merkDagang: string;
    totalTransaksi: number;
    jenisBisnis: string;
    hargaPerLembar: number;
    jumlahLembar: number;
    nominal: number;
    biayaAdminBank: number;
    biayaPlatform: number;
    jenisTransaksi: string;
    statusTransaksi: string;
    periodePembayaran: string;
    tanggalPembayaran: string;
  };
  clearPaymentCode?: () => void;
}) => {
  let colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const {height} = useWindowDimensions();
  const translateYAnim = useAnimatedValue(height);
  const navigation = useNavigation();

  const slideIn = () => {
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(translateYAnim, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const firstSection = [
    ...(data.kodeEfek
      ? [
          {
            field: 'Kode ' + capitalize(data.jenisBisnis),
            value: data.kodeEfek,
          },
        ]
      : []),
    ...(data.merkDagang
      ? [
          {
            field: 'Nama Bisnis',
            value: data.merkDagang,
          },
        ]
      : []),
    ...(data.jenisBisnis
      ? [
          {
            field: 'Jenis Bisnis',
            value: data.jenisBisnis,
          },
        ]
      : []),
    {
      field: 'Jenis Transaksi',
      value: data.jenisTransaksi,
    },
    {
      field: 'Status Transaksi',
      value: data.statusTransaksi,
    },
    ...(['Dividen', 'Bagi Hasil'].includes(data.jenisTransaksi) &&
    data.tanggalPembayaran &&
    data.tanggalPembayaran
      ? [
          {
            field: 'Tanggal Pembagian',
            value: data.tanggalPembayaran
              ? dateTimeFormat(data.tanggalPembayaran)
              : // ? String(new Date(data.tanggalPembayaran))
                '',
          },
          {
            field: 'Periode Pembayaran',
            value: data.periodePembayaran,
          },
        ]
      : []),
  ];

  const secondSection = [
    ...(!['Bagi Hasil', 'Dividen', 'Pokok', 'Pengembalian'].includes(
      data.jenisTransaksi,
    )
      ? [
          {
            field: 'Harga Per Lembar',
            value: 'Rp' + numberFormat(data.hargaPerLembar),
          },
          {
            field: 'Jumlah Lembar',
            value: numberFormat(data.jumlahLembar),
          },
          {
            field: 'Nominal Pembelian',
            value: 'Rp' + numberFormat(data.nominal),
          },
        ]
      : []),
    ...(data.biayaAdminBank || data.biayaPlatform
      ? [
          {
            field: 'Biaya Admin Bank',
            value:
              (data.jenisTransaksi === 'Penjualan' ? '-' : '') +
              ('Rp' + numberFormat(data.biayaAdminBank)),
          },
          {
            field: 'Biaya Platform',
            value:
              (data.jenisTransaksi === 'Penjualan' ? '-' : '') +
              ('Rp' + numberFormat(data.biayaPlatform)),
          },
        ]
      : []),
    {
      field: `Total ${
        data.jenisTransaksi === 'Pembelian' ? 'Pembayaran' : 'Penerimaan'
      }`,
      value: 'Rp' + numberFormat(data.totalTransaksi),
    },
  ];

  useEffect(() => {
    slideIn();
  }, []);

  return (
    <Modal>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          transform: [{translateY: translateYAnim}],
          zIndex: 2,
        }}>
        <ScreenWrapper
          background
          backgroundType="gradient"
          statusBar={false}
          scrollView
          notch={Platform.OS === 'ios' ? true : false}>
          {/* <BlurOverlay blurAmount={40} /> */}
          <View
            style={{
              flex: 1,
              zIndex: 2,
            }}>
            <Gap height={24} />
            <Header
              title="Detail Transaksi"
              backButton={false}
              rightIcon={
                <IconWrapper
                  onPress={() => {
                    slideOut();
                    clearPaymentCode();
                    setShow(false);
                  }}>
                  <ICCancel color={iconColor} />
                </IconWrapper>
              }
            />
            {loading ? (
              <ActivityIndicator color={tint} style={{marginTop: 46}} />
            ) : (
              <View style={{marginTop: 46, paddingHorizontal: 24, flexGrow: 1}}>
                {firstSection.map((item, id) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: id !== firstSection.length - 1 ? 16 : 0,
                    }}
                    key={item.field}>
                    <Text style={[styles.field, {color: textColor2}]}>
                      {item.field}
                    </Text>
                    <Text style={[styles.value, {color: textColor}]}>
                      {item.value}
                    </Text>
                  </View>
                ))}
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: RGBAColors(0.6)[colorScheme].background,
                    },
                  ]}>
                  {secondSection.map((item, id) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: id !== secondSection.length - 1 ? 16 : 0,
                      }}
                      key={item.field}>
                      <Text
                        style={[
                          styles.field,
                          {
                            color: textColor2,
                            fontWeight: item.field.includes('Total')
                              ? '600'
                              : '400',
                          },
                        ]}>
                        {item.field}
                      </Text>
                      <Text
                        style={[
                          styles.value,
                          {
                            color:
                              ['Biaya Admin Bank', 'Biaya Platform'].includes(
                                item.field,
                              ) && data.jenisTransaksi === 'Penjualan'
                                ? textColorDanger
                                : textColor,
                          },
                        ]}>
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
                {(data.statusTransaksi === 'Pending' ||
                  data.statusTransaksi === 'Hold') && (
                  <>
                    <Gap flex={1} />
                    <Gap height={24} />
                    <Button
                      title="Selesaikan Pembayaran"
                      onPress={() => {
                        clearPaymentCode();
                        setShow(false);
                        navigation.navigate('Order', {
                          screen: 'WaitingPayment',
                          params: {
                            paymentCode: data.kodePembayaran,
                          },
                        });
                      }}
                    />
                    <Gap height={24} />
                  </>
                )}
                {/* <Button
                  title="Test Payment Success"
                  onPress={() =>
                    navigation.navigate('PaymentSuccess', {
                      paymentCode: data.kodePembayaran,
                      type: data.jenisTransaksi,
                    })
                  }
                /> */}
              </View>
            )}
          </View>
        </ScreenWrapper>
      </Animated.View>
    </Modal>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  field: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'right',
  },
  card: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 40,
  },
});
