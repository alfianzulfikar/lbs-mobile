import {AppState, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video, {VideoRef} from 'react-native-video';
import {useColorScheme} from '../hooks/useColorScheme';

// const lightVideoSource = require('../assets/videos/light-motion.mp4');
// const darkVideoSource = require('../assets/videos/dark-motion.mp4');

const VideoBackground = () => {
  let colorScheme = useColorScheme();
  // const video = colorScheme === 'dark' ? darkVideoSource : lightVideoSource;
  const videoRef = useRef<VideoRef>(null);
  // const [appState, setAppState] = useState<string>(AppState.currentState);

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState: string) => {
  //     if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //       // Saat aplikasi kembali dari background
  //       videoRef.current?.seek(0); // Restart video jika blank
  //     }
  //     setAppState(nextAppState);
  //   };

  //   const subscription = AppState.addEventListener(
  //     'change',
  //     handleAppStateChange,
  //   );
  //   return () => subscription.remove();
  // }, [appState]);

  return (
    <View style={styles.videoContainer}>
      <Video
        source={
          colorScheme === 'dark'
            ? require('../assets/videos/dark-motion.mp4')
            : require('../assets/videos/light-motion.mp4')
        }
        ref={videoRef}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        disableFocus={true}
        // muted={true}
        // ignoreSilentSwitch="ignore"
        // playInBackground={false}
        // playWhenInactive={false}
      />
    </View>
  );
};

export default VideoBackground;

const styles = StyleSheet.create({
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
});
