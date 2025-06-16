import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import {useThemeColor} from '../hooks/useThemeColor';
import MarketBusinessCard from '../components/MarketBusinessCard';
import Button from '../components/Button';
import AccordionItem from '../components/AccordionItem';
import Accordion2 from '../components/Accordion2';
import {useNavigation} from '@react-navigation/native';

const MarketGuide = () => {
  const colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const businessList = [
    {
      title: 'Frutta Gelato',
      desc: 'Frutta Gelato adalah merek gelato milik PT Bali Internusa Gelatonesia asli Bali yang sudah ekspansi di Jabodetabek, Bandung, Yogyakarta, dan Balikpapan. Selain itu Frutta Gelato pelopor Es Krim Gelato Halal Pertama di Indonesia.',
      image: (
        <ImageBackground
          source={require('../assets/images/frutta.jpg')}
          style={styles.businessCardImage}
          resizeMode="cover"
        />
      ),
    },
    {
      title: 'RSIA Annisa Pekanbaru',
      desc: 'PT Kartini Bangun Bangsa adalah sebuah perusahaan yang memayungi Rumah Sakit Ibu & Anak Annisa sejak 1997 yang berletak di Pekanbaru.',
      image: (
        <ImageBackground
          source={require('../assets/images/rsia.jpg')}
          style={styles.businessCardImage}
          resizeMode="cover"
        />
      ),
    },
    {
      title: "Radaza D'mamam",
      desc: "D'mamam adalah produsen homemade frozenfood sehat spesialis nugget todler yang didirikan pada tahun 2015 yang memiliki 11 offline store dan sejumlah agen yang sudah bertebaran hampir di seluruh Indonesia.",
      image: (
        <ImageBackground
          source={require('../assets/images/dmamam.jpg')}
          style={styles.businessCardImage}
          resizeMode="cover"
        />
      ),
    },
    {
      title: 'Makacha Bakery',
      desc: 'PT Makacha Boga Utama (Makacha Bakery) adalah perusahaan roti dan kue asal Pekanbaru, Riau yang didirikan pada tahun 2017. Selain roti dan kue, Makacha yang sudah memiliki beberapa toko offline itu juga memproduksi kemojo, kue khas Riau sebagai bentuk pelestarian kuliner lokal.',
      image: (
        <ImageBackground
          source={require('../assets/images/makacha.jpg')}
          style={styles.businessCardImage}
          resizeMode="cover"
        />
      ),
    },
    {
      title: 'Harvies Coffee',
      desc: 'PT Sinar Kopi Nusantara, didirikan Tommy Harvie pada 2014 di Aceh dengan brand Harvies Coffee. Fokus pada kopi Gayo, cafe ini bebas rokok dan dilarang bermain game untuk menjaga positive vibes di cafe tersebut.',
      image: (
        <ImageBackground
          source={require('../assets/images/harvies.jpg')}
          style={styles.businessCardImage}
          resizeMode="cover"
        />
      ),
    },
  ];

  const FAQ = [
    {
      title: 'Apa itu Pasar Sekunder?',
      pharagraph:
        'Pasar sekunder merupakan mekanisme jual beli saham antara investor yang difasilitasi oleh platform LBS Urun Dana. Berbeda dengan pasar sekunder di Bursa Efek Indonesia yang transaksi dilakukan melalui Bursa, untuk SCF transaksi pasar sekunder dilakukan oleh masing - masing penyelenggara. Efek yang bisa ditransaksikan saat ini berdasarkan POJK hanya saham dan dengan ketentuan saham yang sudah tercatat di KSEI selama 12 bulan sebelum dapat diperdagangkan.',
      list: [],
    },
    {
      title: 'Bagaimana Ketentuan Pelaksanaan Pasar Sekunder di LBS Urun Dana?',
      pharagraph: '',
      list: [
        'Pasar Sekunder dibuka setiap 2 kali periode dalam 1 tahun',
        'Pasar Sekunder dibuka selama 10 hari kerja dalam 1 kali periode',
        'Perdagangan saham di Pasar Sekunder dilaksanakan pada pukul 09.00 - 16.00',
        'Pasar Sekunder tidak dibuka pada hari Sabtu, Ahad, dan Libur Nasional',
        'Saham yang bisa ditransaksikan dengan ketentuan saham yang sudah tercatat di KSEI selama 12 bulan sebelum dapat diperdagangkan',
      ],
    },
    {
      title: 'Apa saja syarat untuk dapat bertransaksi di Pasar Sekunder?',
      pharagraph: '',
      list: [
        'Anda harus memiliki akun dan sudah menyelesaikan proses KYC untuk bertransaksi di Pasar Sekunder',
        'Anda harus memiliki Sub Rekening Efek (SRE) di Bank Kustodian. Untuk nasabah baru akan dibuatkan SRE setelah melengkapi KYC',
      ],
    },
    {
      title:
        'Apa saja ketentuan perdagangan saham di Pasar Sekunder LBS Urun Dana?',
      pharagraph: '',
      list: [
        {
          title:
            'Fraksi harga merupakan langkah perubahan minimal atau kenaikan/penurunan terkecil yang bisa terjadi pada harga saham saat diperdagangkan. Berikut adalah ketentuan fraksi harga Pasar Sekunder LBS Urun Dana:',
          list: [
            'Harga saham < Rp 200 menggunakan fraksi harga Rp1',
            'Harga saham Rp 200 - Rp 500 menggunakan fraksi harga Rp2',
            'Harga saham Rp 500 - Rp 2.000 menggunakan fraksi harga Rp5',
            'Harga saham Rp 2.000 - Rp 5.000 menggunakan fraksi harga Rp10',
            'Harga saham > Rp 5.000 menggunakan fraksi harga Rp25',
          ],
          type: 'dot',
        },
        'Terdapat Auto Reject Atas (ARA), yaitu batas kenaikan harga tertinggi sebuah saham. Jadi, investor tidak dapat melakukan pembelian atau penjualan saham melewati batas tertinggi yang sudah ditentukan. ARA yang ditetapkan sebesar 10%',
        'Terdapat Auto Reject Bawah (ARB), yaitu batas kenaikan harga terendah sebuah saham. Jadi, investor tidak dapat melakukan pembelian atau penjualan saham melewati batas terendah yang sudah ditentukan. ARB yang ditetapkan sebesar 10%',
      ],
    },
    {
      title:
        'Apa saja istilah yang perlu saya ketahui saat bertransaksi di Pasar Sekunder LBS Urun Dana?',
      pharagraph: '',
      list: [
        {
          title: 'Current Price',
          pharagraph:
            'Harga saham saat ini yang terus berubah, harga bisa naik ataupun turun',
        },
        {
          title: 'Buy Shares',
          pharagraph:
            'Total lembar beli (Bid) yang ditawarkan pada saham tersebut dalam satu hari perdagangan',
        },
        {
          title: 'Sell Shares',
          pharagraph:
            'Total lembar jual (Ask) yang ditawarkan pada saham tersebut dalam satu hari perdagangan',
        },
        {
          title: 'Open Price',
          pharagraph:
            'Harga saham pada transaksi pertama yang dilakukan dalam satu hari perdagangan',
        },
        {
          title: 'Close Price',
          pharagraph:
            'Harga saham pada transaksi terakhir sebelum perdagangan saham ditutup pada hari tersebut',
        },
        {
          title: 'Lowest Price',
          pharagraph:
            'Harga saham paling rendah yang tercapai dalam satu hari perdagangan',
        },
        {
          title: 'Highest Price',
          pharagraph:
            'Harga saham paling tinggi yang tercapai dalam satu hari perdagangan',
        },
        {
          title: 'Fair Value',
          pharagraph: 'Harga atau nilai wajar untuk sebuah saham',
        },
      ],
      type: 'dot',
    },
    {
      title: 'Apa saja informasi yang ada di Pasar Sekunder LBS Urun Dana?',
      pharagraph: '',
      list: [
        {
          title:
            'Orderbook adalah informasi pergerakan harga saham yang terjadi dalam satu hari perdagangan, yang terdiri dari:',
          list: [
            'Bid: Harga saham yang ditawarkan pembeli. Pembeli dapat memasukkan bid atau harga yang diinginkan untuk membeli saham tersebut',
            'Ask: Harga saham yang ditawarkan penjual. Penjual dapat memasukkan ask atau harga yang diinginkan untuk menjual saham tersebut',
            'B. Lembar: Jumlah lembar saham yang ditawarkan oleh pembeli di harga tertentu',
            'A. Lembar: Jumlah lembar saham yang ditawarkan oleh penjual di harga tertentu',
          ],
          type: 'dot',
        },
        {
          title:
            'Tradebook adalah informasi mengenai rangkaian transaksi yang terjadi pada setiap harga, yang terdiri dari:',
          list: [
            'Price: Harga dari setiap transaksi saham yang sudah berhasil terjadi dalam satu hari perdagangan',
            'Frequency: Banyaknya jumlah transaksi yang telah dilakukan di harga tersebut',
            'Volume: Total lembar saham beli dan jual di harga tersebut',
            'Total Value: Total nilai dari transaksi di harga tersebut',
          ],
          type: 'dot',
        },
        {
          title:
            'Daily History adalah informasi mengenai rangkuman transaksi harian pada saham tersebut, yang terdiri dari:',
          list: [
            'Open Price: Harga saham pada transaksi pertama yang dilakukan dalam satu hari perdagangan',
            'Close Price: Harga saham pada transaksi terakhir sebelum perdagangan saham ditutup pada hari tersebut',
            'Change: Selisih kenaikan atau penurunan harga dengan hari sebelumnya',
            'Volume: Total lembar saham beli dan jual pada hari tersebut',
          ],
          type: 'dot',
        },
      ],
    },
    {
      title: 'Bagaimana cara melakukan Pembelian Saham (Bid)?',
      pharagraph: '',
      list: [
        'Lakukan Login aplikasi LBS Urun Dana',
        'Pilih Menu Pasar Sekunder',
        'Pilih Saham yang Anda Inginkan',
        'Klik Beli Saham',
        'Masukkan Nominal Harga dan Jumlah Lembar Saham yang Anda Inginkan. Lalu Pilih Bank Tujuan. Kemudian Klik Order Pembelian',
        'Segera Lakukan Pembayaran Sesuai dengan bank tujuan yang sudah anda pilih',
        'Transaksi akan match apabila terdapat penjualan (Ask) dengan nominal harga saham yang sesuai dengan nominal harga pembelian (Bid) Anda',
      ],
    },
    {
      title: 'Bagaimana cara melakukan Penjualan Saham (Ask)?',
      pharagraph: '',
      list: [
        'Lakukan Login aplikasi LBS Urun Dana',
        'Pilih Menu Pasar Sekunder',
        'Pilih Saham yang Anda Inginkan',
        'Klik Jual Saham',
        'Masukkan Nominal Harga dan Jumlah Lembar Saham yang Anda Inginkan. Lalu Pilih Opsi Pengiriman OTP. Kemudian Klik Order Penjualan',
        'Input Nomor OTP pada bagian Verifikasi OTP. Kemudian klik Konfirmasi Order Jual',
        'Transaksi akan match apabila terdapat pembelian (Bid) dengan nominal harga saham yang sesuai dengan nominal harga penjualan (Ask) Anda',
      ],
    },
    {
      title: 'Berapa biaya yang dikenakan di Pasar Sekunder LBS Urun Dana?',
      pharagraph: '',
      list: [
        {
          title: 'Biaya Platform:',
          list: [
            'Pembeli: 0,25% dari nominal harga pembelian',
            'Penjual: 0,35% dari nominal harga penjualan',
          ],
          type: 'dash',
        },
        {
          title: 'Biaya Admin Bank:',
          list: [
            'Pembeli: Dikenakan biaya Rp5.900',
            'Penjual: Dikenakan biaya Rp2.900',
          ],
          type: 'dash',
        },
      ],
    },
    {
      title:
        'Apa saja status transaksi yang ada di Pasar Sekunder LBS Urun Dana?',
      pharagraph: '',
      list: [
        {
          title: 'Hold',
          pharagraph:
            'Proses pembayaran sebelum Pembeli melakukan order pembelian (Bid)',
        },
        {
          title: 'Open',
          pharagraph:
            'Order pembelian (Bid) atau order penjualan (Ask) saham masih dalam antrian',
        },
        {
          title: 'Settlement',
          pharagraph:
            'Transaksi sudah match dan dilanjutkan ke penyelesaian transaksi di Bank Kustodian dan KSEI untuk pemindahan saham dari penjual ke pembeli dan penyelesaian dana dari pembeli ke penjual',
        },
        {
          title: 'Success',
          pharagraph:
            'Pembelian dan penjualan saham telah berhasil. Portofolio saham pembeli bertambah dan hasil penjualan saham telah dicairkan ke rekening nasabah yang terdaftar di LBS Urun Dana',
        },
        {
          title: 'Expired',
          pharagraph:
            'Pembeli tidak menyelesaikan pembayaran dari batas waktu yang telah ditentukan',
        },
        {
          title: 'Failure',
          pharagraph: 'Transaksi pembelian atau penjualan saham telah gagal',
        },
      ],
      type: 'dot',
    },
    {
      title: 'Berapa lama proses Settlement transaksi saya?',
      pharagraph:
        'Jika order Anda sudah Match proses settlement membutuhkan waktu 2 hari kerja hingga Anda Menerima Efek/Menerima dana Penjualan Anda.',
      list: [],
    },
    {
      title: 'Apakah saya bisa membatalkan Order Pembelian/Penjualan saya?',
      pharagraph: '',
      list: [
        {
          title: 'Pembelian:',
          pharagraph:
            'Jika order Anda sudah berstatus "Open" maka Anda tidak bisa membatalkan order pembelian Anda. Jika status order Anda "Hold" maka Anda dapat membatalkan order pembelian Anda pada Halaman Pembayaran.',
        },
        {
          title: 'Penjualan:',
          pharagraph:
            'Anda tidak dapat membatalkan order penjualan Anda. Jadi pastikan kembali nominal harga dan jumlah lembar saham yang Anda input sudah benar.',
        },
      ],
      type: 'dot',
    },
    {
      title:
        'Saya sudah melakukan Pembelian Saham, tapi mengapa belum ada di Portofolio?',
      pharagraph:
        'Perlu diperhatikan bahwa Portofolio saham akan bertambah atau diperbarui ketika status transaksi sudah “Success”. Pembelian saham akan berhasil jika sudah melewati proses settlement dalam waktu 2 hari kerja.',
      list: [],
    },
    {
      title: 'Apa keuntungan bertransaksi di Pasar Sekunder LBS Urun Dana?',
      pharagraph: '',
      list: [
        {
          title: 'Capital Gain:',
          pharagraph:
            'Anda dapat menerima keuntungan berupa capital gain dari kenaikan harga saham yang Anda miliki',
        },
        {
          title: 'Dividen:',
          pharagraph:
            'Dividen merupakan laba atau imbal hasil yang diperoleh oleh perusahaan yang kemudian dibagikan kepada para Pemegang Saham pada Rapat Umum Pemegang Saham (RUPS)',
        },
      ],
      type: 'dot',
    },
    {
      title:
        'Apa yang terjadi jika order pembelian saya tidak match hingga sesi perdagangan saham ditutup?',
      pharagraph:
        'Order pembelian Anda akan gagal pada hari tersebut dan Anda akan menerima refund dalam waktu 1 hari kerja ke rekening yang terdaftar di platform LBS Urun Dana.',
      list: [],
    },
  ];

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      overlay
      header
      headerTitle="Panduan"
      childScrollY={scrollY}>
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Gap height={20} />
        <View style={{paddingHorizontal: 24}}>
          <View
            style={[
              styles.headingContainer,
              {backgroundColor: RGBAColors(1)[colorScheme].background},
            ]}>
            <Text style={styles.heading}>Apa itu Pasar Sekunder?</Text>
          </View>
          <Gap height={24} />
          <Text style={[styles.descPharagraph, {color: textColor2}]}>
            Pasar sekunder merupakan mekanisme jual beli saham antara investor
            yang difasilitasi oleh platform LBS Urun Dana.
          </Text>
          <Text
            style={[styles.descPharagraph, {color: textColor2, marginTop: 16}]}>
            Berbeda dengan pasar sekunder di Bursa Efek Indonesia yang transaksi
            dilakukan melalui Bursa, untuk SCF transaksi pasar sekunder
            dilakukan oleh masing - masing penyelenggara.
          </Text>
          <Text
            style={[styles.descPharagraph, {color: textColor2, marginTop: 16}]}>
            Efek yang bisa ditransaksikan saat ini berdasarkan POJK hanya saham
            dan dengan ketentuan saham yang sudah tercatat di KSEI selama 12
            bulan sebelum dapat diperdagangkan.
          </Text>
        </View>
        <Gap height={40} />
        <Text style={styles.heading2}>
          Daftar Perusahaan yang Ada di Pasar Sekunder LBS Urun Dana
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 24}}>
          <Gap width={24} />
          {businessList.map((item, index) => (
            <View
              key={index}
              style={{marginRight: index !== businessList.length - 1 ? 16 : 0}}>
              <MarketBusinessCard data={item} />
            </View>
          ))}
          <Gap width={24} />
        </ScrollView>
        <Gap height={40} />
        <Text style={styles.heading2}>Frequently Asked Questions (FAQ)</Text>
        <Gap height={40} />
        <View style={{paddingHorizontal: 24}}>
          <Accordion2 list={FAQ} />
        </View>
      </ScrollView>
      <View style={{paddingVertical: 20, paddingHorizontal: 24}}>
        <Button title="Mulai Investasi" onPress={() => navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
};

export default MarketGuide;

const styles = StyleSheet.create({
  headingContainer: {
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  descPharagraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  heading2: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  businessCardImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
