import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import {useDisclosure} from '../api/disclosure';
import DisclosureItem from '../components/DisclosureItem';
import {useThemeColor} from '../hooks/useThemeColor';

const Disclosure = () => {
  const {disclosureList, getDisclosureList, disclosureListLoading} =
    useDisclosure();
  const tint = useThemeColor({}, 'tint');

  useEffect(() => {
    getDisclosureList();
  }, []);
  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Keterbukaan Informasi" />
      <View style={{paddingHorizontal: 24, marginTop: 40}}>
        {disclosureListLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          disclosureList.map((disclosure, disclosureId) => (
            <View
              key={disclosureId}
              style={{
                marginBottom:
                  disclosureId !== disclosureList.length - 1 ? 24 : 0,
              }}>
              <DisclosureItem disclosure={disclosure} />
            </View>
          ))
        )}
      </View>
      <Gap height={40} />
    </ScreenWrapper>
  );
};

export default Disclosure;

const styles = StyleSheet.create({});
