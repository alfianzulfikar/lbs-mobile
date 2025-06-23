import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

const usePicture = () => {
  const dispatch = useDispatch();

  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings().catch(() => {
        dispatch(
          setAlert({
            title: 'Tidak dapat membuka pengaturan',
            desc: '',
            showAlert: true,
            type: 'danger',
          }),
        );
      });
    } else {
      dispatch(
        setAlert({
          title: 'Fitur ini hanya untuk Android',
          desc: '',
          showAlert: true,
          type: 'danger',
        }),
      );
    }
  };

  return {openAppSettings};
};

export default usePicture;
