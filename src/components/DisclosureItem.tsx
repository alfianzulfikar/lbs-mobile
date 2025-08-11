import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {DisclosureType, GroupedDisclosureType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';
import dateTimeFormat from '../utils/dateTimeFormat';
import {useDownload} from '../utils/downloadFile';
import ICFile5 from './icons/ICFile5';
import LoadingModal from './LoadingModal';
import Gap from './Gap';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import ICCaretArrowDown from './icons/ICCaretArrowDown';

const DisclosureItem = ({
  disclosure,
  isActive,
  setActiveCard,
}: {
  disclosure: GroupedDisclosureType;
  isActive: boolean;
  setActiveCard: () => void;
}) => {
  const {downloadFile} = useDownload();
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor4 = useThemeColor({}, 'text4');
  const lineColor = useThemeColor({}, 'line');
  const tint = useThemeColor({}, 'tint');

  const [loading, setLoading] = useState(false);

  const handleDownload = async (file: string) => {
    setLoading(true);
    await downloadFile({fileUrl: file, type: 'download-directly'});
    setLoading(false);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: RGBAColors(0.5)[colorScheme].background,
          borderColor: RGBAColors(0.2)[colorScheme].text,
        },
      ]}>
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={setActiveCard}>
        <Text style={[styles.merkDagang, {color: textColor}]}>
          {disclosure.merkDagang}
        </Text>
        <Gap width={8} />
        <View style={{transform: [{rotate: isActive ? '180deg' : '0deg'}]}}>
          <ICCaretArrowDown color={textColor} />
        </View>
      </Pressable>
      <View style={{height: isActive ? 'auto' : 0, overflow: 'hidden'}}>
        <Gap height={24} />
        {disclosure.list.length > 0 ? (
          disclosure.list.map((item, i) => (
            <View
              key={i}
              style={{marginBottom: i !== disclosure.list.length - 1 ? 24 : 0}}>
              <Text style={[styles.disclosureName, {color: textColor2}]}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Text style={[styles.disclosureDate, {color: textColor4}]}>
                  {dateTimeFormat(item.date, true)}
                </Text>
                <View style={[styles.dot, {backgroundColor: lineColor}]} />
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => handleDownload(item.file)}>
                  <ICFile5 color={tint} />
                  <Text style={[styles.file, {color: tint}]}>Buka Dokumen</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>Belum ada keterbukaan informasi untuk bisnis ini.</Text>
        )}
      </View>

      {loading && <LoadingModal />}
    </View>
  );
};

export default DisclosureItem;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1,
  },
  merkDagang: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  disclosureName: {
    fontSize: 14,
    lineHeight: 20,
  },
  disclosureDate: {
    fontSize: 12,
    lineHeight: 16,
  },
  file: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    marginLeft: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
