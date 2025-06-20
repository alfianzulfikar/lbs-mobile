import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setColorScheme} from '../slices/colorScheme';
import {useDeepLinks} from '../utils/handleDeepLinks';

const Splash = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? 'light';
  const videoRef = useRef<VideoRef>(null);
  const background = require('../assets/videos/splash.mp4');
  const {handleDeepLinks} = useDeepLinks();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Video
        source={background}
        ref={videoRef}
        style={styles.backgroundVideo}
        resizeMode="cover"
        onEnd={async () => {
          await handleDeepLinks();
        }}
        muted={true}
        disableFocus={true}
        // ignoreSilentSwitch="ignore"
        // playInBackground={false}
        // playWhenInactive={false}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    height: '100%',
    // zIndex: 1,
  },
});
