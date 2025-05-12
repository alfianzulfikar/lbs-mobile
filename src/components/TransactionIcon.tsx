import {StyleSheet, View} from 'react-native';
import React from 'react';
import ICCashIn from './icons/ICCashIn';
import ICCashOut from './icons/ICCashOut';

const TransactionIcon = ({
  type,
  width = 20,
  height = 18,
}: {
  type?: string;
  width?: number;
  height?: number;
}) => {
  const borderColor =
    type === 'Penjualan'
      ? '#FECDD3'
      : type === 'Pokok'
      ? '#BAE6FD'
      : type === 'Pengembalian'
      ? '#FED7AA'
      : '#A7F3D0';
  const backgroundColor =
    type === 'Penjualan'
      ? '#FFF1F2'
      : type === 'Pokok'
      ? '#F0F9FF'
      : type === 'Pengembalian'
      ? '#FFF7ED'
      : '#ECFDF5';
  const color =
    type === 'Penjualan'
      ? '#E11D48'
      : type === 'Pokok'
      ? '#0284C7'
      : type === 'Pengembalian'
      ? '#EA580C'
      : '#059669';

  return (
    <View style={[styles.circle, {borderColor, backgroundColor}]}>
      {type === 'Pembelian' ? (
        <ICCashIn color={color} width={width} height={height} />
      ) : (
        <ICCashOut color={color} width={width} height={height} />
      )}
    </View>
  );
};

export default TransactionIcon;

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
