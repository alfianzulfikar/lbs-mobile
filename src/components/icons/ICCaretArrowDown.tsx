import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICCaretArrowDown = ({color}: SvgIconType) => {
  return (
    <Svg width="10" height="5" viewBox="0 0 10 5" fill="none">
      <Path d="M5 5L0 0H10L5 5Z" fill={color || '#1A1A1A'} />
    </Svg>
  );
};

export default ICCaretArrowDown;
