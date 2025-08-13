import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import IconWrapper from '../components/IconWrapper';
import Text from '../components/Text';
import ICCaretArrowDown from '../components/icons/ICCaretArrowDown';
import {useThemeColor} from '../hooks/useThemeColor';
import ICFile5 from '../components/icons/ICFile5';
import ICArrowLeft from '../components/icons/ICArrowLeft';
import {RGBAColors} from '../constants/Colors';
import numberFormat from '../utils/numberFormat';
import {usePortfolio} from '../api/portfolio';
import BusinessStatus from '../components/BusinessStatus';
import {useBusiness} from '../api/business';
import BlurOverlay from '../components/BlurOverlay';
import TransactionItem from '../components/TransactionItem';
import {useNavigation} from '@react-navigation/native';
import {useTransaction} from '../api/transaction';
import TransactionDetail from '../components/TransactionDetail';
import BottomSheet from '../components/BottomSheet';
import dateTimeFormat from '../utils/dateTimeFormat';
import {useDownload} from '../utils/downloadFile';
import {useColorScheme} from '../hooks/useColorScheme';
import LoadingModal from '../components/LoadingModal';
import ICWarningRounded from '../components/icons/ICWarningRounded';
import ICDoubleArrow from '../components/icons/ICDoubleArrow';

type Props = {
  route: {
    params: {
      slug: string;
      id: number;
    };
  };
};

const PortfolioDetail = ({route}: Props) => {
  const {id, slug} = route.params;
  let colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColorSuccess = useThemeColor({}, 'textSuccess');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor4 = useThemeColor({}, 'text4');
  const lineColor = useThemeColor({}, 'line');
  const navigation = useNavigation();
  const {downloadFile} = useDownload();

  const {portfolio, getPortfolio} = usePortfolio();
  const {businessStatus, getBusinessStatus} = useBusiness();
  const {
    transactionDetail,
    getTransactionDetail,
    transactionDetailLoading,
    setTransactionDetail,
  } = useTransaction();

  const [info, setInfo] = useState<{field: string; value: number | string}[]>(
    [],
  );
  const [pageLoading, setPageLoading] = useState(false);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  // const [transactionDetail2, setTransactionDetail2] = useState({
  //     kodeEfek: '',
  //     kodePembayaran: '',
  //     merkDagang: '',
  //     totalTransaksi: 0,
  //     jenisBisnis: '',
  //     hargaPerLembar: 0,
  //     jumlahLembar: 0,
  //     nominal: 0,
  //     biayaAdminBank: 0,
  //     biayaPlatform: 0,
  //     jenisTransaksi: '',
  //     statusTransaksi: '',
  //     periodePembayaran: '',
  //     tanggalPembayaran: '',
  //   });

  const scrollY = useRef(new Animated.Value(0)).current;

  const explanation = [
    {
      title: 'Harga Pasar',
      desc: 'Harga efek berdasarkan penilaian pasar yang dipengaruhi oleh permintaan dan penawaran di pasar sekunder',
    },
    {
      title: 'Harga Perolehan',
      desc: 'Harga rata-rata dari perolehan nilai saham per lembar yang Anda miliki',
    },
    {
      title: 'Jumlah Lembar',
      desc: 'Lembar kepemilikan atas efek yang Anda miliki',
    },
    {
      title: 'Total Investasi',
      desc: 'Nilai investasi yang didapat dari Harga Pasar dikalikan dengan jumlah lembar yang Anda miliki. Sehingga nilai investasi Anda dipengaruhi oleh Harga Pasar',
    },
    {
      title: 'Return (Unrealized)',
      desc: 'Potensi keuntungan (Gain) atau kerugian (Loss) yang didapatkan atas portofolio saham Anda. Return didapatkan dari selisih antara Harga Pasar dan Harga Perolehan, dikalikan jumlah lembar yang Anda miliki',
    },
  ];

  useEffect(() => {
    const asyncFunc = async () => {
      setPageLoading(true);
      getBusinessStatus();
      await getPortfolio({slug});
      setPageLoading(false);
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    setInfo([
      ...(portfolio?.type === 'SAHAM'
        ? [
            {
              field: 'Harga Pasar',
              value: 'Rp' + numberFormat(portfolio.hargaPasar),
            },
            {
              field: 'Harga Perolehan',
              value: 'Rp' + numberFormat(portfolio.average),
            },
          ]
        : []),
      {field: 'Jumlah Lembar', value: numberFormat(portfolio?.lembar || 0)},
      {
        field: 'Total Investasi',
        value: 'Rp' + numberFormat(portfolio?.total || 0),
      },
      ...(portfolio?.type === 'SAHAM'
        ? [
            {
              field: 'Return',
              value: 'Rp' + numberFormat(Math.abs(portfolio.return || 0)),
            },
          ]
        : []),
    ]);
  }, [portfolio]);

  useEffect(() => {
    if (!transactionDetailLoading && !transactionDetail.merkDagang) {
      setShowTransactionDetail(false);
    }
  }, [transactionDetailLoading]);

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      scrollView
      header
      customHeader={
        <Header
          rightIcon={
            <IconWrapper width={230} onPress={() => setShowDisclosure(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ICFile5 color={textColor2} />
                <Text style={[styles.limitButtonText, {color: textColor2}]}>
                  Keterbukaan Informasi
                </Text>
                <ICCaretArrowDown color={textColor2} />
              </View>
            </IconWrapper>
          }
        />
      }
      helpButton>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
      </ScrollView> */}
      {!pageLoading && (
        <>
          <Gap height={20} />
          <View style={{paddingHorizontal: 24}}>
            <View
              style={[
                styles.card,
                {backgroundColor: RGBAColors(0.6)[colorScheme].background},
              ]}>
              <Text style={styles.merkDagang}>{portfolio?.merkDagang}</Text>
              <Text style={[styles.company, {color: textColor2}]}>
                {portfolio?.company}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() =>
                  navigation.navigate('Order', {
                    screen: 'BusinessDetail',
                    params: {slug: portfolio.slug},
                  })
                }>
                <Text style={[styles.detailButton, {color: tint}]}>
                  Lihat Detail Bisnis
                </Text>
                <ICArrowLeft
                  color={tint}
                  style={{transform: [{rotate: '180deg'}]}}
                  size={20}
                />
              </TouchableOpacity>
              {portfolio.type === 'SUKUK' && (
                <View style={{marginTop: 16}}>
                  {info.map((item, infoId) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: infoId !== info.length - 1 ? 16 : 0,
                      }}
                      key={infoId}>
                      <Text
                        style={[
                          styles.infoField,
                          {
                            color:
                              item.field === 'Return'
                                ? portfolio.return > 0
                                  ? textColorSuccess
                                  : portfolio.return < 0
                                  ? textColorDanger
                                  : textColor2
                                : textColor2,
                          },
                        ]}>
                        {item.field}
                      </Text>
                      <Text style={styles.infoValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            {portfolio.type === 'SAHAM' && (
              <>
                <Gap height={16} />
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: RGBAColors(0.6)[colorScheme].background,
                    },
                  ]}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setShowExplanation(true)}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      Keterangan
                    </Text>
                    <Gap width={4} />
                    <ICWarningRounded color={tint} size={20} />
                  </TouchableOpacity>
                  <View style={{marginTop: 16}}>
                    {info.map((item, infoId) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: infoId !== info.length - 1 ? 16 : 0,
                        }}
                        key={infoId}>
                        <Text style={[styles.infoField, {color: textColor2}]}>
                          {item.field}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {item.field === 'Return' && portfolio.return != 0 && (
                            <ICDoubleArrow
                              color={
                                portfolio.return > 0
                                  ? textColorSuccess
                                  : textColorDanger
                              }
                              style={{
                                transform: [
                                  {
                                    rotate:
                                      portfolio.return < 0 ? '180deg' : '0deg',
                                  },
                                ],
                              }}
                            />
                          )}
                          <Text
                            style={[
                              styles.infoValue,
                              {
                                color:
                                  item.field === 'Return'
                                    ? portfolio.return > 0
                                      ? textColorSuccess
                                      : portfolio.return < 0
                                      ? textColorDanger
                                      : textColor2
                                    : textColor2,
                              },
                            ]}>
                            {item.value}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>
          <Gap height={40} />
          {businessStatus.length > 0 && portfolio?.status && (
            <BusinessStatus
              status={
                businessStatus.filter(
                  item => item.name === portfolio?.status,
                )[0].id
              }
              list={businessStatus}
              businessType={portfolio.type}
              backgroundType={colorScheme === 'dark' ? undefined : 'tint'}
            />
          )}
        </>
      )}
      <View
        style={[
          styles.transactionContainer,
          {
            backgroundColor:
              Platform.OS === 'ios'
                ? 'transparent'
                : RGBAColors(0.6)[colorScheme].background,
          },
        ]}>
        <BlurOverlay />
        <View style={styles.container}>
          {pageLoading ? (
            <ActivityIndicator color={tint} />
          ) : (
            <>
              <Text style={styles.transactionHeading}>Transaksi</Text>
              <Gap height={24} />
              {portfolio?.transactions
                ? portfolio?.transactions.map((item, transactionId) => (
                    <View
                      key={transactionId}
                      style={{
                        marginBottom:
                          transactionId !== portfolio.transactions.length - 1
                            ? 24
                            : 0,
                      }}>
                      <TransactionItem
                        transaction={{
                          type:
                            item.type === 'Deviden'
                              ? portfolio.type === 'SAHAM'
                                ? 'Dividen'
                                : 'Bagi Hasil'
                              : item.type,
                          date: item.date,
                          nominal: item.nominal,
                          status: item.status,
                        }}
                        onPress={() => {
                          if (item.type === 'Deviden') {
                            setTransactionDetail({
                              kodeEfek: item.kode || '',
                              kodePembayaran: '',
                              merkDagang: portfolio.merkDagang || '',
                              totalTransaksi: item.nominal || 0,
                              jenisBisnis: portfolio.type || '',
                              hargaPerLembar: 0,
                              jumlahLembar: 0,
                              nominal: item.nominal || 0,
                              biayaAdminBank: 0,
                              biayaPlatform: 0,
                              jenisTransaksi:
                                portfolio.type === 'SAHAM'
                                  ? 'Dividen'
                                  : 'Bagi Hasil',
                              statusTransaksi: item.status || '',
                              periodePembayaran: '',
                              tanggalPembayaran: '',
                              isIPO: true,
                            });
                            setShowTransactionDetail(true);
                          } else {
                            setShowTransactionDetail(true);
                            getTransactionDetail({
                              paymentCode: item.kode,
                              type: item.type,
                            });
                          }
                        }}
                      />
                    </View>
                  ))
                : null}
            </>
          )}
        </View>
      </View>

      {showTransactionDetail && (
        <TransactionDetail
          data={transactionDetail}
          loading={transactionDetailLoading}
          setShow={setShowTransactionDetail}
        />
      )}

      {showDisclosure && (
        <BottomSheet setShow={setShowDisclosure}>
          {pageLoading ? (
            <ActivityIndicator color={tint} />
          ) : portfolio.disclosures && portfolio.disclosures.length > 0 ? (
            portfolio.disclosures.map((item, disclosureId) => (
              <View
                key={disclosureId}
                style={{
                  marginBottom: portfolio.disclosures
                    ? disclosureId !== portfolio.disclosures?.length - 1
                      ? 24
                      : 0
                    : 0,
                }}>
                <Text style={[styles.disclosureName, {color: textColor2}]}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text style={[styles.disclosureDate, {color: textColor4}]}>
                    {dateTimeFormat(item.date, true)}
                  </Text>
                  <View style={[styles.dot, {backgroundColor: lineColor}]} />
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={async () => {
                      setDownloadLoading(true);
                      try {
                        await downloadFile({
                          type: 'write-file',
                          fileUrl: item.file,
                        });
                      } catch (error) {
                        console.log(error);
                      } finally {
                        setDownloadLoading(false);
                      }
                    }}>
                    <ICFile5 color={tint} />
                    <Text style={[styles.file, {color: tint}]}>
                      Buka Dokumen
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: 24,
              }}>
              <View style={styles.emptyContainer}>
                <Image
                  source={
                    colorScheme === 'dark'
                      ? require('../assets/images/empty-search-dark.png')
                      : require('../assets/images/empty-search-light.png')
                  }
                  style={{width: 240, height: 240}}
                  resizeMode="cover"
                />
              </View>
              <Text style={[styles.emptyTitle, {color: textColor}]}>
                Belum ada informasi
              </Text>
              <Text style={[styles.emptyDesc, {color: textColor2}]}>
                Keterbukaan informasi belum tersedia untuk bisnis ini
              </Text>
            </View>
          )}
        </BottomSheet>
      )}

      {showExplanation && (
        <BottomSheet
          setShow={() => setShowExplanation(false)}
          snapPoints={['75%']}>
          {explanation.map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: index !== explanation.length - 1 ? 24 : 0,
              }}>
              <Text style={styles.explTitle}>{item.title}</Text>
              <Text style={[styles.explDesc, {color: textColor2}]}>
                {item.desc}
              </Text>
            </View>
          ))}
        </BottomSheet>
      )}

      {downloadLoading && <LoadingModal />}
    </ScreenWrapper>
  );
};

export default PortfolioDetail;

const styles = StyleSheet.create({
  limitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 9.83,
  },
  merkDagang: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  company: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  detailButton: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  infoField: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'right',
  },
  transactionContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    flexGrow: 1,
    marginTop: 20,
  },
  container: {
    padding: 24,
    zIndex: 2,
  },
  transactionHeading: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  disclosureName: {
    fontSize: 14,
    lineHeight: 20,
  },
  disclosureDate: {
    fontSize: 12,
    lineHeight: 16,
  },
  file: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    marginLeft: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  emptyContainer: {
    width: 216,
    height: 216,
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
