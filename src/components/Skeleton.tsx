import {Animated, Easing, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';

const Skeleton = ({
  width,
  aspectRatio,
}: {
  width?: number;
  aspectRatio: number;
}) => {
  const tint = useThemeColor({}, 'tint');

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: RGBAColors(0.4).light.background,
          width: width || '100%',
          opacity: fadeAnimation,
          aspectRatio,
        },
      ]}></Animated.View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
  },
});
