import {
  Platform,
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
import {useDispatch, useSelector} from 'react-redux';
import {setShowAlert} from '../slices/globalError';
import {RootState} from '../store';
import ICWarning from './icons/ICWarning';
import ICChecked from './icons/ICChecked';
import usePicture from '../hooks/usePicture';
import {useInsets} from '../hooks/useInsets';

const CustomAlert = ({onClose}: {onClose: () => void}) => {
  const {notchHeight} = useInsets();
  const dispatch = useDispatch();
  const {title, desc, type, alertButtonText, alertButtonAction} = useSelector(
    (item: RootState) => item.globalError,
  );
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

  const picture = usePicture();

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 99,
        alignItems: 'center',
        width: '100%',
      }}>
      <Gap height={Platform.OS === 'android' ? 24 : 24 + notchHeight} />
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
            {alertButtonAction && (
              <TouchableOpacity
                style={{marginTop: 4, alignSelf: 'flex-end'}}
                onPress={() => {
                  if (alertButtonAction === 'open-settings') {
                    picture.openAppSettings();
                  }
                  dispatch(setShowAlert(false));
                }}>
                <Text style={styles.buttonText}>
                  {alertButtonAction === 'open-settings'
                    ? alertButtonText || 'Buka pengaturan'
                    : ''}
                </Text>
              </TouchableOpacity>
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
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
