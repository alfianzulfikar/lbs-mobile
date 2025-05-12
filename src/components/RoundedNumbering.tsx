import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from '../hooks/useColorScheme';

const RoundedNumbering = ({text}: {text: number}) => {
  let colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['#404040', '#1A1A1A']
            : ['#FFFFFF', '#E0E0E0']
        }
        style={styles.gradient}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default RoundedNumbering;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    zIndex: 2,
    textAlign: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
