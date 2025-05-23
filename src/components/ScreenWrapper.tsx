import {
  ImageBackground,
  RefreshControl,
  // SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import Gap from './Gap';
import {notchHeight, bottomHeight} from '../utils/getNotchHeight';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useColorScheme} from '../hooks/useColorScheme';
import {SafeAreaView} from 'react-native-safe-area-context';

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
          // translucent={false}
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
        <View style={{flex: 1}}>
          <ScrollView
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
        </View>
      ) : (
        <View style={{flex: 1, zIndex: 3}}>
          {notch !== false && <Gap height={notchHeight} />}
          {children}
          {/* {notch !== false && <Gap height={bottomHeight} />} */}
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
