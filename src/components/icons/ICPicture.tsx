import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICPicture = ({color}: SvgIconType) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Mask
        id="mask0_1497_7423"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect width="20" height="20" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1497_7423)">
        <Path
          d="M7.49935 11.6667H15.8327L12.9577 7.91669L11.041 10.4167L9.74935 8.75002L7.49935 11.6667ZM6.66602 15C6.20768 15 5.81532 14.8368 5.48893 14.5104C5.16254 14.184 4.99935 13.7917 4.99935 13.3334V3.33335C4.99935 2.87502 5.16254 2.48266 5.48893 2.15627C5.81532 1.82988 6.20768 1.66669 6.66602 1.66669H16.666C17.1243 1.66669 17.5167 1.82988 17.8431 2.15627C18.1695 2.48266 18.3327 2.87502 18.3327 3.33335V13.3334C18.3327 13.7917 18.1695 14.184 17.8431 14.5104C17.5167 14.8368 17.1243 15 16.666 15H6.66602ZM3.33268 18.3334C2.87435 18.3334 2.48199 18.1702 2.1556 17.8438C1.82921 17.5174 1.66602 17.125 1.66602 16.6667V5.00002H3.33268V16.6667H14.9993V18.3334H3.33268Z"
          fill={color || '#00827E'}
        />
      </G>
    </Svg>
  );
};

export default ICPicture;
