import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from './Text';

type ComponentType = {number?: string; text?: string; width?: number};

export const Title = ({number, text, width}: ComponentType) => {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={{flexDirection: 'row'}}>
      <Text
        style={[styles.titleNumber, {color: textColor, width: width || 28}]}>
        {number}.
      </Text>
      <Text style={[styles.titleText, {color: textColor}]}>{text}</Text>
    </View>
  );
};

export const Item = ({number, text}: ComponentType) => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <View style={{flexDirection: 'row', marginTop: 8}}>
      <Text style={[styles.itemNumber, {color: textColor2}]}>
        {number ? number + '.' : ''}
      </Text>
      <Text style={[styles.itemText, {color: textColor2}]}>{text}</Text>
    </View>
  );
};

export const Item2 = ({number, text}: ComponentType) => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <View style={{flexDirection: 'row', marginTop: 8, paddingLeft: 25}}>
      <Text style={[styles.itemNumber, {color: textColor2}]}>
        {number ? number + '.' : ''}
      </Text>
      <Text style={[styles.itemText, {color: textColor2}]}>{text}</Text>
    </View>
  );
};

export const Paragraph = ({text}: ComponentType) => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <Text style={[styles.itemText, {color: textColor2, marginTop: 8}]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  itemNumber: {
    width: 24,
    fontSize: 16,
    lineHeight: 24,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  titleNumber: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  titleText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
