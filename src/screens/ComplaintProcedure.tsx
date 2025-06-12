import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import Badge from '../components/Badge';
import RoundedNumbering from '../components/RoundedNumbering';
import ICFile4 from '../components/icons/ICFile4';
import ICHoldingMoney from '../components/icons/ICHoldingMoney';
import ICWalletWithMoney from '../components/icons/ICWalletWithMoney';
import ICHandShake from '../components/icons/ICHandShake';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from '../hooks/useColorScheme';

const ComplaintProcedure = () => {
  const {width} = useWindowDimensions();
  let colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');

  const procedureStandart = [
    {
      title: 'Menyampaikan Aduan',
      desc: 'Pengaduan disampaikan melalui email customercare@lbs.id dan mengisi form secara tertulis yang telah disediakan oleh Admin LBS',
    },
    {
      title: 'LBS Urun Dana Merespon Aduan',
      desc: 'Tim LBS akan memberikan feedback atau tanggapan pengaduan dalam waktu paling lama 20 (dua puluh) hari kerja sejak menerima laporan tersebut',
    },
    {
      title: 'Jika Pengaduan Telah Diselesaikan',
      desc: 'Menandatangani form kesepahaman yang dibubuhi tanda tangan digital menyebutkan bahwa proses pengaduan telah dilaksanakan dan telah diselesaikan oleh kedua belah pihak',
    },
    {
      title: 'Jika Tidak Ditemukan Penyelesaian',
      desc: 'Apabila tidak ditemukan titik penyelesaian terhadap pengaduan maka penyelesaian dapat dilakukan dengan penyelesaian lain melalui penyelesaian sengketa diluar pengadilan, penyelesaian sengketa melalui Otoritas Jasa Keuangan, atau melalui pengadilan',
    },
  ];

  const procedureTypes = [
    {
      text: 'Ketidaksesuaian Perjanjian',
      image: <ICFile4 color={textColor} />,
    },
    {
      text: 'Kerugian Secara Material',
      image: <ICHoldingMoney color={textColor} />,
    },
    {
      text: 'Berkaitan dengan Aspek Finansial',
      image: <ICWalletWithMoney color={textColor} />,
    },
    {
      text: 'Telah Memenuhi Kewajiban Kepada LBS Urun Dana',
      image: <ICHandShake color={textColor} />,
    },
  ];

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      scrollView
      overlay
      header
      headerTitle="Prosedur Pengaduan">
      <View style={styles.container}>
        <Text style={styles.heading}>
          Standar Prosedur Layanan Pengaduan LBS Urun Dana
        </Text>
        <Gap height={8} />
        <Text style={[styles.desc, {color: textColor2}]}>
          Pemodal atau penerbit melakukan pengaduan mengenai kendala atau
          ungkapan ketidakpuasan yang dihadapi melalui Layanan Pengaduan LBS
        </Text>
        <Gap height={24} />
        {procedureStandart.map((item, id) => (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: id !== procedureStandart.length - 1 ? 24 : 0,
            }}
            key={id}>
            <RoundedNumbering text={id + 1} />
            <View style={{flex: 1, marginLeft: 16}}>
              <Text style={styles.standartTitle}>{item.title}</Text>
              <Text style={[styles.standartText, {color: textColor2}]}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
        <Gap height={40} />
        <Text style={styles.heading}>
          Pengumpulan informasi terkait penanganan pengaduan yang dapat diproses
          LBS Urun Dana mencakup (namun tidak terbatas) pada:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 36,
          }}>
          {procedureTypes.map((item, id) => (
            <View
              style={{
                width: (width - 48 - 18) / 2,
                marginTop: [2, 3].includes(id) ? 44 : 0,
                alignItems: 'center',
              }}
              key={id}>
              <View style={styles.iconWrapper}>
                <LinearGradient
                  colors={
                    colorScheme === 'dark'
                      ? ['#404040', '#1A1A1A']
                      : ['#FFFFFF', '#E0E0E0']
                  }
                  style={{position: 'absolute', width: '100%', height: '100%'}}
                />
                {item.image}
              </View>
              <Text style={styles.procedureTypesText}>{item.text}</Text>
            </View>
          ))}
        </View>
        <Gap height={40} />
        <Text style={[styles.heading, {textAlign: 'center'}]}>
          Mekanisme Pengaduan
        </Text>
        <View
          style={{width: width - 48, aspectRatio: 337 / 838, marginTop: 24}}>
          <Image
            source={
              colorScheme === 'dark'
                ? require('../assets/images/complaint-flow-chart-dark.png')
                : require('../assets/images/complaint-flow-chart-light.png')
            }
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ComplaintProcedure;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
  },
  standartTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  standartText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 4,
  },
  procedureTypesText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 12,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
