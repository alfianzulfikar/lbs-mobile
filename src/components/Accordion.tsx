import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import BlurOverlay from './BlurOverlay';
import ICCaretArrowDown from './icons/ICCaretArrowDown';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {BankMethodType, BankProcedureType} from '../constants/Types';
import Gap from './Gap';
import {useColorScheme} from '../hooks/useColorScheme';

const AccordionItem = ({title, list}: BankMethodType) => {
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
          <Text style={styles.title}>{title}</Text>
          <ICCaretArrowDown color={iconColor} />
        </Pressable>
        <View
          style={[
            styles.listContainer,
            {height: show ? 'auto' : 0, paddingBottom: show ? 14 : 0},
          ]}>
          {list.map((item, id) => (
            <View key={id} style={{flexDirection: 'row'}}>
              <Text style={[styles.methodText, {color: textColor2, width: 24}]}>
                {id + 1}.
              </Text>
              <Text style={[styles.methodText, {color: textColor2, flex: 1}]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const Accordion = ({list}: {list: BankMethodType[]}) => {
  return (
    <View>
      {list.map((item, id) => (
        <View key={id}>
          <AccordionItem title={item.title} list={item.list} />
          {id !== list.length - 1 && <Gap height={16} />}
        </View>
      ))}
    </View>
  );
};

export default Accordion;

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
});
