import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import React, {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import {useDeepLinks} from '../utils/handleDeepLinks';
import useSecurityCheck from '../hooks/useSecurityCheck';

const Splash = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const videoRef = useRef<VideoRef>(null);
  const background = require('../assets/videos/splash.mp4');
  const {handleDeepLinks} = useDeepLinks();
  const {checkDeviceSecurity} = useSecurityCheck();

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
          const safe = await checkDeviceSecurity();
          if (safe) {
            await handleDeepLinks();
          }
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
