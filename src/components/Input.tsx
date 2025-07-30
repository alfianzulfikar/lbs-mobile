import {
  ActivityIndicator,
  Image,
  Keyboard,
  PermissionsAndroid,
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
import IconWrapper2 from './IconWrapper2';
import ICCamera from './icons/ICCamera';
import ICPicture from './icons/ICPicture';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';
import usePicture from '../hooks/usePicture';

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
  pictureType,
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
  pictureType?: 'camera' | 'galery' | 'option';
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
  const dropdownHighlight = useThemeColor({}, 'dropdownHighlight');
  const dispatch = useDispatch();
  const pictureHooks = usePicture();

  const [showPassword, setShowPassword] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [picture, setPicture] = useState(value);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPictureOption, setShowPictureOption] = useState(false);

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
        maxHeight: 1000,
        maxWidth: 1000,
      };
      if (type === 'galery') {
        await launchImageLibrary(options, res => handleImageRes(res));
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await launchCamera(options, res => handleImageRes(res));
        } else {
          dispatch(
            setAlert({
              title: 'Tidak ada akses ke kamera',
              desc: 'Izinkan aplikasi LBS Urun Dana untuk mengakses kamera melalui pengaturan perangkat Anda.',
              type: 'danger',
              showAlert: true,
              alertButtonAction: 'open-settings',
            }),
          );
          setShowPictureOption(false);
        }
      }
      setShowPictureOption(false);
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
          <InputWrapper borderColor={isActive ? textColor : undefined}>
            <View style={[styles.contentContainer, {zIndex: 2}]}>
              <Text
                style={[
                  styles.input,
                  {
                    color: isActive ? textColor : textColor3,
                    fontWeight: isActive ? '700' : '400',
                    textAlignVertical: 'center',
                  },
                ]}>
                {value}
              </Text>
              <View
                style={[
                  styles.radioActive,
                  {
                    borderWidth: isActive ? 2 : 1,
                    borderColor: isActive
                      ? textColor
                      : RGBAColors(colorScheme === 'dark' ? 0.3 : 0.5)[
                          colorScheme
                        ].text,
                  },
                ]}>
                {isActive && (
                  <View
                    style={[styles.innerCircle, {backgroundColor: textColor}]}
                  />
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
                marginBottom: option && optionId !== option.length - 1 ? 16 : 0,
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
            style={{
              marginBottom: option && optionId !== option.length - 1 ? 16 : 0,
            }}>
            <CheckBox
              color={textColor2}
              label={optionItem.label}
              value={
                Array.isArray(value) &&
                typeof optionItem.id === 'number' &&
                value.includes(optionItem.id)
              }
              onChange={() => {
                Keyboard.dismiss();
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
              style={{zIndex: 2}}
              disabled={
                disable || !['dropdown', 'picture', 'date'].includes(type || '')
              }
              onPress={() => {
                if (type === 'dropdown') {
                  setShowOption(prev => !prev);
                } else if (type === 'date') {
                  setShowDatePicker(true);
                } else if (type === 'picture') {
                  if (pictureType === 'option') {
                    setShowPictureOption(true);
                  } else {
                    takePicture({type: pictureType || 'camera'});
                  }
                }
                Keyboard.dismiss();
              }}>
              {type === 'dropdown' ? (
                <View style={styles.contentContainer}>
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
                </View>
              ) : type === 'picture' ? (
                <View style={styles.contentContainer}>
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
                </View>
              ) : type === 'date' ? (
                <View style={[styles.contentContainer, {height: 52}]}>
                  <Text
                    style={[
                      styles.input,
                      {
                        height: 'auto',
                        color: disable ? textColor4 : textColor3,
                      },
                    ]}>
                    {value
                      ? typeof value === 'string'
                        ? new Date(value).getDate() +
                          '-' +
                          (new Date(value).getMonth() + 1) +
                          '-' +
                          new Date(value).getFullYear()
                        : ''
                      : ''}
                  </Text>
                  <View style={{marginLeft: 8}}>
                    <ICDate color={textColor2} />
                  </View>
                </View>
              ) : (
                <View style={styles.contentContainer}>
                  <TextInput
                    value={
                      value
                        ? typeof value === 'string'
                          ? value
                          : type === 'number'
                          ? value.toLocaleString('id-ID')
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
                    editable={disable ? !disable : true}
                    onChangeText={newValue => {
                      if (type === 'number') {
                        const valueWithoutDot = newValue.replaceAll('.', '');
                        if (!checkNonNumeric(valueWithoutDot)) {
                          onChange(Number(valueWithoutDot));
                        }
                      } else {
                        onChange(newValue);
                      }
                    }}
                    // onPress={() => }
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
                </View>
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
        <BottomSheet
          setShow={setShowOption}
          paddingHorizontal={0}
          snapPoints={['75%']}>
          {option &&
            option.map((item, id) => (
              <Pressable
                key={id}
                style={{
                  marginVertical: 4,
                  paddingHorizontal: 24,
                  backgroundColor:
                    item.id === value ? dropdownHighlight : 'transparent',
                }}
                onPress={() => {
                  onChange(item.id);
                  setShowOption(false);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                    borderColor: RGBAColors(0.1)[colorScheme].text,
                  }}>
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

      {showPictureOption && (
        <BottomSheet
          setShow={() => setShowPictureOption(false)}
          snapPoints={['40%']}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{alignItems: 'center', width: 100}}
              onPress={() => takePicture({type: 'camera'})}>
              <IconWrapper2>
                <ICCamera color={tint} />
              </IconWrapper2>
              <Text style={styles.photoOptionText}>Ambil dengan Kamera</Text>
            </TouchableOpacity>
            <Gap width={16} />
            <TouchableOpacity
              style={{alignItems: 'center', width: 100}}
              onPress={() => takePicture({type: 'galery'})}>
              <IconWrapper2>
                <ICPicture color={tint} />
              </IconWrapper2>
              <Text style={styles.photoOptionText}>Ambil dari Galeri</Text>
            </TouchableOpacity>
          </View>
          <Gap height={40} />
        </BottomSheet>
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
    // zIndex: 2,
    flexDirection: 'row',
    paddingHorizontal: 18,
    alignItems: 'center',
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
    transform: [{translateY: 2}],
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
  photoOptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});
