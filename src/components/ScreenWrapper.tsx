import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import Gap from './Gap';
import {notchHeight} from '../utils/getNotchHeight';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useColorScheme} from '../hooks/useColorScheme';

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
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background ? backgroundColor : 'transparent',
      }}>
      {statusBar !== false && (
        <StatusBar
          barStyle={
            statusBarStyle || colorScheme === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
          translucent
          backgroundColor={statusBarBackground || 'transparent'}
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{zIndex: 3}}
          keyboardShouldPersistTaps="handled">
          {notch !== false && <Gap height={notchHeight} />}
          {children}
        </ScrollView>
      ) : (
        <View style={{flex: 1, zIndex: 3}}>
          {notch !== false && <Gap height={notchHeight} />}
          {children}
        </View>
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
