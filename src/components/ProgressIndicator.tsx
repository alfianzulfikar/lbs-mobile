import {StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';

const ProgressIndicator = ({
  target,
  current,
}: {
  target: number;
  current: number;
}) => {
  const colorScheme = useColorScheme();
  const tint2 = useThemeColor({}, 'tint2');
  const progress = current && target ? (current * 100) / target : 0;
  return (
    <View
      style={{
        borderRadius: 8,
        width: '100%',
        backgroundColor: colorScheme === 'dark' ? '#616161' : '#E5E5E5',
      }}>
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['#FFE7C2', '#FEF5E6']
            : ['#00827E', '#07C5BF']
        }
        style={{
          height: 8,
          borderRadius: 8,
          width: `${progress}%`,
          shadowColor: colorScheme === 'dark' ? '#FFE7C2' : '#00FFF7',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.8,
          shadowRadius: 4,
        }}></LinearGradient>
    </View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({});
