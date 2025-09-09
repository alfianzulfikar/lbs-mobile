import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../Text';
import {useColorScheme} from '../../hooks/useColorScheme';
import {RGBAColors} from '../../constants/Colors';
import {useThemeColor} from '../../hooks/useThemeColor';
import numberFormat from '../../utils/numberFormat';
import {useMarket} from '../../api/market';
import ICDoubleArrow from '../icons/ICDoubleArrow';

const Daily = ({id}: {id: number}) => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const textColorSuccess = useThemeColor({}, 'textSuccess');
  const {dailyList, dailyLoading, getDaily} = useMarket();

  useEffect(() => {
    getDaily(id);
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
          <Text style={styles.headText}>Date</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Open (Rp)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Close (Rp)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Change (Rp)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headText}>Volume</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: RGBAColors(colorScheme === 'dark' ? 0.1 : 0.3)[
            'light'
          ].background,
        }}>
        {dailyLoading ? (
          <View style={{paddingVertical: 16, paddingHorizontal: 12}}>
            <ActivityIndicator color={tint} />
          </View>
        ) : dailyList.length > 0 ? (
          dailyList.map((item, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.date || ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.open ? numberFormat(item.open) : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.close ? numberFormat(item.close) : ''}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                {item.change !== 0 && (
                  <View
                    style={{
                      transform: [
                        {rotate: item.change < 0 ? '180deg' : '0deg'},
                      ],
                    }}>
                    <ICDoubleArrow
                      color={
                        item.change < 0
                          ? textColorDanger
                          : item.change > 0
                          ? textColorSuccess
                          : textColor2
                      }
                    />
                  </View>
                )}
                <Text
                  style={[
                    styles.bodyText,
                    {
                      color:
                        item.change < 0
                          ? textColorDanger
                          : item.change > 0
                          ? textColorSuccess
                          : textColor2,
                    },
                  ]}>
                  {item.change ? numberFormat(Math.abs(item.change)) : ''}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.bodyText, {color: textColor2}]}>
                  {item.volume ? numberFormat(item.volume) : ''}
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

export default Daily;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  head: {
    flexDirection: 'row',
  },
  cell: {
    minHeight: 64,
    flex: 1,
    justifyContent: 'center',
    // paddingVertical: 16,
    // paddingHorizontal: 1,
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
  changeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
