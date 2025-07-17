import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {
  FirebaseMessagingTypes,
  getMessaging,
} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace} from './navigation';

export const useNotification = () => {
  const createChannel = async () => {
    await notifee
      .createChannel({
        id: 'main-channel',
        name: 'Main Notification Channel',
        lights: false,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'lbs',
      })
      .then(res => console.log('create channel success', res))
      .catch(err => console.log('create channel error', err));
  };

  const onAppBootstrap = async () => {
    if (Platform.OS === 'android') {
      await getMessaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken();
    console.log('token fcm', token);
    await AsyncStorage.setItem('fcm_token', token);
  };

  const requestNotificationPermission = async () => {
    let androidPermission;
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      androidPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    let notificationState = false;
    if (
      enabled ||
      (Platform.OS === 'android' &&
        enabled &&
        androidPermission === PermissionsAndroid.RESULTS.GRANTED)
    ) {
      notificationState = true;
    }

    return notificationState;
  };

  const handleBackgroundNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const data = remoteMessage?.data;
    console.log(
      'Notification caused app to open from quit state:',
      remoteMessage,
    );
    if (data) {
      if (data.key === 'Account') {
        replace({screen: 'MainTab', params: {screen: 'AccountScreen'}});
      } else if (data?.BusinessDetail) {
        replace({
          screen: 'Order',
          params: {
            screen: 'BusinessDetail',
            params: {slug: data?.BusinessDetail},
          },
        });
      } else if (data.key === 'WaitingPayment') {
        replace({
          screen: 'Order',
          params: {screen: 'WaitingPayment', params: {code: data.value}},
        });
      } else if (data.key === 'PaymentSuccess' || data.key === 'Transaction') {
        replace({screen: 'Transaction'});
      } else {
        replace({screen: 'MainTab', params: {screen: 'Home'}});
      }
    } else {
      replace({screen: 'MainTab', params: {screen: 'Home'}});
    }
  };

  const handleForgroundNotification = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    // const currentRoute = navigation.getId();
    console.log('handleForgroundNotification', message);
    // await notifee.displayNotification({
    //   title: message.notification?.title || 'LBS Urun Dana',
    //   body: message.notification?.body || 'Notifikasi baru dari LBS Urun Dana',
    //   android: {
    //     channelId: 'main-channel',
    //     // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // });
    // const route = currentRoute();
    // console.log('current route', route);
    // let accessToken = await AsyncStorage.getItem('access_token');
    // if (accessToken) {
    //   if (route.name == 'ConfirmPayment') {
    //     if (message.data?.screen) {
    //       if (message.data?.screen == 'SuccessPayment') {
    //         replace('MainRoute', {
    //           screen: 'Beranda',
    //           params: {
    //             screen: 'SuccessPayment',
    //             params: {
    //               kode: message.data?.params,
    //             },
    //           },
    //         });
    //       }
    //     }
    //   }
    // }
  };

  return {
    createChannel,
    onAppBootstrap,
    requestNotificationPermission,
    handleBackgroundNotification,
    handleForgroundNotification,
  };
};
