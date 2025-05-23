import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import {useBusiness} from '../api/business';
import BusinessCard2 from '../components/BusinessCard2';
import {useFocusEffect} from '@react-navigation/native';
import Gap from '../components/Gap';
import SearchBar from '../components/SearchBar';
import DropdownInput from '../components/DropdownInput';
import {BusinessType} from '../constants/Types';
import BusinessCardSkeleton2 from '../components/BusinessCardSkeleton2';

const Business = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const {
    businesses,
    getBusinesses,
    setBusinesses,
    setIsLastPage,
    businessesLoading,
    businessesMoreLoading,
    isLastPage,
  } = useBusiness();
  const businessFlatlistRef = useRef<FlatList<BusinessType>>(null);

  const [filter, setFilter] = useState({
    progress: '',
    order: '',
  });
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [flatlistScrollEnabled, setFlatlistScrollEnabled] = useState(false);

  const progressOption = [
    {name: 'Terkumpul', id: ''},
    {name: '0 - 25%', id: '25'},
    {name: '25 - 50%', id: '50'},
    {name: '50 - 75%', id: '75'},
    {name: '75 - 100%', id: '100'},
  ];

  const orderOption = [
    {name: 'Urutkan', id: ''},
    {name: 'Terbaru', id: 'true'},
    {name: 'Terlama', id: 'false'},
  ];

  // const renderItem: ListRenderItem<any> | null | undefined = ({
  //   item,
  //   index,
  // }) => {
  //   return (
  //     <View
  //       style={{
  //         marginRight: index === businesses.length - 1 ? 24 : 16,
  //         marginLeft: index === 0 ? 24 : 0,
  //       }}>
  //       <BusinessCard2 business={item} />
  //     </View>
  //   );
  // };

  const renderHeader = () => {
    return (
      <View style={{height: 508, justifyContent: 'center'}}>
        {businessesLoading ? (
          <>
            <Gap width={24} />
            <ActivityIndicator color={tint} />
          </>
        ) : null}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          height: 508,
          justifyContent: 'center',
          marginRight: 24,
        }}>
        {businessesMoreLoading ? <ActivityIndicator color={tint} /> : null}
        {/* <Gap width={24} /> */}
      </View>
    );
  };

  const handlePagination = async (nextPage: number) => {
    if (
      !businessesLoading &&
      !businessesMoreLoading &&
      !isLastPage &&
      flatlistScrollEnabled
    ) {
      await getBusinesses(nextPage, 10, null, keyword);
      setPage(nextPage);
    }
  };

  const handleSearch = async () => {
    setIsLastPage(false);
    setFilter({order: '', progress: ''});
    setPage(1);
    await getBusinesses(1, 10, null, keyword);
    if (businessFlatlistRef?.current) {
      businessFlatlistRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  const handleFilter = async (currentFilter: {
    order: string;
    progress: string;
  }) => {
    setIsLastPage(false);
    setPage(1);
    await getBusinesses(1, 10, null, '', currentFilter);
    setFilter(currentFilter);
  };

  useFocusEffect(
    useCallback(() => {
      const asyncFunc = async () => {
        if (businessFlatlistRef?.current) {
          businessFlatlistRef.current.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }
        await getBusinesses(1, 10, null);
        setFlatlistScrollEnabled(true);
      };
      asyncFunc();
      return () => {
        setFlatlistScrollEnabled(false);
        setKeyword('');
        setIsLastPage(false);
        setPage(1);
        setBusinesses([]);
        setFilter({order: '', progress: ''});
      };
    }, []),
  );

  return (
    <ScreenWrapper background backgroundType="pattern" scrollView>
      <View style={{paddingHorizontal: 24}}>
        <Gap height={24} />
        <SearchBar
          keyword={keyword}
          onSubmit={handleSearch}
          setKeyword={setKeyword}
          placeholder="Cari Bisnis"
        />
        {/* <View style={{flexDirection: 'row', marginTop: 16}}>
          <DropdownInput
            option={progressOption}
            value={filter.progress}
            setValue={value => handleFilter({...filter, progress: value})}
          />
          <Gap width={4} />
          <DropdownInput
            option={orderOption}
            value={filter.order}
            setValue={value => handleFilter({...filter, order: value})}
          />
        </View> */}
      </View>
      <Gap height={40} />
      {businessesLoading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Gap width={24} />
          <BusinessCardSkeleton2 />
          <Gap width={16} />
          <BusinessCardSkeleton2 />
          <Gap width={24} />
        </ScrollView>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <FlatList
            ref={businessFlatlistRef}
            horizontal
            data={businesses}
            renderItem={({item, index}) => (
              <View
                style={{
                  marginRight: index === businesses.length - 1 ? 24 : 16,
                  marginLeft: index === 0 ? 24 : 0,
                  height: businessesLoading ? 0 : 'auto',
                  overflow: 'hidden',
                }}>
                <BusinessCard2 business={item} />
              </View>
            )}
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={renderFooter()}
            keyExtractor={(item, id) => id.toString()}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            onEndReached={() => handlePagination(page + 1)}
            scrollEnabled={flatlistScrollEnabled}
          />
        </View>
      )}
      <Gap height={120} />
    </ScreenWrapper>
  );
};

export default Business;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
