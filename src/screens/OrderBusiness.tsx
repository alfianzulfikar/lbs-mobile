import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Gap from '../components/Gap';
import Header from '../components/Header';
import BlurOverlay from '../components/BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import PlusMinusInput from '../components/PlusMinusInput';
import Input from '../components/Input';
import ICInfo from '../components/icons/ICInfo';
import CheckBox from '../components/CheckBox';
import {RGBAColors} from '../constants/Colors';
import {
  StackActions,
  StaticScreenProps,
  useNavigation,
} from '@react-navigation/native';
import {useBusiness} from '../api/business';
import LoadingModal from '../components/LoadingModal';
import capitalize from '../utils/capitalize';
import numberFormat from '../utils/numberFormat';
import {useBank} from '../api/bank';
import {useAPI} from '../services/api';
import {useColorScheme} from '../hooks/useColorScheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../constants/Types';

type InfoType = {
  label: string;
  value: string;
};

type Props = NativeStackScreenProps<OrderStackParamList, 'OrderBusiness'>;

const OrderBusiness = ({route}: Props) => {
  let colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const iconColor = useThemeColor({}, 'icon');
  const [informationContent, setInformationContent] = useState<InfoType[]>([]);
  const [shares, setShares] = useState<number>(0);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [total, setTotal] = useState(100000 * shares);
  const [loadingPage, setLoadingPage] = useState(true);
  const [bank, setBank] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const {slug, customerCode} = route.params;
  const {business, getBusinessDetail} = useBusiness();
  const {paymentBankList, getPaymentBankList} = useBank();

  const getDetail = async () => {
    await getBusinessDetail(slug);
    setLoadingPage(false);
  };

  const order = async () => {
    if (Number(shares) <= 0) {
      Alert.alert('Silahkan masukkan jumlah lembar Saham');
    } else if (!bank) {
      Alert.alert('Silahkan pilih metode pembayaran');
    } else {
      setLoadingSubmit(true);
      try {
        const res = await apiRequest({
          endpoint: `/bisnis/detail/${slug}/payment`,
          method: 'post',
          authorization: true,
          body: {
            jumlah_lembar: Number(shares),
            bank_transfer: bank,
            customer_code: customerCode,
            slug: business.slug,
          },
        });
        navigation.dispatch(
          StackActions.replace('Order', {
            screen: 'WaitingPayment',
            params: {
              code: res.kode,
            },
          }),
        );
      } catch (error: any) {
        if (error?.status === 403) {
          Alert.alert(error?.data?.errors?.msg || `Terjadi kesalahan 403`);
        } else {
          Alert.alert(`Terjadi kesalahan ${error?.status || 'Server'}`);
        }
      } finally {
        setLoadingSubmit(false);
      }
    }
  };

  useEffect(() => {
    getDetail();
    getPaymentBankList();
  }, []);

  useEffect(() => {
    setInformationContent([
      {
        label: capitalize(business.tipeBisnis) + ' Terkait',
        value: business.merkDagang,
      },
      {
        label: 'Kode ' + capitalize(business.tipeBisnis),
        value: business.kode,
      },
      {
        label: `Harga ${capitalize(business.tipeBisnis)} Per Lembar`,
        value: 'Rp' + numberFormat(business.hargaPerLembar),
      },
      {
        label: 'Minimal Pemesanan',
        value: 'Rp' + numberFormat(business.minimalPemesanan),
      },
      {
        label: capitalize(business.tipeBisnis) + ' Tersisa',
        value: numberFormat(business.lembarTersisa) + ' Lembar',
      },
    ]);
  }, [business.merkDagang]);

  useEffect(() => {
    setTotal(business.hargaPerLembar * shares);
  }, [shares]);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {paddingTop: 24}]}>
          <Header title="Keterangan Investasi" />

          <View style={{paddingHorizontal: 24}}>
            <View
              style={[
                styles.informationCard,
                {backgroundColor: RGBAColors(0.4)[colorScheme].background},
              ]}>
              <BlurOverlay />
              <View style={styles.informationContentWrapper}>
                {informationContent.map((item, infoId) => (
                  <View key={infoId}>
                    <View style={styles.informationItem}>
                      <View style={{width: '40%'}}>
                        <Text
                          style={[
                            styles.informationLabel,
                            {color: textColor2},
                          ]}>
                          {item.label}
                        </Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text
                          style={[styles.informationValue, {color: textColor}]}>
                          {item.value}
                        </Text>
                      </View>
                    </View>
                    {infoId !== informationContent.length + 1 && (
                      <Gap height={16} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            style={[
              styles.section2,
              {backgroundColor: RGBAColors(0.4)[colorScheme].background},
            ]}>
            <BlurOverlay />
            <View style={{zIndex: 2, padding: 24}}>
              <Text style={[styles.paymentTitle, {color: textColor2}]}>
                Total Pembayaran
              </Text>
              <Text style={[styles.total, {color: textColor}]}>
                Rp{total.toLocaleString('id-ID')}
              </Text>
              <Gap height={40} />
              <Text style={[styles.paymentTitle, {color: textColor2}]}>
                Masukkan Jumlah Lembar
              </Text>
              <Gap height={16} />
              <PlusMinusInput value={shares} onChange={setShares} />
              <Gap height={40} />
              <Text style={[styles.paymentTitle2, {color: textColor2}]}>
                Transfer Antar Bank
              </Text>
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
              />
              <View style={styles.bankInfoContainer}>
                <ICInfo color={iconColor} />
                <Text style={[styles.bankInfoText, {color: textColor2}]}>
                  Jika tidak memiliki rekening dari pilihan bank yang tersedia,
                  Anda dapat memilih Danamon Syariah sebagai bank tujuan
                  transfer
                </Text>
              </View>
              <Gap height={32} />
              <CheckBox
                value={isRead}
                label="Saya sudah membaca dan memahami prospektus bisnis ini"
                onChange={() => setIsRead(prev => !prev)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{backgroundColor: RGBAColors(0.4)[colorScheme].background}}>
        <BlurOverlay />
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1}}>
            <Button
              title="Pesan Sukuk"
              onPress={() => order()}
              loading={loadingSubmit}
              disabled={isRead ? false : true}
            />
          </View>
        </View>
      </View>
      {loadingPage && <LoadingModal />}
    </ScreenWrapper>
  );
};

export default OrderBusiness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 32,
    position: 'relative',
  },
  informationItem: {
    flexDirection: 'row',
  },
  informationLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  informationValue: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    textAlign: 'right',
  },
  informationContentWrapper: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  section2: {
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 40,
    flexGrow: 1,
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
