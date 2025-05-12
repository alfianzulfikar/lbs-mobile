import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import {Callback, SvgIconType} from '../constants/Types';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';

const CheckBox = ({
  color,
  color2,
  value,
  onChange = () => {},
  label,
}: {
  color?: string;
  color2?: string;
  value?: boolean;
  onChange?: Callback;
  label?: string;
}) => {
  const textColor = useThemeColor({}, 'text');
  return (
    <Pressable style={styles.checkBoxContainer} onPress={onChange}>
      {value ? (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Mask
            id="mask0_887_6802"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24">
            <Rect width="24" height="24" fill={'#D9D9D9'} />
          </Mask>
          {value && (
            <G mask="url(#mask0_887_6802)">
              <Path
                d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"
                fill={textColor || '#1A1A1A'}
              />
            </G>
          )}
        </Svg>
      ) : (
        <View
          style={{
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 2,
              borderWidth: 2,
              borderColor: textColor,
            }}></View>
        </View>
      )}
      <Text style={[styles.checkBoxText, {color: textColor}]}>{label}</Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginLeft: 7,
  },
});
