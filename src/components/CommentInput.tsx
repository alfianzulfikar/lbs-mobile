import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ICSubmit from './icons/ICSubmit';
import InputWrapper from './InputWrapper';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import Text from './Text';
import ICCancel from './icons/ICCancel';

const CommentInput = ({
  value,
  onChange,
  onSubmit,
  loading,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string[];
}) => {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const tint = useThemeColor({}, 'tint');
  const textColorDanger = useThemeColor({}, 'textDanger');
  return (
    <View>
      <InputWrapper>
        <View style={styles.container}>
          <TextInput
            placeholder="Tulis komentar di sini"
            style={[styles.input, {color: textColor2}]}
            placeholderTextColor={RGBAColors(0.5)[colorScheme].text}
            onChangeText={onChange}
            value={value}
            multiline
          />
          <View style={{height: 52, justifyContent: 'center'}}>
            {loading ? (
              <ActivityIndicator color={tint} />
            ) : (
              <TouchableOpacity onPress={onSubmit}>
                <ICSubmit color={textColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </InputWrapper>
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 12, lineHeight: 16, color: textColorDanger}}>
            {error.map(
              (item, index) =>
                `${item}${index !== error.length - 1 ? ' ' : ''}`,
            )}
          </Text>
        </View>
        <Text style={[styles.numberOfChar, {color: textColor3}]}>
          {String(value.length)}/1000
        </Text>
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
  },
  input: {
    flex: 1,
    marginRight: 8,
    minHeight: 52,
    maxHeight: 200,
    fontSize: 16,
    lineHeight: 24,
  },
  numberOfChar: {
    fontSize: 12,
    width: 123,
    textAlign: 'right',
  },
});
