import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import Badge from './Badge';
import {useThemeColor} from '../hooks/useThemeColor';
import {ArticleType} from '../constants/Types';
import capitalize from '../utils/capitalize';
import dateTimeFormat from '../utils/dateTimeFormat';

const ArticleCard2 = ({
  data,
  onPress,
}: {
  data: ArticleType;
  onPress: () => void;
}) => {
  const textColor3 = useThemeColor({}, 'text3');
  const backgroundColor = useThemeColor({}, 'background');
  const date = dateTimeFormat(data.date, true);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.imageContainer, {backgroundColor}]}>
        <Image
          source={{uri: data.image}}
          style={{width: 108, height: 108}}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 1, marginLeft: 16}}>
        <Badge text={capitalize(data.category)} />
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
        <Text style={[styles.date, {color: textColor3}]}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 108,
    height: 108,
    borderRadius: 16,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
});
