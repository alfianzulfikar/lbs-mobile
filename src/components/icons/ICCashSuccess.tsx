import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICCashSuccess = ({width, height, color, style}: SvgIconType) => {
  return (
    <Svg
      width={width || '23'}
      height={height || '20'}
      viewBox="0 0 23 20"
      fill="none"
      style={style || {}}>
      <Path
        d="M10.4737 15.8235H4.15789C3.32037 15.8235 2.51715 15.4889 1.92493 14.8932C1.33271 14.2975 1 13.4895 1 12.6471V4.17647C1 3.33402 1.33271 2.52607 1.92493 1.93037C2.51715 1.33466 3.32037 1 4.15789 1H16.7895C17.627 1 18.4302 1.33466 19.0224 1.93037C19.6147 2.52607 19.9474 3.33402 19.9474 4.17647V8.94118M1 6.29412H19.9474M5.21579 11.5882H5.22105M9.42105 11.5882H11.5263"
        stroke={color || '#039855'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.55 19.075L13 15.525L14.425 14.125L16.55 16.25L20.8 12L22.2 13.425L16.55 19.075Z"
        fill={color || '#039855'}
      />
    </Svg>
  );
};

export default ICCashSuccess;
