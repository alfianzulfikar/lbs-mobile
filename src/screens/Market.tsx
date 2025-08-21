import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Text from '../components/Text';
import Gap from '../components/Gap';
import Header from '../components/Header';
import BlurOverlay from '../components/BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';
import {RGBAColors} from '../constants/Colors';
import Button from '../components/Button';
import ICSpeaker from '../components/icons/ICSpeaker';
import ICDoubleArrow from '../components/icons/ICDoubleArrow';
import numberFormat from '../utils/numberFormat';
import {useMarket} from '../api/market';
import {useNavigation} from '@react-navigation/native';
import {usePriceStatus} from '../hooks/usePriceStatus';
import PriceArrow from '../components/PriceArrow';
import {useStatistc} from '../api/statistic';

const Market = () => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textColorInfo = useThemeColor({}, 'textInfo');
  const textColorSuccess = useThemeColor({}, 'textSuccess');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const navigation = useNavigation();

  const {marketStatus, statisticLoading, getStatistic} = useStatistc();
  const {stockList, stockListLoading, getStockList} = useMarket();
  const {priceStatus, priceTextColor} = usePriceStatus();

  useEffect(() => {
    getStatistic();
    getStockList();
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}
      scrollView
      header
      headerTitle="Pasar Sekunder"
      helpButton>
      {/* <Gap height={24} />
      <Header title="Pasar Sekunder" /> */}
      <View style={{paddingHorizontal: 24, marginTop: 20}}>
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: RGBAColors(0.6)[colorScheme].background,
              // backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.5)
              //   .light.background,
            },
          ]}>
          <BlurOverlay />
          {/* {colorScheme === 'dark' && (
            <ImageBackground
              source={require('../assets/images/market-bg-dark.png')}
              style={{width: '100%', height: '100%', position: 'absolute'}}
              resizeMode="cover"
            />
          )} */}
          <View style={styles.cardContentContainer}>
            <View style={{zIndex: 2, height: '100%'}}>
              <Text style={styles.cardTitle}>Investasi di Pasar Sekunder</Text>
              <Text style={[styles.cardDesc, {color: textColor2}]}>
                Mulai bertransaksi dengan membeli dan menjual saham dari bisnis
                yang halal dan berkah
              </Text>
              <Gap flex={1} />
              <View style={{alignItems: 'flex-end'}}>
                <Button
                  title="Baca Panduan"
                  paddingVertical={10}
                  paddingHorizontal={14}
                  fontSize={14}
                  onPress={() =>
                    navigation.navigate('Market', {screen: 'MarketGuide'})
                  }
                />
              </View>
            </View>
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../assets/images/market-illustration-dark.png')
                  : require('../assets/images/market-illustration-light.png')
              }
              style={{position: 'absolute', bottom: 0, right: 0}}
            />
          </View>
        </View>
      </View>
      <View style={{flexGrow: 1, marginTop: 40}}>
        <View
          style={[
            styles.listContainer,
            {
              backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.3)
                .light.background,
            },
          ]}>
          <View style={styles.statusContainer}>
            <ICSpeaker
              color={marketStatus.isOpen ? textColorInfo : textColorDanger}
            />
            <Text
              style={[
                styles.status,
                {color: marketStatus.isOpen ? textColorInfo : textColorDanger},
              ]}>
              {marketStatus.message}
            </Text>
          </View>
          <View
            style={[
              styles.listContentContainer,
              {backgroundColor: RGBAColors(0.6)[colorScheme].background},
            ]}>
            <BlurOverlay />
            <View style={{zIndex: 2, padding: 24}}>
              {stockListLoading ? (
                <ActivityIndicator color={tint} />
              ) : stockList.length === 0 ? (
                <View style={{alignItems: 'center', paddingHorizontal: 24}}>
                  <View style={styles.emptyContainer}>
                    <Image
                      source={
                        colorScheme === 'dark'
                          ? require('../assets/images/empty-market-dark.png')
                          : require('../assets/images/empty-market-light.png')
                      }
                      style={{width: 200, height: 200}}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={[styles.emptyTitle, {color: textColor}]}>
                    Pasar Sekunder Ditutup
                  </Text>
                  <Text style={[styles.emptyDesc, {color: textColor2}]}>
                    Sesi perdagangan di pasar sekunder telah berakhir. Insya
                    Allah akan dibuka kembali di periode berikutnya.
                  </Text>
                </View>
              ) : (
                stockList.map((item, index) => (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      marginBottom: index !== stockList.length - 1 ? 32 : 0,
                    }}
                    key={index}
                    onPress={() =>
                      navigation.navigate('Market', {
                        screen: 'MarketDetail',
                        params: {
                          slug: item.slug,
                          id: item.id,
                          merkDagang: item.merkDagang,
                          code: item.code,
                        },
                      })
                    }>
                    <View style={{flex: 1}}>
                      <Text style={styles.code}>{item.code}</Text>
                      <Text style={[styles.merkDagang, {color: textColor2}]}>
                        {item.merkDagang}
                      </Text>
                    </View>
                    <View style={{flex: 1, transform: [{translateY: 6}]}}>
                      <Text style={styles.currentPriceLabel}>
                        Current Price
                      </Text>
                      <View style={styles.currentPriceContainer}>
                        <PriceArrow
                          currentPrice={item.currentPrice}
                          comparisonPrice={item.closePrice}
                        />
                        <Text
                          style={[
                            styles.currentPrice,
                            {
                              color: priceTextColor(
                                item.currentPrice,
                                item.closePrice,
                              ),
                            },
                          ]}>
                          {item.currentPrice
                            ? 'Rp' + numberFormat(item.currentPrice)
                            : '-'}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Market;

const styles = StyleSheet.create({
  cardContainer: {
    aspectRatio: 354 / 192,
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardContentContainer: {
    padding: 16,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  cardTitle: {fontSize: 18, fontWeight: '700', lineHeight: 28},
  cardDesc: {fontSize: 14, lineHeight: 20, marginTop: 4},
  listContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    flex: 1,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
    marginLeft: 4,
  },
  listContentContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    flex: 1,
    marginTop: 16,
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  emptyContainer: {
    width: 176,
    height: 176,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});
