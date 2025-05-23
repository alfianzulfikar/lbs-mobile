import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import Svg, {Circle, Defs, FeDropShadow, Filter} from 'react-native-svg';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';

const RoundedProgressIndicator = ({
  target,
  current,
  type,
  transparent,
  color,
  shadow,
}: {
  target: number;
  current: number;
  type?: 'small' | 'large' | 'medium';
  transparent?: boolean;
  color?: string;
  shadow?: boolean;
}) => {
  let colorScheme = useColorScheme();
  const progress = (current * 100) / target;
  const progressColor = color || useThemeColor({}, 'tint');
  const size = type === 'large' ? 160 : type === 'medium' ? 80 : 48;
  const strokeWidth = type === 'large' ? 18 : type === 'medium' ? 10 : 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);
  const baseStrokeDashoffset = circumference * (1 - 100 / 100);

  return (
    <View style={styles.container}>
      <Svg
        width={size + (type === 'large' ? 40 : type === 'medium' ? 20 : 0)}
        height={size + (type === 'large' ? 40 : type === 'medium' ? 20 : 0)}
        style={{
          position: 'relative',
          zIndex: 1,
        }}
        viewBox={
          type === 'large'
            ? `-16 -16 ${size + 40} ${size + 40}`
            : type === 'medium'
            ? `-8 -8 ${size + 18} ${size + 18}`
            : `0 0 ${size} ${size}`
        }>
        {/* Background Circle */}
        {/* <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="none"
          strokeWidth={strokeWidth}
          fill="#FFFFFF80"
        /> */}

        <Defs>
          <Filter id="shadow" x="-100%" y="-20%" width="300%" height="150%">
            <FeDropShadow
              dx="0"
              dy="0"
              stdDeviation="6"
              floodColor="#FFFFFF"
              floodOpacity="0.8"
            />
          </Filter>
        </Defs>

        {/* <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0, 255, 247, 0.7)" // Warna shadow
          strokeWidth={strokeWidth + 4} // Lebih tebal dari stroke utama
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        /> */}

        {/* Progress Circle */}
        {type === 'large' && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={
              colorScheme === 'dark'
                ? 'rgba(224, 224, 224, 0.2)'
                : 'rgba(64, 64, 64, 0.2)'
            }
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={baseStrokeDashoffset}
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        )}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill={
            transparent
              ? 'transparent'
              : RGBAColors(0.4)[colorScheme].background
          }
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
          {...(shadow ? {filter: 'url(#shadow)'} : {})}
        />
      </Svg>
      <Text
        style={[
          styles.progress,
          shadow && styles.shadow,
          {
            color: progressColor,
            fontSize: type === 'large' ? 28 : type === 'medium' ? 16 : 12,
            // transform: [{translateY: -2}],
          },
        ]}>
        {progress.toFixed(progress < 1 && progress !== 0 ? 2 : 0)}%
      </Text>
    </View>
  );
};

export default RoundedProgressIndicator;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {},
  progress: {
    position: 'absolute',
    fontWeight: '700',
    zIndex: 2,
  },
  shadow: {
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowColor: 'white',
    transform: [{translateY: -4}],
  },
});
