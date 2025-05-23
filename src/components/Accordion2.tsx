import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import ICCaretArrowDown from './icons/ICCaretArrowDown';
import BlurOverlay from './BlurOverlay';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';

type ItemType = string | {title: string; pharagraph?: string; list?: string[]};

const AccordionItem = ({
  title,
  list,
  pharagraph,
  show,
  setShow,
  itemIndex,
}: {
  title: string;
  list: ItemType[];
  pharagraph: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<number | null>>;
  itemIndex: number;
}) => {
  let colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: RGBAColors(0.5)[colorScheme].background,
          borderRadius: show ? 26 : 40,
        },
      ]}>
      <BlurOverlay />
      <View style={styles.contentContainer}>
        <Pressable
          style={styles.titleContainer}
          onPress={() => setShow(show ? null : itemIndex)}>
          <Text style={styles.title}>{title}</Text>
          <ICCaretArrowDown color={iconColor} />
        </Pressable>
        <View
          style={[
            styles.listContainer,
            {height: show ? 'auto' : 0, paddingBottom: show ? 14 : 0},
          ]}>
          {pharagraph && (
            <Text style={[styles.pharagraph, {color: textColor2}]}>
              {pharagraph}
            </Text>
          )}
          {list.map((item, index) => (
            <View key={index}>
              {typeof item === 'string' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[styles.pharagraph, {color: textColor2, width: 20}]}>
                    {index + 1}.
                  </Text>
                  <Text
                    style={[styles.pharagraph, {color: textColor2, flex: 1}]}>
                    {item}
                  </Text>
                </View>
              )}
              {typeof item !== 'string' ? (
                item.title ? (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={[
                          styles.pharagraph,
                          {color: textColor2, width: 20},
                        ]}>
                        {index + 1}.
                      </Text>
                      <Text
                        style={[
                          styles.pharagraph,
                          {color: textColor2, flex: 1},
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                    {item.pharagraph && (
                      <Text
                        style={[
                          styles.pharagraph,
                          {color: textColor2, marginLeft: 20},
                        ]}>
                        {item.pharagraph}
                      </Text>
                    )}
                    {item.list &&
                      item.list.map((item2, index2) => (
                        <View
                          style={{flexDirection: 'row', marginLeft: 20}}
                          key={index2}>
                          <Text
                            style={[
                              styles.pharagraph,
                              {color: textColor2, width: 20},
                            ]}>
                            {/* {index2 + 1}. */}-
                          </Text>
                          <Text
                            style={[
                              styles.pharagraph,
                              {color: textColor2, flex: 1},
                            ]}>
                            {item2}
                          </Text>
                        </View>
                      ))}
                  </View>
                ) : null
              ) : null}
            </View>
          ))}
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
    </View>
  );
};

const Accordion2 = ({
  list,
}: {
  list: {title: string; list: ItemType[]; pharagraph: string}[];
}) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  return (
    <View>
      {list.map((item, index) => (
        <View
          key={index}
          style={{marginBottom: index !== list.length - 1 ? 16 : 0}}>
          <AccordionItem
            title={item.title}
            pharagraph={item.pharagraph}
            list={item.list}
            show={activeAccordion === index ? true : false}
            setShow={setActiveAccordion}
            itemIndex={index}
          />
        </View>
      ))}
    </View>
  );
};

export default Accordion2;

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
    paddingHorizontal: 18,
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
  pharagraph: {
    fontSize: 14,
    lineHeight: 20,
  },
});
