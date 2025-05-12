import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import Gap from './Gap';
import {InputDropdownOption} from '../constants/Types';

const CategoryFilter = ({
  options,
  value,
  setValue,
  activeColor,
}: {
  options: InputDropdownOption[];
  value: string;
  setValue: (value: string) => void;
  activeColor?: string;
}) => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
  const textInvertColor = useThemeColor({}, 'textInvert');
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <Gap width={24} />
      {options.map((item, optionId) => (
        <TouchableOpacity
          style={[
            styles.categoryContainer,
            {
              backgroundColor:
                value === item.id
                  ? activeColor || tint
                  : RGBAColors(0.5)[colorScheme].background,
              marginRight: optionId !== options.length - 1 ? 8 : 0,
              borderWidth: value === item.id ? 0 : 1,
              borderColor: RGBAColors(0.1)[colorScheme].text,
            },
          ]}
          onPress={() => setValue(String(item.id))}
          key={optionId}>
          <Text
            style={[
              styles.categoryText,
              {color: value === item.id ? textInvertColor : textColor2},
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      <Gap width={24} />
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // overflow: 'scroll',
  },
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
