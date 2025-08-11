import React, {useEffect} from 'react';
import Router from './Router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {store} from './store';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {useNotification} from './services/notification';
import * as Sentry from '@sentry/react-native';
import {useDeepLinks} from './utils/handleDeepLinks';
import {Linking} from 'react-native';

Sentry.init({
  dsn: 'https://ade466671fc7475582ade181ffa91d3c@o1258244.ingest.us.sentry.io/6432180',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const App = () => {
  const {navigationFromUrl} = useDeepLinks();

  const {
    onAppBootstrap,
    handleForgroundNotification,
    handleBackgroundNotification,
  } = useNotification();

  useEffect(() => {
    onAppBootstrap();
    const unsubscribeOnMessage = messaging().onMessage(async message => {
      try {
        console.log('FOREGROUND', message);
        handleForgroundNotification(message);
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
    });

    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        if (remoteMessage) {
          handleBackgroundNotification(remoteMessage);
        }
      },
    );

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          handleBackgroundNotification(remoteMessage);
        }
      })
      .catch(error => console.log('error getting initial notif', error));

    const linkingSubscription = Linking.addEventListener('url', event => {
      if (event.url) {
        navigationFromUrl(event.url);
      }
    });
    Linking.getInitialURL().then(async url => {
      if (url) {
        setTimeout(() => {
          navigationFromUrl(url);
        }, 3000);
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeNotificationOpened();
      linkingSubscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <Router />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default Sentry.wrap(App);
