import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICCheckedShield = ({color}: SvgIconType) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Mask
        id="mask0_1488_2868"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect width="20" height="20" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1488_2868)">
        <Path
          d="M9.12565 12.9583L13.834 8.24999L12.6465 7.06249L9.12565 10.5833L7.37565 8.83332L6.18815 10.0208L9.12565 12.9583ZM10.0007 18.3333C8.0701 17.8472 6.47635 16.7396 5.2194 15.0104C3.96246 13.2812 3.33398 11.3611 3.33398 9.24999V4.16666L10.0007 1.66666L16.6673 4.16666V9.24999C16.6673 11.3611 16.0388 13.2812 14.7819 15.0104C13.525 16.7396 11.9312 17.8472 10.0007 18.3333Z"
          fill={color || '#00827E'}
        />
      </G>
    </Svg>
  );
};

export default ICCheckedShield;
