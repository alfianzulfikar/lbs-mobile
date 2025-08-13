import {
  FlatList,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useThemeColor} from '../hooks/useThemeColor';
import {BannerType} from '../constants/Types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RGBAColors} from '../constants/Colors';

const BannerCarousel2 = ({
  banners,
  loading,
}: {
  banners: BannerType[];
  loading: boolean;
}) => {
  const {width} = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');
  const navigation = useNavigation();
  const visibleSlide = useRef(1);
  const autoScroll = useRef<NodeJS.Timeout | number | null>(null);

  const flatListRef = useRef<FlatList>(null);

  const ITEM_WIDTH = width * 0.84; // Lebar item 70% dari layar
  const SPACING = 10; // Jarak antar item
  const AUTO_SCROLL_INTERVAL = 3000;

  const listRef = useRef<FlatList>(null);
  const currentIndex = useRef<number | null>(0);
  const autoScrollInterval = useRef<NodeJS.Timeout>(null);

  const loopData =
    banners.length > 1 ? [...banners, ...banners, ...banners] : banners;
  const middleIndex = banners.length; // Mulai dari index tengah agar bisa scroll bolak-balik
  currentIndex.current = middleIndex;

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const onViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken<BannerType>[];
      changed: ViewToken<BannerType>[];
    }) => {
      if (viewableItems.length > 0) {
        currentIndex.current = viewableItems[0].index;
      }
    },
  ).current;

  const handleScrollEnd = () => {
    let index = currentIndex.current;
    if (index && index >= banners.length * 2) {
      // Jika di akhir, reset ke tengah
      index = banners.length;
      if (banners.length > 1 && listRef.current)
        listRef.current.scrollToIndex({index, animated: false});
    } else if (index && index < banners.length) {
      // Jika di awal, reset ke tengah
      index = banners.length + (index % banners.length);
      if (banners.length > 1 && listRef.current)
        listRef.current.scrollToIndex({index, animated: false});
    }
  };

  // Auto slide ke kanan setiap interval
  const startAutoScroll = () => {
    stopAutoScroll(); // clear sebelumnya
    autoScrollInterval.current = setInterval(() => {
      if (currentIndex.current !== null && listRef.current) {
        let nextIndex = currentIndex.current + 1;
        if (banners.length > 1 && listRef.current)
          listRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
      }
    }, AUTO_SCROLL_INTERVAL);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const renderItem = ({item, index}: {item: BannerType; index: number}) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          {
            backgroundColor,
            width: ITEM_WIDTH,
            marginHorizontal: SPACING / 2,
            // ...(Platform.OS === 'ios'
            //   ? {
            //       marginLeft:
            //         index === 0 ? (width * 4) / 100 : (width * 4) / 100,
            //       marginRight:
            //         index !== banners.length - 1 ? 0 : (width * 12) / 100,
            //       transform: [{translateX: (width * 4) / 100}],
            //     }
            //   : {
            //       marginLeft: index === 0 ? 24 : 16,
            //       marginRight: index !== banners.length - 1 ? 0 : 24,
            //     }),
          },
        ]}
        onPress={() => {
          if (item.link) {
            if (item.link.includes('publication')) {
              const parts = item.link.split('/').filter(Boolean);
              const category = parts[parts.length - 2];
              const slug = parts[parts.length - 1];
              navigation.navigate('Article', {
                screen: 'ArticleDetail',
                params: {slug, category},
              });
            } else if (item.link.includes('detail')) {
              const parts = item.link.split('/').filter(Boolean);
              const slug = parts[parts.length - 1];
              navigation.navigate('Order', {
                screen: 'BusinessDetail',
                params: {slug},
              });
            } else {
              Linking.openURL(item.link);
            }
          }
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  // useEffect(() => {
  //   startAutoScroll();

  //   return () => stopAutoScroll();
  // }, []);

  useEffect(() => {
    if (banners.length > 1) {
      startAutoScroll();
    }
  }, [banners]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        stopAutoScroll();
        visibleSlide.current = 1;
      };
    }, []),
  );

  return (
    <View>
      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2].map((item, index) => (
            <View
              key={index}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: RGBAColors(0.4).light.background,
                  width: (width * 84) / 100,
                  marginLeft: index === 0 ? 24 : 16,
                  marginRight: index !== [1, 2].length - 1 ? 0 : 24,
                },
              ]}></View>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          bounces={false}
          ref={listRef}
          horizontal
          data={loopData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfigRef.current}
          snapToInterval={ITEM_WIDTH + SPACING} // snap ke posisi center item
          decelerationRate="fast" // scroll berhenti lebih cepat
          contentContainerStyle={{
            paddingHorizontal: (width - ITEM_WIDTH) / 2.3,
          }}
          initialScrollIndex={middleIndex}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH + SPACING,
            offset: (ITEM_WIDTH + SPACING) * index,
            index,
          })}
          onMomentumScrollBegin={stopAutoScroll} // User mulai geser -> stop auto scroll
          onMomentumScrollEnd={e => {
            // User selesai geser -> resume auto scroll + cek infinite
            handleScrollEnd();
            startAutoScroll();
          }}
        />
      )}
    </View>
  );
};

export default BannerCarousel2;

const styles = StyleSheet.create({
  itemContainer: {
    aspectRatio: 340 / 192,
    borderRadius: 24,
    overflow: 'hidden',
  },
});
