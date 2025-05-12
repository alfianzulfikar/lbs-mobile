import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import {SvgIconType} from '../constants/Types';

const Button = ({
  title,
  type,
  icon,
  onPress,
  paddingVertical,
  paddingHorizontal,
  loading,
  disabled,
  fontSize,
}: {
  title: string;
  type?: 'default' | 'secondary' | 'danger';
  icon?: (props: SvgIconType) => React.JSX.Element;
  onPress?: () => void;
  paddingVertical?: number;
  paddingHorizontal?: number;
  loading?: boolean;
  disabled?: boolean;
  fontSize?: number;
}) => {
  const textColor =
    type === 'secondary'
      ? useThemeColor({}, 'buttonTextSecondary')
      : type === 'danger'
      ? useThemeColor({}, 'buttonTextDanger')
      : useThemeColor({}, 'buttonTextDefault');
  const backgroundColor =
    type === 'secondary'
      ? useThemeColor({}, 'buttonBgSecondary')
      : type === 'danger'
      ? useThemeColor({}, 'buttonBgDanger')
      : useThemeColor({}, 'buttonBgDefault');
  const borderColor =
    type === 'secondary'
      ? useThemeColor({}, 'buttonTextSecondary')
      : type === 'danger'
      ? useThemeColor({}, 'buttonBgDanger')
      : useThemeColor({}, 'buttonBgDefault');
  const ComputedIcon = () => {
    return icon ? icon({color: textColor}) : <></>;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          paddingVertical: paddingVertical || 16,
          paddingHorizontal: paddingHorizontal || 16,
          opacity: disabled ? 0.4 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || !onPress ? true : false}>
      <>
        {icon && (
          <View style={{flexDirection: 'row', opacity: loading ? 0 : 1}}>
            {ComputedIcon()}
            <Gap width={4} />
          </View>
        )}
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              opacity: loading ? 0 : 1,
              fontSize: fontSize || 16,
            },
          ]}>
          {title}
        </Text>
      </>
      {loading && (
        <View style={{height: 24, width: '100%', position: 'absolute'}}>
          <ActivityIndicator color={textColor} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
});
