import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICCashWarning = ({width, height, color, style}: SvgIconType) => {
  return (
    <Svg
      width={width || '21'}
      height={height || '20'}
      viewBox="0 0 21 20"
      fill="none"
      style={style || {}}>
      <Path
        d="M14.5 15.8235H4.15789C3.32037 15.8235 2.51715 15.4889 1.92493 14.8932C1.33271 14.2975 1 13.4895 1 12.6471V4.17647C1 3.33402 1.33271 2.52607 1.92493 1.93037C2.51715 1.33466 3.32037 1 4.15789 1H16.7895C17.627 1 18.4302 1.33466 19.0224 1.93037C19.6147 2.52607 19.9474 3.33402 19.9474 4.17647V8.94118M1 6.29412H19.9474M5.21579 11.5882H5.22105M9.42105 11.5882H11.5263"
        stroke={color || '#DC6803'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19 20C18.7167 20 18.4792 19.9042 18.2875 19.7125C18.0958 19.5208 18 19.2833 18 19C18 18.7167 18.0958 18.4792 18.2875 18.2875C18.4792 18.0958 18.7167 18 19 18C19.2833 18 19.5208 18.0958 19.7125 18.2875C19.9042 18.4792 20 18.7167 20 19C20 19.2833 19.9042 19.5208 19.7125 19.7125C19.5208 19.9042 19.2833 20 19 20ZM18 17V12H20V17H18Z"
        fill={color || '#DC6803'}
      />
    </Svg>
  );
};

export default ICCashWarning;
