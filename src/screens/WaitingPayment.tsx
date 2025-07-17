import {ActivityIndicator, Alert, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Gap from '../components/Gap';
import Header from '../components/Header';
import BlurOverlay from '../components/BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import CopyText from '../components/CopyText';
import Accordion from '../components/Accordion';
import {PAYMENT_METHODS} from '../constants/PaymentMethods';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {useAPI} from '../services/api';
import {BankMethodType, OrderStackParamList} from '../constants/Types';
import {Countdown} from '../components/Countdown';
import dateTimeFormat from '../utils/dateTimeFormat';
import {useBank} from '../api/bank';
import numberFormat from '../utils/numberFormat';
import capitalize from '../utils/capitalize';
import {useColorScheme} from '../hooks/useColorScheme';
import LottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';
import CustomBottomSheet from '../components/BottomSheet';
import ICCancel from '../components/icons/ICCancel';

type InfoType = {
  label: string;
  value: string;
};

type Props = NativeStackScreenProps<OrderStackParamList, 'WaitingPayment'>;

const WaitingPayment = ({route}: Props) => {
  let colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const dangerSurface = useThemeColor({}, 'dangerSurface');
  const navigation = useNavigation();
  const {apiRequest} = useAPI();
  const {code} = route.params;
  const {paymentBankList, getPaymentBankList} = useBank();
  const dispatch = useDispatch();

  const [informationContent, setInformationContent] = useState<InfoType[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [form, setForm] = useState({
    type_bisnis: '',
    kode_saham: '',
    kode: '',
    merk_dagang: '',
    billing_expired: '',
    time_billing_expired: '',
    bank_name: '',
    nominal: 0,
    total_nominal: 0,
    biaya_platform: 0,
    account_va: '',
    discount: 0,
    status: '',
  });
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownExpired, setCountdownExpired] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<BankMethodType[]>([]);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const cautionList = [
    'Mohon untuk segera melakukan transfer atas pemesanan efek',
    'Pembayaran harus menggunakan Akun Virtual pemilik akun LBS',
    'Pemesanan akan dibatalkan jika waktu habis atau melewati batas pembayaran atau pendanaan telah terpenuhi',
  ];

  const getPaymentDetail = async () => {
    setLoadingPage(true);
    try {
      const res = await apiRequest({
        endpoint: `/waiting-payment/${code}`,
        authorization: true,
      });
      console.log('getPaymentDetail', res);
      const isMarket = res.status_transaksi.id == 8;

      let percentage = res.percentage;
      let biayaPlatform = 0;
      if (isMarket) {
        biayaPlatform = isMarket
          ? Math.round((res.nominal * percentage) / 100)
          : res.fee || '0';
      }

      if (res.status_transaksi?.name === 'Success') {
        navigation.dispatch(
          StackActions.replace('PaymentSuccess', {
            paymentCode: code,
          }),
        );
      } else if (
        res.status_transaksi?.name === 'Pending' ||
        res.status_transaksi?.name === 'Hold'
      ) {
        setForm({
          type_bisnis: res.bisnis_transaksi[0]?.type_bisnis || '',
          kode: code || '',
          merk_dagang: res.bisnis_transaksi[0]?.merk_dagang || '',
          kode_saham: res.bisnis_transaksi[0]?.kode_saham || '',
          billing_expired: res.billing_expired || form.billing_expired,
          time_billing_expired:
            res.billing_expired.split('T')[1].split('.')[0] ||
            form.billing_expired,
          bank_name: res.bank_name || '',
          nominal: res.nominal || 0,
          total_nominal: res.total_nominal || 0,
          biaya_platform: res.fee || 0,
          account_va: res.account_va || '',
          discount: res.discount || 0,
          status: res.status_transaksi?.name || '',
        });
        setCountdownTime(new Date(res.billing_expired).getTime());
        const tempPaymentMethods = PAYMENT_METHODS.filter(
          item => item.bank_name == res.bank_name,
        );
        if (tempPaymentMethods.length > 0) {
          setPaymentMethods(tempPaymentMethods[0]?.list || []);
        }
      } else {
        setCountdownExpired(true);
        setForm({...form, status: res.status_transaksi?.name || ''});
      }

      const tipeBisnis = capitalize(res.bisnis_transaksi[0]?.type_bisnis || '');

      setInformationContent([
        {
          label: tipeBisnis + ' Terkait',
          value: res.bisnis_transaksi[0]?.merk_dagang,
        },
        {
          label: 'Kode ' + tipeBisnis,
          value: res.bisnis_transaksi[0]?.kode_saham || '',
        },
        {
          label: 'Kode Transaksi',
          value: code,
        },
        {
          label: 'Nominal',
          value: 'Rp' + numberFormat(res.nominal || 0),
        },
        {
          label: 'Biaya Platform',
          value: 'Rp' + numberFormat(isMarket ? biayaPlatform : res.fee || 0),
        },
        ...(isMarket
          ? [
              {
                label: 'Biaya Admin Bank',
                value:
                  'Rp' +
                  numberFormat(res.total_nominal - res.nominal - biayaPlatform),
              },
            ]
          : []),
        {
          label: 'Bank Kustodian',
          value: 'Danamon Syariah',
        },
      ]);
    } catch (error) {
    } finally {
      setLoadingPage(false);
    }
  };

  const cancelPayment = async () => {
    setLoadingCancel(true);
    try {
      const res = await apiRequest({
        endpoint: `/cancel-payment/${code}`,
        authorization: true,
      });
      if (res) {
        Alert.alert('Berhasil', 'Transaksi berhasil dibatalkan.', [
          {
            text: 'Tutup',
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.dispatch(StackActions.replace('MainTab'));
              }
            },
            style: 'cancel',
          },
        ]);
      }
    } catch (error) {
      dispatch(
        setAlert({
          title: 'Terjadi Kesalahan',
          desc: '',
          type: 'danger',
          showAlert: true,
        }),
      );
    } finally {
      setLoadingCancel(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getPaymentDetail();
    setRefreshing(false);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getPaymentBankList();
      getPaymentDetail();
    };
    asyncFunc();
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}
      scrollView
      refreshing={refreshing}
      onRefresh={onRefresh}>
      <View style={[styles.container, {paddingTop: 24}]}>
        <View style={{paddingHorizontal: 24}}>
          <View
            style={[
              styles.informationCard,
              {backgroundColor: RGBAColors(0.4)[colorScheme].background},
            ]}>
            <BlurOverlay />
            <View style={styles.informationContentWrapper}>
              <Header title="Pembayaran" paddingHorizontal={0} />
              {loadingPage ? (
                <ActivityIndicator color={tint} style={{marginTop: 46}} />
              ) : (
                !countdownExpired && (
                  <>
                    <Gap height={24} />
                    <Text style={styles.paymentTimerInstruction}>
                      Segera selesaikan pembayaranmu, sebelum{' '}
                      {dateTimeFormat(countdownTime)}
                    </Text>
                    <Text
                      style={[
                        styles.timer,
                        {
                          color: countdownExpired
                            ? textColorDanger
                            : RGBAColors(0.7)[colorScheme].text,
                        },
                      ]}>
                      {countdownTime && (
                        <Countdown
                          value={countdownTime}
                          setCountdownExpired={() => setCountdownExpired(true)}
                        />
                      )}
                    </Text>
                    <View style={styles.animationContainer}>
                      <LottieView
                        autoPlay
                        style={{
                          width: 280,
                          height: 280,
                          backgroundColor: 'transparent',
                          alignSelf: 'center',
                        }}
                        source={require('../assets/animations/calculator.json')}
                        loop={true}
                      />
                    </View>
                  </>
                )
              )}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.section2,
            {backgroundColor: RGBAColors(0.4)[colorScheme].background},
          ]}>
          <BlurOverlay />
          {loadingPage ? (
            <View style={{zIndex: 2}}>
              <ActivityIndicator color={tint} style={{marginTop: 46}} />
            </View>
          ) : (
            <View style={{zIndex: 2, padding: 24}}>
              {!countdownExpired && (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.bankLogoContainer}>
                      {paymentBankList.length > 0 && form.bank_name ? (
                        <Image
                          source={{
                            uri: paymentBankList.find(
                              item => item.name === form.bank_name,
                            )?.image,
                          }}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />
                      ) : null}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 16,
                          color: textColor3,
                        }}>
                        Metode Pembayaran
                      </Text>
                      <Text style={[styles.bank, {color: textColor}]}>
                        {form.bank_name}
                      </Text>
                    </View>
                  </View>
                  <Gap height={24} />
                  <View>
                    <Text style={[styles.copyLabel, {color: textColor2}]}>
                      Jumlah yang Harus Dibayarkan
                    </Text>
                    <Gap height={8} />
                    <CopyText
                      text={'Rp' + numberFormat(form.total_nominal)}
                      value={form.total_nominal}
                    />
                  </View>
                  <Gap height={16} />
                  <View>
                    <Text style={[styles.copyLabel, {color: textColor2}]}>
                      Nomor Akun Virtual
                    </Text>
                    <Gap height={8} />
                    <CopyText text={form.account_va} value={form.account_va} />
                  </View>
                  <Gap height={24} />
                  <Button
                    title="Batalkan Pembayaran"
                    type="danger"
                    loading={loadingCancel}
                    onPress={cancelPayment}
                  />
                  <Gap height={40} />
                  <Text
                    style={[
                      styles.paymentInstructionTitle,
                      {color: textColor},
                    ]}>
                    Petunjuk Pembayaran
                  </Text>
                  <Gap height={16} />
                  <Accordion list={paymentMethods} />
                  <Gap height={40} />
                  <Text
                    style={[
                      styles.paymentInstructionTitle,
                      {color: textColor},
                    ]}>
                    PERHATIAN!
                  </Text>
                  <Gap height={16} />
                  {cautionList.map((cautionItem, cautionId) => (
                    <View key={cautionId} style={{flexDirection: 'row'}}>
                      <Text
                        style={[
                          styles.cautionText,
                          {color: textColor2, width: 20},
                        ]}>
                        {cautionId + 1}.
                      </Text>
                      <Text
                        style={[
                          styles.cautionText,
                          {color: textColor2, flex: 1},
                        ]}>
                        {cautionItem}
                      </Text>
                    </View>
                  ))}
                  <Gap height={40} />
                </>
              )}
              <View style={{paddingHorizontal: 24, paddingVertical: 18}}>
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
              {form.status === 'Pending' && (
                <>
                  <Gap height={24} />
                  <Button
                    title="Cek Status Transaksi"
                    onPress={() =>
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [
                            {
                              name: 'MainTab',
                              params: {screen: 'Transaction'},
                            },
                          ],
                        }),
                      )
                    }
                  />
                </>
              )}
            </View>
          )}
        </View>
      </View>

      {(form.status === 'Failure' || form.status === 'Expired') && (
        <CustomBottomSheet
          snapPoints={['50%']}
          onDismiss={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}>
          <View>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: dangerSurface,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <ICCancel color={textColorDanger} size={48} />
            </View>
            <Gap height={8} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                textAlign: 'center',
                color: textColorDanger,
              }}>
              Transaksi Gagal
            </Text>
            <Gap height={40} />
            <Button
              title="Cek Daftar Transaksi"
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'MainTab',
                        params: {screen: 'Transaction'},
                      },
                    ],
                  }),
                )
              }
            />
          </View>
        </CustomBottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default WaitingPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  informationCard: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  paymentTimerInstruction: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 300,
    alignSelf: 'center',
  },
  informationContentWrapper: {
    padding: 16,
    zIndex: 2,
  },
  section2: {
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 40,
    flexGrow: 1,
  },
  timer: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 40,
    marginTop: 24,
  },
  bank: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  bankLogoContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    marginRight: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  paymentInstructionTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  cautionText: {
    fontSize: 16,
    lineHeight: 24,
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
  animationContainer: {
    height: 160,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});
