import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import ICMail from './icons/ICMail';
import {useThemeColor} from '../hooks/useThemeColor';
import {NotificationType} from '../constants/Types';
import ICUser from './icons/ICUser';
import ICTransaction2 from './icons/ICTransaction2';
import {Colors, RGBAColors} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const NotificationItem = ({
  data,
  onPress,
}: {
  data: NotificationType;
  onPress: () => void;
}) => {
  const text2 = useThemeColor({}, 'text2');
  const textInfo = Colors.light.textInfo;
  const textSuccess = Colors.light.textSuccess;
  const textDanger = Colors.light.textDanger;
  const textWarning = Colors.light.textWarning;
  const bgInfoSurface = useThemeColor({}, 'infoSurface');
  const bgSuccessSurface = useThemeColor({}, 'successSurface');
  const bgWarningSurface = useThemeColor({}, 'warningSurface');
  const bgDangerSurface = useThemeColor({}, 'dangerSurface');

  const iconColor = data.icon.includes('success')
    ? textSuccess
    : data.icon.includes('failed')
    ? textDanger
    : data.icon.includes('warning')
    ? textWarning
    : textInfo;

  const backgroundColor = data.icon.includes('success')
    ? bgSuccessSurface
    : data.icon.includes('failed')
    ? bgDangerSurface
    : data.icon.includes('warning')
    ? bgWarningSurface
    : bgInfoSurface;

  const Icon = data.icon.includes('user')
    ? ICUser
    : data.icon.includes('transaction')
    ? ICTransaction2
    : ICMail;

  // const screen =
  //   data.data?.key === 'Transaction'
  //     ? 'Transaction'
  //     : 'NotificationDetail';

  return (
    <TouchableOpacity style={{flexDirection: 'row'}} onPress={onPress}>
      <View style={[styles.iconWrapper, {backgroundColor}]}>
        <Icon color={iconColor} />
      </View>
      <View style={{flex: 1, marginLeft: 16}}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={[styles.message, {color: text2}]} numberOfLines={1}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
