import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import {useDisclosure} from '../api/disclosure';
import DisclosureItem from '../components/DisclosureItem';
import {useThemeColor} from '../hooks/useThemeColor';
import SearchBar from '../components/SearchBar';
import {maxScreenWidth} from '../constants/Screen';

const Disclosure = () => {
  const {
    groupedDisclosureList,
    getDisclosureList,
    disclosureListLoading,
    moreDisclosureListLoading,
    hasNext,
  } = useDisclosure();
  const tint = useThemeColor({}, 'tint');
  const {width} = useWindowDimensions();

  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(-24)).current;
  const lastScrollY = useRef(0);
  const isButtonVisible = useRef(true);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const numberOfContent = width > maxScreenWidth ? 20 : 15;

  const handlePagination = (nextPage: number) => {
    if (hasNext && !disclosureListLoading && !moreDisclosureListLoading) {
      getDisclosureList(nextPage, numberOfContent);
      setPage(nextPage);
    }
  };

  const renderHeader = () => (
    <View style={{paddingHorizontal: 24, marginBottom: 24}}>
      <SearchBar
        keyword={keyword}
        setKeyword={value => setKeyword(value)}
        onSubmit={() => getDisclosureList(1, numberOfContent, keyword)}
        placeholder="Cari keterbukaan informasi"
      />
      {disclosureListLoading ? <ActivityIndicator color={tint} /> : null}
    </View>
  );

  const renderFooter = () => (
    <>
      {moreDisclosureListLoading ? <ActivityIndicator color={tint} /> : null}
      <Gap height={40} />
    </>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await getDisclosureList(1, numberOfContent, keyword);
    setPage(1);
    setRefreshing(false);
  };

  useEffect(() => {
    getDisclosureList(1, numberOfContent);
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      header
      headerTitle="Keterbukaan Informasi"
      helpButton
      childScrollY={scrollY}>
      <FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
            listener: (event: any) => {
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
        data={groupedDisclosureList}
        renderItem={({item, index}) => (
          <View
            style={{
              marginBottom: index !== groupedDisclosureList.length - 1 ? 24 : 0,
              paddingHorizontal: 24,
            }}>
            <DisclosureItem
              disclosure={item}
              isActive={activeCard === index}
              setActiveCard={() =>
                setActiveCard(activeCard === index ? null : index)
              }
            />
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
      {/* <View style={{paddingHorizontal: 24, marginTop: 20}}>
        {disclosureListLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          groupedDisclosureList.map((disclosure, disclosureId) => (
            <View
              key={disclosureId}
              style={{
                marginBottom:
                  disclosureId !== groupedDisclosureList.length - 1 ? 24 : 0,
              }}>
              <DisclosureItem
                disclosure={disclosure}
                isActive={activeCard === disclosureId}
                setActiveCard={() =>
                  setActiveCard(
                    activeCard === disclosureId ? null : disclosureId,
                  )
                }
              />
            </View>
          ))
        )}
      </View>
      <Gap height={40} /> */}
    </ScreenWrapper>
  );
};

export default Disclosure;

const styles = StyleSheet.create({});
