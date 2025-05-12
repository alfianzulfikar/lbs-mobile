import {Alert, Platform, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Text from './Text';
import {Colors, RGBAColors} from '../constants/Colors';
import Gap from './Gap';
import {BlurView} from '@react-native-community/blur';
import BlurOverlay from './BlurOverlay';
import {HomeMenuScreenType} from '../constants/Types';
import {useColorScheme} from '../hooks/useColorScheme';

const darkPortfolioIconSource = require('../assets/animations/dark-pie-chart.json');
const lightPortfolioIconSource = require('../assets/animations/light-pie-chart.json');
const darkMarketIconSource = require('../assets/animations/dark-candle-stick.json');
const lightMarketIconSource = require('../assets/animations/light-candle-stick.json');
const darkFaqIconSource = require('../assets/animations/dark-faq.json');
const lightFaqIconSource = require('../assets/animations/light-faq.json');
const lightGuideIconSource = require('../assets/animations/light-guide-book.json');
const darkGuideIconSource = require('../assets/animations/dark-guide-book.json');

const HomeMenu = ({
  id,
  label,
  to,
}: {
  id: number;
  label: string;
  to: HomeMenuScreenType;
}) => {
  let colorScheme = useColorScheme();
  const animation = useRef<LottieView>(null);
  const navigation = useNavigation();

  const portfolioIcon =
    colorScheme === 'dark' ? darkPortfolioIconSource : lightPortfolioIconSource;
  const marketIcon =
    colorScheme === 'dark' ? darkMarketIconSource : lightMarketIconSource;
  const faqIcon =
    colorScheme === 'dark' ? darkFaqIconSource : lightFaqIconSource;
  const guideIcon =
    colorScheme === 'dark' ? darkGuideIconSource : lightGuideIconSource;

  useFocusEffect(
    useCallback(() => {
      animation.current?.play();

      return () => {};
    }, []),
  );
  return (
    <Pressable
      style={{alignItems: 'center'}}
      onPress={() => {
        if (to) {
          navigation.navigate(to);
        } else {
          Alert.alert('Maaf, fitur belum tersedia.');
        }
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              Platform.OS === 'ios'
                ? RGBAColors(0.2)['light'].background
                : RGBAColors(0.2)['light'].background,
          },
        ]}>
        {Platform.OS === 'ios' && <BlurOverlay blurAmount={10} />}
        <View style={styles.menuItem}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'transparent',
            }}
            source={
              id === 1
                ? portfolioIcon
                : id === 2
                ? marketIcon
                : id === 3
                ? faqIcon
                : guideIcon
            }
            loop={false}
          />
        </View>
      </View>
      <Gap height={16} />
      <Text style={[styles.label, {color: Colors[colorScheme].text}]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default HomeMenu;

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 20,
    overflow: 'hidden',
  },
  blurView: {
    width: 64,
    height: 64,
    zIndex: 1,
    position: 'absolute',
  },
  menuItem: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
  },
});
