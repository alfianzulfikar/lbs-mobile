import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import Svg, {Defs, FeGaussianBlur, Filter, Rect} from 'react-native-svg';
import {useColorScheme} from '../hooks/useColorScheme';

const BlurOverlay = ({
  blurAmount = 10,
  blurType,
}: {
  blurAmount?: number;
  blurType?: 'light' | 'dark' | 'regular';
}) => {
  let colorScheme = useColorScheme();
  return Platform.OS === 'ios' ? (
    <BlurView
      blurAmount={blurAmount}
      blurType={blurType || colorScheme}
      style={styles.blurView}
    />
  ) : null;
  // return (
  //   <BlurView blurAmount={1} blurType={colorScheme} style={styles.blurView} />
  // );
  // return <Backdrop
  // const width = '100%';
  // const height = '100%';
  // return (
  //   <View style={[styles.blurView]}>
  //     <Svg width={width} height={height}>
  //       <Defs>
  //         <Filter id="blurFilter">
  //           <FeGaussianBlur stdDeviation={blurAmount} />
  //         </Filter>
  //       </Defs>

  //       {/* Layer transparan dengan blur */}
  //       <Rect
  //         x="0"
  //         y="0"
  //         width={width}
  //         height={height}
  //         fill="rgba(255, 255, 255, 0.2)"
  //         filter="url(#blurFilter)"
  //       />
  //     </Svg>
  //   </View>
  // );
};

export default BlurOverlay;

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

// const styles = StyleSheet.create({
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 10,
//   },
// });
