import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useThemeColor} from '../hooks/useThemeColor';
import {useBannerCarousel} from '../api/bannerCarousel';
import {BannerType} from '../constants/Types';
import {useNavigation} from '@react-navigation/native';
import {RGBAColors} from '../constants/Colors';

const BannerCarousel = ({
  banners,
  loading,
}: {
  banners: BannerType[];
  loading: boolean;
}) => {
  const {width} = Dimensions.get('window');
  const backgroundColor = useThemeColor({}, 'background');
  const navigation = useNavigation();

  const renderItem = ({item, index}: {item: BannerType; index: number}) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          {
            backgroundColor,
            width: (width * 84) / 100,
            marginLeft: index === 0 ? 24 : 16,
            marginRight: index !== banners.length - 1 ? 0 : 24,
          },
        ]}
        onPress={() => {
          const parts = item.link.split('/').filter(Boolean);
          const category = parts[parts.length - 2];
          const slug = parts[parts.length - 1];
          navigation.navigate('ArticleStack', {
            screen: 'ArticleDetail',
            params: {slug, category},
          });
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

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
          horizontal
          data={banners}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
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
