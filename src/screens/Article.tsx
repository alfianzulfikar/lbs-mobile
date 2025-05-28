import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import {notchHeight} from '../utils/getNotchHeight';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ArticleCard2 from '../components/ArticleCard2';
import {useArticle} from '../api/article';
import {ArticleType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';

const Article = () => {
  const tint = useThemeColor({}, 'tint');
  const {
    articles,
    getArticles,
    articlesLoading,
    isLastPage,
    articlesMoreLoading,
    isFetchingArticles,
  } = useArticle();
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

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

  useEffect(() => {
    handleGetArticles();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient">
      <FlatList
        data={articles}
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

const styles = StyleSheet.create({});
