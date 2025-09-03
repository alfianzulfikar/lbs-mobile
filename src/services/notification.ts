import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {
  FirebaseMessagingTypes,
  getMessaging,
} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace, navigationRef} from './navigation';

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
      .then(res => {})
      .catch(err => {});
  };

  const onAppBootstrap = async () => {
    if (Platform.OS === 'android') {
      await getMessaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken();
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
          params: {screen: 'WaitingPayment', params: {paymentCode: data.value}},
        });
      } else if (data.key === 'Transaction') {
        replace({
          screen: 'MainTab',
          params: {
            screen: 'Transaction',
            params: {
              screen: 'TransactionScreen',
              params: {paymentCode: data.value},
            },
          },
        });
      } else if (data.key === 'PaymentSuccess') {
        replace({screen: 'PaymentSuccess', params: {paymentCode: data.value}});
      } else if (data.key === 'PortfolioDetail') {
        replace({
          screen: 'Portfolio',
          params: {
            screen: 'PortfolioDetail',
            params: {slug: data.value, openDisclosure: true},
          },
        });
      } else if (data.key === 'BusinessDiscussion') {
        replace({
          screen: 'Order',
          params: {
            screen: 'BusinessDetail',
            params: {slug: data.value, openDiscussion: true},
          },
        });
      } else {
        replace({screen: 'MainTab', params: {screen: 'Home'}});
      }
    } else {
      replace({screen: 'MainTab', params: {screen: 'Home'}});
    }
  };

  const handleForgroundNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    try {
      const currentRoute =
        navigationRef?.current?.getCurrentRoute()?.name || '';
      const data = remoteMessage?.data;
      if (
        data &&
        data.key === 'PaymentSuccess' &&
        currentRoute === 'WaitingPayment'
      ) {
        replace({screen: 'PaymentSuccess', params: {paymentCode: data.value}});
      }
    } catch {}
  };

  return {
    createChannel,
    onAppBootstrap,
    requestNotificationPermission,
    handleBackgroundNotification,
    handleForgroundNotification,
  };
};
