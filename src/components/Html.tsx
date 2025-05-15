import {StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const Html = ({source}: {source: string}) => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');

  const tagsStyles = {
    p: {
      marginBottom: 12,
      color: textColor2,
      fontSize: 16,
      lineHeight: 24,
    },
    h2: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
      color: textColor2,
    },
    strong: {
      fontWeight: '700',
      color: textColor2,
    },
    table: {
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderColor: colorScheme === 'dark' ? '#303030' : '#c2c2c2',
    },
    tbody: {
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ededed',
    },
    tr: {
      flexDirection: 'row',
    },
    td: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: colorScheme === 'dark' ? '#303030' : '#c2c2c2',
      padding: 4,
      fontSize: 14,
      color: textColor2,
    },
  };

  return (
    <RenderHTML
      source={{html: source}}
      contentWidth={width - 48}
      tagsStyles={tagsStyles}
    />
  );
};

export default Html;

const styles = StyleSheet.create({});
