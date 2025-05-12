import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import IconWrapper from './IconWrapper';
import ICArrowLeft from './icons/ICArrowLeft';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import Text from './Text';

const Header = ({
  paddingHorizontal,
  title,
  rightIcon,
  backButton,
}: {
  paddingHorizontal?: number;
  title?: string;
  rightIcon?: ReactNode;
  backButton?: boolean;
}) => {
  const iconColor = useThemeColor({}, 'icon');
  const navigation = useNavigation();
  return (
    <View style={[styles.header, {paddingHorizontal: paddingHorizontal ?? 24}]}>
      <View style={{width: 40}}>
        {(backButton === true || backButton === undefined) && (
          <IconWrapper onPress={() => navigation.goBack()}>
            <ICArrowLeft color={iconColor} size={24} />
          </IconWrapper>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={{minWidth: 40}}>{rightIcon && rightIcon}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
