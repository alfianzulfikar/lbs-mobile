import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';

const BusinessCardSkeleton = () => {
  const {width} = Dimensions.get('window');
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
          width: (width * 84) / 100,
          opacity: fadeAnimation,
        },
      ]}>
      {/* <ActivityIndicator color={tint} /> */}
    </Animated.View>
  );
};

export default BusinessCardSkeleton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    aspectRatio: 340 / 332,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
