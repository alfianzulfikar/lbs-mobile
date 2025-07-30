import {Platform, StyleSheet, useWindowDimensions, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HomeMenuScreenType} from '../constants/Types';
import {useBusiness} from '../api/business';
import BusinessCarousel from '../components/BusinessCarousel';
import Gap from '../components/Gap';
import HomeMenu from '../components/HomeMenu';
import VideoBackground from '../components/VideoBackground';
import HelpButton from '../components/HelpButton';
import {Colors} from '../constants/Colors';
import Badge from '../components/Badge';
import ICBell from '../components/icons/ICBell';
import IconWrapper from '../components/IconWrapper';
import ScreenWrapper from '../components/ScreenWrapper';
import {useUser} from '../api/user';
import {useArticle} from '../api/article';
import {useDisclosure} from '../api/disclosure';
import DisclosureCarousel from '../components/DisclosureCarousel';
import {useColorScheme} from '../hooks/useColorScheme';
import BannerCarousel from '../components/BannerCarousel';
import {useBannerCarousel} from '../api/bannerCarousel';
import HomeKycStatus from '../components/HomeKycStatus';
import BannerCarousel2 from '../components/BannerCarousel2';

const Home = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const {
    listingBusinesses,
    preListingBusinesses,
    getBusinesses,
    setIsLastPage,
    businessesLoading,
    prelistingLoading,
  } = useBusiness();
  const {user, getUser, getKycProgress} = useUser();
  const {articles, getArticles, articlesLoading} = useArticle();
  const {disclosureList, getDisclosureList, disclosureListLoading} =
    useDisclosure();
  const {banners, bannersLoading, getBanners} = useBannerCarousel();
  const {width} = useWindowDimensions();

  const [refreshing, setRefreshing] = useState(false);

  const menu: {id: number; label: string; to: HomeMenuScreenType}[] = [
    {id: 1, label: 'Portofolio', to: 'Portfolio'},
    {id: 2, label: 'Pasar Sekunder', to: 'Market'},
    {id: 3, label: 'FAQ', to: 'FAQ'},
    {id: 4, label: 'Panduan', to: 'Guide'},
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setIsLastPage(false);
    getUser();
    getKycProgress();
    getBusinesses(1, 5, false);
    getBusinesses(1, 5, true);
    getArticles();
    getDisclosureList(5);
    // getBanners();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLastPage(false);
      getUser();
      getKycProgress();
      getBusinesses(1, 5, false);
      getBusinesses(1, 5, true);
      getArticles();
      getDisclosureList();
      getBanners();

      return () => {};
    }, []),
  );

  return (
    <View style={styles.container}>
      <VideoBackground />
      <ScreenWrapper
        scrollView
        onRefresh={onRefresh}
        refreshing={refreshing}
        helpButton
        bottomTab>
        <View
          style={[
            styles.main,
            {
              paddingTop: 24,
            },
          ]}>
          <View style={styles.topContainer}>
            <Badge
              text={
                "Assalamu'alaikum" +
                (user.firstname ? ', ' + user.firstname : '')
              }
              fontSize={14}
              borderRadius={24}
              paddingVertical={12}
              paddingHorizontal={16}
              border={false}
              transparent
              maxWidth={(width * 62) / 100}
            />
            <IconWrapper
              transparent
              onPress={() => navigation.navigate('NotificationHistory')}
              blur={false}>
              <ICBell color={Colors[colorScheme].text} />
            </IconWrapper>
          </View>
          {user.kycStatus === null && (
            <View style={{paddingHorizontal: 24, marginTop: 24}}>
              <HomeKycStatus status={user.kycStatus} screen={user.kycScreen} />
            </View>
          )}
          {(bannersLoading || banners.length > 0) && <Gap height={40} />}
          {banners.length > 0 ? (
            Platform.OS === 'android' ? (
              <BannerCarousel banners={banners} loading={bannersLoading} />
            ) : (
              <BannerCarousel2 banners={banners} loading={bannersLoading} />
            )
          ) : null}
          <Gap height={40} />
          <View style={styles.menuContainer}>
            {menu.map((menuItem, index) => (
              <View
                style={{
                  width: '25%',
                  alignItems: 'center',
                }}
                key={menuItem.id}>
                <HomeMenu
                  id={menuItem.id}
                  label={menuItem.label}
                  to={menuItem.to}
                />
              </View>
            ))}
          </View>
          <Gap height={32} />
          <BusinessCarousel
            title="Bisnis Terbaru"
            businesses={listingBusinesses}
            onShowAll={() =>
              navigation.navigate('MainTab', {screen: 'Business'})
            }
            loading={businessesLoading}
          />
          {preListingBusinesses.length > 0 && (
            <>
              <Gap height={40} />
              <BusinessCarousel
                title="Bisnis yang Akan Datang"
                businesses={preListingBusinesses}
                loading={prelistingLoading}
              />
            </>
          )}
          <Gap height={40} />
          <BusinessCarousel
            title="Berita & Artikel"
            articles={articles}
            type="article"
            onShowAll={() =>
              navigation.navigate('Article', {screen: 'ArticleScreen'})
            }
            loading={articlesLoading}
          />
          <Gap height={40} />
          <DisclosureCarousel
            disclosures={disclosureList}
            loading={disclosureListLoading}
          />
          <Gap height={104} />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    zIndex: 2,
  },
  topContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpButtonContainer: {
    position: 'absolute',
    bottom: 104,
    right: 24,
    zIndex: 3,
  },
  menuContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
});
