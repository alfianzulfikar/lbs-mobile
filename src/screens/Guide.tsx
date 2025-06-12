import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import Text from '../components/Text';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';

type GuideType = {title: string; desc: string; image: ReactNode};

const GuideList = ({guides}: {guides: GuideType[]}) => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  return (
    <View style={{marginTop: 24}}>
      {guides.map((item, index) => (
        <View key={index}>
          <View
            style={{
              zIndex: 2,
              flexDirection: 'row',
              marginBottom: index !== guides.length - 1 ? 0 : 0,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  aspectRatio: 153 / 332,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                {item.image}
              </View>
              <Gap height={24} />
            </View>
            <View
              style={[
                styles.point,
                {
                  backgroundColor: RGBAColors(colorScheme == 'dark' ? 0.3 : 0.8)
                    .light.background,
                },
              ]}>
              <View style={[styles.innerPoint, {backgroundColor: tint}]}></View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: (index + 1) % 2 === 0 ? 'flex-start' : 'flex-end',
              }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={[styles.desc, {color: textColor2}]}>
                {item.desc}
              </Text>
              <Gap height={24} />
            </View>
          </View>
          {index !== guides.length - 1 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: RGBAColors(0.5).light.background,
                },
              ]}></View>
          )}
        </View>
      ))}
    </View>
  );
};

const Guide = () => {
  const register: GuideType[] = [
    {
      title: 'Registrasi Nama dan Email',
      desc: 'Masukkan nama lengkap dan email. Pastikan nama sesuai KTP dan email aktif untuk pembuatan akun Anda di LBS Urun Dana.',
      image: (
        <Image
          source={require('../assets/images/guide-register-1.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Verifikasi Email',
      desc: 'Cek email dan kotak masuk Anda, lalu klik tautan verifikasi yang kami kirimkan untuk mengaktifkan akun.',
      image: (
        <Image
          source={require('../assets/images/guide-register-2.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Buat Kata Sandi & Nomor Handphone',
      desc: 'Atur kata sandi yang aman dan isi nomor handphone aktif Anda untuk menerima OTP.',
      image: (
        <Image
          source={require('../assets/images/guide-register-3.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Masukkan Kode OTP',
      desc: 'Masukkan 6-digit OTP yang dikirim via WhatsApp atau SMS untuk memverifikasi nomor Anda.',
      image: (
        <Image
          source={require('../assets/images/guide-register-4.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Akun Berhasil Dibuat',
      desc: 'Akun Anda siap digunakan! Sekarang, saatnya lanjut ke proses Know Your Customer (KYC) untuk mulai berinvestasi.',
      image: (
        <Image
          source={require('../assets/images/guide-register-5.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
  ];

  const kyc: GuideType[] = [
    {
      title: 'Mulai Verifikasi Identitas (KYC)',
      desc: 'Klik tombol Isi Data KYC, untuk melanjutkan proses KYC',
      image: (
        <Image
          source={require('../assets/images/guide-kyc-1.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Siapkan Identitas Diri',
      desc: 'Siapkan KTP dan Single Investor Identification atau SID (jika ada), sebelum mulai mengisi data.',
      image: (
        <Image
          source={require('../assets/images/guide-kyc-2.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Lengkapi Data KYC',
      desc: 'Isi seluruh data pribadi, pekerjaan, dan rekening bank. Fokus pada kolom bertanda wajib.',
      image: (
        <Image
          source={require('../assets/images/guide-kyc-3.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Setujui Syarat dan Ketentuan',
      desc: 'Baca & pahami syarat ketentuan yang berlaku. Jika sudah, klik centang sebagai tanda persetujuan sebelum kirim data.',
      image: (
        <Image
          source={require('../assets/images/guide-kyc-4.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Menunggu Verifikasi Tim Internal',
      desc: 'Tim kami akan meninjau data Anda dalam 3x24 jam. Pantau notifikasi di aplikasi.',
      image: (
        <Image
          source={require('../assets/images/guide-kyc-5.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Verifikasi KYC Berhasil',
      desc: 'Selamat! Data Anda telah diverifikasi. Kini Anda bisa memulai investasi di LBS Urun Dana.',
      image: (
        <Image
          source={require('../assets/images/guide-kyc-6.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
  ];

  const investment: GuideType[] = [
    {
      title: 'Temukan dan Pilih Bisnis',
      desc: 'Jelajahi berbagai proyek bisnis yang terdaftar di LBS Urun Dana dan pilih yang sesuai dengan minat Anda.',
      image: (
        <Image
          source={require('../assets/images/guide-invest-1.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Baca Prospektus Proyek',
      desc: 'Pastikan Anda membaca prospektus untuk memahami informasi penting seputar bisnis, risiko, dan potensi imbal hasil dari efek yang dipilih.',
      image: (
        <Image
          source={require('../assets/images/guide-invest-2.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Lakukan Pemesanan Efek',
      desc: 'Masukkan jumlah efek yang ingin Anda pesan dan pastikan nominalnya sesuai keinginan Anda.',
      image: (
        <Image
          source={require('../assets/images/guide-invest-3.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Selesaikan Pembayaran',
      desc: 'Pilih metode pembayaran dan lakukan pembayaran sebelum waktu berakhir agar pemesanan Anda tercatat.',
      image: (
        <Image
          source={require('../assets/images/guide-invest-4.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      title: 'Pemesanan Efek Berhasil',
      desc: 'Transaksi Anda telah berhasil. Anda bisa cek detail kepemilikan efek di halaman portofolio.',
      image: (
        <Image
          source={require('../assets/images/guide-invest-5.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
  ];
  return (
    <ScreenWrapper background backgroundType="gradient">
      <Gap height={24} />
      <Header title="Panduan Investasi" />
      <Gap height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 24, marginTop: 20}}>
          <Text style={styles.heading}>Langkah Pertama: Membuat Akun</Text>
          <GuideList guides={register} />
          <Gap height={40} />
          <Text style={styles.heading}>Langkah Kedua: Mengisi Data KYC</Text>
          <GuideList guides={kyc} />
          <Gap height={40} />
          <Text style={styles.heading}>Langkah Ketiga: Mulai Investasi</Text>
          <GuideList guides={investment} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Guide;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  line: {
    position: 'absolute',
    width: 2,
    height: '100%',
    left: '50%',
    transform: [{translateX: '-50%'}],
    top: 4,
  },
  point: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  innerPoint: {width: 10, height: 10, borderRadius: 5},
  title: {fontSize: 14, fontWeight: '600', lineHeight: 20},
  desc: {fontSize: 14, lineHeight: 16, marginTop: 8},
});
