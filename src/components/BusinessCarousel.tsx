import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ArticleType, BusinessType} from '../constants/Types';
import {Colors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import Text from './Text';
import BusinessCard from './BusinessCard';
import ArticleCard from './ArticleCard';
import ICArrowLeft from './icons/ICArrowLeft';

const BusinessCarousel = ({
  title,
  businesses,
  articles,
  type,
  onShowAll,
}: {
  title: string;
  businesses?: BusinessType[];
  articles?: ArticleType[];
  type?: string;
  onShowAll?: () => void;
}) => {
  let textColor = useThemeColor({}, 'text');
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        {onShowAll && (
          <TouchableOpacity style={styles.showAllContainer} onPress={onShowAll}>
            <Text style={styles.showAllText}>Lihat Semua</Text>
            <ICArrowLeft
              size={20}
              style={{transform: [{rotate: '180deg'}]}}
              color={textColor}
            />
          </TouchableOpacity>
        )}
      </View>
      <Gap height={24} />
      {type === 'article' ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={articles}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                {index === 0 && <Gap width={16} />}
                <ArticleCard data={item} />
                {/* <Text>{item.title}</Text> */}
                <Gap width={16} />
              </View>
            );
          }}
        />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={businesses}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                {index === 0 && <Gap width={16} />}
                <BusinessCard data={item} />
                <Gap width={16} />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default BusinessCarousel;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  showAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showAllText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
