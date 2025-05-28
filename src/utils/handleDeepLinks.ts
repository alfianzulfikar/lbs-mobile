import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import queryString from 'query-string';
import {Linking} from 'react-native';
import {envMode} from '../constants/Env';

export const useDeepLinks = () => {
  const navigation = useNavigation();

  const handleProtectedRoute = async (
    targetRoute: {mainRoute: string; options?: {screen?: string; params: any}},
    accessToken: string,
  ) => {
    if (accessToken) {
      navigation.dispatch(
        StackActions.replace(targetRoute.mainRoute, {
          screen: targetRoute.options?.screen,
          params: targetRoute.options?.params,
        }),
      );
    } else {
      navigation.dispatch(
        StackActions.replace('Auth', {
          screen: 'Login',
          params: {targetRoute},
        }),
      );
    }
  };

  const navigationFromUrl = (url: string, accessToken: string) => {
    const parsedHash = queryString.parseUrl(url);
    const splitUrl = parsedHash.url.split('/');
    const baseURL = splitUrl[2];
    if (splitUrl[3] == 'verify') {
      navigation.dispatch(
        StackActions.replace('Auth', {
          screen: 'AccountVerification',
          params: {token: parsedHash.query.token},
        }),
      );
    } else if (splitUrl[3] == 'reset-password') {
      navigation.dispatch(
        StackActions.replace('Auth', {
          screen: 'ResetPassword',
          params: {token: parsedHash.query.token},
        }),
      );
    } else if (splitUrl[3] == 'detail') {
      handleProtectedRoute(
        {
          mainRoute: 'Order',
          options: {screen: 'BusinessDetail', params: {slug: splitUrl[4]}},
        },
        accessToken,
      );
    } else if (
      baseURL === (envMode === 'dev' ? 'dev.lbs.id' : 'www.lbs.id') &&
      splitUrl[3] == 'digital-signature-verification'
    ) {
      handleProtectedRoute(
        {
          mainRoute: 'Order',
          options: {
            screen: 'DigitalSignature',
            params: {
              token: parsedHash.query.token,
              kode: parsedHash.query.kode,
            },
          },
        },
        accessToken,
      );
    }
    // else if (splitUrl[3] == 'update-phone-number') {
    //   replace('UpdatePhoneNumber', {
    //     originURL: url,
    //     token_email: parsedHash.query.token,
    //   });
    // }
    else {
      navigation.dispatch(StackActions.replace('MainTab'));
    }
  };

  const handleDeepLinks = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    Linking.addEventListener('url', event => {
      if (event.url) {
        navigationFromUrl(event.url, accessToken || '');
      }
    });
    Linking.getInitialURL().then(async url => {
      if (url) {
        navigationFromUrl(url, accessToken || '');
      } else {
        setTimeout(async () => {
          const hasVisitedOnboarding = await AsyncStorage.getItem('onboarding');
          if (accessToken) {
            navigation.dispatch(StackActions.replace('MainTab'));
          } else {
            // if (hasVisitedOnboarding) {
            //   navigation.dispatch(StackActions.replace('Auth'));
            // } else {
            // }
            navigation.dispatch(StackActions.replace('OnBoarding'));
          }
        }, 2000);
      }
    });
  };

  return {handleDeepLinks};
};
