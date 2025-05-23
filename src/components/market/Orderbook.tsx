import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../Text';
import {useColorScheme} from '../../hooks/useColorScheme';
import {RGBAColors} from '../../constants/Colors';
import {useThemeColor} from '../../hooks/useThemeColor';
import numberFormat from '../../utils/numberFormat';
import {useMarket} from '../../api/market';

const Orderbook = ({id}: {id: number}) => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const {bidList, askList, numberOfOrderRow, getOrderbook, orderbookLoading} =
    useMarket();

  useEffect(() => {
    getOrderbook(id);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.head,
          {
            backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.2 : 0.8)[
              'light'
            ].background,
          },
        ]}>
        <View style={styles.cell}>
          <Text style={styles.headText}>B. Lembar</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Bid (Rp)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Ask (Rp)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>A. Lembar</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.3)[
            'light'
          ].background,
        }}>
        {orderbookLoading ? (
          <View style={{paddingVertical: 16, paddingHorizontal: 12}}>
            <ActivityIndicator color={tint} />
          </View>
        ) : numberOfOrderRow > 0 ? (
          Array.from({length: numberOfOrderRow}).map((_, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {bidList[index].B_Lembar
                    ? numberFormat(bidList[index].B_Lembar)
                    : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {bidList[index].Bid_Rp
                    ? numberFormat(bidList[index].Bid_Rp)
                    : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {askList[index].Ask_Rp
                    ? numberFormat(askList[index].Ask_Rp)
                    : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {askList[index].A_Lembar
                    ? numberFormat(askList[index].A_Lembar)
                    : ''}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={{paddingVertical: 16, paddingHorizontal: 12}}>
            <Text
              style={{fontSize: 12, color: textColor2, textAlign: 'center'}}>
              Belum ada order
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Orderbook;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  head: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  headText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
});
