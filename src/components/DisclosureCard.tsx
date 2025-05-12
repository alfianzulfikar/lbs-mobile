import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import Button from './Button';
import Gap from './Gap';
import {RGBAColors} from '../constants/Colors';
import ICDownload from './icons/ICDownload';
import {useDownload} from '../utils/downloadFile';
import BlurOverlay from './BlurOverlay';
import {useColorScheme} from '../hooks/useColorScheme';

const DisclosureCard = ({name, file}: {name: string; file: string}) => {
  const {downloadFile} = useDownload();
  const colorScheme = useColorScheme();
  const {width} = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    await downloadFile({fileUrl: file, type: 'download-directly'});
    setLoading(false);
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: RGBAColors(Platform.OS === 'ios' ? 0.1 : 0.2)[
            'light'
          ].background,
          width: (width * 84) / 100,
        },
      ]}>
      <BlurOverlay />
      <View style={styles.contentWrapper}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Gap flex={1} />
        <View style={styles.buttonWrapper}>
          <Button
            title="Unduh dokumen"
            icon={ICDownload}
            paddingHorizontal={14}
            paddingVertical={8}
            loading={loading}
            onPress={handleDownload}
            fontSize={14}
          />
        </View>
      </View>
    </View>
  );
};

export default DisclosureCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 24,
    // elevation: 1,
    maxWidth: 340,
    aspectRatio: 340 / 192,
  },
  contentWrapper: {
    flex: 1,
    zIndex: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  buttonWrapper: {
    alignItems: 'flex-end',
  },
});
