import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import DropdownInput from '../components/DropdownInput';
import Badge from '../components/Badge';
import IconWrapper from '../components/IconWrapper';
import ICWarning from '../components/icons/ICWarning';
import {useThemeColor} from '../hooks/useThemeColor';
import ICCaretArrowDown from '../components/icons/ICCaretArrowDown';
import PortfolioCard from '../components/PortfolioCard';
import {usePortfolio} from '../api/portfolio';
import {useUser} from '../api/user';
import numberFormat from '../utils/numberFormat';
import PortfolioOverviewCard from '../components/PortfolioOverviewCard';
import LimitExplanation from '../components/LimitExplanation';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import {PortfolioType} from '../constants/Types';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from '../components/BlurOverlay';
import HelpButton from '../components/HelpButton';

const Portfolio = () => {
  let colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const navigation = useNavigation();

  const {
    portfolioList,
    getPortfolioList,
    portfolioLoading,
    morePortfolioLoading,
    isLastPage,
    isFetchingPortfolio,
  } = usePortfolio();
  const {user, getProfile} = useUser();

  const [filter, setFilter] = useState({
    type: '',
    status: '',
    order: '',
  });
  const [page, setPage] = useState(1);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [showLimit, setShowLimit] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onEndReachedCalledDuringMomentum = useRef(false);
  const isFiltering = useRef(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(-24)).current;
  const lastScrollY = useRef(0);
  const isButtonVisible = useRef(true);

  const typeOption = [
    {name: 'Jenis', id: ''},
    {name: 'Saham', id: 'SAHAM'},
    {name: 'Sukuk', id: 'SUKUK'},
  ];

  const statusOption = [
    {name: 'Status', id: ''},
    {name: 'Listing', id: 'LISTING'},
    {name: 'Terpenuhi', id: 'TERPENUHI'},
    {name: 'Berjalan', id: 'BERJALAN'},
  ];

  const orderOption = [
    {name: 'Urutkan', id: ''},
    {name: 'Investasi Terbesar', id: 'Investasi Terbesar'},
    {name: 'Investasi Terkecil', id: 'Investasi Terkecil'},
  ];

  const getOverview = async () => {
    setOverviewLoading(true);
    await getProfile();
    setOverviewLoading(false);
  };

  const handleFilter = async (value: string, filterType: string) => {
    isFiltering.current = true;
    setFilter({...filter, [filterType]: value});
    setPage(1);
    isLastPage.current = false;
    await getPortfolioList({page: 1, filter: {...filter, [filterType]: value}});
  };

  const handlePagination = async (nextPage: number) => {
    if (
      !isFetchingPortfolio.current &&
      !isLastPage.current &&
      !isFiltering.current
    ) {
      await getPortfolioList({page: nextPage, filter});
      setPage(nextPage);
    }
  };

  const renderHeader = () => (
    <>
      <Gap height={20} />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Gap width={24} />
          {overviewLoading ? (
            <ImageBackground
              source={
                colorScheme === 'dark'
                  ? require('../assets/images/portfolio-card-dark.png')
                  : require('../assets/images/portfolio-card-light.png')
              }
              style={styles.cardImageBackground}
              resizeMode="contain"
            />
          ) : (
            <>
              <PortfolioOverviewCard type="Saham" volume={user.saham} />
              <Gap width={16} />
              <PortfolioOverviewCard type="Sukuk" volume={user.sukuk} />
            </>
          )}
          <Gap width={24} />
        </ScrollView>
      </View>
      <Gap height={40} />
      <Text style={styles.heading}>Portofolio Investasi</Text>
      <View style={{marginTop: 16}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Gap width={24} />
          <DropdownInput
            value={filter.type}
            setValue={value => handleFilter(value, 'type')}
            option={typeOption}
          />
          <Gap width={8} />
          <DropdownInput
            value={filter.status}
            setValue={value => handleFilter(value, 'status')}
            option={statusOption}
          />
          <Gap width={8} />
          <DropdownInput
            value={filter.order}
            setValue={value => handleFilter(value, 'order')}
            option={orderOption}
          />
          <Gap width={24} />
        </ScrollView>
      </View>
      <Gap height={24} />
      {portfolioLoading && <ActivityIndicator color={tint} />}
      {!portfolioLoading && portfolioList.length === 0 && (
        <View style={{paddingHorizontal: 24}}>
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: RGBAColors(0.3)[colorScheme].background,
              },
            ]}>
            <BlurOverlay />
            <View style={styles.emptyContentContainer}>
              <View style={styles.emptyContainer}>
                <Image
                  source={
                    colorScheme === 'dark'
                      ? require('../assets/images/empty-portfolio-dark.png')
                      : require('../assets/images/empty-portfolio-light.png')
                  }
                  style={{width: 160, height: 160}}
                  resizeMode="cover"
                />
              </View>
              <Text style={[styles.emptyTitle, {color: textColor}]}>
                Portofolio Masih Kosong
              </Text>
              <Text style={[styles.emptyDesc, {color: textColor2}]}>
                Pesan efek dari bisnis yang sedang listing untuk membangun
                portofolio Anda.
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );

  const renderItem = ({item, index}: {item: PortfolioType; index: number}) => (
    <View
      style={{
        paddingHorizontal: 24,
        marginBottom: index !== portfolioList.length - 1 ? 24 : 0,
      }}>
      <PortfolioCard
        data={item}
        onPress={() =>
          navigation.navigate('Portfolio', {
            screen: 'PortfolioDetail',
            params: {
              slug: item.slug,
            },
          })
        }
      />
    </View>
  );

  const renderFooter = () => (
    <>
      {morePortfolioLoading && <ActivityIndicator color={tint} />}
      <Gap height={24} />
    </>
  );

  const asyncFunc = async () => {
    await getPortfolioList({page: 1, filter});
    await getOverview();
    setScrollEnabled(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await asyncFunc();
    setRefreshing(false);
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  useEffect(() => {
    if (isFiltering.current === true) {
      isFiltering.current = false;
    }
  }, [portfolioList]);

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      header
      customHeader={
        <>
          <Header
            rightIcon={
              <IconWrapper
                width={178}
                onPress={() => setShowLimit(prev => !prev)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ICWarning />
                  <Text style={[styles.limitButtonText, {color: textColor2}]}>
                    Limit Investasi
                  </Text>
                  <ICCaretArrowDown color={textColor2} />
                </View>
              </IconWrapper>
            }
          />
        </>
      }
      childScrollY={scrollY}>
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
        data={portfolioLoading ? [] : portfolioList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter()}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            handlePagination(page + 1);
          }
          onEndReachedCalledDuringMomentum.current = true;
        }}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        // onScrollBeginDrag={() => {
        //   onEndReachedCalledDuringMomentum.current = false;
        // }}
        scrollEnabled={scrollEnabled}
      />

      {showLimit && (
        <LimitExplanation
          onClose={() => setShowLimit(false)}
          sisa={user.sisaLimit}
          total={user.totalLimit}
        />
      )}

      <Animated.View
        style={[
          styles.helpButtonContainer,
          {
            transform: [{translateX: buttonAnim}],
            bottom: 24,
          },
        ]}>
        <HelpButton />
      </Animated.View>
    </ScreenWrapper>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  limitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 9.83,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginLeft: 24,
  },
  cardImageBackground: {
    width: 340,
    height: 192,
  },
  emptyContainer: {
    width: 136,
    height: 136,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    overflow: 'hidden',
    borderRadius: 24,
  },
  emptyContentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 2,
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
