import {StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {Item, Item2, Paragraph, Title} from '../components/PharagraphItems';

const PrivacyPolicy = () => {
  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Kebijakan Privasi" />
      <View style={{marginTop: 40, paddingHorizontal: 24}}>
        <Title number="I" text="INFORMASI RAHASIA" />
        <Item
          number="1"
          text='Bahwa, dalam rangka Layanan Urun Dana, salah satu Pihak dapat mengungkapkan "Informasi Rahasia", (selanjutnya disebut "Pemberi"), kepada Pihak lainnya (selanjutnya disebut “Penerima”) dan Pemberi tidak menginginkan Informasi Rahasia tersebut menjadi terbuka untuk umum atau pengetahuan umum.'
        />

        <Item
          number="2"
          text="Untuk kepentingan Layanan Urun Dana ini, definisi dari “Informasi Rahasia” adalah sebagai berikut:"
        />

        <>
          <Item2
            number="a"
            text="Setiap informasi yang berhubungan dengan Pemberi, anak perusahaannya, pelanggannya, dan kegiatan usaha serta operasionalnya, termasuk setiap informasi yang secara langsung maupun tidak langsung terkait dengan Program Investasi, baik secara lisan, tertulis, grafik, magnetik, elektronik, atau bentuk lain yang secara langsung maupun tidak langsung disampaikan oleh atau diungkapkan untuk atau diperoleh Penerima atau anggota-anggotanya, direktur-direkturnya, karyawan-karyawannya, dalam serangkaian pembicaraan atau kerja sama lain yang dilakukan diantara Para Pihak; atau"
          />
          <Item2
            number="b"
            text="Segala komunikasi antara Para Pihak, baik secara lisan maupun tulisan yang diketahui atau semestinya diketahui oleh Para Pihak untuk menjadi rahasia atau menjadi milik perusahaan secara alami. dan yang dibuat di dalam serangkaian diskusi atau kerja sama lain yang dilakukan di antara Para Pihak."
          />
        </>
        <View style={{marginTop: 24}}>
          <Title number="II" text="INFORMASI YANG TIDAK DILINDUNGI" />
          <Paragraph text="Untuk kepentingan Program Investasi ini, yang dimaksud dengan “Informasi yang Tidak Dilindungi” adalah sebagai berikut:" />
          <Item
            number="1"
            text="Informasi yang, pada saat pengungkapannya, sudah berada pada kepemilikan yang sah dari Penerima atau tersedia pada Penerima atau Perwakilannya (sebagaimana didefinisikan dibawah ini) yang diperoleh dengan cara-cara yang sesuai dengan hukum (tidak melanggar hukum) dan dari sumber lain yang tidak memiliki kewajiban untuk tidak mengungkapkannya; atau"
          />
          <Item
            number="2"
            text="Informasi yang telah atau akan menjadi tersedia untuk umum, yang tersedia bukan dari pelanggaran Privacy Policy ini oleh Penerima atau Perwakilannya."
          />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="III" text="TANGGUNG JAWAB" />
          <Item
            number="1"
            text="Menjaga kerahasiaan, keutuhan, dan ketersediaan data pribadi, data transaksi, dan data keuangan yang dikelola Penyelenggara sejak data diperoleh hingga data tersebut dimusnahkan;"
          />
          <Item
            number="2"
            text="Memastikan tersedianya proses autentikasi, verifikasi, dan validasi yang mendukung kenirsangkalan dalam mengakses, memproses, dan mengeksekusi data pribadi, data transaksi, dan data keuangan yang dikelola Penyelenggara;"
          />
          <Item
            number="3"
            text="Menjamin bahwa perolehan, penggunaan, pemanfaatan, dan pengungkapan data pribadi, data transaksi, dan data keuangan yang diperoleh oleh Penyelenggara berdasarkan persetujuan pemilik data pribadi, data transaksi, dan data keuangan, kecuali ditentukan lain oleh ketentuan peraturan perundang-undangan;"
          />
          <Item
            number="4"
            text="Menjamin bahwa perolehan, penggunaan, pemanfaatan, dan pengungkapan data pribadi, data transaksi, dan data keuangan yang diperoleh oleh Penyelenggara berdasarkan persetujuan pemilik data pribadi, data transaksi, dan data keuangan, kecuali ditentukan lain oleh ketentuan peraturan perundang-undangan;"
          />
          <Item
            number="5"
            text="Memberitahukan secara tertulis kepada pemilik data pribadi, data transaksi, dan data keuangan, jika terjadi kegagalan dalam perlindungan kerahasiaan data pribadi, data transaksi, dan data keuangan yang dikelola Penyelenggara."
          />
          <Item
            number="6"
            text="Penerima setuju untuk tidak akan mengungkapkan, dan akan mengambil seluruh tindakan yang diperlukan untuk melindungi kerahasiaan dari, dan menghindari pengungkapan atau penyalahgunaan dari, Informasi Rahasia, tanpa persetujuan tertulis sebelumnya yang diberikan oleh petugas yang berwenang dari Pemberi, kecuali sebagaimana diatur dalam Ketentuan Privacy Policy Romawi III Nomor 2 dibawah ini. Secara khusus, Penerima hanya akan menggunakan Informasi Rahasia untuk kepentingan Layanan Urun Dana dan tidak untuk tujuan yang lain."
          />
          <Item
            number="7"
            text="Tanpa membatasi hal yang telah disebutkan sebelumnya, dan tunduk pada Ketentuan Privacy Policy Romawi IV dibawah ini, Penerima diperbolehkan untuk mengungkapkan Informasi Rahasia kepada anggota-anggotanya, direktur-direkturnya, karyawan-karyawannya, afiliasinya, subkontraktor, agennya atau pihak yang ditunjuk (secara bersama-sama disebut sebagai “Perwakilan”) yang dibutuhkan untuk mengetahui Informasi Rahasia dengan tujuan yang sama dengan Informasi Rahasia yang diterima oleh Penerima. Penerima setuju untuk mengambil segala tindakan pencegahan yang diperlukan untuk menjaga kerahasiaan dari Informasi Rahasia dan untuk menyediakan segala perlindungan yang diperlukan terhadap segala pengungkapan yang tidak sah, tiruan atau penggunaan, dan untuk meminta kepada Perwakilannya yang menerima Informasi Rahasia tersebut untuk tunduk pada kewajiban menjaga kerahasiaan dari Informasi Rahasia sesuai dengan Privacy Policy ini."
          />
          <Item
            number="8"
            text="Penerima dengan ini sepakat untuk menjamin dan membebaskan Pemberi terhadap setiap dan segala tindakan, klaim, kerusakan dan kerugian yang terjadi pada Pemberi dikarenakan pengungkapan yang tidak sah terhadap Informasi Rahasia terhadap Pihak Ketiga yang dibuat secara bertentangan dengan Privacy Policy ini atau segala pelanggaran terhadap perjanjian yang dilakukan oleh Penerima atau Perwakilannya, termasuk tapi tidak terbatas pada klaim dari pemegang Saham atau pemegang kepentingan dari Pemberi disebabkan oleh perlakuan yang tidak sama pada pengungkapan informasi yang disebabkan penyediaan Informasi Rahasia dari Pemberi kepada Penerima atau Perwakilannya."
          />
          <Item
            number="9"
            text="Penerima dengan ini bertanggungjawab untuk menyimpan semua dokumen yang memuat atau merupakan Informasi Rahasia terpisah dari semua dokumen lain pada tempat usaha Penerima yang umum."
          />
          <Item
            number="10"
            text="Penerima akan memberitahu Pemberi dengan segera pada saat penemuan atas setiap penggunaan secara tidak sah atau pengungkapan Informasi Rahasia atau pelanggaran Perjanjian oleh Penerima atau Perwakilan-nya, dan akan bekerjasama dengan Pemberi dalam setiap cara untuk membantu Pemberi mendapatkan kembali penguasaan atas Informasi Rahasia dan untuk mencegah penyalahgunaan lebih lanjut."
          />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="IV" text="PIHAK KETIGA" />
          <Paragraph text="Kecuali untuk pemberian informasi sebagaimana dimaksud dalam Ketentuan Privacy Policy Romawi VII, sebelum pengungkapan Informasi Rahasia kepada suatu pihak ketiga, termasuk tetapi tidak terbatas pada para konsultan, akuntan publik atau pejabat lokal, Penerima akan (a) mendapatkan persetujuan secara tertulis terlebih dahulu dari Pemberi untuk mengungkapkan Informasi Rahasia kepada pihak ketiga tersebut, dan (b) mendapatkan persetujuan tertulis, yang diberikan oleh pihak ketiga tersebut, antara Pemberi dan pihak ketiga (i) untuk menahan semua Informasi Rahasia dengan keyakinan pada ketentuan yang mirip dengan ketentuan dalam Privacy Policy ini dan untuk tidak menggunakannya untuk tujuan selain yang berhubungan dengan pembicaraan atau hubungan bisnis yang akan datang antara para pihak, dan (iii) untuk mengembalikan semua Informasi Rahasia kepada Pemberi tidak lebih dari 2 (dua) hari kalender setelah pihak ketiga tersebut menyelesaikan pekerjaannya. Setiap pengungkapan dari Informasi Rahasia harus sesuai dengan hukum yang berlaku." />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="V" text="JANGKA WAKTU PRIVACY POLICY" />
          <Paragraph text="Privacy Policy ini akan berlaku secara terus menerus selama Layanan Urun Dana berlangsung, terhitung sejak disetujuinya Privacy Policy ini kecuali diakhiri dengan persetujuan tertulis Para Pihak. Kewajiban untuk menjaga kerahasiaan Informasi Rahasia tetap mengikat Para Pihak walaupun Layanan Urun Dana ini berakhir." />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="VI" text="PENGEMBALIAN INFORMASI RAHASIA" />
          <Paragraph text="Penerima setuju untuk dengan segera menyerahkan kepada Pemberi, atas permintaan Pemberi, setiap dokumen yang mengandung atau dengan cara lain mencerminkan Informasi Rahasia dan setiap salinan yang dibuat oleh karenanya yang Penerima mungkin miliki, memiliki akses kepadanya, atau mungkin dapatkan atau kuasai selama periode pembicaraan itu dan/atau hubungan bisnis dengan Pemberi. Atas penghentian pembicaraan dan/atau hubungan bisnis antara Para Pihak, Penerima harus menyampaikan kepada Pemberi, atas permintaan Pemberi, segala Informasi Rahasia yang dikuasainya atau dibawah kendalinya tidak lebih dari 3 (tiga) hari kalender. Setiap informasi yang disiapkan oleh Penerima untuk keperluan evaluasi internal akan menjadi milik Penerima dan tidak perlu diungkapkan kepada Pemberi. Akan tetapi, selama periode Layanan Urun Dana ini, informasi tersebut hanya dapat digunakan untuk evaluasi internal Penerima atas Layanan Urun Dana saja." />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="VII" text="PENGUNGKAPAN YANG DIWAJIBKAN" width={36} />
          <Item
            number="1"
            text="Apabila disyaratkan oleh peraturan atau undang-undang yang berlaku, atau berdasarkan perintah suatu kewenangan atau pengadilan, Penerima diwajibkan untuk mengungkapkan suatu Informasi Rahasia tanpa kesempatan untuk mendapatkan persetujuan sebelumnya dari Pemberi sebagaimana diatur dalam Ketentuan Privacy Policy Romawi IV di atas, maka Penerima akan memberitahu Pemberi dengan segera sehingga Pemberi dapat mengusahakan permintaan perlindungan atau bantuan lain, yang dianggap perlu, dengan ketentuan bahwa Penerimaharus berusaha sebaik-baiknya untuk memberikan Pemberi pemberitahuan 3 (tiga) hari kalender sebelumnya."
          />
          <Item
            number="2"
            text="Bahwa PT LBS Urun Dana dalam hal selaku Penerima maka PT LBS Urun Dana menyatakan dan menjamin tidak memiliki hak akses ke local storage milik si Pemberi kecuali untuk kebutuhan mengunggah (upload) bukti transfer data oleh Pemberi kepada Penerima."
          />
        </View>

        <View style={{marginTop: 24}}>
          <Title
            number="VIII"
            text="TIDAK ADANYA PEMINDAHAN HAK MILIK ATAU LISENSI"
            width={36}
          />
          <Item
            number="1"
            text="Tidak ada dalam Privacy Policy ini yang akan diartikan untuk memindahkan segala hak, jabatan atau kepentingan atau hak cipta atas Informasi Rahasia kepada Penerima, atau lisensi untuk menggunakan, menjual, memanfaatkan, meniru atau mengembangkan lebih lanjut Informasi Rahasia tersebut. Privacy Policy ini tidak dalam cara apapun mengikat Para Pihak untuk melakukan hubungan bisnis dalam segala jenisnya. Perjanjian apapun untuk hubungan bisnis tersebut akan dibuktikan dengan perjanjian tertulis secara terpisah yang dilakukan oleh Para Pihak."
          />
          <Item
            number="2"
            text="Hak atas kekayaan intelektual yang timbul atas pelaksanaan Perjanjian dan izin Pemberi, beserta fasilitas-fasilitas lain yang dimiliki Pemberi dan digunakan dalam Layanan Urun Dana ini adalah tetap dan seterusnya milik Pemberi dan tidak ada penyerahan hak dari Pemberi kepada Penerima dalam Layanan Urun Dana ini."
          />
          <Item
            number="3"
            text="Penerima tidak berhak untuk mengubah, mengembangkan, membagikan dan/atau menjual baik seluruh maupun sebagian hak atas kekayaan intelektual yang timbul atas pengembangan, inovasi, perubahan berupa fitur dan/atau fungsi terhadap sistem teknologi informasi."
          />
          <Item
            number="4"
            text="Pemberi dengan ini menjamin bahwa hak atas kekayaan intelektual yang terkandung dalam pelaksanaan Perjanjian ini tidak melanggar hak atas kekayaan intelektual milik pihak manapun, dan Pemberi membebaskan Penerima dari segala tuntutan, gugatan dari pihak manapun, sehubungan dengan pelanggaran terhadap hak atas kekayaan intelektual yang terkandung dalam Layanan Urun Dana ini."
          />
          <Item
            number="5"
            text="Dalam hal terdapat hak atas kekayaan intelektual milik pihak manapun (eksternal) maupun principal maka Pemberi menyatakan dan menjamin bahwa Pemberi tidak menggunakan hak atas kekayaan intelektual tersebut dan tetap menjadi milik pihak manapun (eksternal) maupun principal."
          />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="IX" text="PERNYATAAN PUBLIK" />
          <Paragraph text="Para Pihak sepakat bahwa segala pembicaraan diantara Para Pihak akan dilakukan secara rahasia. Penerima tidak akan memberikan pernyataan kepada pers atau publik mengenai pembicaraan yang berhubungan dengan suatu Layanan Urun Dana antara Para Pihak atau membuka dengan suatu cara kepada pihak ketiga fakta dari pembicaraan yang telah dilakukan, tanpa persetujuan tertulis sebelumnya dari Pemberi." />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="X" text="KEBERLAKUAN KETENTUAN" />
          <Paragraph text="Apabila salah satu dari ketentuan dalam Privacy Policy ini menjadi tidak berlaku atau tidak dapat dipaksakan, ketentuan tersebut akan dipisahkan dari Privacy Policy ini, dimana ketentuan yang lain akan tetap berlaku dan efektif tapi hanya pada batas, bahwa tujuan asli dari Privacy Policy ini tidak diubah secara materi." />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="XI" text="PERBAIKAN" />
          <Item
            number="1"
            text="Para Pihak sepakat bahwa apabila Penerima atau Perwakilannya melanggar Privacy Policy ini, Pemberi memiliki hak untuk mencari perbaikan berdasarkan hukum dan/atau keadilan termasuk, tetapi tidak terbatas pada, bantuan pengadilan yang pantas atau penyelesaian tertentu yang mungkin diberikan oleh pengadilan yang memiliki kompetensi yurisdiksi."
          />
          <Item
            number="2"
            text="Penerima mengakui dan sepakat bahwa ganti rugi finansial mungkin tidak memadai dalam hal terjadi pelanggaran terhadap ketentuan dalam Privacy Policy oleh Penerima. Apabila pelanggaran tersebut dapat dibuktikan oleh Pemberi, Pemberi dapat meminta ganti rugi terhadap pelanggaran atau ancaman pelanggaran dari Privacy Policy ini. Ganti rugi tersebut tidak merupakan ganti rugi eksklusif tetapi merupakan tambahan atas segala ganti rugi yang dimungkinkan oleh hukum bagi Pihak Pemberi."
          />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="XII" text="PENERUS DAN PENGGANTI HAK" width={36} />
          <Paragraph text="Privacy Policy ini tidak dapat dialihkan oleh Pihak manapun tanpa persetujuan tertulis sebelumnya dari Pihak lainnya. Dalam hal Pihak lainnya menyetujui adanya pengalihan, maka Privacy Policy ini akan mengikat penerus hak dan pengganti dari Pihak yang mengalihkan tersebut." />
        </View>

        <View style={{marginTop: 24}}>
          <Title
            number="XIII"
            text="HUKUM YANG BERLAKU DAN PENYELESAIAN SENGKETA"
            width={36}
          />
          <Item
            number="1"
            text="Privacy Policy ini akan diatur dan ditafsirkan berdasarkan hukum Negara Republik Indonesia."
          />
          <Item
            number="2"
            text="Apabila timbul perselisihan atau perbedaan (“Perselisihan”) antara Para Pihak sehubungan dengan Privacy Policy ini, Para Pihak akan mencoba, dalam periode 20 (dua puluh) hari kalender setelah penerimaan pemberitahuan dari salah satu Pihak mengenai timbulnya Perselisihan kepada Pihak lainnya, untuk menyelesaikan Perselisihan tersebut pertama-tama dengan musyawarah untuk mencapai kata mufakat antara Para Pihak."
          />
          <Item
            number="3"
            text="Apabila Perselisihan tersebut tidak dapat diselesaikan dalam waktu 20 (dua puluh) hari kalender secara musyawarah untuk mufakat, Perselisihan akan diselesaikan dan diputuskan oleh Pengadilan Negeri Bogor."
          />
          <Item
            number="4"
            text="Tanpa mengesampingkan penyelesaian sengketa atau perselisihan melalui pengadilan negeri, Para Pihak setuju dan sepakat apabila penyelesaian sengketa atau perselisihan di badan arbitrase dan badan alternatif penyelesaian sengketa yang ditunjuk oleh Otoritas Jasa Keuangan maupun regulator berwenang lainnya."
          />
          <Item
            number="5"
            text="Hasil putusan pengadilan negeri maupun badan arbitrase dan badan alternatif penyelesaian sengketa yang ditunjuk oleh Otoritas Jasa Keuangan maupun regulator berwenang lainnya bersifat final dan mempunyai kekuatan hukum tetap dan mengikat bagi Para Pihak."
          />
        </View>

        <View style={{marginTop: 24}}>
          <Title
            number="XIV"
            text="TIDAK ADA KEWAJIBAN UNTUK MEMASUKI TAHAPAN BISNIS SELANJUTNYA"
            width={36}
          />
          <Paragraph text="Para Pihak mengakui dan menegaskan bahwa dengan pertukaran Informasi Rahasia sebagaimana disebutkan dalam Privacy Policy ini, tidak berarti bahwa Para Pihak berkewajiban untuk melakukan kerjasama bisnis di antara mereka di kemudian hari." />
        </View>

        <View style={{marginTop: 24}}>
          <Title number="XV" text="LAIN-LAIN" width={36} />
          <Item
            number="1"
            text="Kecuali secara tegas diatur lain, segala perubahan, modifikasi ataupun pengesampingan atas ketentuan Privacy Policy ini dilakukan berdasarkan persetujuan tertulis Para Pihak."
          />
          <Item
            number="2"
            text="Privacy Policy ini tetap berlaku setelah penyelesaian, pemutusan ataupun pembatalan Layanan Urun Dana."
          />
          <Item
            number="3"
            text="Para Pihak menjamin bahwa semua hak dan kewajiban yang tercantum dalam Privacy Policy ini adalah sah dan mengikat Para Pihak."
          />
        </View>
      </View>
      <Gap height={24} />
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
