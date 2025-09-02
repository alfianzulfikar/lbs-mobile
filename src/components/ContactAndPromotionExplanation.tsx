import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import CustomBottomSheet from './BottomSheet';
import {useThemeColor} from '../hooks/useThemeColor';

const ContactAndPromotionExplanation = ({
  onDismiss,
}: {
  onDismiss: () => void;
}) => {
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');

  const data = [
    {
      text: 'Saya memberikan izin kepada PT LBS Urun Dana untuk menghubungi saya melalui media komunikasi pribadi, termasuk namun tidak terbatas pada WhatsApp, email, dan telepon, terkait dengan:',
      list: [
        'Informasi produk investasi dan peluang pendanaan yang tersedia di platform LBS Urun Dana.',
        'Promosi, edukasi, dan program khusus yang berkaitan dengan layanan LBS Urun Dana.',
        'Update terkait perkembangan regulasi, fitur aplikasi, dan informasi perusahaan lainnya yang relevan.',
      ],
    },
    {
      text: 'Saya memahami bahwa persetujuan ini tidak bersifat wajib dan saya berhak untuk mencabut persetujuan kapan saja dengan cara menghubungi layanan pelanggan LBS Urun Dana.',
    },
    {
      text: 'Saya menyetujui bahwa data pribadi saya akan digunakan sesuai dengan Kebijakan Privasi dan Peraturan Perlindungan Data Pribadi yang berlaku.',
    },
  ];

  return (
    <CustomBottomSheet paddingHorizontal={24} onDismiss={onDismiss}>
      <Text style={[styles.contactAndPromotionTitle, {color: textColor}]}>
        Dengan mencentang kotak persetujuan ini, saya menyatakan bahwa:
      </Text>
      {data.map((item, index) => (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: index !== data.length - 1 ? 16 : 0,
          }}
          key={index}>
          <Text
            style={[
              styles.contactAndPromotionText,
              {width: 20, color: textColor2},
            ]}>
            {index + 1}.
          </Text>
          <View style={{flex: 1}}>
            <Text style={[styles.contactAndPromotionText, {color: textColor2}]}>
              {item.text}
            </Text>
            {item.list &&
              item.list.map((item2, index2) => (
                <View style={{flex: 1}} key={index2}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={[
                        styles.dot,
                        {backgroundColor: textColor2},
                      ]}></View>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          styles.contactAndPromotionText,
                          {color: textColor2},
                        ]}>
                        {item2}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ))}
    </CustomBottomSheet>
  );
};

export default ContactAndPromotionExplanation;

const styles = StyleSheet.create({
  contactAndPromotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
  },
  contactAndPromotionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 15,
    transform: [{translateY: 8}],
  },
});
