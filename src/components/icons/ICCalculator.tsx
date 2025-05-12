import React from 'react';
import Svg, {G, Mask, Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';
import {useThemeColor} from '../../hooks/useThemeColor';

const ICCalculator = ({color}: SvgIconType) => {
  const background = useThemeColor({}, 'background');
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none">
      <Mask
        id="mask0_887_5222"
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="19">
        <Path
          d="M15.8332 1H2.49984C2.27882 1 2.06686 1.0878 1.91058 1.24408C1.7543 1.40036 1.6665 1.61232 1.6665 1.83333V16.8333C1.6665 17.0543 1.7543 17.2663 1.91058 17.4226C2.06686 17.5789 2.27882 17.6667 2.49984 17.6667H15.8332C16.0542 17.6667 16.2661 17.5789 16.4224 17.4226C16.5787 17.2663 16.6665 17.0543 16.6665 16.8333V1.83333C16.6665 1.61232 16.5787 1.40036 16.4224 1.24408C16.2661 1.0878 16.0542 1 15.8332 1Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <Path
          d="M13.7497 3.5H4.58301V7.25H13.7497V3.5Z"
          fill="black"
          stroke="black"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <Path
          d="M4.1665 11L7.08317 13.9167M7.08317 11L4.1665 13.9167M10.8332 13.9167H14.1665M10.8332 11.4167H14.1665"
          stroke="black"
          strokeWidth="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#mask0_887_5222)">
        <Path
          d="M-0.833496 -0.666672H19.1665V19.3333H-0.833496V-0.666672Z"
          fill={color || 'black'}
        />
      </G>
    </Svg>
  );
};

export default ICCalculator;
