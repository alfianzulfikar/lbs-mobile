import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DisclosureType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from './Text';
import ICArrowLeft from './icons/ICArrowLeft';
import {useNavigation} from '@react-navigation/native';
import Gap from './Gap';
import DisclosureCard from './DisclosureCard';
import DisclosureCardSkeleton from './DisclosureCardSkeleton';

const DisclosureCarousel = ({
  disclosures,
  loading,
}: {
  disclosures: DisclosureType[];
  loading: boolean;
}) => {
  let textColor = useThemeColor({}, 'text');
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: textColor}]}>
          Keterbukaan Informasi
        </Text>
        <TouchableOpacity
          style={styles.showAllContainer}
          onPress={() => navigation.navigate('Disclosure')}>
          <Text style={styles.showAllText}>Lihat Semua</Text>
          <ICArrowLeft
            size={20}
            style={{transform: [{rotate: '180deg'}]}}
            color={textColor}
          />
        </TouchableOpacity>
      </View>
      <Gap height={24} />
      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Gap width={24} />
          <DisclosureCardSkeleton />
          <Gap width={16} />
          <DisclosureCardSkeleton />
          <Gap width={24} />
        </ScrollView>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={disclosures}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                {index === 0 && <Gap width={24} />}
                <DisclosureCard name={item.name} file={item.file} />
                <Gap width={24} />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default DisclosureCarousel;

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
