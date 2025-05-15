import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {BusinessType} from '../constants/Types';
import Text from './Text';
import {RGBAColors} from '../constants/Colors';
import Badge from './Badge';
import capitalize from '../utils/capitalize';
import Gap from './Gap';
import RoundedProgressIndicator from './RoundedProgressIndicator';
import {useNavigation} from '@react-navigation/native';
import BlurOverlay from './BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const BusinessCard = ({data}: {data: BusinessType}) => {
  let colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const background = useThemeColor({}, 'background');
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  return (
    <Pressable
      style={[
        // styles.container,
        {
          elevation: 1,
          shadowColor: tint,
        },
      ]}
      onPress={() =>
        navigation.navigate('OrderStack', {
          screen: 'BusinessDetail',
          params: {slug: data.slug},
        })
      }>
      <View style={[styles.container, {width: (width * 84) / 100}]}>
        <View
          style={[
            styles.imageContainer,
            {
              width: (width * 84) / 100,
              backgroundColor: RGBAColors(0.2).light.background,
            },
          ]}>
          <Image
            source={{uri: data.image}}
            style={{resizeMode: 'cover', width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={[
            styles.informationContainer,
            {
              backgroundColor:
                Platform.OS === 'android'
                  ? RGBAColors(0.2)['light'].background
                  : RGBAColors(0.2)['light'].background,
            },
          ]}>
          <BlurOverlay />
          <View style={styles.information}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Badge text={capitalize(data.tipeBisnis)} transparent />
              <RoundedProgressIndicator
                target={data.target}
                current={data.terpenuhi}
              />
            </View>
            <Gap height={8} />
            <Text style={styles.merkDagang} numberOfLines={2}>
              {data.merkDagang}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    maxWidth: 340,
    overflow: 'hidden',
  },
  imageContainer: {
    maxWidth: 340,
    aspectRatio: 340 / 190,
  },
  informationContainer: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    overflow: 'hidden',
    height: 142,
  },
  blurView: {
    position: 'absolute',
    height: 142,
    zIndex: 1,
  },
  information: {
    paddingHorizontal: 16,
    paddingVertical: 22,
    zIndex: 2,
  },
  merkDagang: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
