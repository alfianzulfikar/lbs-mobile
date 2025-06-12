import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import Text from './Text';
import {Colors} from '../constants/Colors';
import ICInfo from './icons/ICInfo';
import Gap from './Gap';
import ICCancel from './icons/ICCancel';
import {useInsets} from '../hooks/useInsets';
import {useDispatch, useSelector} from 'react-redux';
import {setShowAlert} from '../slices/globalError';
import {RootState} from '../store';
import {useFocusEffect} from '@react-navigation/native';
import ICWarning from './icons/ICWarning';
import ICChecked from './icons/ICChecked';

const CustomAlert = ({onClose}: {onClose: () => void}) => {
  const dispatch = useDispatch();
  const {title, desc, type} = useSelector(
    (item: RootState) => item.globalError,
  );
  const {notchHeight} = useInsets();
  const {width} = useWindowDimensions();
  const textColor = Colors.light.text;
  const textColor2 = Colors.light.text2;
  const textColorDanger = Colors.light.textDanger;
  const textColorWarning = Colors.light.textWarning;
  const textColorInfo = Colors.light.textInfo;
  const textColorSuccess = Colors.light.textSuccess;
  const backgroundColorDanger = Colors.light.dangerSurface;
  const backgroundColorWarning = Colors.light.warningSurface;
  const backgroundColorInfo = Colors.light.infoSurface;
  const backgroundColorSuccess = Colors.light.successSurface;

  const backgroundColor =
    type === 'danger'
      ? backgroundColorDanger
      : type === 'success'
      ? backgroundColorSuccess
      : type === 'warning'
      ? backgroundColorWarning
      : backgroundColorInfo;

  const borderColor =
    type === 'danger'
      ? textColorDanger
      : type === 'success'
      ? textColorSuccess
      : type === 'warning'
      ? textColorWarning
      : textColorInfo;

  const iconColor =
    type === 'danger'
      ? textColorDanger
      : type === 'success'
      ? textColorSuccess
      : type === 'warning'
      ? textColorWarning
      : textColorInfo;

  // const unsubscribeTimeout = useRef(
  //   setTimeout(() => {
  //     if (onClose) {
  //       onClose();
  //     }
  //   }, 5000),
  // );

  // useEffect(() => {
  //   console.log('mount', unsubscribeTimeout.current);
  //   return () => {
  //     console.log('unmount', unsubscribeTimeout.current);
  //     clearTimeout(unsubscribeTimeout.current);
  //   };
  // }, []);

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 99,
        alignItems: 'center',
        width: '100%',
      }}>
      <Gap height={notchHeight + 24} />
      <View
        style={[
          styles.container,
          {backgroundColor, borderColor, width: width - 48},
        ]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          {type === 'danger' || type === 'warning' ? (
            <ICWarning color={iconColor} size={24} />
          ) : type === 'success' ? (
            <ICChecked color={iconColor} size={24} />
          ) : (
            <ICInfo color={iconColor} size={24} />
          )}
          <Gap width={8} />
          <View style={{transform: [{translateY: 3}], flex: 1}}>
            <Text style={[styles.title, {color: textColor, flex: 1}]}>
              {title}
            </Text>
            {desc && (
              <Text style={[styles.desc, {color: textColor2, flex: 1}]}>
                {desc}
              </Text>
            )}
            <Gap height={3} />
          </View>
        </View>
        <Gap width={8} />
        <TouchableOpacity
          onPress={() => {
            dispatch(setShowAlert(false));
          }}>
          <ICCancel color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
});
