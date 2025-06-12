import React, {useEffect} from 'react';
import Router from './Router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {store} from './store';
import {Provider} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useNotification} from './services/notification';
import NetworkErrorBottomSheet from './components/NetworkErrorBottomSheet';

const App = () => {
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

    return () => {
      unsubscribeOnMessage();
      unsubscribeNotificationOpened();
    };
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            {Platform.OS === 'ios' ? (
              <Router />
            ) : (
              <SafeAreaView style={{flex: 1}} edges={['bottom']}>
                <Router />
              </SafeAreaView>
            )}
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
