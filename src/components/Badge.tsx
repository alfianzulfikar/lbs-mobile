import {Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Text from './Text';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import BlurOverlay from './BlurOverlay';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from '../hooks/useColorScheme';
// import LinearGradient from 'react-native-linear-gradient';
// import {BlurView} from '@react-native-community/blur';

const Badge = ({
  text,
  fontSize,
  borderRadius,
  paddingVertical,
  paddingHorizontal,
  border,
  transparent,
  mode,
  maxWidth,
}: {
  text: string;
  fontSize?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  border?: boolean;
  transparent?: boolean;
  mode?: 'dark' | 'light';
  maxWidth?: number;
}) => {
  let colorScheme = useColorScheme();
  let textColor = useThemeColor({}, 'text');
  let backgroundColor = useThemeColor({}, 'background');
  let shadowColor = '#000';
  return (
    <View style={[styles.outer, {shadowColor}]}>
      <View
        style={[
          styles.container,
          {
            // backgroundColor: RGBAColors(0.4)[colorScheme].background,
            // backgroundColor: transparent
            //   ? RGBAColors(0.4)[mode || colorScheme].background
            //   : RGBAColors(
            //       Platform.OS === 'ios'
            //         ? mode || colorScheme === 'dark'
            //           ? 0
            //           : 0.8
            //         : 1,
            //     )[mode || colorScheme].background,
            borderRadius: borderRadius || 16,
            maxWidth: maxWidth || 'auto',
          },
          // border !== false &&
          //   Platform.OS === 'android' && {
          //     borderWidth: 1,
          //     borderColor: textColor,
          //   },
        ]}>
        <LinearGradient
          colors={
            (mode || colorScheme) === 'dark'
              ? ['rgba(26,26,26,0.1)', 'rgba(26,26,26,0.5)']
              : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          // locations={Platform.OS === 'android' ? [0, 0.5] : [0, 0.3]}
          // locations={[0, 0.1]}
          style={[
            styles.overlay,
            {transform: [{rotate: '180deg'}]},
          ]}></LinearGradient>
        {/* <LinearGradient
          colors={
            colorScheme === 'dark'
              ? ['#404040', '#1A1A1A']
              : ['#FFFFFF', '#E0E0E0']
          }
          style={styles.overlay}></LinearGradient> */}
        {/* <BlurView
          blurAmount={80}
          blurType="light"
          style={styles.blurView}></BlurView> */}
        {/* <BlurOverlay /> */}
        <Text
          style={[
            styles.text,
            {
              color: RGBAColors(1)[mode || colorScheme].text,
              fontSize: fontSize || 12,
              paddingVertical: paddingVertical ?? 8,
              paddingHorizontal: paddingHorizontal ?? 12,
            },
          ]}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  outer: {
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  container: {
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 700,
    position: 'relative',
    zIndex: 2,
  },
  background: {
    width: 70,
    height: 66,
    position: 'absolute',
    top: -20,
    left: -5,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});
