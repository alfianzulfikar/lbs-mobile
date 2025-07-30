import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import getFileNameFromUrl from './getFileNameFromUrl';
import {useAPI} from '../services/api';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

export const useDownload = () => {
  const {apiRequest} = useAPI();
  const {fs} = RNFetchBlob;
  const dispatch = useDispatch();

  const findPath = async (path: string) => {
    const {fs} = RNFetchBlob;
    const fileExists = await fs.exists(path);
    return fileExists;
  };

  async function getBlobData(fileUrl: string) {
    try {
      const res = await apiRequest({
        url: fileUrl,
        authorization: true,
        headers: {
          'Content-Type': 'application/pdf',
        },
        responseType: 'blob',
      });
      return res;
    } catch (error) {
      console.log('getBlobData', error);
      return null;
    }
  }

  const writeBlobFile = async ({
    fileUrl,
    path,
  }: {
    fileUrl: string;
    path: string;
  }) => {
    const blobData = await getBlobData(fileUrl);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data =
        typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
      fs.writeFile(path, base64Data, 'base64')
        .then(() => {
          if (Platform.OS === 'android') {
            RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
          } else if (Platform.OS === 'ios') {
            setTimeout(() => {
              RNFetchBlob.ios.previewDocument(path);
            }, 300);
          }
          dispatch(
            setAlert({
              title: 'File berhasil dimuat',
              desc: '',
              type: 'success',
              showAlert: true,
            }),
          );
        })
        .catch(() => {
          dispatch(
            setAlert({
              title: 'File gagal dimuat',
              desc: '',
              type: 'danger',
              showAlert: true,
            }),
          );
        });
    };

    reader.readAsDataURL(blobData);
  };

  const downloadDirectly = async ({
    fileUrl,
    path,
  }: {
    fileUrl: string;
    path: string;
  }) => {
    const config = {
      path: path,
      fileCache: true,
    };
    await RNFetchBlob.config(config || {})
      .fetch('GET', fileUrl)
      .then(res => {
        if (Platform.OS === 'android') {
          RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
        } else if (Platform.OS === 'ios') {
          setTimeout(() => {
            RNFetchBlob.ios.previewDocument(path);
          }, 300);
        }
        dispatch(
          setAlert({
            title: 'File berhasil dimuat',
            desc: '',
            type: 'success',
            showAlert: true,
          }),
        );
      })
      .catch(() => {
        dispatch(
          setAlert({
            title: 'File gagal dimuat',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      });
  };

  const downloadFile = async ({
    type,
    fileUrl,
  }: {
    type: 'write-file' | 'download-directly';
    fileUrl: string;
  }) => {
    const fileName = getFileNameFromUrl(fileUrl);
    const path = `${
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir
    }/${fileName}`;
    const fileExist = await findPath(path);

    if (Platform.OS === 'android' && fileExist) {
      // if (Platform.OS === 'ios') {
      //   RNFetchBlob.ios.previewDocument(path);
      // } else {
      // }
      RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
    } else {
      if (Platform.OS === 'ios') {
        if (type === 'write-file') {
          await writeBlobFile({fileUrl, path});
        } else {
          await downloadDirectly({fileUrl, path});
        }
      } else {
        try {
          if (Number(Platform.Version) < 30) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              if (type === 'write-file') {
                await writeBlobFile({fileUrl, path});
              } else {
                await downloadDirectly({fileUrl, path});
              }
            } else {
              dispatch(
                setAlert({
                  title: 'Izinkan aplikasi mengakses media penyimpanan',
                  desc: '',
                  type: 'info',
                  showAlert: true,
                }),
              );
            }
          } else {
            if (type === 'write-file') {
              await writeBlobFile({fileUrl, path});
            } else {
              await downloadDirectly({fileUrl, path});
            }
          }
        } catch {}
      }
    }
  };
  return {downloadFile};
};
