import {ActivityIndicator, Modal, View} from 'react-native';
import React from 'react';

const LoadingModal = () => {
  return (
    <Modal transparent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color="#FFFFFF" />
      </View>
    </Modal>
  );
};

export default LoadingModal;
