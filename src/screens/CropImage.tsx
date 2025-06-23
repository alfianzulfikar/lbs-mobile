import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {CropView} from 'react-native-image-crop-tools';
import Button from '../components/Button';

type Props = {
  route: {
    params: {
      uri: string;
    };
  };
};
const CropImage = ({route}: Props) => {
  const {uri} = route.params;
  return (
      // <CropView
      //   sourceUrl={uri}
      //   style={styles.cropView}
      //   // ref={cropViewRef}
      //   onImageCrop={res => console.warn(res)}
      //   keepAspectRatio
      //   // aspectRatio={{width: 16, height: 9}}
      // />
    <View>
      <View style={{flex: 1}}>
      </View>
      <Button title='Simpan' />
    </View>
  );
};

export default CropImage;

const styles = StyleSheet.create({
  cropView: {
    flex: 1,
  },
});
