import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICChevronArrowRight = ({color}: SvgIconType) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Mask
        id="mask0_1488_2894"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1488_2894)">
        <Path
          d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
          fill={color || '#404040'}
        />
      </G>
    </Svg>
  );
};

export default ICChevronArrowRight;
