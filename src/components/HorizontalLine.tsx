import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useThemeColor} from '../hooks/useThemeColor';

const HorizontalLine = ({
  marginTop,
  marginBottom,
  marginVertical,
}: {
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
}) => {
  const line = useThemeColor({}, 'line');
  return (
    <View
      style={[
        styles.line,
        {
          borderColor: line,
          ...(marginTop ? {marginTop} : {}),
          ...(marginBottom ? {marginBottom} : {}),
          ...(marginVertical ? {marginVertical} : {}),
        },
      ]}
    />
  );
};

export default HorizontalLine;

const styles = StyleSheet.create({
  line: {
    width: '100%',
    borderTopWidth: 1,
  },
});
