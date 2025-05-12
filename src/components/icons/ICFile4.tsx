import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICFile4 = ({color}: SvgIconType) => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M11.6673 35C10.7833 35 9.93542 34.6488 9.3103 34.0237C8.68517 33.3986 8.33398 32.5507 8.33398 31.6667V5H23.334L31.6673 13.3333V31.6667C31.6673 32.5507 31.3161 33.3986 30.691 34.0237C30.0659 34.6488 29.218 35 28.334 35H11.6673Z"
        stroke={color || '#1A1A1A'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.668 5V15H31.668"
        stroke={color || '#1A1A1A'}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M15 21.6667H25M15 28.3334H25"
        stroke={color || '#1A1A1A'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ICFile4;
