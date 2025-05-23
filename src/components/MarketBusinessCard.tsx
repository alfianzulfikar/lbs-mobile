import {StyleSheet, useWindowDimensions, View} from 'react-native';
import React, {ReactNode} from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import BlurOverlay from './BlurOverlay';
import Gap from './Gap';

const MarketBusinessCard = ({
  data,
}: {
  data: {
    title: string;
    desc: string;
    image: ReactNode;
  };
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const {width} = useWindowDimensions();
  return (
    <View
      style={[styles.container, {backgroundColor, width: (width * 59) / 100}]}>
      {data.image}
      <Gap flex={1} />
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: 'rgba(26, 26, 26, 0.6)'},
        ]}>
        <BlurOverlay />
        <View style={{padding: 16, zIndex: 2}}>
          <Text style={[styles.title, {color: '#FFFFFF'}]}>{data.title}</Text>
          <Text style={[styles.desc, {color: '#FFFFFF'}]}>{data.desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default MarketBusinessCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    aspectRatio: 240 / 326,
    maxWidth: 240,
  },
  contentContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
});
