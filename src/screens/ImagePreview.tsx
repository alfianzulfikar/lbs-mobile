import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import Header from '../components/Header';
import {useAPI} from '../services/api';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();
  const {apiRequest} = useAPI();

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/profile?label=photo',
        authorization: true,
        body: {
          image_file: base64,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log('submit error', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper background backgroundType="gradient">
      <Gap height={24} />
      <Header />
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.imageWrapper, {backgroundColor}]}>
            {path && (
              <Image
                source={{uri: path}}
                style={{width: 240, height: 240}}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
        <Gap height={16} />
        <Button title="Simpan Foto" loading={loading} onPress={submit} />
        <Gap height={16} />
        <Button title="Ambil Ulang Foto" type="secondary" />
        <Gap height={24} />
      </View>
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
});
