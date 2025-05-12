import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import LinearGradient from 'react-native-linear-gradient';
import Gap from './Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import ICCertificate from './icons/ICCertificate';
import ICStatus from './icons/ICStatus';
import {PortfolioType} from '../constants/Types';
import capitalize from '../utils/capitalize';
import numberFormat from '../utils/numberFormat';
import {useColorScheme} from '../hooks/useColorScheme';
import BlurOverlay from './BlurOverlay';

const PortfolioCard = ({
  data,
  onPress,
}: {
  data: PortfolioType;
  onPress: () => void;
}) => {
  let colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['rgba(26, 26, 26, 0.6)', 'rgba(26, 26, 26, 0.3)']
            : // ? ['rgba(26, 26, 26, 0.6)', 'rgba(26, 26, 26, 0.3)']
              ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)']
        }
        style={styles.gradient}
      />
      <BlurOverlay />
      <View style={styles.contentContainer}>
        <Text style={styles.merkDagang}>{data.merkDagang}</Text>
        <Gap height={8} />
        <View style={styles.rowContainer}>
          <View style={styles.rowContainer}>
            <ICCertificate color={textColor2} />
            <Gap width={4} />
            <Text style={[styles.info, {color: textColor2}]}>
              {capitalize(data.type)}
            </Text>
          </View>
          <Gap width={16} />
          <View style={styles.rowContainer}>
            <ICStatus color={textColor2} />
            <Gap width={4} />
            <Text style={[styles.info, {color: textColor2}]}>
              {capitalize(data.status)}
            </Text>
          </View>
        </View>
        <Gap flex={1} />
        <Gap height={8} />
        <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
          <Text style={[styles.totalLabel, {color: textColor2}]}>
            Total Investasi:
          </Text>
          <Text style={[styles.total, {color: textColor2}]}>
            Rp{numberFormat(data.total)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PortfolioCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 172,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  contentContainer: {
    zIndex: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
  },
  merkDagang: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    fontSize: 12,
    lineHeight: 16,
  },
  totalLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  total: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'right',
  },
});
