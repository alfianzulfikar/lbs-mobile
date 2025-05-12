import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import FAQAccordion from '../components/FAQAccordion';
import {useFAQ} from '../api/faq';
import {FAQType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';

const FAQ = () => {
  const tint = useThemeColor({}, 'tint');
  const {FAQList, getFAQList, FAQLoading} = useFAQ();

  const [keyword, setKeyword] = useState('');
  const [composedList, setComposedList] = useState<FAQType[]>([]);
  const [loading, setLoading] = useState(false);

  const search = () => {
    const lowerCaseKeyword = keyword.toLocaleLowerCase();
    const newList: FAQType[] = FAQList.filter(item => {
      const lowerCaseQuestion = item.question.toLocaleLowerCase();
      const lowerCaseAnswer = item.answer.toLocaleLowerCase();
      return (
        lowerCaseQuestion.includes(lowerCaseKeyword) ||
        lowerCaseAnswer.includes(lowerCaseKeyword)
      );
    });
    setComposedList(newList);
  };

  useEffect(() => {
    getFAQList();
  }, []);

  useEffect(() => {
    setComposedList(FAQList);
    // if (FAQList.length > 0) {
    // }
  }, [FAQList]);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="FAQ" />
      <View style={{paddingHorizontal: 24, paddingTop: 40}}>
        <SearchBar
          keyword={keyword}
          setKeyword={value => setKeyword(value)}
          onSubmit={search}
        />
        <Gap height={16} />
        {FAQLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <FAQAccordion list={composedList} />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default FAQ;

const styles = StyleSheet.create({});
