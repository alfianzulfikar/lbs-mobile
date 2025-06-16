import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import Text from '../components/Text';
import {useColorScheme} from '../hooks/useColorScheme';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from '../components/BlurOverlay';
import ICDoubleArrow from '../components/icons/ICDoubleArrow';
import {useThemeColor} from '../hooks/useThemeColor';
import numberFormat from '../utils/numberFormat';
import ICWarningRounded from '../components/icons/ICWarningRounded';
import CategoryFilter from '../components/CategoryFilter';
import {InputDropdownOption} from '../constants/Types';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../components/Button';
import Orderbook from '../components/market/Orderbook';
import {useMarket} from '../api/market';
import {usePriceStatus} from '../hooks/usePriceStatus';
import PriceArrow from '../components/PriceArrow';
import Skeleton from '../components/Skeleton';
import Tradebook from '../components/market/Tradebook';
import Daily from '../components/market/Daily';
import MarketInformation from '../components/market/MarketInformation';
import BottomSheet from '../components/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {useStatistc} from '../api/statistic';
import {useBusiness} from '../api/business';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

type Props = {
  route: {
    params: {
      slug: string;
      id: number;
      merkDagang: string;
      code: string;
    };
  };
};
const MarketDetail = ({route}: Props) => {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textColorSuccess = useThemeColor({}, 'textSuccess');
  const {slug, id, merkDagang, code} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    overview,
    overviewLoading,
    getOverview,
    getTransactionStatus,
    askLoading,
    bidLoading,
    disabledButton,
  } = useMarket();
  const {priceStatus, priceTextColor} = usePriceStatus();
  const {getStatistic, marketStatus, statisticLoading} = useStatistc();
  const {getBusinessDetail, business, businessLoading} = useBusiness();

  const [activeMenu, setActiveMenu] = useState('orderbook');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const [transactionType, setTransactionType] = useState<'ask' | 'bid'>('bid');

  const menuOption: InputDropdownOption[] = [
    {id: 'orderbook', label: 'Orderbook'},
    {id: 'tradebook', label: 'Tradebook'},
    {id: 'daily', label: 'Daily History'},
    {id: 'information', label: 'Information'},
  ];

  const overviewExplanation = [
    {
      title: 'Current Price',
      desc: 'Harga saham saat ini yang terus berubah, harga bisa naik ataupun turun.',
    },
    {
      title: 'Buy Shares',
      desc: 'Total lembar beli yang ditawarkan pada saham tersebut dalam satu hari perdagangan.',
    },
    {
      title: 'Sell Shares',
      desc: 'Total lembar jual yang ditawarkan pada saham tersebut dalam satu hari perdagangan.',
    },
    {
      title: 'Open Price',
      desc: 'Harga saham pada transaksi pertama yang dilakukan di awal hari perdagangan.',
    },
    {
      title: 'Close Price',
      desc: 'Harga saham pada transaksi terakhir sebelum perdagangan saham ditutup pada hari tersebut.',
    },
    {
      title: 'Lowest Price',
      desc: 'Harga saham paling rendah yang tercapai dalam satu hari perdagangan.',
    },
    {
      title: 'Highest Price',
      desc: 'Harga saham paling tinggi yang tercapai dalam satu hari perdagangan.',
    },
    {
      title: 'Fair Value',
      desc: 'Harga atau nilai wajar untuk sebuah saham.',
    },
    {
      title: 'Close Price',
      desc: 'Harga saham pada transaksi terakhir sebelum perdagangan saham ditutup pada hari tersebut.',
    },
    {
      title: 'Lowest Price',
      desc: 'Harga saham paling rendah yang tercapai dalam satu hari perdagangan.',
    },
    {
      title: 'Highest Price',
      desc: 'Harga saham paling tinggi yang tercapai dalam satu hari perdagangan.',
    },
    {
      title: 'Fair Value',
      desc: 'Harga atau nilai wajar untuk sebuah saham.',
    },
  ];

  const checkOrder = async (type: 'ask' | 'bid') => {
    setTransactionType(type);
    if (!marketStatus.isOpen) {
      dispatch(
        setAlert({
          title: marketStatus.message,
          desc: '',
          type: 'danger',
          showAlert: true,
        }),
      );
    } else {
      const hasTransaction = await getTransactionStatus(type, id);
      if (hasTransaction) {
        setShowAttention(true);
      } else {
        navigation.navigate('Market', {
          screen: 'MarketOrder',
          params: {
            merkDagang,
            id,
            code: business.kode,
            type,
            feeBuy: overview.feeBuy || 0,
            feeSell: overview.feeSell || 0,
            defaultPrice: overview.closePrice || overview.fairValue || 0,
          },
        });
      }
    }
  };

  useEffect(() => {
    getOverview(id);
    getStatistic();
    getBusinessDetail(slug);
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}
      scrollView
      header
      headerTitle="Pasar Sekunder"
      footer={
        <View
          style={{backgroundColor: RGBAColors(0.6)[colorScheme].background}}>
          <BlurOverlay />
          <View style={styles.buttonContainer}>
            <View style={{flex: 1}}>
              <Button
                title="Beli Saham"
                onPress={() => checkOrder('bid')}
                loading={bidLoading}
                disabled={disabledButton}
              />
            </View>
            <Gap width={10} />
            <View style={{flex: 1}}>
              <Button
                title="Jual Saham"
                type="secondary"
                onPress={() => checkOrder('ask')}
                loading={askLoading}
                disabled={disabledButton}
              />
            </View>
          </View>
        </View>
      }>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 24, marginTop: 20}}>
          {overviewLoading ? (
            <>
              <Skeleton aspectRatio={354 / 88} />
              <Gap height={16} />
              <Skeleton aspectRatio={354 / 132} />
              <Gap height={16} />
              <Skeleton aspectRatio={354 / 92} />
            </>
          ) : (
            <>
              <View
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: RGBAColors(0.6)[colorScheme].background,
                  },
                ]}>
                <BlurOverlay />
                <View
                  style={{
                    zIndex: 2,
                    flexDirection: 'row',
                    paddingVertical: 18,
                    paddingHorizontal: 24,
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={styles.code}>{business.kode}</Text>
                    <Text style={[styles.merkDagang, {color: textColor2}]}>
                      {merkDagang}
                    </Text>
                  </View>
                  <View style={{flex: 1, transform: [{translateY: 6}]}}>
                    <Text style={styles.currentPriceLabel}>Current Price</Text>
                    <View style={styles.currentPriceContainer}>
                      <PriceArrow
                        currentPrice={overview.currentPrice}
                        comparisonPrice={overview.closePrice}
                      />
                      <Text
                        style={[
                          styles.currentPrice,
                          {
                            color: priceTextColor(
                              overview.currentPrice,
                              overview.closePrice,
                            ),
                          },
                        ]}>
                        {overview.currentPrice
                          ? 'Rp' + numberFormat(overview.currentPrice)
                          : '-'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <Gap height={16} />

              <View
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: RGBAColors(0.6)[colorScheme].background,
                  },
                ]}>
                <BlurOverlay />
                <View
                  style={{
                    zIndex: 2,
                    paddingVertical: 18,
                    paddingHorizontal: 24,
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setShowExplanation(true)}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      Overview
                    </Text>
                    <Gap width={4} />
                    <ICWarningRounded color={textColor} size={20} />
                  </TouchableOpacity>
                  <Gap height={16} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[styles.overviewLabel, {color: textColor3}]}>
                      Buy Shares
                    </Text>
                    <Text style={styles.overviewValue}>
                      {overview.buyShares
                        ? numberFormat(overview.buyShares)
                        : '-'}
                    </Text>
                  </View>
                  <Gap height={16} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[styles.overviewLabel, {color: textColor3}]}>
                      Sell Shares
                    </Text>
                    <Text style={styles.overviewValue}>
                      {overview.sellShares
                        ? numberFormat(overview.sellShares)
                        : '-'}
                    </Text>
                  </View>
                  <>
                    <Gap height={16} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.overviewLabel, {color: textColor3}]}>
                        Fair Value
                      </Text>
                      <Text style={styles.overviewValue}>
                        {overview.fairValue
                          ? 'Rp' + numberFormat(overview.fairValue)
                          : '-'}
                      </Text>
                    </View>
                  </>
                </View>
              </View>

              <Gap height={16} />

              <View
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: RGBAColors(0.6)[colorScheme].background,
                  },
                ]}>
                <BlurOverlay />
                <View
                  style={{
                    zIndex: 2,
                    flexDirection: 'row',
                    paddingVertical: 18,
                    paddingHorizontal: 24,
                  }}>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.overviewLabel, {color: textColor3}]}>
                        Open
                      </Text>
                      <Text style={styles.overviewValue}>
                        {overview?.openPrice
                          ? numberFormat(overview.openPrice)
                          : '-'}
                      </Text>
                    </View>
                    <Gap height={16} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.overviewLabel, {color: textColor3}]}>
                        Low
                      </Text>
                      <Text style={styles.overviewValue}>
                        {overview?.lowestPrice
                          ? numberFormat(overview.lowestPrice)
                          : '-'}
                      </Text>
                    </View>
                  </View>
                  <Gap width={32} />
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.overviewLabel, {color: textColor3}]}>
                        Close
                      </Text>
                      <Text style={styles.overviewValue}>
                        {overview?.closePrice
                          ? numberFormat(overview.closePrice)
                          : '-'}
                      </Text>
                    </View>
                    <Gap height={16} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.overviewLabel, {color: textColor3}]}>
                        High
                      </Text>
                      <Text style={styles.overviewValue}>
                        {overview?.highestPrice
                          ? numberFormat(overview.highestPrice)
                          : '-'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={{marginTop: 40}}>
          <CategoryFilter
            options={menuOption}
            value={activeMenu}
            setValue={setActiveMenu}
            activeColor={textColor}
          />
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
          <View style={{padding: 24}}>
            {activeMenu === 'orderbook' ? (
              <Orderbook id={id} />
            ) : activeMenu === 'tradebook' ? (
              <Tradebook id={id} />
            ) : activeMenu === 'daily' ? (
              <Daily id={id} />
            ) : (
              <MarketInformation merkDagang={merkDagang} />
            )}
          </View>
        </View>
      </View>

      {showExplanation && (
        <BottomSheet
          setShow={() => setShowExplanation(false)}
          snapPoints={['75%']}>
          {overviewExplanation.map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: index !== overviewExplanation.length - 1 ? 24 : 0,
              }}>
              <Text style={styles.explTitle}>{item.title}</Text>
              <Text style={[styles.explDesc, {color: textColor2}]}>
                {item.desc}
              </Text>
            </View>
          ))}
        </BottomSheet>
      )}

      {showAttention && (
        <BottomSheet setShow={setShowAttention} snapPoints={['75%']}>
          <Text style={{color: textColor2, fontSize: 16, lineHeight: 24}}>
            Anda memiliki transaksi yang sedang aktif di bisnis ini.
          </Text>
          <Gap height={16} />
          <Button
            title="Lanjutkan"
            onPress={() => {
              setShowAttention(false);
              navigation.navigate('Market', {
                screen: 'MarketOrder',
                params: {
                  merkDagang,
                  id,
                  code: business.kode,
                  type: transactionType,
                  feeBuy: overview.feeBuy || 0,
                  feeSell: overview.feeSell || 0,
                },
              });
            }}
            paddingVertical={12}
          />
          <Gap height={12} />
          <Button
            title="Periksa Transaksi"
            type="secondary"
            paddingVertical={12}
            onPress={() => {
              setShowAttention(false);
              navigation.navigate('MainTab', {screen: 'Transaction'});
            }}
          />
          <Gap height={12} />
        </BottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default MarketDetail;

const styles = StyleSheet.create({
  cardContainer: {
    // paddingVertical: 18,
    // paddingHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  code: {fontSize: 18, fontWeight: '700', lineHeight: 28},
  merkDagang: {fontSize: 14, lineHeight: 20, marginTop: 4},
  currentPriceLabel: {fontSize: 14, lineHeight: 20, textAlign: 'right'},
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'right',
  },
  currentPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  overviewLabel: {fontSize: 14, lineHeight: 20},
  overviewValue: {fontSize: 14, fontWeight: '500', textAlign: 'right'},
  infoContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    marginTop: 24,
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    zIndex: 2,
  },
  explTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  explDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
