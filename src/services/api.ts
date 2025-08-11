// import AsyncStorage from "@react-native-async-storage/async-storage";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {envMode} from '../constants/Env';
import {Alert} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAlert,
  setShowAlert,
  setShowNetworkError,
} from '../slices/globalError';
import {RootState} from '../store';

const API_BASE_URL =
  envMode === 'prod' ? 'https://uda-api.lbs.id' : 'https://dev-api.lbs.id';

export const useAPI = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {showAlert} = useSelector((item: RootState) => item.globalError);

  const apiRequest = async ({
    endpoint,
    baseUrl,
    method,
    body,
    authorization,
    headers,
    responseType,
    url,
  }: {
    endpoint?: string;
    baseUrl?: string;
    method?: string;
    body?: any;
    authorization?: boolean;
    headers?: any;
    responseType?: 'blob' | 'json';
    url?: string;
  }) => {
    if (showAlert) {
      dispatch(setShowAlert(false));
    }
    const accessToken = await AsyncStorage.getItem('access_token');
    const composedUrl = url || `${baseUrl || API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...(authorization ? {Authorization: `Bearer ${accessToken}`} : {}),
    };

    const options = {
      method: method || 'get',
      headers: defaultHeaders,
      ...(body ? {body: JSON.stringify(body)} : {}),
    };

    try {
      const response = await fetch(composedUrl, options);
      const contentType = response.headers.get('content-type');
      if (
        contentType &&
        (contentType.includes('application/json') ||
          contentType.includes('application/pdf'))
      ) {
        let data;
        if (responseType === 'blob') {
          data = await response.blob();
        } else {
          data = await response.json();
        }

        console.log('status', response?.status, method || 'get', response.url);

        if (!response.ok) {
          if (response.status === 401) {
            return await refreshToken(async (newToken: string) => {
              const params = {
                method,
                baseUrl,
                endpoint,
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newToken}`,
                },
                body,
                responseType,
                url,
              };
              return await apiRequest(params);
            });
          } else {
            if (response.status === 429) {
              if (endpoint?.includes('verify-register')) {
                dispatch(
                  setAlert({
                    title:
                      'Permintaan OTP baru bisa dilakukan setelah 3 menit. Mohon coba lagi nanti.',
                    desc: '',
                    type: 'danger',
                    showAlert: true,
                  }),
                );
              } else {
                dispatch(
                  setAlert({
                    title: 'Terlalu banyak percobaan',
                    desc: '',
                    type: 'danger',
                    showAlert: true,
                  }),
                );
              }
            } else if (
              response.status &&
              String(response.status).charAt(0) === '5'
            ) {
              if (response.status === 502) {
                dispatch(
                  setShowNetworkError({
                    showNetworkError: true,
                    title: 'Maaf, sistem sedang dalam pemeliharaan',
                    desc: 'Demi meningkatkan kenyamanan dan keamanan dalam bertransaksi, saat ini sistem sedang dalam pemeliharaan. Mohon kembali lagi nanti.',
                  }),
                );
              } else {
                dispatch(
                  setAlert({
                    title: 'Terjadi kesalahan pada server',
                    desc: '',
                    type: 'danger',
                    showAlert: true,
                  }),
                );
              }
            }
            throw data
              ? {data, status: response.status}
              : new Error(
                  data.message || `HTTP error! Status: ${response.status}`,
                );
          }
        }
        return data;
      } else {
        if (response.status && String(response.status).charAt(0) === '5') {
          if (response.status === 502) {
            dispatch(
              setShowNetworkError({
                showNetworkError: true,
                title: 'Maaf, sistem sedang dalam pemeliharaan',
                desc: 'Demi meningkatkan kenyamanan dan keamanan dalam bertransaksi, saat ini sistem sedang dalam pemeliharaan. Mohon kembali lagi nanti.',
              }),
            );
          } else {
            dispatch(
              setAlert({
                title: 'Terjadi kesalahan pada server',
                desc: '',
                type: 'danger',
                showAlert: true,
              }),
            );
          }
        }
        console.log('status', response?.status, method || 'get', response.url);
        throw {
          method: method || 'get',
          url: composedUrl,
          message: 'Http response is invalid',
        };
      }
    } catch (error) {
      if (error instanceof TypeError) {
        dispatch(
          setShowNetworkError({
            showNetworkError: true,
            title: 'Koneksi Anda Terputus',
            desc: 'Aplikasi tidak dapat mengakses internet. Silakan periksa jaringan Wi-Fi atau data seluler Anda, dan coba beberapa saat lagi.',
          }),
        );
        console.log('fetch error type error', String(error));
        throw String(error);
      } else {
        console.log('fetch error not type error', error);
        throw error;
      }
    }
  };

  const refreshToken: any = async (callback: (newToken: string) => any) => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');
      console.log('token in refresh token', refreshToken, accessToken);
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
        method: 'post',
      });
      const data = await res.json();
      console.log('refreshToken', res.status, data);
      if (!res.ok) {
        if (res.status === 401) {
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            }),
          );
          throw data;
        } else {
          throw data;
        }
      }
      if (data.access_token) {
        await AsyncStorage.setItem('access_token', data.access_token);
        return await callback(data.access_token);
      }
      return;
    } catch (error) {
      console.log('refreshToken error', error);
      throw error;
    }
  };

  return {apiRequest};
};

// export const apiRequest = async (
//   endpoint: string,
//   method: string | undefined = 'GET',
//   body: any = undefined,
//   headers = {},
// ) => {
//   const url = `${API_BASE_URL}${endpoint}`;
//   const defaultHeaders = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     ...headers,
//   };

//   const options = {
//     method,
//     headers: defaultHeaders,
//     ...(body ? {body: JSON.stringify(body)} : {}),
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (!response.ok) {
//       if (response.status === 401) {
//         return await refreshToken((newToken: string) =>
//           apiRequest(endpoint, method, body, {
//             ...headers,
//             Authorization: `Bearer ${newToken}`,
//           }),
//         );
//       } else {
//         if (response.status === 429) {
//           Alert.alert('Terlalu banyak percobaan');
//         }
//         throw data
//           ? {data, status: response.status}
//           : new Error(data.message || `HTTP error! Status: ${response.status}`);
//       }
//     }
//     return data;
//   } catch (error: any) {
//     console.log('fetch error', error);
//     throw error;
//   }
// };

// export const apiRequest2 = async ({
//   endpoint,
//   baseUrl,
//   method,
//   body,
//   authorization,
//   headers,
//   responseType,
// }: {
//   endpoint: string;
//   baseUrl?: string;
//   method?: string;
//   body?: any;
//   authorization?: boolean;
//   headers?: any;
//   responseType?: 'blob' | 'json';
// }) => {
//   const accessToken = await AsyncStorage.getItem('access_token');
//   const url = `${baseUrl || API_BASE_URL}${endpoint}`;
//   const defaultHeaders = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     // method: method || 'get',
//     ...headers,
//     ...(authorization ? {Authorization: `Bearer ${accessToken}`} : {}),
//   };

//   const options = {
//     method: method || 'get',
//     headers: defaultHeaders,
//     ...(body ? {body: JSON.stringify(body)} : {}),
//   };

//   try {
//     const response = await fetch(url, options);
//     let data;
//     if (responseType === 'blob') {
//       data = await response.blob();
//     } else {
//       data = await response.json();
//     }

//     console.log('status', response?.status, response.url);

//     if (!response.ok) {
//       if (response.status === 401) {
//         // throw data
//         return await refreshToken((newToken: string) =>
//           apiRequest(endpoint, method, body, {
//             ...headers,
//             Authorization: `Bearer ${newToken}`,
//           }),
//         );
//       } else {
//         throw data
//           ? {data, status: response.status}
//           : new Error(data.message || `HTTP error! Status: ${response.status}`);
//       }
//     }
//     return data;
//   } catch (error: any) {
//     console.log('fetch error', error);
//     throw error;
//   }
// };

// const refreshToken: any = async (callback: (newToken: string) => any) => {
//   try {
//     const refreshToken = await AsyncStorage.getItem('refresh_token');
//     console.log('refresh', refreshToken);
//     const res = await apiRequest('/auth/refresh', 'post', null, {
//       Authorization: `Bearer ${refreshToken}`,
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       console.log('refreshToken try error', data);
//       if (res.status === 401) {
//         // await AsyncStorage.removeItem('access_token');
//         // await AsyncStorage.removeItem('refresh_token');
//         // navigation.dispatch(StackActions.replace('Auth'));
//         // replace('Auth');
//         return;
//       } else {
//         throw data;
//       }
//     }
//     console.log('refreshToken success', data);
//     if (data.access_token) {
//       await AsyncStorage.setItem('access_token', data.access_token);
//       return await callback(data.access_token);
//     }
//     return;
//   } catch (error) {
//     console.log('refreshToken error', error);
//     throw error;
//   }
// };
