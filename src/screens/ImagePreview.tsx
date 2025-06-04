import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import Header from '../components/Header';
import {useAPI} from '../services/api';
import {useNavigation} from '@react-navigation/native';
import CustomBottomSheet from '../components/BottomSheet';
import IconWrapper2 from '../components/IconWrapper2';
import ICCamera from '../components/icons/ICCamera';
import ICPicture from '../components/icons/ICPicture';
import Text from '../components/Text';
import ImagePicker, {Options} from 'react-native-image-crop-picker';

type Props = {
  route: {
    params: {
      base64: string;
      path: string;
    };
  };
};
const ImagePreview = ({route}: Props) => {
  const {base64, path} = route.params;
  const backgroundColor = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const navigation = useNavigation();
  const {apiRequest} = useAPI();
  const [base64State, setBase64State] = useState(base64);
  const [pathState, setPathState] = useState(path);

  const [loading, setLoading] = useState(false);
  const [showChangePhoto, setShowChangePhoto] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/profile?label=photo',
        authorization: true,
        body: {
          image_file: base64State,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log('submit error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageRes = (res: any) => {
    setBase64State(res.data || '');
    setPathState(res.path || '');
  };

  const takePicture = async ({type}: {type: 'camera' | 'galery'}) => {
    try {
      const options: Options = {
        width: 500,
        height: 500,
        cropping: true,
        includeBase64: true,
      };
      if (type === 'galery') {
        ImagePicker.openPicker(options).then(image => {
          handleImageRes(image);
        });
      } else {
        ImagePicker.openCamera(options).then(image => {
          handleImageRes(image);
        });
      }
    } catch (error) {
      console.log('take picture error', error);
    } finally {
      setShowChangePhoto(false);
    }
  };

  return (
    <ScreenWrapper background backgroundType="gradient">
      <Gap height={24} />
      <Header />
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.imageWrapper, {backgroundColor}]}>
            {pathState && (
              <Image
                source={{uri: pathState}}
                style={{width: 240, height: 240}}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
        <Gap height={16} />
        <Button title="Simpan Foto" loading={loading} onPress={submit} />
        <Gap height={16} />
        <Button
          title="Ambil Ulang Foto"
          type="secondary"
          onPress={() => setShowChangePhoto(true)}
        />
        <Gap height={24} />
      </View>

      {showChangePhoto && (
        <CustomBottomSheet
          setShow={() => setShowChangePhoto(false)}
          snapPoints={['40%']}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{alignItems: 'center', width: 100}}
              onPress={() => takePicture({type: 'camera'})}>
              <IconWrapper2>
                <ICCamera color={tint} />
              </IconWrapper2>
              <Text style={styles.photoOptionText}>Ambil dengan Kamera</Text>
            </TouchableOpacity>
            <Gap width={16} />
            <TouchableOpacity
              style={{alignItems: 'center', width: 100}}
              onPress={() => takePicture({type: 'galery'})}>
              <IconWrapper2>
                <ICPicture color={tint} />
              </IconWrapper2>
              <Text style={styles.photoOptionText}>Ambil dari Galeri</Text>
            </TouchableOpacity>
          </View>
          <Gap height={40} />
        </CustomBottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  imageWrapper: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoOptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});
