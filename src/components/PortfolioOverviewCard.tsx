import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import Badge from './Badge';
import Gap from './Gap';
import numberFormat from '../utils/numberFormat';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const PortfolioOverviewCard = ({
  volume,
  type,
}: {
  volume: number;
  type: string;
}) => {
  let colorScheme = useColorScheme();
  const textColor3 = useThemeColor({}, 'text3');
  const {width} = Dimensions.get('window');
  return (
    <View
      style={{
        width: (width * 84) / 100,
        maxWidth: 340,
        aspectRatio: 340 / 192,
      }}>
      <ImageBackground
        source={
          colorScheme === 'dark'
            ? require('../assets/images/portfolio-card-dark.png')
            : require('../assets/images/portfolio-card-light.png')
        }
        style={[styles.cardImageBackground, {width: (width * 84) / 100}]}
        resizeMode="contain"
      />
      <View style={styles.cardContentContainer}>
        <Badge text={'Portofolio ' + type} />
        <Gap flex={1} />
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.volume}>
            {type === 'Sukuk'
              ? 'Rp' + numberFormat(volume)
              : numberFormat(volume) + ' Lembar'}
          </Text>
          <Text style={[styles.volumeLabel, {color: textColor3}]}>
            {type === 'Sukuk' ? 'Nominal' : 'Jumlah Lembar'} {type}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PortfolioOverviewCard;

const styles = StyleSheet.create({
  cardImageBackground: {
    position: 'absolute',
    left: 1,
    top: 1,
    maxWidth: 340,
    aspectRatio: 340 / 192,
  },
  cardContentContainer: {
    zIndex: 2,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
  },
  volume: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
  },
  volumeLabel: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
