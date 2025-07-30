import {Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Text from './Text';
import {RGBAColors} from '../constants/Colors';
import ICCaretArrowDown from './icons/ICCaretArrowDown';
import {useThemeColor} from '../hooks/useThemeColor';
import BottomSheet from './BottomSheet';
import {useColorScheme} from '../hooks/useColorScheme';
import {useFocusEffect} from '@react-navigation/native';

const DropdownInput = ({
  value,
  setValue,
  option = [],
}: {
  value: string;
  setValue: (value: string) => void;
  // React.Dispatch<React.SetStateAction<string>>
  option?: {id: string; name: string}[];
}) => {
  let colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const [showOption, setShowOption] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowOption(false);
      };
    }, []),
  );

  return (
    <>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: RGBAColors(0.5)[colorScheme].background,
            borderColor: RGBAColors(0.1)[colorScheme].text,
          },
        ]}
        onPress={() => setShowOption(true)}>
        <Text style={[styles.text, {color: textColor2}]}>
          {option.find(item => item.id === value)?.name}
        </Text>
        <View style={{width: 20, alignItems: 'center'}}>
          <ICCaretArrowDown color={textColor2} />
        </View>
      </Pressable>

      {showOption && (
        <BottomSheet setShow={setShowOption}>
          {option.map((item, id) => (
            <Pressable
              key={id}
              style={{
                paddingVertical: 20,
                borderBottomWidth: id !== option.length - 1 ? 1 : 0,
                borderColor: RGBAColors(0.1)[colorScheme].text,
              }}
              onPress={() => {
                setValue(item.id);
                setShowOption(false);
              }}>
              <Text style={{fontSize: 16, color: textColor2}}>{item.name}</Text>
            </Pressable>
          ))}
        </BottomSheet>
      )}
    </>
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  bottomSheetContainer: {
    flex: 1,
    // padding: 36,
    alignItems: 'center',
  },
});
