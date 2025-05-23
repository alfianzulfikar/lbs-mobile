import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../Text';
import {useColorScheme} from '../../hooks/useColorScheme';
import {RGBAColors} from '../../constants/Colors';
import {useThemeColor} from '../../hooks/useThemeColor';
import numberFormat from '../../utils/numberFormat';
import {useMarket} from '../../api/market';
import {useDisclosure} from '../../api/disclosure';
import DisclosureItem from '../DisclosureItem';
import Gap from '../Gap';

const MarketInformation = ({merkDagang}: {merkDagang: string}) => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  // const {disclosureList, disclosureListLoading, getDisclosureList} = useDisclosure()
  const {getDisclosure, computedDisclosure, disclosureLoading} = useMarket();

  useEffect(() => {
    // getDisclosureList();
    getDisclosure(merkDagang);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Keterbukaan Informasi</Text>
      <Gap height={24} />
      {disclosureLoading ? (
        <ActivityIndicator color={tint} />
      ) : computedDisclosure.length > 0 ? (
        computedDisclosure.map((item, index) => (
          <View
            key={index}
            style={{
              marginBottom: index !== computedDisclosure.length - 1 ? 24 : 0,
            }}>
            <DisclosureItem disclosure={item} />
          </View>
        ))
      ) : (
        <Text style={{fontSize: 12, color: textColor2, textAlign: 'center'}}>
          Belum ada order
        </Text>
      )}
    </View>
  );
};

export default MarketInformation;

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
