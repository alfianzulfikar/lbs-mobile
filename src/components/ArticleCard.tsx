import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {ArticleType, BusinessType} from '../constants/Types';
import Text from './Text';
import {Colors, RGBAColors} from '../constants/Colors';
import Badge from './Badge';
import capitalize from '../utils/capitalize';
import Gap from './Gap';
import RoundedProgressIndicator from './RoundedProgressIndicator';
import {useNavigation} from '@react-navigation/native';
import BlurOverlay from './BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const ArticleCard = ({data}: {data: ArticleType}) => {
  let colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <Pressable
      style={[
        styles.container,
        // {
        //   elevation: 1,
        //   shadowColor: tint,
        // },
      ]}
      onPress={() =>
        navigation.navigate('Article', {
          screen: 'ArticleDetail',
          params: {slug: data.slug, category: data.categorySlug},
        })
      }>
      <View style={[styles.container, {width: (width * 84) / 100}]}>
        <View style={[styles.imageContainer, {width: (width * 84) / 100}]}>
          <Image
            source={{uri: data.image}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View
          style={[
            styles.informationContainer,
            {
              backgroundColor:
                Platform.OS === 'android'
                  ? RGBAColors(0.8)['dark'].background
                  : RGBAColors(0.2)['light'].background,
            },
          ]}>
          <BlurOverlay blurType="dark" />
          <View style={styles.information}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Badge text={capitalize(data.category)} transparent mode="dark" />
              <Gap width={16} />
              <View style={styles.authorImageContainer}>
                <Image
                  source={require('../assets/images/profile-picture-light.png')}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
            </View>
            <Gap height={8} />
            <Text
              style={[styles.title, {color: Colors.dark.text}]}
              numberOfLines={2}>
              {data.title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    maxWidth: 340,
    overflow: 'hidden',
  },
  imageContainer: {
    maxWidth: 340,
    aspectRatio: 340 / 256,
  },
  informationContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    maxWidth: 340,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    aspectRatio: 340 / 120,
  },
  blurView: {
    position: 'absolute',
    height: 146,
    zIndex: 1,
  },
  information: {
    padding: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  authorImageContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
