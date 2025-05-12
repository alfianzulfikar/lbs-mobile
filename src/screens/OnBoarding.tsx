import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import BlurOverlay from '../components/BlurOverlay';
import Button from '../components/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {
  const navigation = useNavigation();
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
  let colorScheme = useColorScheme();
  const {width, height} = Dimensions.get('window');

  const slides = [
    {
      id: '1',
      title: 'Title Onboarding Ini Kalau Bisa Max 2 Baris',
      desc: 'Description text yang ada di sini konteksnya disesuaikan dengan Title. Tapi kalau bisa antara 2 sampai 3 baris',
    },
    {
      id: '2',
      title: 'Title Onboarding Ini Kalau Bisa Max 2 Baris',
      desc: 'Description text yang ada di sini konteksnya disesuaikan dengan Title. Tapi kalau bisa antara 2 sampai 3 baris',
    },
    {
      id: '3',
      title: 'Title Onboarding Ini Kalau Bisa Max 2 Baris',
      desc: 'Description text yang ada di sini konteksnya disesuaikan dengan Title. Tapi kalau bisa antara 2 sampai 3 baris',
    },
  ];

  // const initTheme = async () => {
  //   const theme = await AsyncStorage.getItem('theme');
  //   if (!theme) {
  //     await AsyncStorage.setItem(
  //       'theme',
  //       colorScheme === 'dark' ? 'dark' : 'light',
  //     );
  //   }
  // };

  // useEffect(() => {
  //   initTheme();
  // }, []);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}>
      <Gap height={56} />
      {/* <View style={styles.illustration}></View> */}
      <Image
        source={require('../assets/images/onboarding-img.png')}
        resizeMode="cover"
        style={styles.illustration}
      />
      <Gap height={48} />
      <View
        style={[
          styles.descContainer,
          {
            backgroundColor:
              Platform.OS === 'ios'
                ? RGBAColors(0.2)[colorScheme].background
                : RGBAColors(0.7)[colorScheme].background,
          },
        ]}>
        <BlurOverlay />
        <View style={styles.descContentContainer}>
          <FlatList
            data={slides}
            renderItem={() => (
              <View style={{width: width - 48}}>
                <Text style={styles.title}>
                  Title Onboarding Ini Kalau Bisa Max 2 Baris
                </Text>
                <Text style={[styles.desc, {color: textColor2}]}>
                  Description text yang ada di sini konteksnya disesuaikan
                  dengan Title. Tapi kalau bisa antara 2 sampai 3 baris
                </Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id}
          />
          <Gap height={48} />
          <Button
            title="Mulai Investasi"
            onPress={() =>
              navigation.dispatch(StackActions.replace('AuthStack'))
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  illustration: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  descContainer: {
    overflow: 'hidden',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  descContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBlock: 40,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 16,
  },
});
