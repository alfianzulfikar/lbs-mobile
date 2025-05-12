import {StyleSheet} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICDownload = ({color}: SvgIconType) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.99999 13.3334L5.83333 9.16671L6.99999 7.95837L9.16666 10.125V3.33337H10.8333V10.125L13 7.95837L14.1667 9.16671L9.99999 13.3334ZM4.99999 16.6667C4.54166 16.6667 4.14944 16.5037 3.82333 16.1775C3.49722 15.8514 3.33388 15.4589 3.33333 15V12.5H4.99999V15H15V12.5H16.6667V15C16.6667 15.4584 16.5036 15.8509 16.1775 16.1775C15.8514 16.5042 15.4589 16.6673 15 16.6667H4.99999Z"
        fill={color || 'white'}
      />
    </Svg>
  );
};

export default ICDownload;

const styles = StyleSheet.create({});
