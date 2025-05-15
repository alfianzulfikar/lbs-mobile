import {
  Platform,
  // Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
// import LinearGradient from 'react-native-linear-gradient';
import {Callback} from '../constants/Types';
import BlurOverlay from './BlurOverlay';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from '../hooks/useColorScheme';
// import BlurOverlay from './BlurOverlay';

const IconWrapper = ({
  width,
  height,
  iconWidth,
  iconHeight,
  borderRadius,
  children,
  onPress,
  transparent,
  mode,
  loading,
}: {
  width?: number;
  height?: number;
  iconWidth?: number;
  iconHeight?: number;
  borderRadius?: number;
  children?: ReactNode;
  onPress?: Callback;
  transparent?: boolean;
  mode?: 'light' | 'dark';
  loading?: boolean;
}) => {
  let colorScheme = useColorScheme();
  let shadowColor = useThemeColor({}, 'tint');
  return (
    <Pressable
      style={[
        styles.outer,
        {shadowColor: shadowColor, opacity: loading ? 0.4 : 1},
      ]}
      onPress={onPress}
      disabled={onPress ? (loading ? true : false) : true}>
      <View
        style={[
          styles.container,
          {
            // backgroundColor: transparent
            //   ? RGBAColors(0.4)[colorScheme].background
            //   : RGBAColors(
            //       Platform.OS === 'ios'
            //         ? colorScheme === 'dark'
            //           ? 0
            //           : 0.8
            //         : 1,
            //     )[colorScheme].background,
            borderRadius: borderRadius || 20,
            width: width || 40,
            height: height || 40,
          },
        ]}>
        <LinearGradient
          colors={
            (mode || colorScheme) === 'dark'
              ? ['rgba(26,26,26,0.8)', 'rgba(26,26,26,0.5)']
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
        <BlurOverlay />
        <View
          style={[
            styles.childrenWrapper,
            {width: width || 40, height: height || 40},
          ]}>
          {children}
        </View>
      </View>
    </Pressable>
  );
};

export default IconWrapper;

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
  },
  background: {
    width: 70,
    height: 66,
    position: 'absolute',
    top: -20,
    left: -5,
    zIndex: 2,
  },
  childrenWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  blurView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});
