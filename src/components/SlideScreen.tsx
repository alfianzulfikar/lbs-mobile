import {Modal, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RGBAColors} from '../constants/Colors';

const SlideScreen = () => {
  return (
    <Modal backdropColor={RGBAColors(0.8)['light'].background}>
      <View style={{transform: [{translateY: '-50%'}]}}>
        <Text>ncd</Text>
      </View>
    </Modal>
  );
};

export default SlideScreen;

const styles = StyleSheet.create({});
