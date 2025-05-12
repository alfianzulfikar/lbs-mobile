import {View} from 'react-native';
import React from 'react';

interface GapType {
  width?: number;
  height?: number;
  flex?: number;
  minHeight?: number;
}

const Gap = ({width, height, flex, minHeight}: GapType) => {
  return (
    <View
      style={{
        width: width || 0,
        height: height || 0,
        minHeight: minHeight || 0,
        ...(flex ? {flex} : {}),
      }}
    />
  );
};

export default Gap;
