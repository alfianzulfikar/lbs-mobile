import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICHome = ({color, type}: SvgIconType) => {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      {type === 'outline' ? (
        <Path
          fill={color || '#1A1A1A'}
          d="M20.999 21h-5.185c-1.3 0-2.355-.984-2.355-2.2v-2.936c0-.752-.653-1.363-1.46-1.363s-1.46.61-1.46 1.364V18.8C10.54 20.016 9.486 21 8.185 21H5.355C4.055 21 3 20.016 3 18.8V9.665c0-.708.365-1.371.979-1.784l6.648-4.466a2.49 2.49 0 0 1 2.752 0L20.02 7.88c.614.414.979 1.077.979 1.784v11.336zm-1.362-1.271V9.886c0-.438-.225-.848-.605-1.103l-6.178-4.154a1.54 1.54 0 0 0-1.702 0L4.968 8.783c-.38.255-.607.666-.607 1.104v8.483c0 .752.652 1.36 1.457 1.36h1.903c.805 0 1.457-.608 1.457-1.36v-2.504c0-1.455 1.263-2.634 2.821-2.634s2.821 1.18 2.821 2.634v2.504c0 .752.652 1.36 1.457 1.36h3.358z"></Path>
      ) : (
        <Path
          fill={color || '#1A1A1A'}
          d="M15.567 21c-1.164 0-2.106-.877-2.106-1.96v-3.16c0-.75-.654-1.359-1.46-1.359-.807 0-1.46.608-1.46 1.359v3.16c0 1.083-.943 1.96-2.106 1.96H5.106C3.943 21 3 20.123 3 19.04V9.58c0-.631.325-1.223.876-1.592l6.896-4.618a2.23 2.23 0 0 1 2.46 0l6.892 4.618c.55.37.876.96.876 1.592V21z"></Path>
      )}
    </Svg>
  );
};

export default ICHome;
