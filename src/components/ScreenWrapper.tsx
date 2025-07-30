import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Gap from './Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import {useInsets} from '../hooks/useInsets';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setShowAlert} from '../slices/globalError';
import CustomAlert from './CustomAlert';
import {useFocusEffect} from '@react-navigation/native';
import Header from './Header';
import HelpButton from './HelpButton';

const ScreenWrapper = ({
  children,
  background,
  backgroundType,
  scrollView,
  statusBarStyle,
  statusBar,
  overlay,
  notch,
  statusBarBackground,
  refreshing,
  onRefresh,
  header,
  headerTitle,
  customHeader,
  childScrollY,
  footer,
  bounces,
  helpButton,
  bottomTab,
}: {
  children: ReactNode;
  background?: boolean;
  backgroundType?: 'gradient' | 'default' | 'pattern';
  scrollView?: boolean;
  statusBarStyle?: string;
  statusBar?: boolean;
  overlay?: boolean;
  notch?: boolean;
  statusBarBackground?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  header?: ReactNode;
  headerTitle?: string;
  customHeader?: ReactNode;
  childScrollY?: Animated.Value;
  footer?: ReactNode;
  bounces?: boolean;
  helpButton?: boolean;
  bottomTab?: boolean;
}) => {
  const {notchHeight} = useInsets();
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const {showAlert} = useSelector((item: RootState) => item.globalError);
  const dispatch = useDispatch();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const unsubscribeTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollY = childScrollY || useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [RGBAColors(0)[colorScheme].background, backgroundColor],
    extrapolate: 'clamp',
  });

  const borderBottomWidth = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const buttonAnim = useRef(new Animated.Value(-24)).current;
  const lastScrollY = useRef(0);
  const isButtonVisible = useRef(true);

  // const headerTextColor = scrollY.interpolate({
  //   inputRange: [0, 20],
  //   outputRange: [colors.white, colors.secondary],
  //   extrapolate: 'clamp',
  // });

  useFocusEffect(
    useCallback(() => {
      Animated.timing(buttonAnim, {
        toValue: -24,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return () => {
        dispatch(setShowAlert(false));
      };
    }, []),
  );

  // useEffect(() => {
  //   if (showAlert === true) {
  //     if (unsubscribeTimeout.current) {
  //       clearTimeout(unsubscribeTimeout.current);
  //       unsubscribeTimeout.current = null;
  //     }
  //     unsubscribeTimeout.current = setTimeout(() => {
  //       dispatch(setShowAlert(false));
  //     }, 5000);
  //   } else {
  //     if (unsubscribeTimeout.current) {
  //       clearTimeout(unsubscribeTimeout.current);
  //       unsubscribeTimeout.current = null;
  //     }
  //   }
  // }, [showAlert]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    // cleanup listener on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor}}>
      {statusBar !== false && (
        <StatusBar
          barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
          translucent
          backgroundColor="transparent"
        />
      )}
      {background &&
        (backgroundType === 'gradient' || backgroundType === 'pattern') && (
          <ImageBackground
            source={
              colorScheme === 'dark'
                ? backgroundType === 'gradient'
                  ? require('../assets/images/bg-dark-2.jpg')
                  : require('../assets/images/bg-dark.jpg')
                : backgroundType === 'gradient'
                ? require('../assets/images/bg-light-2.jpg')
                : require('../assets/images/bg-light.jpg')
            }
            resizeMode="cover"
            style={[styles.imageBackground, {zIndex: 1}]}
          />
        )}
      {overlay && (
        <View
          style={[
            styles.imageBackground,
            {
              backgroundColor: RGBAColors(0.6)[colorScheme].background,
              zIndex: 2,
            },
          ]}></View>
      )}
      <KeyboardAvoidingView
        style={{flex: 1, zIndex: 3}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            flexGrow: 1,
          }}>
          {scrollView ? (
            <>
              {!header && notch !== false && Platform.OS === 'ios' && (
                <Gap height={notchHeight} />
              )}
              {header && (
                <Animated.View
                  style={{
                    backgroundColor: headerBackgroundColor,
                    borderBottomWidth,
                    borderColor: RGBAColors(0.05)[colorScheme].text,
                  }}>
                  {notch !== false && Platform.OS === 'ios' && (
                    <Gap height={notchHeight} />
                  )}
                  <>
                    <Gap height={24} />
                    {customHeader || <Header title={headerTitle || ''} />}
                    <Gap height={20} />
                  </>
                </Animated.View>
              )}
              <View style={{flex: 1}}>
                <ScrollView
                  bounces={bounces === false ? false : true}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}
                  style={{zIndex: 3}}
                  keyboardShouldPersistTaps="handled"
                  refreshControl={
                    onRefresh ? (
                      <RefreshControl
                        refreshing={refreshing || false}
                        onRefresh={onRefresh}
                        tintColor={tint}
                      />
                    ) : undefined
                  }
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {
                      useNativeDriver: false,
                      listener: event => {
                        const currentY = event.nativeEvent?.contentOffset.y;

                        if (
                          currentY > 0 &&
                          currentY > lastScrollY.current + 5 &&
                          isButtonVisible.current
                        ) {
                          Animated.timing(buttonAnim, {
                            toValue: 56,
                            duration: 200,
                            useNativeDriver: true,
                          }).start();
                          isButtonVisible.current = false;
                        } else if (
                          currentY < lastScrollY.current - 5 &&
                          !isButtonVisible.current
                        ) {
                          Animated.timing(buttonAnim, {
                            toValue: -24,
                            duration: 200,
                            useNativeDriver: true,
                          }).start();
                          isButtonVisible.current = true;
                        }

                        lastScrollY.current = currentY;
                      },
                    },
                  )}
                  scrollEventThrottle={16}>
                  {/* {notch !== false && !header && Platform.OS === 'ios' && (
                    <Gap height={notchHeight} />
                  )} */}
                  {/* {refreshing && Platform.OS == 'ios' && (
                    <ActivityIndicator color={tint} />
                  )} */}
                  {children}
                </ScrollView>
              </View>

              {footer}

              {helpButton && (
                <Animated.View
                  style={[
                    styles.helpButtonContainer,
                    {
                      transform: [{translateX: buttonAnim}],
                      bottom: bottomTab ? 104 : 24,
                    },
                  ]}>
                  <HelpButton />
                </Animated.View>
              )}
            </>
          ) : (
            <View style={{flex: 1, zIndex: 3}}>
              {!header && notch !== false && <Gap height={notchHeight} />}
              {header && (
                <Animated.View
                  style={{
                    backgroundColor: headerBackgroundColor,
                    borderBottomWidth,
                    borderColor: RGBAColors(0.05)[colorScheme].text,
                  }}>
                  {notch !== false && Platform.OS === 'ios' && (
                    <Gap height={notchHeight} />
                  )}
                  <>
                    <Gap height={24} />
                    {customHeader || <Header title={headerTitle || ''} />}
                    <Gap height={20} />
                  </>
                </Animated.View>
              )}
              {children}

              {helpButton && (
                <Animated.View
                  style={[
                    styles.helpButtonContainer,
                    {
                      transform: [{translateX: buttonAnim}],
                      bottom: bottomTab ? 104 : 24,
                    },
                  ]}>
                  <HelpButton />
                </Animated.View>
              )}
            </View>
          )}
          {isKeyboardVisible && Platform.OS === 'android' && (
            <Gap height={24} />
          )}
        </View>
      </KeyboardAvoidingView>
      {showAlert && (
        <CustomAlert onClose={() => dispatch(setShowAlert(false))} />
      )}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  helpButtonContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 3,
  },
});
