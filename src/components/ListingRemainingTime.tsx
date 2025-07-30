import {StyleSheet} from 'react-native';
import React from 'react';
import ICTime from './icons/ICTime';
import {useThemeColor} from '../hooks/useThemeColor';
import {remainingTime} from '../utils/remainingTime';
import Badge from './Badge';

const ListingRemainingTime = ({targetDate}: {targetDate: string | number}) => {
  const tint = useThemeColor({}, 'tint');

  return (
    <Badge
      icon={<ICTime color={tint} />}
      text={`Sisa Waktu ${remainingTime(targetDate)}`}
    />
  );
};

export default ListingRemainingTime;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  text: {
    fontWeight: '700',
  },
});
