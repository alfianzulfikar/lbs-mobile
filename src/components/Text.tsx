import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useColorScheme} from '../hooks/useColorScheme';

const CustomText = (props: TextProps) => {
  const colorScheme = useColorScheme();
  // const loading = props?.loading;
  // const loadingStyle = props?.loadingStyle || {};
  let properties: any = {};

  if (Array.isArray(props.style)) {
    props.style.map((item: any, id) => {
      if (id === 0) {
        properties = {
          ...props,
          style: {
            ...item,
          },
        };
      } else {
        properties = {
          ...properties,
          style: {
            ...properties.style,
            ...item,
          },
        };
      }
    });
  } else {
    properties = {
      ...props,
    };
  }

  let color = Colors[colorScheme].text;
  let fontFamily = 'Inter-Regular';

  if (properties.style) {
    if (properties.style.color) {
      color = properties.style.color;
    }

    if (properties.style.fontWeight) {
      if (properties.style.fontWeight == '500') {
        fontFamily = 'Inter-Medium';
      } else if (properties.style.fontWeight == '600') {
        fontFamily = 'Inter-SemiBold';
      } else if (properties.style.fontWeight == '700') {
        fontFamily = 'Inter-Bold';
      }
    }

    if (properties.style.fontFamily) {
      fontFamily = properties.style.fontFamily;
    } else if (properties.fontFamily) {
      fontFamily = properties.fontFamily;
    }
  }

  let style = {};
  if (properties.style) {
    style = {
      ...properties.style,
      fontFamily,
      color,
    };
    delete properties.style;
  }

  let children = '';
  if (properties.children) {
    children = properties.children;
    delete properties.children;
  }

  // return loading ? (
  //   <View style={loadingStyle}>
  //     <LineSkeleton />
  //   </View>
  // ) : (
  //   <Animated.Text style={{...style}} {...properties}>
  //     {children}
  //   </Animated.Text>
  // );
  return (
    <Text style={{...style}} {...properties}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
