import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ArticleCard2 from '../components/ArticleCard2';
import {useArticle} from '../api/article';
import {ArticleType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';

const Article = () => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const {
    articles,
    getArticles,
    articlesLoading,
    isLastPage,
    articlesMoreLoading,
    isFetchingArticles,
  } = useArticle();
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onEndReachedCalledDuringMomentum = useRef(false);

  const categoryOptions = [
    {id: '', label: 'Semua'},
    {id: 'berita', label: 'Berita'},
    {id: 'artikel', label: 'Artikel'},
  ];

  const handleGetArticles = async () => {
    await getArticles();
  };

  const handleFilter = async (category: string) => {
    setKeyword('');
    await getArticles(1, 10, category, '');
    setPage(1);
    isLastPage.current = false;
  };

  const handlePagination = async (page: number) => {
    if (!isFetchingArticles.current && !isLastPage.current) {
      await getArticles(page, 10, category, keyword);
      setPage(page);
    }
  };

  const search = async () => {
    setCategory('');
    await getArticles(1, 10, '', keyword);
    setPage(1);
  };

  const renderHeader = () => {
    return (
      <>
        <Gap height={24} />
        <View style={{paddingHorizontal: 24}}>
          <Header title="Berita & Artikel" paddingHorizontal={0} />
          <Gap height={24} />
          <SearchBar
            keyword={keyword}
            setKeyword={value => setKeyword(value)}
            onSubmit={search}
          />
        </View>
        <Gap height={24} />
        <CategoryFilter
          options={categoryOptions}
          value={category}
          setValue={value => {
            setCategory(value);
            handleFilter(value);
          }}
        />
        <Gap height={38} />
        {articlesLoading && <ActivityIndicator color={tint} />}
        {!articlesLoading && articles.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 24,
            }}>
            <Gap height={height / 27 > 1 ? height / 27 : 0} />
            <View style={styles.emptyContainer}>
              <Image
                source={
                  colorScheme === 'dark'
                    ? require('../assets/images/empty-article-dark.png')
                    : require('../assets/images/empty-article-light.png')
                }
                style={{width: 240, height: 240}}
                resizeMode="cover"
              />
            </View>
            <Text style={[styles.emptyTitle, {color: textColor}]}>
              Pencarian Tidak Ditemukan
            </Text>
            <Text style={[styles.emptyDesc, {color: textColor2}]}>
              Maaf, kami tidak menemukan artikel yang Anda cari. Silakan cari
              dengan kata kunci atau filter yang berbeda.
            </Text>
          </View>
        )}
      </>
    );
  };
  const renderFooter = () => {
    return (
      <>
        {articlesMoreLoading ? <ActivityIndicator color={tint} /> : null}
        <Gap height={40} />
      </>
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await handleGetArticles();
    setRefreshing(false);
  };

  useEffect(() => {
    handleGetArticles();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient">
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={articlesLoading ? [] : articles}
        renderItem={({item, index}) => (
          <View
            style={{
              height: articlesLoading ? 0 : 'auto',
              overflow: 'hidden',
              paddingHorizontal: 24,
            }}>
            <ArticleCard2
              data={item}
              onPress={() =>
                navigation.navigate('Article', {
                  screen: 'ArticleDetail',
                  params: {slug: item.slug, category: item.category},
                })
              }
            />
            {index !== articles.length - 1 && <Gap height={40} />}
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
        contentContainerStyle={{paddingHorizontal: 0}}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </ScreenWrapper>
  );
};

export default Article;

const styles = StyleSheet.create({
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
});
