import {
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
import React, {ReactNode} from 'react';
import Gap from './Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useColorScheme} from '../hooks/useColorScheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInsets} from '../hooks/useInsets';

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
}) => {
  const {notchHeight} = useInsets();
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: background ? backgroundColor : 'transparent',
        }}>
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
        {scrollView ? (
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
            }>
            {notch !== false && <Gap height={notchHeight} />}
            {children}
            {/* {notch !== false && <Gap height={bottomHeight} />} */}
          </ScrollView>
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
