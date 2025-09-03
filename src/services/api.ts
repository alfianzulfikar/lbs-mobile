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
                    title: 'Maaf, Sedang Pemeliharaan Sistem',
                    desc: 'Sedang ada pemeliharaan sistem supaya kenyamanan dan keamanan Anda tetap terjaga.',
                    type: 'maintenance',
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
                title: 'Maaf, Sedang Pemeliharaan Sistem',
                desc: 'Sedang ada pemeliharaan sistem supaya kenyamanan dan keamanan Anda tetap terjaga.',
                type: 'maintenance',
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
            title: 'Koneksi Terputus',
            desc: 'Pastikan Wi-Fi atau data seluler aktif, lalu coba kembali.',
            type: '',
          }),
        );
        throw String(error);
      } else {
        throw error;
      }
    }
  };

  const refreshToken: any = async (callback: (newToken: string) => any) => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
        method: 'post',
      });
      const data = await res.json();
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
      throw error;
    }
  };

  return {apiRequest};
};
