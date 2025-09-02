import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import {useThemeColor} from '../hooks/useThemeColor';
import ScreenWrapper from '../components/ScreenWrapper';
import IconWrapper from '../components/IconWrapper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useBusiness} from '../api/business';
import ICShare from '../components/icons/ICShare';
import ICLike from '../components/icons/ICLike';
import ICChat from '../components/icons/ICChat';
import Gap from '../components/Gap';
import ICCalculator from '../components/icons/ICCalculator';
import Badge from '../components/Badge';
import ICLocation from '../components/icons/ICLocation';
import BusinessStatus from '../components/BusinessStatus';
import RoundedProgressIndicator from '../components/RoundedProgressIndicator';
import Button from '../components/Button';
import ICFile from '../components/icons/ICFile';
import Header from '../components/Header';
import BlurOverlay from '../components/BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import Calculator from '../components/Calculator';
import numberFormat from '../utils/numberFormat';
import capitalize from '../utils/capitalize';
import {useAPI} from '../services/api';
import {useUser} from '../api/user';
import LoadingModal from '../components/LoadingModal';
import {useColorScheme} from '../hooks/useColorScheme';
import ICLikeFill from '../components/icons/ICLikeFill';
import BottomSheet from '../components/BottomSheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../constants/Types';
import {useInsets} from '../hooks/useInsets';
import {useDispatch} from 'react-redux';
import {setAlert, setShowAlert} from '../slices/globalError';
import ListingRemainingTime from '../components/ListingRemainingTime';

type Props = NativeStackScreenProps<OrderStackParamList, 'BusinessDetail'>;

const BusinessDetail = ({route}: Props) => {
  let colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const navigation = useNavigation();
  const {apiRequest} = useAPI();
  const {slug, openDiscussion} = route.params;
  const {
    business,
    businessStatus,
    getBusinessDetail,
    getBusinessStatus,
    isLiked,
    getBusinessLike,
    likeLoading,
    handleLike,
    isNotFound,
  } = useBusiness();
  const {user, getUser} = useUser();
  const {notchHeight} = useInsets();
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);

  const order = async () => {
    if (user.kycStatus) {
      setLoadingOrder(true);
      try {
        const res = await apiRequest({
          endpoint: `/bisnis/detail/${slug}/payment`,
          authorization: true,
        });
        navigation.navigate('Order', {
          screen: 'OrderBusiness',
          params: {slug, customerCode: res.customer_code},
        });
      } catch (error: any) {
        dispatch(
          setAlert({
            title: 'Tidak dapat melakukan pemesanan.',
            desc: `Hubungi Customer Service untuk keterangan lebih lanjut.`,
            type: 'danger',
            showAlert: true,
          }),
        );
      } finally {
        setLoadingOrder(false);
      }
    } else {
      dispatch(
        setAlert({
          title: 'Transaksi tidak dapat dilanjutkan. Lengkapi data KYC Anda.',
          desc: '',
          type: 'danger',
          showAlert: true,
        }),
      );
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `https://dev.lbs.id/detail/${slug}`,
        title: 'LBS Urun Dana',
      });
    } catch (error) {
      dispatch(
        setAlert({
          title: 'Gagal',
          desc: 'Silahkan coba lagi',
          type: 'danger',
          showAlert: true,
        }),
      );
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      setLoadingPage(true);
      await getUser();
      await getBusinessDetail(slug);
      await getBusinessStatus();
      setLoadingPage(false);
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    if (business.slug) {
      getBusinessLike();

      if (openDiscussion) {
        navigation.navigate('Order', {
          screen: 'BusinessDiscussion',
          params: {
            slug: business.slug,
            businessStatus: business.status,
          },
        });
      }
    }
  }, [business]);

  return (
    <ScreenWrapper
      background
      backgroundType={
        Platform.OS === 'ios'
          ? colorScheme === 'dark'
            ? 'gradient'
            : 'pattern'
          : 'pattern'
      }
      header
      customHeader={
        <Header
          rightIcon={
            <IconWrapper onPress={() => handleShare()}>
              <ICShare color={iconColor} size={24} />
            </IconWrapper>
          }
        />
      }
      childScrollY={scrollY}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <View style={[styles.container, {}]}>
          <View
            style={{
              width: '100%',
              zIndex: 2,
              // backgroundColor: RGBAColors(0.2).dark.background,
            }}>
            {/* <Gap height={(Platform.OS === 'ios' ? notchHeight : 0) + 24} /> */}

            <View style={{paddingHorizontal: 24}}>
              <View
                style={{
                  width: '100%',
                  marginBottom: 24,
                  aspectRatio: 354 / 200,
                  borderRadius: 24,
                  overflow: 'hidden',
                  backgroundColor,
                }}>
                {!loadingPage && business.image && (
                  <Image
                    source={{uri: business.image}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>

            <View style={styles.optionContainer}>
              <IconWrapper
                onPress={() => handleLike(slug, isLiked ? 'delete' : 'like')}
                loading={likeLoading}>
                {isLiked ? (
                  <ICLikeFill color={iconColor} size={24} />
                ) : (
                  <ICLike color={iconColor} size={24} />
                )}
              </IconWrapper>
              <Gap width={16} />
              {['PRE-LISTING', 'LISTING'].includes(business.status) && (
                <IconWrapper
                  onPress={() =>
                    navigation.navigate('Order', {
                      screen: 'BusinessDiscussion',
                      params: {
                        slug: business.slug,
                        businessStatus: business.status,
                      },
                    })
                  }>
                  <ICChat color={iconColor} size={24} />
                </IconWrapper>
              )}
              {business.tipeBisnis === 'SUKUK' &&
                ['PRE-LISTING', 'LISTING'].includes(business.status) && (
                  <>
                    <Gap width={16} />
                    <IconWrapper
                      onPress={() => {
                        if (
                          ['PRE-LISTING', 'LISTING'].includes(business.status)
                        ) {
                          setShowCalculator(true);
                        }
                      }}
                      width={204}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ICCalculator color={iconColor} size={24} />
                        <Gap width={4} />
                        <Text
                          style={[styles.calculatorText, {color: textColor}]}>
                          Kalkulator Investasi
                        </Text>
                      </View>
                    </IconWrapper>
                  </>
                )}
            </View>

            <Gap height={16} />
          </View>

          <View
            style={[
              styles.mainWrapper,
              {
                backgroundColor:
                  Platform.OS === 'ios'
                    ? RGBAColors(0.4).light.background
                    : 'transparent',
              },
            ]}>
            <ImageBackground
              source={
                colorScheme === 'dark'
                  ? require('../assets/images/bg-dark-2.jpg')
                  : require('../assets/images/bg-light.jpg')
              }
              style={{flex: 1}}
              resizeMode="cover">
              <BlurOverlay />
              {!loadingPage && (
                <View
                  style={[
                    styles.main,
                    {
                      alignItems: 'center',
                      backgroundColor:
                        Platform.OS === 'ios'
                          ? 'transparent'
                          : RGBAColors(0.4)[colorScheme].background,
                    },
                  ]}>
                  <View style={{width: '100%', maxWidth: 450}}>
                    <View style={styles.mainSection1}>
                      <Badge text={capitalize(business.tipeBisnis)} />
                      <Gap width={16} />
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          transform: [{translateY: 6}],
                        }}>
                        <ICLocation color={iconColor} />
                        <Gap width={4} />
                        <Text
                          style={[
                            styles.location,
                            {color: textColor, flex: 1},
                          ]}>
                          {business.kota}, {business.provinsi}
                        </Text>
                      </View>
                    </View>

                    {business.status === 'LISTING' && (
                      <View style={styles.remainingTimeContainer}>
                        <ListingRemainingTime
                          targetDate={business.targetDate || ''}
                        />
                      </View>
                    )}

                    <Text style={[styles.title, {color: textColor}]}>
                      {business.merkDagang}
                    </Text>

                    <Gap height={24} />

                    {businessStatus.length > 0 && business.status && (
                      <BusinessStatus
                        status={
                          businessStatus.filter(
                            item => item.name === business.status,
                          )[0].id
                          // 2
                        }
                        list={businessStatus}
                        businessType={business.tipeBisnis}
                      />
                    )}

                    <Gap height={24} />

                    <View style={{flexDirection: 'row', paddingHorizontal: 24}}>
                      {business.status !== 'PRE-LISTING' && (
                        <>
                          <View style={{flex: 1}}>
                            <RoundedProgressIndicator
                              target={business.target}
                              current={business.terpenuhi}
                              type="large"
                              transparent
                              color="#FFFFFF"
                              shadow
                            />
                          </View>
                          <Gap width={24} />
                        </>
                      )}
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        {business.status !== 'PRE-LISTING' && (
                          <>
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={[
                                  styles.dot,
                                  styles.shadow,
                                  {backgroundColor: 'white'},
                                ]}
                              />
                              <View style={{marginLeft: 8}}>
                                <Text
                                  style={[
                                    styles.fundingTitle,
                                    {color: iconColor, fontSize: 12},
                                  ]}>
                                  Dana Terkumpul
                                </Text>
                                <Text
                                  style={[
                                    styles.fundingValue,
                                    {
                                      color: textColor,
                                      fontSize: 16,
                                      marginTop: 2,
                                    },
                                  ]}>
                                  Rp
                                  {numberFormat(
                                    Number(
                                      business.terpenuhi > business.target
                                        ? business.target
                                        : business.terpenuhi,
                                    ),
                                  )}
                                </Text>
                              </View>
                            </View>
                            <Gap height={33} />
                          </>
                        )}
                        <View style={{flexDirection: 'row'}}>
                          {business.status !== 'PRE-LISTING' && (
                            <View
                              style={[
                                styles.dot,
                                styles.shadow,
                                {backgroundColor: 'rgba(64, 64, 64, 0.4)'},
                              ]}
                            />
                          )}
                          <View
                            style={{
                              marginLeft:
                                business.status !== 'PRE-LISTING' ? 8 : 0,
                            }}>
                            <Text
                              style={[
                                styles.fundingTitle,
                                {
                                  color: iconColor,
                                  fontSize:
                                    business.status !== 'PRE-LISTING' ? 12 : 13,
                                },
                              ]}>
                              Target Investasi
                            </Text>
                            <Text
                              style={[
                                styles.fundingValue,
                                {
                                  color: textColor,
                                  fontSize:
                                    business.status !== 'PRE-LISTING' ? 16 : 17,
                                  marginTop:
                                    business.status !== 'PRE-LISTING' ? 2 : 4,
                                },
                              ]}>
                              Rp{numberFormat(Number(business.target))}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
      <View style={{backgroundColor: RGBAColors(0.4)[colorScheme].background}}>
        <BlurOverlay />
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1}}>
            <Button
              title={'Pesan ' + capitalize(business.tipeBisnis)}
              onPress={order}
              loading={loadingOrder}
              disabled={business.status !== 'LISTING'}
            />
          </View>
          <Gap width={10} />
          <View style={{flex: 1}}>
            <Button
              title="Prospektus"
              type="secondary"
              icon={props => <ICFile {...props} />}
              onPress={() =>
                navigation.navigate('Order', {
                  screen: 'Prospectus',
                  params: {
                    file: business?.file || '',
                    businessContent: business?.businessContent || '',
                    tipeBisnis: capitalize(business?.tipeBisnis),
                    terjual: business?.terpenuhi || 0,
                    tersisa: business.target
                      ? business.target - (business.terpenuhi || 0)
                      : 0,
                  },
                })
              }
            />
          </View>
        </View>
      </View>

      {showCalculator && (
        <Calculator
          onClose={() => setShowCalculator(false)}
          business={business}
        />
      )}

      {loadingPage && <LoadingModal />}

      {isNotFound && (
        <BottomSheet
          onDismiss={() =>
            navigation.dispatch(
              CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}),
            )
          }>
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
            Bisnis tidak ditemukan
          </Text>
          <Gap flex={1} />
          <Gap height={24} />
          <Button
            title="Beranda"
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}),
              )
            }
          />
        </BottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default BusinessDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // transform: [{translateY: -36}],
    paddingHorizontal: 24,
  },
  calculatorText: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
  },
  mainWrapper: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    zIndex: 2,
  },
  main: {
    flex: 1,
    paddingVertical: 24,
    zIndex: 2,
  },
  mainSection1: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  location: {
    fontSize: 14,
    lineHeight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    marginTop: 22,
    paddingHorizontal: 24,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  shadow: {
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowColor: 'white',
  },
  fundingTitle: {
    lineHeight: 16,
  },
  fundingValue: {
    fontWeight: '700',
    lineHeight: 24,
  },
  buttonWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly'
  },
  emptyContainer: {
    width: '100%',
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
  remainingTimeContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    marginTop: 12,
  },
});
