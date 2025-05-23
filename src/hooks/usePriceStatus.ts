import {useThemeColor} from './useThemeColor';

export const usePriceStatus = () => {
  const textColorSuccess = useThemeColor({}, 'textSuccess');
  const textColorDanger = useThemeColor({}, 'textDanger');
  const textColor = useThemeColor({}, 'text');

  const priceStatus = (
    currentPrice: number | null,
    comparisonPrice: number | null,
  ) => {
    return currentPrice && comparisonPrice
      ? currentPrice > comparisonPrice
        ? 'up'
        : currentPrice < comparisonPrice
        ? 'down'
        : ''
      : '';
  };

  const priceTextColor = (
    currentPrice: number | null,
    closePrice: number | null,
  ) => {
    const status = priceStatus(currentPrice, closePrice);
    return status === 'up'
      ? textColorSuccess
      : status === 'down'
      ? textColorDanger
      : textColor;
  };

  return {priceStatus, priceTextColor};
};
