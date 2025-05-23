import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICFile5 = ({color}: SvgIconType) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Mask
        id="mask0_2225_3557"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16">
        <Rect width="16" height="16" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_2225_3557)">
        <Path
          d="M5.33464 11.9999H10.668V10.6666H5.33464V11.9999ZM5.33464 9.33325H10.668V7.99992H5.33464V9.33325ZM4.0013 14.6666C3.63464 14.6666 3.32075 14.536 3.05964 14.2749C2.79852 14.0138 2.66797 13.6999 2.66797 13.3333V2.66659C2.66797 2.29992 2.79852 1.98603 3.05964 1.72492C3.32075 1.46381 3.63464 1.33325 4.0013 1.33325H9.33464L13.3346 5.33325V13.3333C13.3346 13.6999 13.2041 14.0138 12.943 14.2749C12.6819 14.536 12.368 14.6666 12.0013 14.6666H4.0013ZM8.66797 5.99992V2.66659H4.0013V13.3333H12.0013V5.99992H8.66797Z"
          fill={color || '#404040'}
        />
      </G>
    </Svg>
  );
};

export default ICFile5;
