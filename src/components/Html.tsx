import {Linking, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';
import {RGBAColors} from '../constants/Colors';
import queryString from 'query-string';
import {useDispatch} from 'react-redux';
import {setArticle} from '../slices/article';

const Html = ({source}: {source: string}) => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const dispatch = useDispatch();

  const tagsStyles = React.useMemo(
    () => ({
      p: {
        marginBottom: 8,
        color: textColor2,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
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
      a: {
        textDecorationLine: 'underline',
      },
    }),
    [],
  );

  return (
    <RenderHTML
      source={{html: source}}
      contentWidth={width - 48}
      tagsStyles={tagsStyles}
      renderersProps={{
        a: {
          onPress: (event, href) => {
            if (href.startsWith('https://www.lbs.id/publication')) {
              const parsedHash = queryString.parseUrl(href);
              const splitUrl = parsedHash.url.split('/');
              dispatch(setArticle({slug: splitUrl[5], category: splitUrl[4]}));
            } else {
              Linking.openURL(href); // fallback: buka browser
            }
          },
        },
      }}
    />
  );
};

export default Html;

const styles = StyleSheet.create({});
