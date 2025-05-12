import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICFile = ({color}: SvgIconType) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.1665 16.6667V3.33333C4.1665 3.11232 4.2543 2.90036 4.41058 2.74408C4.56686 2.5878 4.77882 2.5 4.99984 2.5H10.1432C10.5852 2.50009 11.009 2.67575 11.3215 2.98833L15.3448 7.01167C15.6574 7.32415 15.8331 7.74801 15.8332 8.19V16.6667C15.8332 16.8877 15.7454 17.0996 15.5891 17.2559C15.4328 17.4122 15.2209 17.5 14.9998 17.5H4.99984C4.77882 17.5 4.56686 17.4122 4.41058 17.2559C4.2543 17.0996 4.1665 16.8877 4.1665 16.6667Z"
        stroke={color || 'white'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M10 2.5V7.5C10 7.72101 10.0878 7.93298 10.2441 8.08926C10.4004 8.24554 10.6123 8.33333 10.8333 8.33333H15.8333"
        stroke={color || 'white'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ICFile;
