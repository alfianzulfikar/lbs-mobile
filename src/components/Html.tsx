import {StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';
import {RGBAColors} from '../constants/Colors';

const Html = ({source}: {source: string}) => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');

  const tagsStyles = React.useMemo(
    () => ({
      p: {
        marginBottom: 8,
        color: textColor2,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'justify',
      },
      h1: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 16,
        color: textColor2,
        lineHeight: 36,
      },
      h2: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: textColor2,
        lineHeight: 32,
      },
      h3: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        color: textColor2,
        lineHeight: 30,
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
      ol: {
        marginBottom: 16,
        color: textColor2,
        fontSize: 16,
        lineHeight: 24,
      },
      ul: {
        marginBottom: 16,
        color: textColor2,
        fontSize: 16,
        lineHeight: 24,
      },
      img: {
        backgroundColor: RGBAColors(0.8).light.background,
      },
    }),
    [],
  );

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
