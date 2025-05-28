import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useThemeColor} from '../hooks/useThemeColor';

const Toggle = ({
  toggleState,
  onPress = () => {},
}: {
  toggleState?: boolean;
  onPress?: () => void;
}) => {
  const tint = useThemeColor({}, 'tint3');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  return (
    <Pressable
      style={[
        styles.toggleContainer,
        {
          backgroundColor: toggleState ? tint : backgroundColor,
          borderColor: toggleState ? tint : borderColor,
          justifyContent: toggleState ? 'flex-end' : 'flex-start',
        },
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.toggleCircle,
          {backgroundColor: toggleState ? '#FFFFFF' : borderColor},
        ]}></View>
    </Pressable>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  toggleContainer: {
    width: 52,
    height: 24,
    borderRadius: 100,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
