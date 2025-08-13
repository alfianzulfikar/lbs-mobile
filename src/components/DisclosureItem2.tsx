import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import ICFile5 from './icons/ICFile5';
import dateTimeFormat from '../utils/dateTimeFormat';
import {useDownload} from '../utils/downloadFile';

const DisclosureItem2 = ({
  name,
  date,
  file,
}: {
  name: string;
  date: string;
  file: string;
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
    <View>
      <Text style={[styles.disclosureName, {color: textColor2}]}>{name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        }}>
        <Text style={[styles.disclosureDate, {color: textColor4}]}>
          {dateTimeFormat(date, true)}
        </Text>
        <View style={[styles.dot, {backgroundColor: lineColor}]} />
        {loading ? (
          <ActivityIndicator size={'small'} color={tint} />
        ) : (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => handleDownload(file)}>
            <ICFile5 color={tint} />
            <Text style={[styles.file, {color: tint}]}>Buka Dokumen</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DisclosureItem2;

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
