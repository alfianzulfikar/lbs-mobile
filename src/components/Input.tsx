import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import BlurOverlay from './BlurOverlay';
import Text from './Text';
import {RGBAColors} from '../constants/Colors';
import ICCaretArrowDown from './icons/ICCaretArrowDown';
import {useThemeColor} from '../hooks/useThemeColor';
import ICEye from './icons/ICEye';
import {
  Callback,
  InputDropdownOption,
  InputType,
  OnInputChangeType,
} from '../constants/Types';
import ICEyeDisable from './icons/ICEyeDisable';
import InputWrapper from './InputWrapper';
import Label from './Label';
import BottomSheet from './BottomSheet';
import ICDate from './icons/ICDate';
import ICCamera2 from './icons/ICCamera2';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import Gap from './Gap';
import {checkNonNumeric} from '../utils/checkNonNumeric';
import CheckBox from './CheckBox';
import {useColorScheme} from '../hooks/useColorScheme';

const Input = ({
  label,
  type,
  disable,
  onChange = () => {},
  onPress = () => {},
  value,
  isActive,
  placeholder,
  option,
  optionWithImage,
  selectedOptionImage,
  error,
  required,
  loading,
  subLabel,
  subLabelIcon,
}: {
  label?: string;
  type?: InputType;
  disable?: boolean;
  onChange?: (value: any) => void;
  onPress?: Callback;
  value?: string | number | boolean | null | number[];
  isActive?: boolean;
  placeholder?: string;
  option?: InputDropdownOption[];
  optionWithImage?: boolean;
  selectedOptionImage?: string;
  error?: string[];
  required?: boolean;
  loading?: boolean;
  subLabel?: string;
  subLabelIcon?: ReactNode;
}) => {
  let colorScheme = useColorScheme();
  const iconColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor3 = useThemeColor({}, 'text3');
  const textColor4 = useThemeColor({}, 'text4');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const textColorDisable = useThemeColor({}, 'textDisable');
  const tint = useThemeColor({}, 'tint');

  const [showPassword, setShowPassword] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [picture, setPicture] = useState(value);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleImageRes = (res: any) => {
    if (!res?.didCancel) {
      const assets = res?.assets
        ? res.assets.length > 0
          ? res.assets[0]
          : {}
        : {};
      onChange(assets.base64);
      setPicture(assets.uri);
    }
  };

  const takePicture = async ({type}: {type: 'camera' | 'galery'}) => {
    try {
      const options: CameraOptions = {
        mediaType: 'photo',
        includeBase64: true,
      };
      if (type === 'galery') {
        await launchImageLibrary(options, res => handleImageRes(res));
      } else {
        await launchCamera(options, res => handleImageRes(res));
      }
    } catch (error) {
      console.log('take picture error', error);
    }
  };

  return (
    <View>
      {label && (
        <View style={{marginBottom: 8}}>
          <Label title={label} required={required} />
          {subLabel && (
            <View style={{marginTop: 4, flexDirection: 'row'}}>
              {subLabelIcon && (
                <>
                  {subLabelIcon}
                  <Gap width={2} />
                </>
              )}
              <Text style={[styles.subLabel, {color: textColor2}]}>
                {subLabel}
              </Text>
            </View>
          )}
        </View>
      )}
      {type === 'otp-method' ? (
        <Pressable onPress={onPress}>
          <InputWrapper borderColor={isActive ? tint : undefined}>
            <View style={styles.contentContainer}>
              <Text
                style={[
                  styles.input,
                  {
                    color: isActive ? tint : textColor3,
                    fontWeight: isActive ? '700' : '400',
                  },
                ]}>
                {value}
              </Text>
              <View
                style={[
                  styles.radioActive,
                  {
                    borderWidth: isActive ? 2 : 1,
                    borderColor: isActive ? tint : textColor3,
                  },
                ]}>
                {isActive && (
                  <View style={[styles.innerCircle, {backgroundColor: tint}]} />
                )}
              </View>
            </View>
          </InputWrapper>
        </Pressable>
      ) : type === 'radio-button' ? (
        <View>
          {option?.map((item, optionId) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginBottom: optionId !== option.length - 1 ? 16 : 0,
              }}
              key={optionId}
              onPress={() => onChange(item.id)}>
              <View style={[styles.radioCircle, {borderColor: textColor}]}>
                {value === item.id && (
                  <View
                    style={[
                      styles.radioInnerCircle,
                      {backgroundColor: textColor},
                    ]}></View>
                )}
              </View>
              <Text style={[styles.radioText, {color: textColor2}]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : type === 'checkbox' ? (
        option?.map((optionItem, optionId) => (
          <View
            key={optionId}
            style={{marginBottom: optionId !== option.length - 1 ? 16 : 0}}>
            <CheckBox
              color={textColor2}
              label={optionItem.label}
              value={
                Array.isArray(value) &&
                typeof optionItem.id === 'number' &&
                value.includes(optionItem.id)
              }
              onChange={() => {
                if (Array.isArray(value) && typeof optionItem.id === 'number') {
                  let newArray = [];
                  if (value.includes(optionItem.id)) {
                    newArray = value.filter(item => item !== optionItem.id);
                  } else {
                    newArray = [...value, optionItem.id];
                  }
                  onChange(newArray);
                }
              }}
            />
          </View>
        ))
      ) : (
        <InputWrapper disable={disable}>
          {loading ? (
            <View style={{height: 52, flexDirection: 'row'}}>
              <Gap width={18} />
              <ActivityIndicator color={tint} />
              <Gap flex={1} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.contentContainer}
              disabled={
                disable || !['dropdown', 'picture', 'date'].includes(type || '')
              }
              onPress={() => {
                if (type === 'dropdown') {
                  setShowOption(prev => !prev);
                } else if (type === 'date') {
                  setShowDatePicker(true);
                } else {
                  takePicture({type: 'camera'});
                }
              }}>
              {type === 'dropdown' ? (
                <>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 52,
                    }}>
                    {value && optionWithImage && selectedOptionImage ? (
                      <Image
                        source={{uri: selectedOptionImage}}
                        style={{width: 24, height: 24, marginRight: 8}}
                        resizeMode="contain"
                      />
                    ) : null}
                    <Text
                      style={[
                        styles.dropdownValue,
                        {color: disable ? textColor4 : textColor3},
                      ]}
                      numberOfLines={1}>
                      {value
                        ? option?.find(
                            item => String(item.id) === String(value),
                          )?.label || 'Data Tidak Sesuai'
                        : placeholder ?? 'Pilih'}
                    </Text>
                  </View>
                  <ICCaretArrowDown color={iconColor} />
                </>
              ) : type === 'picture' ? (
                <>
                  {picture && typeof picture === 'string' ? (
                    <Image
                      source={{uri: picture}}
                      style={{width: '100%', height: 200}}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.pictureContainer}>
                      <ICCamera2 color={textColor} />
                      <Text style={styles.pictureText}>Ambil Foto</Text>
                    </View>
                  )}
                </>
              ) : (
                <>
                  <TextInput
                    value={
                      value
                        ? typeof value === 'string'
                          ? type === 'date'
                            ? new Date(value).getDate() +
                              '-' +
                              (new Date(value).getMonth() + 1) +
                              '-' +
                              new Date(value).getFullYear()
                            : value
                          : String(value)
                        : ''
                    }
                    style={[
                      styles.input,
                      {color: disable ? textColor4 : textColor3},
                    ]}
                    placeholder={placeholder || ''}
                    secureTextEntry={type === 'password' ? showPassword : false}
                    keyboardType={
                      type === 'email'
                        ? 'email-address'
                        : type === 'number'
                        ? 'number-pad'
                        : 'default'
                    }
                    editable={
                      type === 'date' ? false : disable ? !disable : true
                    }
                    onChangeText={value => {
                      if (type === 'number') {
                        if (!checkNonNumeric(value)) {
                          onChange(value);
                        }
                      } else {
                        onChange(value);
                      }
                    }}
                    placeholderTextColor={
                      disable
                        ? textColorDisable
                        : RGBAColors(0.4)[colorScheme].text
                    }
                  />
                  {type === 'password' && (
                    <Pressable
                      onPress={() => setShowPassword(prev => !prev)}
                      style={{marginLeft: 8}}>
                      {showPassword ? (
                        <ICEye color={textColor3} />
                      ) : (
                        <ICEyeDisable color={textColor3} />
                      )}
                    </Pressable>
                  )}
                  {type === 'date' && (
                    <View style={{marginLeft: 8}}>
                      <ICDate color={textColor2} />
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
          )}
        </InputWrapper>
      )}

      {error && error.length > 0 && (
        <Text style={{fontSize: 12, marginTop: 4, color: textColorDanger}}>
          {error.map((item, errorId) => {
            return errorId !== error.length - 1 ? item + ' ' : item;
          })}
        </Text>
      )}

      {showOption && (
        <BottomSheet setShow={setShowOption}>
          {option &&
            option.map((item, id) => (
              <Pressable
                key={id}
                style={{marginVertical: 4}}
                onPress={() => {
                  onChange(item.id);
                  setShowOption(false);
                }}>
                <View style={{flexDirection: 'row'}}>
                  {item?.image && (
                    <Image
                      source={{uri: item.image}}
                      style={{width: 24, height: 24, marginRight: 8}}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={{flex: 1, fontSize: 16, color: textColor2}}>
                    {item.label}
                  </Text>
                </View>
              </Pressable>
            ))}
        </BottomSheet>
      )}

      {type === 'date' && (
        <DatePicker
          mode="date"
          modal
          open={showDatePicker}
          date={
            value
              ? new Date(typeof value === 'string' ? value : '')
              : new Date()
          }
          onConfirm={date => {
            setShowDatePicker(false);
            onChange(
              new Date(date).getFullYear() +
                '-' +
                (new Date(date).getMonth() + 1) +
                '-' +
                new Date(date).getDate(),
            );
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
          title="Pilih Tanggal"
          confirmText="Konfirmasi"
          cancelText="Batal"
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
  },
  contentContainer: {
    zIndex: 2,
    flexDirection: 'row',
    // paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    // height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 52,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 8,
  },
  dropdownValue: {
    fontSize: 16,
    // fontWeight: '600',
    // lineHeight: 24,
  },
  radioActive: {
    width: 21,
    height: 21,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  pictureContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateY: 2}]
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    marginLeft: 10,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    flex: 1,
  },
});
