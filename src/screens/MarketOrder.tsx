import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useColorScheme} from '../hooks/useColorScheme';
import Text from '../components/Text';
import Gap from '../components/Gap';
import Header from '../components/Header';
import BlurOverlay from '../components/BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import Button from '../components/Button';
import PlusMinusInput from '../components/PlusMinusInput';
import Input from '../components/Input';
import ICInfo from '../components/icons/ICInfo';
import {useBank} from '../api/bank';
import numberFormat from '../utils/numberFormat';
import Label from '../components/Label';
import {useMarket} from '../api/market';
import BottomSheet from '../components/BottomSheet';
import {useNavigation} from '@react-navigation/native';

type Props = {
  route: {
    params: {
      type: 'ask' | 'bid';
      id: number;
      merkDagang: string;
      code: string;
      feeBuy: number;
      feeSell: number;
      defaultPrice?: number;
    };
  };
};
const MarketOrder = ({route}: Props) => {
  const {code, merkDagang, type, feeBuy, feeSell, id, defaultPrice} =
    route.params;
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const navigation = useNavigation();

  const {paymentBankList, getPaymentBankList} = useBank();
  const {
    order,
    continueOrder,
    orderLoading,
    showConfirmOrderDialog,
    showSuccessOrderDialog,
    orderError,
    setShowConfirmOrderDialog,
    setShowSuccessOrderDialog,
  } = useMarket();

  const [price, setPrice] = useState<number>(defaultPrice || 0);
  const [volume, setVolume] = useState<number>(0);
  const [nominal, setNominal] = useState(0);
  const [bank, setBank] = useState('');
  const [method, setMethod] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [platformFee, setPlatformFee] = useState(0);
  const [total, setTotal] = useState(0);

  const bankAdminFee = route.params?.type
    ? route.params?.type === 'bid'
      ? 5900
      : 2900
    : 0;
  const percentage =
    type === 'bid' ? (feeBuy || 0) / 100 : (feeSell || 0) / 100;

  const radioOption: {name: string; value: 'whatsapp' | 'sms'}[] = [
    {name: 'WhatsApp', value: 'whatsapp'},
    {name: 'SMS', value: 'sms'},
  ];

  useEffect(() => {
    getPaymentBankList();
  }, []);

  useEffect(() => {
    setNominal(price * volume);
  }, [volume, price]);

  useEffect(() => {
    setTotal(
      nominal
        ? type === 'ask'
          ? nominal - bankAdminFee - platformFee
          : nominal + bankAdminFee + platformFee
        : 0,
    );
  }, [nominal]);

  useEffect(() => {
    setPlatformFee(Math.round(price * volume * percentage));
  }, [price, volume, percentage]);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}>
      <Gap height={24} />
      <Header title="Detail Order" />
      <Gap height={20} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: 24}}>
          <Gap height={12} />
          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor: RGBAColors(0.6)[colorScheme].background,
              },
            ]}>
            <BlurOverlay />
            <View style={{zIndex: 2}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    styles.overviewLabel,
                    {color: textColor3, width: 120},
                  ]}>
                  Nama Bisnis
                </Text>
                <Text style={[styles.overviewValue, {flex: 1}]}>
                  {merkDagang}
                </Text>
              </View>
              <Gap height={16} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    styles.overviewLabel,
                    {color: textColor3, width: 120},
                  ]}>
                  Kode Saham
                </Text>
                <Text style={[styles.overviewValue, {flex: 1}]}>{code}</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.6 : 0.7)[
                colorScheme
              ].background,
            },
          ]}>
          <BlurOverlay />
          <View style={{zIndex: 2, padding: 24}}>
            <Text style={[styles.paymentTitle, {color: textColor2}]}>
              Total Pembayaran
            </Text>
            <Text style={[styles.total, {color: textColor}]}>
              Rp{numberFormat(nominal)}
            </Text>
            <Gap height={24} />
            <Text style={[styles.paymentTitle, {color: textColor2}]}>
              Harga Per Lembar
            </Text>
            <Gap height={16} />
            <PlusMinusInput
              value={price}
              onChange={setPrice}
              usingRP
              error={orderError.price}
              increment={25}
            />
            <Gap height={24} />
            <Text style={[styles.paymentTitle, {color: textColor2}]}>
              Jumlah Lembar
            </Text>
            <Gap height={16} />
            <PlusMinusInput
              value={volume}
              onChange={setVolume}
              error={orderError.volume}
            />
            <Gap height={24} />
            <View
              style={[
                styles.cardContainer,
                {
                  backgroundColor: RGBAColors(0.6)[colorScheme].background,
                },
              ]}>
              <BlurOverlay />
              <View style={{zIndex: 2}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.overviewLabel,
                      {color: textColor3, flex: 1},
                    ]}>
                    Nominal {type === 'bid' ? 'Pembelian' : 'Penjualan'}
                  </Text>
                  <Text
                    style={[
                      styles.overviewValue,
                      {flex: 1, textAlign: 'right'},
                    ]}>
                    Rp{numberFormat(total)}
                  </Text>
                </View>
                <Gap height={16} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.overviewLabel,
                      {color: textColor3, flex: 1},
                    ]}>
                    Biaya Admin Bank
                  </Text>
                  <Text
                    style={[
                      styles.overviewValue,
                      {
                        flex: 1,
                        textAlign: 'right',
                        color: type === 'ask' ? textColorDanger : textColor2,
                      },
                    ]}>
                    {type === 'ask' ? '-' : ''}Rp
                    {numberFormat(nominal ? bankAdminFee : 0)}
                  </Text>
                </View>
                <Gap height={16} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.overviewLabel,
                      {color: textColor3, flex: 1},
                    ]}>
                    Biaya Platform
                  </Text>
                  <Text
                    style={[
                      styles.overviewValue,
                      {
                        flex: 1,
                        textAlign: 'right',
                        color: type === 'ask' ? textColorDanger : textColor2,
                      },
                    ]}>
                    {type === 'ask' ? '-' : ''}Rp{numberFormat(platformFee)}
                  </Text>
                </View>
              </View>
            </View>
            <Gap height={24} />

            {type === 'bid' ? (
              <>
                <Label title="Transfer Antar Bank" />
                <Gap height={8} />
                <Input
                  type="dropdown"
                  value={bank}
                  selectedOptionImage={
                    bank && paymentBankList.length > 0
                      ? paymentBankList.find(item => item.id === bank)?.image ||
                        ''
                      : ''
                  }
                  option={paymentBankList}
                  optionWithImage
                  onChange={(value: string) => setBank(value)}
                  placeholder="Pilih Bank Tujuan"
                  error={orderError.bank}
                />
                <View style={styles.bankInfoContainer}>
                  <ICInfo color={textColor} />
                  <Text style={[styles.bankInfoText, {color: textColor2}]}>
                    Jika tidak memiliki rekening dari pilihan bank yang
                    tersedia, Anda dapat memilih Danamon Syariah sebagai bank
                    tujuan transfer
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Label title="Opsi Pengiriman OTP" />
                <Gap height={8} />
                {radioOption.map((item, radioId) => (
                  <View key={item.value}>
                    <Input
                      type="otp-method"
                      value={item.name}
                      onPress={() => setMethod(item.value)}
                      isActive={method === item.value}
                    />
                    {radioId !== radioOption.length - 1 && <Gap height={8} />}
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={{backgroundColor: RGBAColors(0.6)[colorScheme].background}}>
        <BlurOverlay />
        <View style={styles.buttonContainer}>
          <Button
            title={`${type === 'ask' ? 'Jual' : 'Beli'} Saham`}
            onPress={() => {
              if (type === 'ask') {
                Keyboard.dismiss();
                setShowConfirmOrderDialog(true);
              } else {
                order(type, id, {price, volume, bank, otpMethod: method});
              }
            }}
            loading={orderLoading}
          />
        </View>
      </View>

      {showConfirmOrderDialog && (
        <BottomSheet setShow={setShowConfirmOrderDialog} snapPoints={['75%']}>
          <Text style={{fontSize: 14, color: textColor2, lineHeight: 20}}>
            Apakah Anda yakin dengan nominal harga dan jumlah lembar yang sudah
            di-input? Anda tidak dapat membatalkan transaksi setelah melakukan
            order penjualan
          </Text>
          <Gap height={20} />
          <Button
            title="Ya, saya yakin"
            paddingVertical={12}
            onPress={() => {
              order(type, id, {price, volume, bank, otpMethod: method});
            }}
            loading={orderLoading}
          />
          <Gap height={12} />
          <Button
            title="Tidak, kembali"
            paddingVertical={12}
            type="danger"
            onPress={() => setShowConfirmOrderDialog(false)}
          />
          <Gap height={12} />
        </BottomSheet>
      )}

      {showSuccessOrderDialog && (
        <BottomSheet setShow={setShowSuccessOrderDialog} snapPoints={['75%']}>
          <Text style={{fontSize: 14, color: textColor2, lineHeight: 20}}>
            Order pembelian telah berhasil dibuat. Segera lakukan pembayaran
            agar order Anda masuk ke daftar antrian.
          </Text>
          <Gap height={20} />
          <Button
            title="Lanjutkan Pembayaran"
            paddingVertical={12}
            onPress={() => continueOrder(type)}
          />
          <Gap height={12} />
        </BottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default MarketOrder;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  overviewLabel: {fontSize: 14, lineHeight: 20},
  overviewValue: {fontSize: 14, fontWeight: '600'},
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  infoContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    marginTop: 40,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
  },
  paymentTitle2: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  total: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 48,
    textAlign: 'center',
    marginTop: 8,
  },
  bankInfoContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bankInfoText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    flex: 1,
    marginLeft: 4,
  },
});
