import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
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

  // const [visibleSlide, setVisibleSlide] = useState(0);
  const visibleSlide = useRef(1);
  const autoScroll = useRef<NodeJS.Timeout | number | null>(null);

  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item, index}: {item: BannerType; index: number}) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          {
            backgroundColor,
            width: 340,
            marginLeft: index === 0 ? 24 : 16,
            marginRight: index !== banners.length - 1 ? 0 : 24,
          },
        ]}
        onPress={() => {
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
          if (flatListRef.current && banners.length > 0) {
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
      }, 3700);
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
    if (banners.length > 0) {
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
          ref={flatListRef}
          horizontal
          data={banners}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={(width * 84) / 100 + 16}
          onScrollBeginDrag={() => stopAutoScroll()}
          onScrollEndDrag={() => startAutoScroll()}
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
    maxWidth: 340,
  },
});
