import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../Text';
import {useColorScheme} from '../../hooks/useColorScheme';
import {RGBAColors} from '../../constants/Colors';
import {useThemeColor} from '../../hooks/useThemeColor';
import numberFormat from '../../utils/numberFormat';
import {useMarket} from '../../api/market';

const Tradebook = ({id}: {id: number}) => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const {tradebookList, tradebookLoading, getTradebook} = useMarket();

  useEffect(() => {
    getTradebook(id);
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
          <Text style={styles.headText}>Price (Rp)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Freq</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Vol</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Value (Rp)</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.3)[
            'light'
          ].background,
        }}>
        {tradebookLoading ? (
          <View style={{paddingVertical: 16, paddingHorizontal: 12}}>
            <ActivityIndicator color={tint} />
          </View>
        ) : tradebookList.length > 0 ? (
          tradebookList.map((item, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.price ? numberFormat(item.price) : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.frequency ? numberFormat(item.frequency) : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.volume ? numberFormat(item.volume) : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.value ? numberFormat(item.value) : ''}
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

export default Tradebook;

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
