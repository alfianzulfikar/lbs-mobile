import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from './BlurOverlay';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const InputWrapper = ({
  children,
  borderColor,
  disable,
}: {
  children: ReactNode;
  borderColor?: string;
  disable?: boolean;
}) => {
  let colorScheme = useColorScheme();
  const inputDisableColor = useThemeColor({}, 'inputDisable');
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: disable
            ? inputDisableColor
            : RGBAColors(0.4)[colorScheme].background,
          borderColor:
            borderColor ||
            RGBAColors(colorScheme === 'dark' ? 0.2 : 0.1)[colorScheme].text,
        },
      ]}>
      <BlurOverlay />
      {children}
    </View>
  );
};

export default InputWrapper;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
  },
});
