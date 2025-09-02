import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';
import {RGBAColors} from '../constants/Colors';
import queryString from 'query-string';
import {useDispatch} from 'react-redux';
import {setArticle} from '../slices/article';
import WebView from 'react-native-webview';

const Html = ({
  source,
  textAlign,
  isWebView,
  addSection,
}: {
  source: string;
  textAlign?: 'justify' | 'left';
  isWebView?: boolean;
  addSection?: string;
}) => {
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
        textAlign: textAlign || 'justify',
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

  const defaultStyles = `
    * {
      color: ${colorScheme === 'dark' ? '#CCCCCC' : '#444444'};
      border-box: box-sizing;
    }
    body {
      padding: 0 16px;
    }
    img {
      background: #F5F5F5;
      width: 100% !important;
      height: 100% !important;
      margin: 0;
      padding: 0;
    }
    table {
      background-color: ${
        colorScheme === 'dark' ? '#242424' : '#F5F5F5'
      } !important;
      border: 1px solid #CCCCCC !important;
    }
    th, td {
      color: ${colorScheme === 'dark' ? '#E0E0E0' : '#000000'} !important;
      border: 1px solid ${
        colorScheme === 'dark' ? '#CCCCCC' : '#444444'
      } !important;
      padding: 0 8px;
    }
    iframe {
      width: 100% !important;
    }
    p {
      margin: 0;
      margin-bottom: 8px;
    }
    .business-highlight-item {
      margin-bottom: 18px;
    }
    .business-highlight-label {
      font-size: 16px;
    }
    .business-highlight-value {
      font-size: 18px;
      font-weight: 600;
    }
  `;

  const newHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${defaultStyles}
      </style>
    </head>
    <body>
      ${source}
      ${addSection || ''}
    </body>
    </html>
  `;

  return isWebView ? (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: newHtml,
        }}
        style={{flex: 1, backgroundColor: 'transparent'}}
        scalesPageToFit={true}
        onShouldStartLoadWithRequest={request => {
          if (!request.url.includes('lbs.id')) {
            Linking.openURL(request.url);
          }
          return false;
        }}
      />
    </View>
  ) : (
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
