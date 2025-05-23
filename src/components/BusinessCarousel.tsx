import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ArticleType, BusinessType} from '../constants/Types';
import {Colors} from '../constants/Colors';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import Text from './Text';
import BusinessCard from './BusinessCard';
import ArticleCard from './ArticleCard';
import ICArrowLeft from './icons/ICArrowLeft';
import BusinessCardSkeleton from './BusinessCardSkeleton';
import ArticleCardSkeleton from './ArticleCardSkeleton';

const BusinessCarousel = ({
  title,
  businesses,
  articles,
  type,
  onShowAll,
  loading,
}: {
  title: string;
  businesses?: BusinessType[];
  articles?: ArticleType[];
  type?: string;
  onShowAll?: () => void;
  loading?: boolean;
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
      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Gap width={24} />
          {type === 'article' ? (
            <>
              <ArticleCardSkeleton />
              <Gap width={16} />
              <ArticleCardSkeleton />
            </>
          ) : (
            <>
              <BusinessCardSkeleton />
              <Gap width={16} />
              <BusinessCardSkeleton />
            </>
          )}
          <Gap width={24} />
        </ScrollView>
      ) : type === 'article' ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={articles}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                {index === 0 && <Gap width={24} />}
                <ArticleCard data={item} />
                <Gap width={index !== (articles || []).length - 1 ? 16 : 24} />
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
                {index === 0 && <Gap width={24} />}
                <BusinessCard data={item} />
                <Gap
                  width={index !== (businesses || []).length - 1 ? 16 : 24}
                />
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
    paddingHorizontal: 24,
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
