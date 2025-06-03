import {
  ActivityIndicator,
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

  const onEndReachedCalledDuringMomentum = useRef(false);
  const isFiltering = useRef(false);

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
      <Gap height={24} />
      <Header
        rightIcon={
          <IconWrapper width={178} onPress={() => setShowLimit(prev => !prev)}>
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
      <Gap height={40} />
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
          <BlurOverlay />
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: RGBAColors(0.3)[colorScheme].background,
              },
            ]}>
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
              Belum Ada Portofolio
            </Text>
            <Text style={[styles.emptyDesc, {color: textColor2}]}>
              Mulai berinvestasi dengan melakukan pemesanan efek di salah satu
              bisnis yang sedang listing di platform kami
            </Text>
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
              id: item.id,
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

  useEffect(() => {
    const handleAsync = async () => {
      await getPortfolioList({page: 1, filter});
      await getOverview();
      setScrollEnabled(true);
    };
    handleAsync();
  }, []);

  useEffect(() => {
    if (isFiltering.current === true) {
      isFiltering.current = false;
    }
  }, [portfolioList]);

  return (
    <ScreenWrapper background backgroundType="gradient">
      <FlatList
        data={portfolioList}
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
    zIndex: 2,
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
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
