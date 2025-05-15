import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICSubmit = ({color}: SvgIconType) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Mask
        id="mask0_2061_3787"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_2061_3787)">
        <Path
          d="M19.8 12.9252L4.4 19.4252C4.06667 19.5585 3.75 19.5294 3.45 19.3377C3.15 19.146 3 18.8669 3 18.5002V5.50022C3 5.13355 3.15 4.85438 3.45 4.66272C3.75 4.47105 4.06667 4.44188 4.4 4.57522L19.8 11.0752C20.2167 11.2585 20.425 11.5669 20.425 12.0002C20.425 12.4335 20.2167 12.7419 19.8 12.9252ZM5 17.0002L16.85 12.0002L5 7.00022V10.5002L11 12.0002L5 13.5002V17.0002Z"
          fill={color || '#1C1B1F'}
        />
      </G>
    </Svg>
  );
};

export default ICSubmit;
