import {Platform, Pressable, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import BlurOverlay from './BlurOverlay';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {checkNonNumeric} from '../utils/checkNonNumeric';
import {useColorScheme} from '../hooks/useColorScheme';

const PlusMinusInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: RGBAColors(0.5)[colorScheme].background,
          borderColor: RGBAColors(colorScheme === 'dark' ? 0.2 : 0.1)[
            colorScheme
          ].text,
        },
      ]}>
      {/* <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['#404040', '#1A1A1A']
            : ['#FFFFFF', '#E0E0E0']
        }
        style={{position: 'absolute', width: '100%', height: '100%'}}
      /> */}
      {Platform.OS === 'ios' && <BlurOverlay />}
      <View style={styles.contentContainer}>
        <Pressable
          style={[
            styles.textContainer,
            {backgroundColor: RGBAColors(0.4)[colorScheme].background},
          ]}
          onPress={() => {
            if (Number(value) > 0) {
              onChange(value - 1);
            }
          }}>
          {Platform.OS === 'ios' && <BlurOverlay />}
          <Text style={[styles.text, {color: textColor}]}>-</Text>
        </Pressable>
        <TextInput
          keyboardType="decimal-pad"
          style={[styles.input, {color: textColor}]}
          value={String(value || 0)}
          onChangeText={value => {
            if (!checkNonNumeric(value)) {
              onChange(Number(value));
            }
          }}
        />
        <Pressable
          style={[
            styles.textContainer,
            {backgroundColor: RGBAColors(0.4)[colorScheme].background},
          ]}
          onPress={() => onChange(value + 1)}>
          {Platform.OS === 'ios' && <BlurOverlay />}
          <Text style={[styles.text, {color: textColor}]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PlusMinusInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  contentContainer: {
    zIndex: 2,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  textContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    zIndex: 2,
    transform: [{translateY: -2}],
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    // lineHeight: 36,
    // verticalAlign: 'middle',
    // height: 36,
    // horizon
  },
});
