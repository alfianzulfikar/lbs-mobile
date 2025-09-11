import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from './Text';

type ComponentType = {
  number?: string;
  text?: string;
  width?: number;
  marginTop?: number;
  textAlign?: 'justify' | 'left' | 'right' | 'center';
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700';
};

export const Title = ({
  number,
  text,
  width,
  marginTop,
  fontSize,
}: ComponentType) => {
  const textColor = useThemeColor({}, 'text');
  return (
    <View style={{flexDirection: 'row', marginTop: marginTop || 0}}>
      {number && (
        <Text
          style={[
            styles.titleNumber,
            {color: textColor, width: width || 28, fontSize: fontSize || 18},
          ]}>
          {number}.
        </Text>
      )}
      <Text
        style={[
          styles.titleText,
          {color: textColor, fontSize: fontSize || 18},
        ]}>
        {text}
      </Text>
    </View>
  );
};

export const Item = ({
  number,
  text,
  textAlign,
  marginTop,
  fontWeight,
}: ComponentType) => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <View style={{flexDirection: 'row', marginTop: marginTop || 8}}>
      <Text
        style={[
          styles.itemNumber,
          {color: textColor2, fontWeight: fontWeight || '400'},
        ]}>
        {number ? number + '.' : ''}
      </Text>
      <Text
        style={[
          styles.itemText,
          {
            color: textColor2,
            textAlign: textAlign || 'left',
            fontWeight: fontWeight || '400',
          },
        ]}>
        {text}
      </Text>
    </View>
  );
};

export const Item2 = ({number, text, textAlign}: ComponentType) => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <View style={{flexDirection: 'row', marginTop: 8, paddingLeft: 25}}>
      <Text style={[styles.itemNumber, {color: textColor2}]}>
        {number ? number + '.' : ''}
      </Text>
      <Text
        style={[
          styles.itemText,
          {color: textColor2, textAlign: textAlign || 'left'},
        ]}>
        {text}
      </Text>
    </View>
  );
};

export const Paragraph = ({
  text,
  marginTop,
  textAlign,
  fontWeight,
}: ComponentType) => {
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <Text
      style={[
        styles.itemText,
        {
          color: textColor2,
          marginTop: marginTop || 8,
          textAlign: textAlign || 'left',
          fontWeight: fontWeight || '400',
        },
      ]}>
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
    fontWeight: '700',
    lineHeight: 28,
  },
  titleText: {
    flex: 1,
    fontWeight: '700',
    lineHeight: 28,
  },
});
