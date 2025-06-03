import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ICPrelisting from './icons/ICPrelisting';
import Text from '../components/Text';
import Gap from './Gap';
import ICListing from './icons/ICListing';
import ICTerpenuhi from './icons/ICTerpenuhi';
import ICBerjalan from './icons/ICBerjalan';
import ICSelesai from './icons/ICSelesai';
import capitalize from '../utils/capitalize';
import {RGBAColors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const BusinessStatus = ({
  status = 0,
  list = [],
  businessType,
  backgroundType,
}: {
  status: number;
  list: {id: number; name: string}[];
  businessType?: string;
  backgroundType?: 'tint';
}) => {
  let colorScheme = useColorScheme();
  const composedList =
    businessType === 'SUKUK'
      ? list
      : list.filter(item => item.name !== 'SELESAI');
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slider}>
        <Gap width={24} />
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                backgroundType === 'tint'
                  ? RGBAColors(0.5)[colorScheme].tint
                  : 'rgba(64, 64, 64, 0.5)',
            },
          ]}>
          {composedList.map((statusItem, statusId) => (
            <View
              key={statusId}
              style={{
                flexDirection: 'row',
                opacity: statusItem.id <= status ? 1 : 0.3,
              }}>
              <View style={styles.statusContainer}>
                {capitalize(statusItem.name) === 'Pre-listing' ? (
                  <ICPrelisting
                    color="#FFFFFF"
                    size={40}
                    shadow={statusItem.id <= status}
                  />
                ) : capitalize(statusItem.name) === 'Listing' ? (
                  <ICListing
                    color="#FFFFFF"
                    size={40}
                    shadow={statusItem.id <= status}
                  />
                ) : capitalize(statusItem.name) === 'Terpenuhi' ? (
                  <ICTerpenuhi
                    color="#FFFFFF"
                    size={40}
                    shadow={statusItem.id <= status}
                  />
                ) : capitalize(statusItem.name) === 'Berjalan' ? (
                  <ICBerjalan
                    color="#FFFFFF"
                    size={40}
                    shadow={statusItem.id <= status}
                  />
                ) : (
                  <ICSelesai
                    color="#FFFFFF"
                    size={40}
                    shadow={statusItem.id <= status}
                  />
                )}
                <Gap height={18} />
                <Text
                  style={[
                    styles.text,
                    {fontWeight: statusId <= status ? '700' : '400'},
                  ]}>
                  {capitalize(statusItem.name)}
                </Text>
              </View>
              {statusId !== composedList.length - 1 && (
                <View style={styles.line}></View>
              )}
            </View>
          ))}
        </View>
        <Gap width={24} />
      </ScrollView>
    </View>
  );
};

export default BusinessStatus;

const styles = StyleSheet.create({
  slider: {
    maxHeight: 110,
  },
  container: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
  },
  statusContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
    position: 'absolute',
    top: 40,
    textAlign: 'center',
    width: 80,
    fontWeight: '700',
  },
  line: {
    height: 8,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    transform: [{translateY: 16}],
  },
});
