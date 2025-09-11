import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {Item, Title, Paragraph} from '../components/PharagraphItems';
import Gap from '../components/Gap';

const Disclaimer = () => {
  const pharagraphTextAlign = 'justify';

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      scrollView
      header
      headerTitle="Disclaimer">
      <View style={{marginTop: 20, paddingHorizontal: 24}}>
        <Paragraph
          text="PT LBS Urun Dana adalah penyelenggara layanan urun dana yang menyediakan platform berbasis teknologi untuk penawaran efek (securities crowdfunding) di mana melalui platform tersebut penerbit menawarkan instrumen efek kepada investor (pemodal) melalui sistem elektronik yang telah mendapatkan izin dari Otoritas Jasa Keuangan."
          textAlign={pharagraphTextAlign}
        />

        <Paragraph
          text="Sesuai Peraturan Otoritas Jasa Keuangan (POJK) Nomor 17 tahun 2025 tentang “Penawaran Efek Melalui Layanan Urun Dana Berbasis Teknologi Informasi” Pasal 75, kami menyatakan bahwa :"
          marginTop={24}
          textAlign={pharagraphTextAlign}
          fontWeight="700"
        />

        <>
          <Item
            number="a"
            text='"OTORITAS JASA KEUANGAN TIDAK MEMBERIKAN PERNYATAAN MENYETUJUI ATAU TIDAK MENYETUJUI EFEK INI, TIDAK JUGA MENYATAKAN KEBENARAN ATAU KECUKUPAN INFORMASI DALAM LAYANAN URUN DANA INI. SETIAP PERNYATAAN YANG BERTENTANGAN DENGAN HAL TERSEBUT ADALAH PERBUATAN MELANGGAR HUKUM."'
            textAlign={pharagraphTextAlign}
            marginTop={4}
            fontWeight="700"
          />
          <Item
            number="b"
            text='"INFORMASI DALAM LAYANAN URUN DANA INI PENTING DAN PERLU MENDAPAT PERHATIAN SEGERA. APABILA TERDAPAT KERAGUAN PADA TINDAKAN YANG AKAN DIAMBIL, SEBAIKNYA BERKONSULTASI DENGAN PENYELENGGARA."; dan'
            textAlign={pharagraphTextAlign}
            marginTop={4}
            fontWeight="700"
          />
          <Item
            number="c"
            text='"PENERBIT DAN PENYELENGGARA, BAIK SENDIRI SENDIRI MAUPUN BERSAMA-SAMA, BERTANGGUNG JAWAB SEPENUHNYA ATAS KEBENARAN SEMUA INFORMASI YANG TERCANTUM DALAM LAYANAN URUN DANA INI.".'
            textAlign={pharagraphTextAlign}
            marginTop={4}
            fontWeight="700"
          />
        </>

        <Paragraph
          text="Sebelum melakukan investasi melalui platform LBS Urun Dana, anda perlu memperhitungkan setiap investasi bisnis yang akan anda lakukan dengan seksama. Hal ini dapat dilakukan dengan melakukan analisa (due diligence), yang diantaranya (namun tidak terbatas pada); Analisa kondisi makro ekonomi, Analisa Model Bisnis, Analisa Laporan Keuangan, Analisa Kompetior dan Industri, Risiko bisnis lainnya."
          marginTop={24}
          textAlign={pharagraphTextAlign}
        />

        <Paragraph
          text="Investasi pada suatu bisnis merupakan aktivitas berisiko tinggi, nilai investasi yang anda sertakan pada suatu bisnis memiliki potensi mengalami kenaikan, penurunan, bahkan kegagalan. Beberapa risiko yang terkandung pada aktivitas ini diantaranya:"
          marginTop={24}
          textAlign={pharagraphTextAlign}
        />

        <>
          <Title text="Risiko Usaha" marginTop={24} fontSize={16} />
          <Paragraph
            text="Risiko yang dapat terjadi dimana pencapaian bisnis secara aktual tidak memenuhi proyeksi pada proposal/prospektus bisnis."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title text="Risiko Gagal Bayar" marginTop={24} fontSize={16} />
          <Paragraph
            text="Gagal bayar atas efek bersifat sukuk, seperti kegagalan penerbit dalam mengembalikan modal dan bagi hasil/marjin kepada investor."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title
            text="Risiko Kerugian Investasi"
            marginTop={24}
            fontSize={16}
          />
          <Paragraph
            text="Sejalan dengan risiko usaha dimungkinkan terjadi nilai investasi yang diserahkan investor menurun dari nilai awal pada saat dilakukan penyetoran modal sehingga tidak didapatkannya keuntungan sesuai yang diharapkan."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title text="Dilusi Kepemilikan Saham" marginTop={24} fontSize={16} />
          <Paragraph
            text="Dilusi kepemilikan saham terjadi ketika ada pertambahan total jumlah saham yang beredar sehingga terjadi perubahan/penurunan persentase kepemilikan saham."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title text="Risiko Likuiditas" marginTop={24} fontSize={16} />
          <Paragraph
            text="Investasi anda melalui platform layan urun dana bisa jadi bukan merupakan instrumen investasi yang likuid, hal ini dikarenakan instrumen efek yang ditawarkan melalui platform hanya dapat diperjualbelikan melalui mekanisme pasar sekunder pada platform yang sama, dimana periode pelaksanaan pasar sekunder tersebut juga dibatasi oleh peraturan. Anda mungkin tidak dapat dengan mudah menjual saham anda di bisnis tertentu sebelum dilaksanakannya skema pasar sekunder oleh penyelenggara. Selain itu, untuk efek bersifat sukuk, anda tidak dapat melakukan penjualan sukuknya hingga sukuk tersebut jatuh tempo atau mengikuti jadwal pengembalian modal yang sudah ditentukan."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title text="Risiko Likuiditas" marginTop={24} fontSize={16} />
          <Paragraph
            text="Investasi anda melalui platform layan urun dana bisa jadi bukan merupakan instrumen investasi yang likuid, hal ini dikarenakan instrumen efek yang ditawarkan melalui platform hanya dapat diperjualbelikan melalui mekanisme pasar sekunder pada platform yang sama, dimana periode pelaksanaan pasar sekunder tersebut juga dibatasi oleh peraturan. Anda mungkin tidak dapat dengan mudah menjual saham anda di bisnis tertentu sebelum dilaksanakannya skema pasar sekunder oleh penyelenggara. Selain itu, untuk efek bersifat sukuk, anda tidak dapat melakukan penjualan sukuknya hingga sukuk tersebut jatuh tempo atau mengikuti jadwal pengembalian modal yang sudah ditentukan."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title text="Risiko Pembagian Dividen" marginTop={24} fontSize={16} />
          <Paragraph
            text="Setiap Investor yang ikut berinvestasi berhak untuk mendapatkan dividen sesuai dengan jumlah kepemilikan saham. Seyogyanya dividen ini akan diberikan oleh Penerbit dengan jadwal pembagian yang telah disepakati di awal, namun sejalan dengan risiko usaha pembagian dividen ada kemungkinan tertunda atau tidak terjadi jika kinerja bisnis yang anda investasikan tidak berjalan dengan baik."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Title
            text="Risiko Kegagalan Sistem Elektronik"
            marginTop={24}
            fontSize={16}
          />
          <Paragraph
            text="Platform LBS Urun Dana sudah menerapkan sistem elektronik dan keamanan data yang handal. Namun, tetap dimungkinkan terjadi gangguan sistem teknologi informasi dan kegagalan sistem, yang dapat menyebabkan aktivitas anda di platform menjadi tertunda."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
        </>

        <Title text="Kebijakan Informasi" marginTop={24} />
        <Paragraph
          text="Kami berkomitmen melindungi keamanan pengguna saat menggunakan layanan elektronis urun dana dengan:"
          textAlign={pharagraphTextAlign}
        />
        <>
          <Item
            number="1"
            text="Implementasi ISO/IEC 27001:2022 ISMS guna mewujudkan Confidentiality, Integrity dan Availability informasi."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Item
            number="2"
            text="Selalu mentaati segala ketentuan dan peraturan terkait keamanan infromasi yang berlaku di wilayah Republik Indonesia serta wilayah tempat dilakukannya pekerjaan."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Item
            number="3"
            text="Melakukan perbaikan yang berkesinambungan (continuous improvement) terhadap kinerja Sistem Manajemen Keamanan Informasi."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
        </>

        <Title text="Bank Kustodian" marginTop={24} />
        <>
          <Item
            number="1"
            text="Peran Bank Kustodian terbatas pada pencatatan, penyimpanan dan penyelesaian transaksi."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
          <Item
            number="2"
            text="Bank Kustodian tidak bertanggung jawab atas klaim dan gugatan hukum yg ditimbulkan dari risiko investasi dan risiko-risiko lainnya di luar cakupan peran Bank Kustodian yang telah disebutkan di atas, termasuk kerugian yang ditimbulkan oleh kelalaian pihak-pihak lainnya."
            textAlign={pharagraphTextAlign}
            marginTop={4}
          />
        </>
      </View>
      <Gap height={24} />
    </ScreenWrapper>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({});
