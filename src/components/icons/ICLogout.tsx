import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICLogout = ({color}: SvgIconType) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Mask
        id="mask0_1488_2935"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1488_2935)">
        <Path
          d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z"
          fill={color || '#D92D20'}
        />
      </G>
    </Svg>
  );
};

export default ICLogout;
