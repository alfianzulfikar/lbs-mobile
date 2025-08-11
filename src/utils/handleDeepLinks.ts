import AsyncStorage from '@react-native-async-storage/async-storage';
import queryString from 'query-string';
import {envMode} from '../constants/Env';
import {jwtDecode} from 'jwt-decode';
import {replace} from '../services/navigation';

export const useDeepLinks = () => {
  const handleProtectedRoute = async (
    targetRoute: {mainRoute: string; options?: {screen?: string; params?: any}},
    accessToken?: string | null,
  ) => {
    if (accessToken) {
      replace({
        screen: targetRoute.mainRoute || '',
        params: targetRoute.options,
      });
    } else {
      replace({
        screen: 'Login',
        params: {targetRoute},
      });
    }
  };

  const navigationFromUrl = async (url: string) => {
    const accessToken = await AsyncStorage.getItem('access_token');
    const parsedHash = queryString.parseUrl(url);
    const splitUrl = parsedHash.url.split('/');
    const baseURL = splitUrl[2];
    const token: string =
      typeof parsedHash?.query?.token === 'string'
        ? parsedHash?.query?.token || ''
        : '';
    if (splitUrl[3] == 'verify') {
      if (token) {
        const decode: {exp?: number} = jwtDecode(token, {header: true});
        if ((decode.exp || 0) < Date.now() / 1000) {
          replace({
            screen: 'Auth',
            params: {
              screen: 'AccountVerificationExpired',
            },
          });
        } else {
          replace({
            screen: 'Auth',
            params: {
              screen: 'AccountVerification',
              params: {token: parsedHash.query.token},
            },
          });
        }
      } else {
        replace({
          screen: 'Auth',
          params: {
            screen: 'AccountVerificationExpired',
          },
        });
      }
    } else if (splitUrl.length > 6 && splitUrl[5] == 'reset-password') {
      replace({
        screen: 'Auth',
        params: {
          screen: 'ResetPassword',
          params: {token: splitUrl[6]},
        },
      });
    } else if (splitUrl[3] == 'reset-password') {
      replace({
        screen: 'Auth',
        params: {
          screen: 'ResetPassword',
          params: {token},
        },
      });
    } else if (splitUrl[3] == 'detail') {
      handleProtectedRoute(
        {
          mainRoute: 'Order',
          options: {screen: 'BusinessDetail', params: {slug: splitUrl[4]}},
        },
        accessToken,
      );
    } else if (splitUrl[3] == 'publication') {
      handleProtectedRoute(
        {
          mainRoute: 'Article',
          options: {
            screen: 'ArticleDetail',
            params: {category: splitUrl[4], slug: splitUrl[5]},
          },
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
      handleProtectedRoute(
        {
          mainRoute: 'MainTab',
          options: {
            screen: 'Home',
          },
        },
        accessToken,
      );
    }
  };

  const handleInitRoute = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    const hasVisitedOnboarding = await AsyncStorage.getItem('onboarding');
    if (accessToken) {
      replace({screen: 'MainTab'});
    } else {
      if (hasVisitedOnboarding) {
        replace({screen: 'Auth'});
      } else {
        replace({screen: 'OnBoarding'});
      }
    }
  };

  return {handleInitRoute, navigationFromUrl};
};
