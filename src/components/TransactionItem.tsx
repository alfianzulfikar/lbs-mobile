import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from './Text';
import ICCashIn from './icons/ICCashIn';
import ICCashOut from './icons/ICCashOut';
import TransactionIcon from './TransactionIcon';
import dateTimeFormat from '../utils/dateTimeFormat';
import numberFormat from '../utils/numberFormat';

const TransactionItem = ({
  transaction,
  onPress = () => {},
  openDetail,
}: {
  transaction: {
    type: string;
    date: Date;
    nominal: number;
    status: string;
  };
  onPress?: () => void;
  openDetail?: boolean;
}) => {
  useEffect(() => {
    if (openDetail) onPress();
  }, []);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer]}>
        {/* <ICCashOut /> */}
        <TransactionIcon type={transaction.type} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{transaction.type}</Text>
        <Text style={styles.date}>
          {dateTimeFormat(transaction.date, true)}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.amount}>Rp{numberFormat(transaction.nominal)}</Text>
        <Text
          style={[
            styles.status,
            {
              color: ['Pending', 'Hold'].includes(transaction.status)
                ? '#DC6803'
                : ['Failure', 'Expired'].includes(transaction.status)
                ? '#D92D20'
                : ['Open', 'Settlement'].includes(transaction.status)
                ? '#1570EF'
                : '#039855',
            },
          ]}>
          {transaction.status}
        </Text>
      </View>
    </Pressable>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconContainer: {
    // width: 40,
    // height: 40,
    // borderRadius: 20,
    marginRight: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});
