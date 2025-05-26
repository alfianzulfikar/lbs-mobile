import {StyleSheet, TextInput, View} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Text from './Text';
import BlurOverlay from './BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import {OnInputChangeType} from '../constants/Types';
import {useColorScheme} from '../hooks/useColorScheme';

type OtpType = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

const Input = ({
  targetRef,
  stateName,
  value,
  setValue,
  otp,
  nextInput,
  prevInput,
}: {
  targetRef: any;
  stateName: string;
  value: string;
  setValue: Dispatch<SetStateAction<OtpType>>;
  otp: OtpType;
  nextInput?: any;
  prevInput?: any;
}) => {
  let colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const regex = /^\d+$/;
  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: RGBAColors(0.4)[colorScheme].background,
          borderColor: RGBAColors(colorScheme === 'dark' ? 0.2 : 0.1)[
            colorScheme
          ].text,
        },
      ]}>
      <BlurOverlay />
      <TextInput
        ref={targetRef}
        style={[styles.input, {color: textColor2}]}
        value={value}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            if (prevInput) {
              prevInput.current?.focus();
            }
            setValue({...otp, [stateName]: ''});
          } else if (regex.test(nativeEvent.key)) {
            setValue({...otp, [stateName]: nativeEvent.key});
            if (nextInput) {
              nextInput.current.focus();
            } else {
              targetRef.current.blur();
            }
          }
        }}
        keyboardType="decimal-pad"
        selectTextOnFocus
      />
    </View>
  );
};

const OTPInput = ({
  value,
  setValue,
  error,
}: {
  value: OtpType;
  setValue: Dispatch<SetStateAction<OtpType>>;
  error?: string[];
}) => {
  const textColorDanger = useThemeColor({}, 'textDanger');
  const otp1ref = useRef(null);
  const otp2ref = useRef(null);
  const otp3ref = useRef(null);
  const otp4ref = useRef(null);
  const otp5ref = useRef(null);
  const otp6ref = useRef(null);
  return (
    <View>
      {/* <View style={styles.container}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 8,
            height: 50,
            borderWidth: 1,
            maxWidth: 50,
          }}>
          <TextInput />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 8,
            height: 50,
            borderWidth: 1,
            maxWidth: 50,
          }}>
          <TextInput />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 8,
            height: 50,
            borderWidth: 1,
            maxWidth: 50,
          }}>
          <TextInput />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 8,
            height: 50,
            borderWidth: 1,
            maxWidth: 50,
          }}>
          <TextInput />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 8,
            height: 50,
            borderWidth: 1,
            maxWidth: 50,
          }}>
          <TextInput />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 8,
            height: 50,
            borderWidth: 1,
            maxWidth: 50,
          }}>
          <TextInput />
        </View>
      </View> */}
      <View style={styles.container}>
        <Input
          targetRef={otp1ref}
          stateName="otp1"
          value={value.otp1}
          setValue={setValue}
          otp={value}
          nextInput={otp2ref}
        />
        <Input
          targetRef={otp2ref}
          stateName="otp2"
          value={value.otp2}
          setValue={setValue}
          otp={value}
          nextInput={otp3ref}
          prevInput={otp1ref}
        />
        <Input
          targetRef={otp3ref}
          stateName="otp3"
          value={value.otp3}
          setValue={setValue}
          otp={value}
          nextInput={otp4ref}
          prevInput={otp2ref}
        />
        <Input
          targetRef={otp4ref}
          stateName="otp4"
          value={value.otp4}
          setValue={setValue}
          otp={value}
          nextInput={otp5ref}
          prevInput={otp3ref}
        />
        <Input
          targetRef={otp5ref}
          stateName="otp5"
          value={value.otp5}
          setValue={setValue}
          otp={value}
          nextInput={otp6ref}
          prevInput={otp4ref}
        />
        <Input
          targetRef={otp6ref}
          stateName="otp6"
          value={value.otp6}
          setValue={setValue}
          otp={value}
          prevInput={otp5ref}
        />
      </View>
      {error && error.length > 0 ? (
        <Text
          style={{
            fontSize: 12,
            lineHeight: 16,
            marginTop: 4,
            color: textColorDanger,
          }}>
          {error.map(
            (item, index) => `${item}${index !== error.length - 1 ? ' ' : ''}`,
          )}
        </Text>
      ) : null}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    width: '100%',
  },
  inputContainer: {
    maxWidth: 50,
    flex: 1,
    height: 50,
    borderRadius: 8,
    // overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 4,
  },
  input: {
    zIndex: 2,
    fontSize: 18,
    fontWeight: '600',
  },
});
