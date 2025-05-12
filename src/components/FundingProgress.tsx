import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
import RoundedProgressIndicator from './RoundedProgressIndicator';

const FundingProgress = () => {
  return (
    <View>
      <RoundedProgressIndicator target={100} current={80}/>
      {/* <Svg width="112" height="192" viewBox="0 0 112 192" fill="none">
        <G filter="url(#filter0_dd_887_5277)">
          <Path
            d="M96 168C96 172.418 92.4093 176.042 88.013 175.601C69.729 173.767 52.5399 165.677 39.4315 152.569C24.4285 137.566 16 117.217 16 96C16 74.7827 24.4285 54.4344 39.4315 39.4315C52.5399 26.323 69.729 18.2334 88.013 16.3994C92.4093 15.9585 96 19.5817 96 24C96 28.4183 92.4044 31.9484 88.0205 32.4991C73.9888 34.262 60.8511 40.6392 50.7452 50.7452C38.7428 62.7475 32 79.0261 32 96C32 112.974 38.7428 129.253 50.7452 141.255C60.8511 151.361 73.9888 157.738 88.0205 159.501C92.4044 160.052 96 163.582 96 168Z"
            fill="url(#paint0_linear_887_5277)"
            shape-rendering="crispEdges"
          />
        </G>
        <Defs>
          <Filter
            id="filter0_dd_887_5277"
            x="0"
            y="0.363037"
            width="112"
            height="191.274"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <FeFlood flood-opacity="0" result="BackgroundImageFix" />
            <FeColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <FeOffset />
            <FeGaussianBlur stdDeviation="8" />
            <FeComposite in2="hardAlpha" operator="out" />
            <FeColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            />
            <FeBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_887_5277"
            />
            <FeColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <FeOffset />
            <FeGaussianBlur stdDeviation="4" />
            <FeComposite in2="hardAlpha" operator="out" />
            <FeColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"
            />
            <FeBlend
              mode="normal"
              in2="effect1_dropShadow_887_5277"
              result="effect2_dropShadow_887_5277"
            />
            <FeBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_887_5277"
              result="shape"
            />
          </Filter>
          <LinearGradient
            id="paint0_linear_887_5277"
            x1="16"
            y1="96"
            x2="176"
            y2="96"
            gradientUnits="userSpaceOnUse">
            <Stop stop-color="white" stop-opacity="0.7" />
            <Stop offset="1" stop-color="white" />
          </LinearGradient>
        </Defs>
      </Svg> */}
    </View>
  );
};

export default FundingProgress;

const styles = StyleSheet.create({});
