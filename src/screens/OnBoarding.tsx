import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  useAnimatedValue,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import BlurOverlay from '../components/BlurOverlay';
import Button from '../components/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bottomHeight, notchHeight} from '../utils/getNotchHeight';

const OnBoarding = () => {
  const navigation = useNavigation();
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
  let colorScheme = useColorScheme();
  const {width, height} = Dimensions.get('window');

  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const slides = [
    {
      id: '1',
      title: 'Ahlan, Sahabat LBS!',
      desc: 'Selamat datang di LBS Urun Dana, teman investasi halal yang siap membantu Anda meraih keberkahan finansial.',
    },
    {
      id: '2',
      title: 'Bebas Riba, Gharar & Dzhalim',
      desc: 'Setiap akad dikurasi ketat Ustadz Dr. Erwandi Tarmizi MA, memastikan  #TransaksiHalalItuDisini.',
    },
    {
      id: '3',
      title: 'Berizin Resmi & Diawasi OJK',
      desc: 'LBS Urun Dana telah memiliki izin resmi dari OJK sebagai Penyelenggara Securities Crowdfunding dengan No: KEP- 22 /D.04/2022.',
    },
    {
      id: '4',
      title: 'Bismillah, Ayo Mulai Sekarang!',
      desc: 'Gabung bersama 10 ribu+ investor lain yang sudah lebih dulu menikmati keberkahannya!',
    },
  ];

  const [visibleSlide, setVisibleSlide] = useState('1');
  const [contentHeight, setContentHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  const onViewRef = useRef(({viewableItems}: {viewableItems: any}) => {
    if (viewableItems.length > 0) {
      setVisibleSlide(viewableItems[0].item.id);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleContentLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const handleButtonLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setButtonHeight(height);
  };

  useEffect(() => {
    AsyncStorage.setItem('onboarding', 'true');
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType={colorScheme === 'dark' ? 'gradient' : 'pattern'}
      scrollView>
      <Gap height={56} />
      <Image
        source={require('../assets/images/onboarding-img.png')}
        resizeMode="cover"
        style={styles.illustration}
      />
      <Gap flex={1} />
      <View style={{}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {slides.map((item, index) => (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: item.id === visibleSlide ? 90 : 16,
                  backgroundColor: RGBAColors(
                    visibleSlide === item.id ? 0.8 : 0.3,
                  ).light.background,
                  marginRight: index !== slides.length - 1 ? 8 : 0,
                },
              ]}
              key={index}></Animated.View>
          ))}
        </View>
        <Gap height={24} />
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
          <View
            style={[
              styles.descContentContainer,
              {paddingTop: 24, paddingBottom: 24},
            ]}>
            {/* <Gap flex={1} /> */}
            <FlatList
              data={slides}
              renderItem={({item}) => (
                <View>
                  <View
                    onLayout={handleContentLayout}
                    style={{
                      width: width,
                      paddingHorizontal: 24,
                    }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={[styles.desc, {color: textColor2}]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
              keyExtractor={item => item.id}
              viewabilityConfig={viewabilityConfig}
              onViewableItemsChanged={onViewRef.current}
            />
            {/* <Gap flex={1} /> */}
            <Gap height={24} />
            <View style={{paddingHorizontal: 24}}>
              <Button
                title="Mulai Investasi"
                onPress={() =>
                  navigation.dispatch(StackActions.replace('Auth'))
                }
              />
            </View>
            {/* <Gap height={24} /> */}
          </View>
        </View>
      </View>

      {/* <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Gap height={56} />
        <Image
          source={require('../assets/images/onboarding-img.png')}
          resizeMode="cover"
          style={styles.illustration}
        />
        <Gap height={48} />
        <Gap flex={1} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {slides.map((item, index) => (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: item.id === visibleSlide ? 90 : 16,
                  backgroundColor: RGBAColors(
                    visibleSlide === item.id ? 0.8 : 0.3,
                  ).light.background,
                  marginRight: index !== slides.length - 1 ? 8 : 0,
                },
              ]}
              key={index}></Animated.View>
          ))}
        </View>
        <Gap height={24} />
        <View
          style={[
            styles.descContainer,
            {
              height: contentHeight + buttonHeight + 40 + 24,
              backgroundColor:
                Platform.OS === 'ios'
                  ? RGBAColors(0.2)[colorScheme].background
                  : RGBAColors(0.7)[colorScheme].background,
            },
          ]}>
          <BlurOverlay />
          <View style={styles.descContentContainer}></View>
        </View>
      </View> */}

      {/* <View style={{zIndex: 2, flexGrow: 1}}>
        <Gap flex={1} />
        <Gap height={40} />
        <View style={{}}>
          <FlatList
            data={slides}
            renderItem={({item}) => (
              <View>
                <View
                  onLayout={handleContentLayout}
                  style={{
                    width: width,
                    paddingHorizontal: 24,
                    // backgroundColor: 'yellow',
                  }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={[styles.desc, {color: textColor2}]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewRef.current}
          />
        </View>
        <View onLayout={handleButtonLayout} style={{paddingHorizontal: 24}}>
          <Gap height={40} />
          <Button
            title="Mulai Investasi"
            onPress={() =>
              navigation.dispatch(StackActions.replace('Auth'))
            }
          />
          <Gap height={24} />
        </View>
      </View> */}
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
    flexGrow: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  descContentContainer: {
    // flex: 1,
    // paddingVertical: 24,
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
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
