import {
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import {useDeepLinks} from '../utils/handleDeepLinks';
import useSecurityCheck from '../hooks/useSecurityCheck';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import * as Sentry from '@sentry/react-native';
import messaging from '@react-native-firebase/messaging';
import {useNotification} from '../services/notification';

const Splash = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const videoRef = useRef<VideoRef>(null);
  const background = require('../assets/videos/splash.mp4');
  const {checkDeviceSecurity} = useSecurityCheck();
  const {handleInitRoute} = useDeepLinks();
  const {handleBackgroundNotification} = useNotification();

  const handleUpdate = async () => {
    try {
      const inAppUpdates = new SpInAppUpdates(
        false, // isDebug
      );

      await inAppUpdates.checkNeedsUpdate().then(result => {
        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === 'android') {
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          }
          inAppUpdates.startUpdate(updateOptions);
        }
      });
    } catch (error) {
      Sentry.captureException(error);
      console.log('check update error', error);
    }
  };

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
            handleUpdate();
            const initialMessage = await messaging().getInitialNotification();
            if (initialMessage) {
              handleBackgroundNotification(initialMessage);
            } else {
              await handleInitRoute();
            }
          }
        }}
        muted={true}
        disableFocus={true}
        // ignoreSilentSwitch="ignore"
        playInBackground={true}
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
