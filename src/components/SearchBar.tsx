import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Text from './Text';
import {RGBAColors} from '../constants/Colors';
import ICSearch from './icons/ICSearch';
import Gap from './Gap';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';

const SearchBar = ({
  keyword,
  setKeyword,
  onSubmit,
  placeholder,
}: {
  keyword: string;
  setKeyword: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}) => {
  const colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const textColor4 = useThemeColor({}, 'text4');
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: RGBAColors(0.5)[colorScheme].background,
          borderColor: RGBAColors(0.1)[colorScheme].text,
        },
      ]}>
      <ICSearch color={colorScheme === 'dark' ? '#C2C2C2' : '#616161'} />
      <Gap width={10} />
      <TextInput
        placeholder={placeholder || 'Cari Informasi'}
        style={[styles.input, {color: textColor2}]}
        value={keyword}
        onChangeText={value => setKeyword(value)}
        onSubmitEditing={() => {
          Keyboard.dismiss();
          onSubmit();
        }}
        submitBehavior="submit"
        returnKeyType="search"
        placeholderTextColor={textColor4}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    height: 40,
    transform: [{translateY: 1}],
    flex: 1,
  },
});
