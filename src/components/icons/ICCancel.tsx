import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICCancel = ({color, size}: SvgIconType) => {
  return (
    <Svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      fill="none">
      <Mask
        id="mask0_1328_5585"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1328_5585)">
        <Path
          d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
          fill={color || '#404040'}
        />
      </G>
    </Svg>
  );
};

export default ICCancel;

const styles = StyleSheet.create({});
