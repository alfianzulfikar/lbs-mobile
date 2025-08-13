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

const BannerCarousel = ({
  banners,
  loading,
}: {
  banners: BannerType[];
  loading: boolean;
}) => {
  const {width} = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');
  const navigation = useNavigation();

  const ITEM_WIDTH = width * 0.84; // Lebar item 70% dari layar
  const SPACING = 10; // Jarak antar item

  const visibleSlide = useRef<number>(1);
  const autoScroll = useRef<NodeJS.Timeout | number | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken<BannerType>[];
      changed: ViewToken<BannerType>[];
    }) => {
      if (viewableItems.length > 0) {
        visibleSlide.current = viewableItems[0].index || 0;
      }
    },
  ).current;

  const renderItem = ({item, index}: {item: BannerType; index: number}) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          {
            backgroundColor,
            width: ITEM_WIDTH,
            marginHorizontal: SPACING / 2,
            // width: (width * 84) / 100,
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

  const startAutoScroll = () => {
    if (banners.length > 0) {
      autoScroll.current = setInterval(() => {
        if (visibleSlide.current <= banners.length - 1) {
          if (flatListRef.current && banners.length > 1) {
            flatListRef.current.scrollToIndex({
              index: visibleSlide.current,
              animated: true,
            });
            visibleSlide.current =
              visibleSlide.current + 1 <= banners.length - 1
                ? visibleSlide.current + 1
                : 0;
          }
        }
      }, 3000);
    }
  };

  const stopAutoScroll = () => {
    clearInterval(autoScroll?.current || undefined);
    autoScroll.current = null;
  };

  // useEffect(() => {
  //   console.log('visible slide changed', visibleSlide.current);
  //   startAutoScroll();
  // }, [visibleSlide, banners]);

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
          ref={flatListRef}
          horizontal
          data={banners}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          // snapToInterval={(width * 84) / 100 + (width * 4) / 100}
          onScrollBeginDrag={() => stopAutoScroll()}
          onScrollEndDrag={() => startAutoScroll()}
          snapToInterval={ITEM_WIDTH + SPACING} // snap ke posisi center item
          decelerationRate="fast" // scroll berhenti lebih cepat
          contentContainerStyle={{
            paddingHorizontal: (width - ITEM_WIDTH) / 2.3,
          }}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH + SPACING,
            offset: (ITEM_WIDTH + SPACING) * index,
            index,
          })}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      )}
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  itemContainer: {
    aspectRatio: 340 / 192,
    borderRadius: 24,
    overflow: 'hidden',
  },
});
