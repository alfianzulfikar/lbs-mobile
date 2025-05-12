import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {DisclosureType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';
import dateTimeFormat from '../utils/dateTimeFormat';
import {useDownload} from '../utils/downloadFile';
import ICFile5 from './icons/ICFile5';
import LoadingModal from './LoadingModal';

const DisclosureItem = ({disclosure}: {disclosure: DisclosureType}) => {
  const {downloadFile} = useDownload();
  const textColor2 = useThemeColor({}, 'text2');
  const textColor4 = useThemeColor({}, 'text4');
  const lineColor = useThemeColor({}, 'line');
  const tint = useThemeColor({}, 'tint');

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await downloadFile({fileUrl: disclosure.file, type: 'download-directly'});
    setLoading(false);
  };

  return (
    <View style={{}}>
      <Text style={[styles.disclosureName, {color: textColor2}]}>
        {disclosure.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        }}>
        <Text style={[styles.disclosureDate, {color: textColor4}]}>
          {dateTimeFormat(disclosure.date, true)}
        </Text>
        <View style={[styles.dot, {backgroundColor: lineColor}]} />
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={handleDownload}>
          <ICFile5 color={tint} />
          <Text style={[styles.file, {color: tint}]}>Buka Dokumen</Text>
        </TouchableOpacity>
      </View>

      {loading && <LoadingModal />}
    </View>
  );
};

export default DisclosureItem;

const styles = StyleSheet.create({
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
