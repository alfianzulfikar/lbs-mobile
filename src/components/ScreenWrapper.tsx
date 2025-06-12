import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {ReactNode, useCallback, useEffect, useRef} from 'react';
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
}) => {
  const {notchHeight} = useInsets();
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const {showAlert} = useSelector((item: RootState) => item.globalError);
  const dispatch = useDispatch();

  const unsubscribeTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: ['transparent', backgroundColor],
    extrapolate: 'clamp',
  });

  // const borderBottomWidth = scrollY.interpolate({
  //   inputRange: [0, 20],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp',
  // });

  // const headerTextColor = scrollY.interpolate({
  //   inputRange: [0, 20],
  //   outputRange: [colors.white, colors.secondary],
  //   extrapolate: 'clamp',
  // });

  useFocusEffect(
    useCallback(() => {
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

  return (
    <View style={{flex: 1, backgroundColor}}>
      {statusBar !== false && (
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor={RGBAColors(0.8)[colorScheme].background}
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
              {notch !== false && <Gap height={notchHeight} />}
              {header && (
                // <Animated.View style={{backgroundColor: headerBackgroundColor}}>
                // </Animated.View>
                <>
                  <Gap height={24} />
                  <Header title={headerTitle || ''} />
                  <Gap height={20} />
                </>
              )}
              <View style={{flex: 1}}>
                <ScrollView
                  // bounces={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}
                  style={{zIndex: 3}}
                  keyboardShouldPersistTaps="handled"
                  refreshControl={
                    onRefresh ? (
                      <RefreshControl
                        refreshing={refreshing || false}
                        onRefresh={onRefresh}
                      />
                    ) : undefined
                  }
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false},
                  )}
                  scrollEventThrottle={16}>
                  {/* {notch !== false && !header && <Gap height={notchHeight} />} */}
                  {children}
                  {/* {notch !== false && <Gap height={bottomHeight} />} */}
                </ScrollView>
              </View>
            </>
          ) : (
            // <View style={{flexGrow: 1}}>
            // </View>
            <View style={{flex: 1, zIndex: 3}}>
              {notch !== false && <Gap height={notchHeight} />}
              {children}
              {/* {notch !== false && <Gap height={bottomHeight} />} */}
            </View>
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
});
