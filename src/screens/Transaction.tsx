import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import {RGBAColors} from '../constants/Colors';
import DropdownInput from '../components/DropdownInput';
import TransactionItem from '../components/TransactionItem';
import HorizontalLine from '../components/HorizontalLine';
import TransactionDetail from '../components/TransactionDetail';
import {useAPI} from '../services/api';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../slices/globalError';
import HelpButton from '../components/HelpButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainTabParamList, TransactionStackParamList} from '../constants/Types';

const MenuItem = ({
  name,
  title,
  value,
  onPress,
}: {
  name: string;
  title: string;
  value: string;
  onPress: () => void;
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  let colorScheme = useColorScheme();
  return (
    <Pressable
      style={[
        styles.menuItem,
        {
          backgroundColor:
            value === name
              ? RGBAColors(colorScheme === 'light' ? 1 : 0.2)['light']
                  .background
              : 'transparent',
        },
      ]}
      onPress={onPress}>
      <Text
        style={[styles.menuText, {fontWeight: value === name ? '700' : '600'}]}>
        {title}
      </Text>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<
  TransactionStackParamList,
  'TransactionScreen'
>;

const Transaction = ({route}: Props) => {
  const {paymentCode} = route.params;
  const navigation = useNavigation();
  const {apiRequest} = useAPI();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const tint = useThemeColor({}, 'tint');
  let colorScheme = useColorScheme() ?? 'light';
  const onEndReachedCalledDuringMomentum = useRef(false);
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState<'dividen' | 'transaksi'>(
    paymentCode && paymentCode.includes('DV') ? 'dividen' : 'transaksi',
  );
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [order, setOrder] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [loadingMore, setloadingMore] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [filter, setFilter] = useState({
    type: '',
    status: '',
    order: '',
  });
  const [detail, setDetail] = useState({
    kodeEfek: '',
    kodePembayaran: '',
    merkDagang: '',
    totalTransaksi: 0,
    jenisBisnis: '',
    hargaPerLembar: 0,
    jumlahLembar: 0,
    nominal: 0,
    biayaAdminBank: 0,
    biayaPlatform: 0,
    jenisTransaksi: '',
    statusTransaksi: '',
    periodePembayaran: '',
    tanggalPembayaran: '',
  });
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const typeOption = [
    {name: 'Jenis', id: ''},
    {name: 'Pembelian', id: 'Pembelian'},
    {name: 'Penjualan', id: 'Penjualan'},
    {name: 'Pokok', id: 'Pokok'},
  ];

  const statusOption = [
    {name: 'Status', id: ''},
    {name: 'Success', id: 'Success'},
    {name: 'Pending', id: 'Pending'},
    {name: 'Failure', id: 'Failure'},
    {name: 'Expired', id: 'Expired'},
    {name: 'Open', id: 'Open'},
    {name: 'Settlement', id: 'Settlement'},
    {name: 'Hold', id: 'Hold'},
  ];

  const orderOption = [
    {name: 'Urutkan', id: ''},
    {name: 'Terbaru', id: 'true'},
    {name: 'Terlama', id: 'false'},
  ];

  const getTransaction = async (
    nextPage: number,
    currentFilter: {type?: string; status?: string; order?: string} = {},
    type: string,
  ) => {
    try {
      let query = '';
      if (currentFilter.type)
        query += 'tipe_transaksi=' + currentFilter.type + '&';
      if (currentFilter.status)
        query += 'status_transaksi=' + currentFilter.status + '&';
      if (currentFilter.order) query += 'order=' + currentFilter.order + '&';
      if (nextPage) query += 'page=' + nextPage + '&';
      if (query[query.length - 1] == '&') query = query.slice(0, -1);

      const res = await apiRequest({
        endpoint: `/user/${
          type === 'dividen' ? 'deviden' : 'transaksi'
        }?per_page=15&${query}`,
        authorization: true,
      });
      if (res?.transactions && res?.transactions.length > 0) {
        if (!nextPage || nextPage === 1) {
          setTransactions(res?.transactions ? res?.transactions : transactions);
        } else {
          setTransactions(prev =>
            res?.transactions ? [...prev, ...res?.transactions] : prev,
          );
        }
      } else {
        if (nextPage === 1) {
          setTransactions([]);
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error?.status === 404) {
        setIsLastPage(true);
      }
    } finally {
      if (nextPage > 1) {
        setloadingMore(false);
      } else {
        setLoadingTransaction(false);
      }
    }
  };

  const getTransactionDetail = async ({
    paymentCode2,
    type,
  }: {
    paymentCode2: string;
    type: string;
  }) => {
    setDetail(prev => {
      return {
        ...prev,
        kodeEfek: '',
        kodePembayaran: '',
        merkDagang: '',
        totalTransaksi: 0,
        jenisBisnis: '',
        hargaPerLembar: 0,
        jumlahLembar: 0,
        nominal: 0,
        biayaAdminBank: 0,
        biayaPlatform: 0,
        jenisTransaksi: '',
        statusTransaksi: '',
      };
    });
    setLoadingDetail(true);
    try {
      const res = await apiRequest({
        endpoint: `/waiting-payment/${paymentCode2}`,
        authorization: true,
      });
      const jenisTransaksi = type;
      const fee = res.total_nominal - res.nominal;
      let feeObject = {};
      if (
        (jenisTransaksi == 'Penjualan' || jenisTransaksi == 'Pembelian') &&
        fee &&
        res.percentage >= 0
      ) {
        feeObject = {
          biayaPlatform: Math.round((res.nominal * res.percentage) / 100),
          biayaAdminBank:
            fee - Math.round((res.nominal * res.percentage) / 100),
        };
      }
      setDetail(prev => {
        return {
          ...prev,
          kodeEfek:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].kode_saham
              : '',
          kodePembayaran: res.kode || '',
          merkDagang:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].merk_dagang
              : '',
          totalTransaksi:
            jenisTransaksi === 'Penjualan'
              ? res.nominal - fee
              : res.total_nominal,
          jenisBisnis:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].type_bisnis
              : '',
          hargaPerLembar: Number(
            Number(res.nominal / res.jumlah_lembar).toFixed(),
          ),
          jumlahLembar: res.jumlah_lembar || 0,
          nominal: res.nominal || 0,
          ...feeObject,
          jenisTransaksi: jenisTransaksi,
          statusTransaksi: res.status_transaksi.name || '',
        };
      });
    } catch {
      setShowDetail(false);
      dispatch(
        setAlert({
          title: 'Terjadi Kesalahan',
          desc: '',
          type: 'danger',
          showAlert: true,
        }),
      );
    } finally {
      setLoadingDetail(false);
    }
  };

  const handlePagination = async (currentPage: number) => {
    if (!loadingTransaction && !loadingMore && !isLastPage) {
      setloadingMore(true);
      await getTransaction(currentPage, filter, activeMenu);
      setPage(currentPage);
    }
  };

  const renderHeader = () => {
    return (
      <>
        {activeMenu === 'transaksi' && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 12}}>
            <Gap width={24} />
            <DropdownInput
              value={filter.type}
              setValue={value => {
                setLoadingTransaction(true);
                getTransaction(1, {...filter, type: value}, activeMenu);
                setFilter({...filter, type: value});
                setPage(1);
                setIsLastPage(false);
              }}
              option={typeOption}
            />
            <Gap width={8} />
            <DropdownInput
              value={filter.status}
              setValue={value => {
                setLoadingTransaction(true);
                getTransaction(1, {...filter, status: value}, activeMenu);
                setFilter({...filter, status: value});
                setPage(1);
                setIsLastPage(false);
              }}
              option={statusOption}
            />
            <Gap width={8} />
            <DropdownInput
              value={filter.order}
              setValue={value => {
                setTransactions([]);
                setLoadingTransaction(true);
                getTransaction(1, {...filter, order: value}, activeMenu);
                setFilter({...filter, order: value});
                setPage(1);
                setIsLastPage(false);
              }}
              option={orderOption}
            />
            <Gap width={24} />
          </ScrollView>
        )}
        <Gap height={20} />
        {loadingTransaction && <ActivityIndicator color={tint} />}
        {!loadingTransaction && transactions.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 24,
            }}>
            {activeMenu === 'dividen' ? (
              <Gap height={height / 10 > 1 ? height / 10 : 0} />
            ) : (
              <Gap height={height / 27 > 1 ? height / 27 : 0} />
            )}
            <View style={styles.emptyContainer}>
              <Image
                source={
                  colorScheme === 'dark'
                    ? require('../assets/images/empty-transaction-dark.png')
                    : require('../assets/images/empty-transaction-light.png')
                }
                style={{width: 240, height: 240}}
                resizeMode="cover"
              />
            </View>
            <Text style={[styles.emptyTitle, {color: textColor}]}>
              Belum Ada{' '}
              {activeMenu === 'dividen' ? 'Dividen/Bagi Hasil' : 'Transaksi'}
            </Text>
            <Text style={[styles.emptyDesc, {color: textColor2}]}>
              {activeMenu === 'dividen'
                ? 'Dividen/Bagi hasil dari portofolio Anda akan tampil di sini.'
                : 'Transaksi Anda masih kosong. Mulai investasi dengan memesan efek dari bisnis yang sedang listing di sini.'}
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        {loadingMore ? <ActivityIndicator color={tint} /> : null}
        <Gap height={140} />
      </>
    );
  };

  const asyncFunc = async () => {
    setLoadingTransaction(true);
    await getTransaction(1, filter, activeMenu);
    setTimeout(() => {
      setScrollEnabled(true);
    }, 2000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLastPage(false);
    setPage(1);
    await asyncFunc();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      asyncFunc();

      return () => {
        setScrollEnabled(false);
        setIsLastPage(false);
        setPage(1);
        setFilter({
          type: '',
          order: '',
          status: '',
        });
        setActiveMenu('transaksi');
      };
    }, []),
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(-24)).current;
  const lastScrollY = useRef(0);
  const isButtonVisible = useRef(true);

  return (
    <View style={{flex: 1}}>
      <ScreenWrapper
        background
        backgroundType="gradient"
        header
        customHeader={
          <>
            <View style={{paddingHorizontal: 24}}>
              <View
                style={[
                  styles.menuContainer,
                  {
                    backgroundColor: RGBAColors(0.2)[colorScheme].background,
                    borderColor: RGBAColors(0.1)[colorScheme].text,
                  },
                  Platform.OS && {
                    borderWidth: 1,
                  },
                ]}>
                <MenuItem
                  title="Transaksi"
                  name="transaksi"
                  value={activeMenu}
                  onPress={() => {
                    setTransactions([]);
                    setActiveMenu('transaksi');
                    setLoadingTransaction(true);
                    getTransaction(1, {}, 'transaksi');
                    setPage(1);
                    setIsLastPage(false);
                    setFilter({order: '', status: '', type: ''});
                  }}
                />
                <Gap width={8} />
                <MenuItem
                  title="Dividen"
                  name="dividen"
                  value={activeMenu}
                  onPress={() => {
                    setTransactions([]);
                    setActiveMenu('dividen');
                    setLoadingTransaction(true);
                    getTransaction(1, {}, 'dividen');
                    setPage(1);
                    setIsLastPage(false);
                    setFilter({order: '', status: '', type: ''});
                  }}
                />
              </View>
            </View>
            {/*  */}
          </>
        }
        childScrollY={scrollY}>
        <View style={styles.container}>
          <FlatList
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: false,
                listener: event => {
                  const currentY = event.nativeEvent?.contentOffset.y;

                  if (
                    currentY > 0 &&
                    currentY > lastScrollY.current + 5 &&
                    isButtonVisible.current
                  ) {
                    Animated.timing(buttonAnim, {
                      toValue: 56,
                      duration: 200,
                      useNativeDriver: true,
                    }).start();
                    isButtonVisible.current = false;
                  } else if (
                    currentY < lastScrollY.current - 5 &&
                    !isButtonVisible.current
                  ) {
                    Animated.timing(buttonAnim, {
                      toValue: -24,
                      duration: 200,
                      useNativeDriver: true,
                    }).start();
                    isButtonVisible.current = true;
                  }

                  lastScrollY.current = currentY;
                },
              },
            )}
            scrollEventThrottle={16}
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={transactions}
            renderItem={({item, index}) => (
              <View
                style={{
                  paddingHorizontal: 24,
                  height: loadingTransaction ? 0 : 'auto',
                  overflow: 'hidden',
                }}>
                <TransactionItem
                  transaction={{
                    type:
                      item.tipe_transaksi ||
                      (item.type_bisnis === 'SAHAM' ? 'Dividen' : 'Bagi Hasil'),
                    date: item.created_at || item.tanggal_pembagian_deviden,
                    nominal: item.nominal || item.nominal_deviden,
                    status: item.status_transaksi || item.status,
                  }}
                  onPress={() => {
                    if (activeMenu === 'dividen') {
                      setDetail({
                        kodeEfek: item.kode_bisnis || '',
                        kodePembayaran: '',
                        merkDagang: item.nama_bisnis || '',
                        totalTransaksi: item.nominal_deviden || 0,
                        jenisBisnis: item.type_bisnis || '',
                        hargaPerLembar: 0,
                        jumlahLembar: 0,
                        nominal: item.nominal_deviden || 0,
                        biayaAdminBank: 0,
                        biayaPlatform: 0,
                        jenisTransaksi:
                          item.type_bisnis === 'SAHAM'
                            ? 'Dividen'
                            : 'Bagi Hasil',
                        statusTransaksi: item.status || '',
                        periodePembayaran: item.periode_pembayaran || '',
                        tanggalPembayaran: item.tanggal_pembagian_deviden || '',
                      });
                      setShowDetail(true);
                    } else {
                      setShowDetail(true);
                      getTransactionDetail({
                        paymentCode2: item.kode,
                        type: item.tipe_transaksi,
                      });
                    }
                  }}
                  openDetail={paymentCode === item.kode ? true : false}
                />
                {index !== transactions.length - 1 && (
                  <HorizontalLine marginVertical={24} />
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum.current) {
                handlePagination(page + 1);
              }
              onEndReachedCalledDuringMomentum.current = true;
            }}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={renderFooter()}
            contentContainerStyle={{}}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum.current = false;
            }}
            // scrollEnabled={scrollEnabled}
          />
        </View>
        <Animated.View
          style={[
            styles.helpButtonContainer,
            {
              transform: [{translateX: buttonAnim}],
              bottom: 104,
            },
          ]}>
          <HelpButton />
        </Animated.View>
      </ScreenWrapper>

      {showDetail && (
        <TransactionDetail
          setShow={setShowDetail}
          loading={loadingDetail}
          data={detail}
          clearPaymentCode={() => {
            if (paymentCode) {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainTab',
                    params: {
                      screen: 'Transaction',
                      params: {
                        screen: 'TransactionScreen',
                        params: {paymentCode: ''},
                      },
                    },
                  },
                ],
              });
            }
          }}
        />
      )}
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 24,
  },
  menuContainer: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 18,
    // borderTopLeftRadius: 90,
    borderRadius: 100,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    // elevation: 1,
    // overflow: 'hidden',
  },
  menuItem: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    overflow: 'hidden',
  },
  menuText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
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
  helpButtonContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 3,
  },
});
