import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import {FAQType} from '../constants/Types';
import Markdown from 'react-native-markdown-display';
import AccordionItem from './AccordionItem';

const FAQAccordion = ({list}: {list: FAQType[]}) => {
  return (
    <View>
      {list.map((item, id) => (
        <View style={{marginBottom: id !== list.length ? 16 : 0}} key={id}>
          <AccordionItem question={item.question} answer={item.answer} />
        </View>
      ))}
    </View>
  );
};

export default FAQAccordion;

const styles = StyleSheet.create({});
