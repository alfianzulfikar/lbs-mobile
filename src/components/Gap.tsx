import {View} from 'react-native';
import React from 'react';

interface GapType {
  width?: number;
  height?: number;
  flex?: number;
  minHeight?: number;
  maxHeight?: number;
}

const Gap = ({width, height, flex, minHeight, maxHeight}: GapType) => {
  return (
    <View
      style={{
        width: width || 0,
        height: height || 0,
        minHeight: minHeight || 0,
        ...(maxHeight ? {maxHeight} : {}),
        ...(flex ? {flex} : {}),
      }}
    />
  );
};

export default Gap;
