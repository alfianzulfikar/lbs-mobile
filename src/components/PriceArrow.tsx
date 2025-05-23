import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {usePriceStatus} from '../hooks/usePriceStatus';
import ICDoubleArrow from './icons/ICDoubleArrow';

const PriceArrow = ({
  currentPrice,
  comparisonPrice,
}: {
  currentPrice: number | null;
  comparisonPrice: number | null;
}) => {
  const {priceStatus, priceTextColor} = usePriceStatus();
  return priceStatus(currentPrice, comparisonPrice) !== '' ? (
    <View
      style={{
        transform: [
          {
            rotate:
              priceStatus(currentPrice, comparisonPrice) === 'down'
                ? '180deg'
                : '0deg',
          },
        ],
      }}>
      <ICDoubleArrow color={priceTextColor(currentPrice, comparisonPrice)} />
    </View>
  ) : null;
};

export default PriceArrow;

const styles = StyleSheet.create({});
