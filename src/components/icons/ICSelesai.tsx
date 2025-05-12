import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Path,
  Rect,
} from 'react-native-svg';
import {SvgIconType} from '../../constants/Types';

const ICSelesai = ({color, size, shadow}: SvgIconType) => {
  return (
    <Svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      fill="none"
      style={
        shadow
          ? {
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 5,
              shadowOpacity: 0.8,
              elevation: 5,
              shadowColor: '#FFFFFF',
            }
          : {}
      }>
      <G>
        <G>
          <Path
            d="M16.4171 18.7771L13.6356 16.0342C14.1352 15.5281 14.9504 15.5217 15.4564 16.0213L16.4171 16.9691L20.6294 12.82C21.129 13.3273 21.1226 14.1425 20.6152 14.6409L16.4158 18.7771H16.4171Z"
            fill={color || '#1A1A1A'}
          />
        </G>
        <G>
          <Path
            d="M15.2582 8.11063H12.6904V7.50153C12.6904 6.67221 12.0182 6 11.1876 6H8.68159C7.85227 6 7.18006 6.67221 7.18006 7.50153V8.11063H4.90202C3.85121 8.11063 3 8.96184 3 10.0127V16.0329C3 17.0837 3.85121 17.9349 4.90202 17.9349H13.7296L12.7123 16.9318C12.5268 16.7489 12.2783 16.6472 12.0195 16.6472H5.05526C4.63159 16.6472 4.28776 16.3033 4.28776 15.8797V10.1659C4.28776 9.74222 4.63159 9.39839 5.05526 9.39839H15.1049C15.5286 9.39839 15.8724 9.74222 15.8724 10.1659V14.6228C16.175 14.9216 16.6618 14.9216 16.9644 14.6228L17.1602 14.4309V10.0127C17.1602 8.96184 16.309 8.11063 15.2582 8.11063ZM8.46782 7.68696C8.46782 7.46676 8.64682 7.28776 8.86702 7.28776H11.0021C11.2236 7.28776 11.4026 7.46676 11.4026 7.68696V8.11063H8.46782V7.68696Z"
            fill={color || '#1A1A1A'}
          />
        </G>
      </G>
    </Svg>
  );
};

export default ICSelesai;
