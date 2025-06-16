import {
  ActivityIndicator,
  Alert,
  Image,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import {StaticScreenProps} from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import {useArticle} from '../api/article';
import Badge from '../components/Badge';
import capitalize from '../utils/capitalize';
import {useThemeColor} from '../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Gap from '../components/Gap';
import Html from '../components/Html';
import IconWrapper from '../components/IconWrapper';
import ICShare from '../components/icons/ICShare';
import {Colors, RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

type Props = StaticScreenProps<{
  slug: string;
  category: string;
}>;

const ArticleDetail = ({route}: Props) => {
  const {article, getArticle} = useArticle();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const tint = useThemeColor({}, 'tint');
  let colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `https://www.lbs.id/publication/${route.params.category}/${route.params.slug}`,
        title: 'LBS Urun Dana',
      });
    } catch (error) {
      dispatch(
        setAlert({
          title: 'Gagal',
          desc: 'Silahkan coba lagi',
          type: 'danger',
          showAlert: true,
        }),
      );
    }
  };

  const handleGetArticle = async () => {
    setLoading(true);
    await getArticle(route.params.slug, route.params.category);
    setLoading(false);
  };

  useEffect(() => {
    handleGetArticle();
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      scrollView
      statusBarBackground={backgroundColor}
      overlay={colorScheme === 'dark'}>
      {loading ? (
        <ActivityIndicator color={tint} />
      ) : (
        <>
          <View>
            <View style={{aspectRatio: 402 / 364}}>
              {article.image && (
                <Image
                  source={{uri: article.image}}
                  style={{width: '100%', aspectRatio: 402 / 364}}
                  resizeMode="cover"
                />
              )}
              <LinearGradient
                colors={['transparent', Colors.dark.background]}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 2,
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 3,
                padding: 24,
              }}>
              <Header paddingHorizontal={0} />
              <Gap flex={1} />
              {article.category && (
                <Badge text={capitalize(article.category)} mode="light" />
              )}
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 20,
                  lineHeight: 30,
                  fontWeight: '700',
                  color: Colors.dark.text,
                }}>
                {article.title}
              </Text>
            </View>
          </View>
          <View style={{padding: 24}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.authorContainer,
                  {
                    backgroundColor:
                      RGBAColors(1)[colorScheme === 'dark' ? 'light' : 'dark']
                        .background,
                  },
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.authorImageContainer}>
                    <Image
                      source={require('../assets/images/profile-picture-light.png')}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    style={[
                      styles.authorName,
                      {
                        color:
                          RGBAColors(1)[
                            colorScheme === 'dark' ? 'light' : 'dark'
                          ].text,
                      },
                    ]}>
                    LBS Urun Dana
                  </Text>
                </View>
              </View>
              <Gap width={8} />
              <IconWrapper onPress={handleShare}>
                <ICShare color={textColor2} size={20} />
              </IconWrapper>
            </View>
            <Gap height={24} />
            <Html source={article.body} />
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  authorImageContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
  },
});
