import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
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

const Home = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const {
    listingBusinesses,
    preListingBusinesses,
    error: businessError,
    getBusinesses,
    setIsLastPage,
  } = useBusiness();
  const {user, getUser} = useUser();
  const {articles, getArticles} = useArticle();
  const {disclosureList, getDisclosureList} = useDisclosure();
  const {width} = Dimensions.get('window');

  const menu: {id: number; label: string; to: HomeMenuScreenType}[] = [
    {id: 1, label: 'Portofolio', to: 'PortfolioStack'},
    {id: 2, label: 'Pasar Sekunder', to: undefined},
    {id: 3, label: 'FAQ', to: 'FAQ'},
    {id: 4, label: 'Panduan', to: undefined},
  ];

  useFocusEffect(
    useCallback(() => {
      setIsLastPage(false);
      getUser();
      getBusinesses(1, 5, false);
      getBusinesses(1, 5, true);
      getArticles();
      getDisclosureList();

      return () => {};
    }, []),
  );

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <ScreenWrapper scrollView>
        <VideoBackground />
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
            <IconWrapper transparent>
              <ICBell color={Colors[colorScheme].text} />
            </IconWrapper>
          </View>
          <Gap height={24} />
          <View style={styles.menuContainer}>
            {menu.map(menuItem => (
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 16}}
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
          />
          {preListingBusinesses.length > 0 && (
            <>
              <Gap height={40} />
              <BusinessCarousel
                title="Bisnis yang Akan Datang"
                businesses={preListingBusinesses}
              />
            </>
          )}
          <Gap height={40} />
          <BusinessCarousel
            title="Berita & Artikel"
            articles={articles}
            type="article"
            onShowAll={() => navigation.navigate('ArticleStack')}
          />
          <Gap height={40} />
          <DisclosureCarousel disclosures={disclosureList} />
          <Gap height={136} />
        </View>
      </ScreenWrapper>
      <View style={styles.helpButtonContainer}>
        <HelpButton />
      </View>
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
    paddingHorizontal: 16,
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
    justifyContent: 'space-between',
  },
});
