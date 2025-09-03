import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useThemeColor} from '../hooks/useThemeColor';

const Toggle = ({
  toggleState,
  onPress = () => {},
  disabled,
}: {
  toggleState?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}) => {
  const tint = useThemeColor({}, 'tint3');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  return (
    <View>
      <Pressable
        style={[
          styles.toggleContainer,
          {
            backgroundColor: toggleState ? tint : backgroundColor,
            borderColor: toggleState ? tint : borderColor,
            justifyContent: toggleState ? 'flex-end' : 'flex-start',
            opacity: disabled ? 0.4 : 1,
          },
        ]}
        onPress={onPress}
        disabled={disabled}>
        <View
          style={[
            styles.toggleCircle,
            {backgroundColor: toggleState ? '#FFFFFF' : borderColor},
          ]}></View>
      </Pressable>
      {disabled && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{translateX: '-50%'}, {translateY: '-50%'}],
          }}>
          <ActivityIndicator color={tint} />
        </View>
      )}
    </View>
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
