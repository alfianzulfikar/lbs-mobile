import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import Text from './Text';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from '../hooks/useColorScheme';

const IconWrapper2 = ({
  children,
  size,
}: {
  children: ReactNode;
  size?: number;
}) => {
  let colorScheme = useColorScheme();
  return (
    <View
      style={[
        [
          styles.container,
          {
            width: size || 40,
            height: size || 40,
            borderRadius: size ? size / 2 : 20,
          },
        ],
      ]}>
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['#404040', '#1A1A1A']
            : ['#FFFFFF', '#E0E0E0']
        }
        style={styles.gradient}
      />
      {children}
    </View>
  );
};

export default IconWrapper2;

const styles = StyleSheet.create({
  container: {
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
