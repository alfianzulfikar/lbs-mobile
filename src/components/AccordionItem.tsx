import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from './BlurOverlay';
import ICCaretArrowDown from './icons/ICCaretArrowDown';
import Markdown from 'react-native-markdown-display';
import {useColorScheme} from '../hooks/useColorScheme';
import Gap from './Gap';

const AccordionItem = ({
  question,
  answer,
  markdown,
}: {
  question: string;
  answer: string;
  markdown?: string;
}) => {
  let colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const iconColor = useThemeColor({}, 'icon');
  const [show, setShow] = useState(false);

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: RGBAColors(0.4)[colorScheme].background,
          borderRadius: show ? 26 : 40,
        },
      ]}>
      <BlurOverlay />
      <View style={styles.contentContainer}>
        <Pressable
          style={styles.titleContainer}
          onPress={() => setShow(prev => !prev)}>
          <Text style={styles.title}>{question}</Text>
          <Gap width={8} />
          <ICCaretArrowDown color={iconColor} />
        </Pressable>
        <View style={{height: show ? 'auto' : 0}}>
          <View style={[styles.listContainer]}>
            <Markdown
              style={
                colorScheme === 'dark'
                  ? markdownStylesDark
                  : markdownStylesLight
              }>
              {answer}
            </Markdown>
            {/* {list.map((item, id) => (
            <View key={id} style={{flexDirection: 'row'}}>
              <Text style={[styles.methodText, {color: textColor2, width: 20}]}>
                {id + 1}.
              </Text>
              <Text style={[styles.methodText, {color: textColor2, flex: 1}]}>
                {item}
              </Text>
            </View>
          ))} */}
          </View>
        </View>
        {/* {show && (
        )} */}
      </View>
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  itemContainer: {
    overflow: 'hidden',
  },
  contentContainer: {
    zIndex: 2,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  listContainer: {
    paddingBottom: 14,
    paddingHorizontal: 18,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  methodText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

const markdownStylesLight = StyleSheet.create({
  body: {
    color: '#404040',
  },
});

const markdownStylesDark = StyleSheet.create({
  body: {
    color: '#E0E0E0',
  },
});
