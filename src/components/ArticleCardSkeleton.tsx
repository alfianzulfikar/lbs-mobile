import {Animated, Easing, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {RGBAColors} from '../constants/Colors';

const ArticleCardSkeleton = () => {
  const {width} = useWindowDimensions();

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
          width: (width * 84) / 100,
          opacity: fadeAnimation,
        },
      ]}></Animated.View>
  );
};

export default ArticleCardSkeleton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    aspectRatio: 340 / 256,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
