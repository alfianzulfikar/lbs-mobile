import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {FAQType} from '../constants/Types';
import Markdown from 'react-native-markdown-display';
import AccordionItem from './AccordionItem';

const FAQAccordion = ({list}: {list: FAQType[]}) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  return (
    <View>
      {list.map((item, id) => (
        <View style={{marginBottom: id !== list.length ? 16 : 0}} key={id}>
          <AccordionItem
            question={item.question}
            answer={item.answer}
            // aboutUs={id === 0}
            show={activeAccordion === id ? true : false}
            setShow={setActiveAccordion}
            itemIndex={id}
          />
        </View>
      ))}
    </View>
  );
};

export default FAQAccordion;

const styles = StyleSheet.create({});
