import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from './Text';

const Label = ({title, required}: {title: string; required?: boolean}) => {
  const textColor2 = useThemeColor({}, 'text2');
  const textColorDanger = useThemeColor({}, 'textDanger');
  return (
    <Text style={[styles.label, {color: textColor2}]}>
      {title}
      {required && <Text style={{color: textColorDanger}}> *</Text>}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
