import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BlurOverlay from './BlurOverlay';
import ICCopy from './icons/ICCopy';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';

const CopyText = ({value, text}: {value: string | number; text: string}) => {
  const textColor = useThemeColor({}, 'text');
  return (
    <View
      style={[
        styles.copyContainer,
        {backgroundColor: RGBAColors(0.4).light.background},
      ]}>
      <BlurOverlay />
      <View style={styles.copyContent}>
        <Text style={[styles.copyValue, {color: textColor}]}>{text}</Text>
        <Pressable>
          <ICCopy color={textColor} />
        </Pressable>
      </View>
    </View>
  );
};

export default CopyText;

const styles = StyleSheet.create({
  copyContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  copyValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  copyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
});
