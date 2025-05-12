import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';

const KYCProgressBar = ({percentage}: {percentage: number}) => {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  return (
    <View
      style={{
        height: 8,
        borderRadius: 8,
        backgroundColor: colorScheme === 'dark' ? '#4F4F4F' : '#EDEDED',
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: `${percentage || 0}%`,
          height: 8,
          borderRadius: 8,
          backgroundColor: textColor,
        }}></View>
    </View>
  );
};

export default KYCProgressBar;

const styles = StyleSheet.create({});
