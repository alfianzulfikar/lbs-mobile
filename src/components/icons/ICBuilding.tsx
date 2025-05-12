import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICBuilding = ({color}: SvgIconType) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Mask
        id="mask0_1488_2944"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1488_2944)">
        <Path
          d="M3 21V7H7V3H17V11H21V21H13V17H11V21H3ZM5 19H7V17H5V19ZM5 15H7V13H5V15ZM5 11H7V9H5V11ZM9 15H11V13H9V15ZM9 11H11V9H9V11ZM9 7H11V5H9V7ZM13 15H15V13H13V15ZM13 11H15V9H13V11ZM13 7H15V5H13V7ZM17 19H19V17H17V19ZM17 15H19V13H17V15Z"
          fill={color || '#404040'}
        />
      </G>
    </Svg>
  );
};

export default ICBuilding;
