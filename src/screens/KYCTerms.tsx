import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import {KYCFormFieldType} from '../constants/Types';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';
import {Item, Item2, Paragraph, Title} from '../components/PharagraphItems';
import {notchHeight} from '../utils/getNotchHeight';
import CheckBox from '../components/CheckBox';
import {useKYCTerms} from '../api/kycTerms';
import {RGBAColors} from '../constants/Colors';

const KYCTerms = () => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColorDanger = useThemeColor({}, 'textDanger');

  const {hasRead, setHasRead, submitLoading, submitTerms, checkError} =
    useKYCTerms();

  return (
    <ScreenWrapper background backgroundType="gradient" notch={false}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: 24, flex: 1}}>
          <Gap height={24 + notchHeight} />
          <KYCHeader
            title="Syarat & Ketentuan"
            instruction="Anda telah mencapai bagian akhir dari proses pengisian data KYC. Harap membaca dan menyetujui syarat dan ketentuan berikut."
            percentage={90}
            backScreen="KYCRisk"
          />
          <Gap height={40} />
          <>
            <>
              <Title number="I" text="DEFINISI" />
              <Item
                number="1"
                text="Penawaran Efek melalui Layanan Urun Dana Berbasis Teknologi Informasi yang selanjutnya disebut Layanan Urun Dana adalah penyelenggaraan layanan penawaran efek yang dilakukan oleh penerbit untuk menjual efek secara langsung kepada pemodal melalui jaringan sistem elektronik yang bersifat terbuka."
              />
              <Item
                number="2"
                text="Efek adalah surat berharga, yaitu surat pengakuan utang, surat berharga komersial, saham, obligasi, tanda bukti utang, unit penyertaan kontrak investasi kolektif, kontrak berjangka atas Efek, dan setiap derivatif dari Efek."
              />
              <Item
                number="3"
                text="Sistem Elektronik Layanan Jasa Keuangan yang selanjutnya disebut Sistem Elektronik adalah serangkaian perangkat dan prosedur elektronik yang berfungsi mempersiapkan, mengumpulkan, mengolah, menganalisis, menyimpan, menampilkan, mengumumkan, mengirimkan, dan/atau menyebarkan informasi elektronik di bidang layanan jasa keuangan."
              />
              <Item
                number="4"
                text="Teknologi Informasi Layanan Jasa Keuangan yang selanjutnya disebut Teknologi Informasi adalah suatu teknik untuk mengumpulkan, menyiapkan, menyimpan, memproses, mengumumkan, menganalisis, dan/atau menyebarkan informasi di bidang layanan jasa keuangan."
              />
              <Item
                number="5"
                text="Penyelenggara Layanan Urun Dana yang selanjutnya disebut Penyelenggara adalah badan hukum Indonesia yang menyediakan, mengelola, dan mengoperasikan Layanan Urun Dana."
              />
              <Item
                number="6"
                text="Pengguna Layanan Urun Dana yang selanjutnya disebut Pengguna adalah penerbit dan pemodal."
              />
              <Item
                number="7"
                text="Penerbit adalah badan usaha Indonesia baik yang berbentuk badan hukum maupun badan usaha lainnya yang menerbitkan Efek melalui Layanan Urun Dana."
              />
              <Item
                number="8"
                text="Pemodal adalah pihak yang melakukan pembelian Efek Penerbit melalui Layanan Urun Dana."
              />
              <Item
                number="9"
                text="Proyek adalah kegiatan atau pekerjaan yang menghasilkan barang, jasa, dan/atau manfaat lain, baik yang sudah ada maupun yang akan ada, termasuk kegiatan investasi yang telah ditentukan yang akan menjadi dasar penerbitan atas Efek bersifat utang atau sukuk."
              />
              <Item
                number="10"
                text="Sukuk adalah Efek syariah berupa sertifikat atau bukti kepemilikan yang bernilai sama dan mewakili bagian yang tidak terpisahkan atau tidak terbagi (syuyu’), atas aset yang mendasarinya."
              />
              <Item
                number="11"
                text="Lembaga Penyimpanan dan Penyelesaian adalah pihak yang menyelenggarakan kegiatan kustodian sentral bagi bank kustodian, perusahaan efek, dan pihak lain."
              />
              <Item
                number="12"
                text="Dokumen Elektronik adalah setiap informasi elektronik yang dibuat, diteruskan, dikirimkan, diterima, atau disimpan dalam bentuk analog, digital, elektromagnetik, optikal, atau sejenisnya, yang dapat dilihat, ditampilkan, dan/atau didengar melalui komputer atau Sistem Elektronik termasuk tetapi tidak terbatas pada tulisan, suara, gambar, peta rancangan, foto atau sejenisnya, huruf, tanda, angka, kode akses, simbol, atau perforasi yang memiliki makna atau arti atau dapat dipahami oleh orang yang mampu memahaminya."
              />
              <Item
                number="13"
                text="Bank Kustodian adalah bank umum yang telah memperoleh persetujuan Otoritas Jasa Keuangan untuk melakukan kegiatan usaha sebagai kustodian."
              />
            </>

            <View style={{marginTop: 24}}>
              <Title number="II" text="PELAKSANAAN LAYANAN URUN DANA" />
              <Paragraph text="Pemodal dengan ini mengajukan pendaftaran kepada Penyelenggara dan Penyelenggara menerima pendaftaran dari Pemodal sebagai Anggota dalam rangka untuk melaksanakan pembelian Efek milik Penerbit melalui program Layanan Urun Dana dengan maksud dan tujuan, lingkup Layanan Urun Dana, syarat dan ketentuan, serta batas tanggung jawab sesuai dengan POJK Layanan Urun Dana Nomor 57/POJK.04/2020. Efek melalui Layanan Urun Dana Berbasis Teknologi Informasi yang selanjutnya disebut Layanan Urun Dana adalah penyelenggaraan layanan penawaran efek yang dilakukan oleh penerbit untuk menjual efek secara langsung kepada pemodal melalui jaringan sistem elektronik yang bersifat terbuka." />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="III" text="MASA PENAWARAN EFEK" />
              <Item
                number="1"
                text="Dalam hal ini Pemodal melakukan pembelian Efek Penerbit selama masa penawaran Efek oleh Penerbit yang dilakukan paling lama 45 (empat puluh lima) Hari Kalender."
              />
              <Item
                number="2"
                text="Pemodal mengerti dan memahami bahwa Penerbit dapat membatalkan penawaran Efek melalui Layanan Urun Dana sebelum berakhirnya masa penawaran dengan membayar sejumlah ganti rugi kepada Penyelenggara."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="IV" text="PEMBELIAN EFEK" />
              <Item
                number="1"
                text="Pemodal yang membeli Efek melalui Layanan Urun Dana harus:"
              />
              <>
                <Item2
                  number="a"
                  text="memiliki rekening Efek pada Bank Kustodian yang khusus untuk menyimpan Efek dan/atau dana melalui Layanan Urun Dana;"
                />
                <Item2
                  number="b"
                  text="memiliki kemampuan untuk membeli Efek Penerbit; dan"
                />
                <Item2
                  number="c"
                  text="memenuhi kriteria Pemodal dan batasan pembelian Efek."
                />
              </>
              <Item
                number="2"
                text="Dalam hal Pemodal melakukan pembelian Efek melalui lebih dari 1 (satu) Penyelenggara, Pemodal wajib menggunakan rekening Efek sebagaimana dimaksud pada ayat (1) huruf a yang berbeda untuk masing masing Penyelenggara."
              />
              <Item
                number="3"
                text="Pembelian Efek oleh Pemodal dalam penawaran Efek melalui Layanan Urun Dana dilakukan dengan menyetorkan sejumlah dana pada escrow account Penyelenggara atas nama PT LBS URUN DANA."
              />
              <Item
                number="4"
                text="Batasan pembelian Efek oleh Pemodal dalam Layanan Urun Dana adalah sebagai berikut:"
              />
              <>
                <Item2
                  number="a"
                  text="setiap Pemodal dengan penghasilan sampai dengan Rp500.000.000,00 (lima ratus juta rupiah) per tahun, dapat membeli Efek melalui Layanan Urun Dana paling banyak sebesar 5% (lima persen) dari penghasilan per tahun; dan"
                />
                <Item2
                  number="b"
                  text="setiap Pemodal dengan penghasilan lebih dari Rp500.000.000,00 (lima ratus juta rupiah) per tahun, dapat membeli Efek melalui Layanan Urun Dana paling banyak sebesar 10% (sepuluh persen) dari penghasilan per tahun."
                />
              </>
              <Item
                number="5"
                text="Batasan pembelian Saham oleh Pemodal tidak berlaku dalam hal Pemodal merupakan badan hukum; dan pihak yang mempunyai pengalaman berinvestasi di Pasar Modal yang dibuktikan dengan kepemilikan rekening efek paling sedikit 2 (dua) tahun sebelum penawaran Efek."
              />
              <Item
                number="6"
                text="Dalam hal Efek yang diterbitkan melalui Layanan Urun Dana merupakan Sukuk dijamin atau ditanggung dengan nilai penjaminan atau nilai penanggungan paling sedikit 125% (seratus dua puluh lima persen) dari nilai penghimpunan dana, kriteria Pemodal dan batasan pembelian Efek sebagaimana dimaksud dalam ayat (4) tidak berlaku."
              />
              <Item
                number="7"
                text="Nilai jaminan sebagaimana dimaksud pada ayat (4) ditentukan berdasarkan pada hasil penilaian dari penilai atau berdasarkan acuan dokumen tertentu yang dapat dipertanggungjawabkan."
              />
              <Item
                number="8"
                text="Penilai sebagaimana dimaksud pada ayat (5) wajib merupakan pihak yang terdaftar di Otoritas Jasa Keuangan."
              />
              <Item
                number="9"
                text="Pemodal dapat membatalkan rencana pembelian Efek melalui Layanan Urun Dana paling lambat dalam waktu 48 (empat puluh delapan) jam setelah melakukan pembelian Efek sebagaimana dimaksud dalam ayat (3)."
              />
              <Item
                number="10"
                text="Dalam hal Pemodal membatalkan rencana pembelian Efek sebagaimana dimaksud pada ayat (1), Penyelenggara wajib mengembalikan dana kepada Pemodal paling lambat 2 (dua) hari kerja setelah pembatalan pemesanan Pemodal."
              />
              <Item
                number="11"
                text="Penyelenggara wajib mendistribusikan Efek kepada Pemodal paling lambat 14 (empat belas) hari kerja setelah penyerahan dana kepada Penerbit."
              />
              <Item
                number="12"
                text="Pemodal yang membeli Efek melalui Penyelenggara mendapat bukti kepemilikan berupa catatan kepemilikan Efek yang terdapat dalam rekening Efek pada Bank Kustodian."
              />
              <Item
                number="13"
                text="Pemodal mengerti dan memahami bahwa Penerbit diwajibkan menetapkan jumlah minimum dana yang harus diperoleh dalam penawaran Efek melalui Layanan Urun Dana, dan apabila jumlah minimum dana yang telah ditentukan oleh Penerbit tersebut tidak terpenuhi, maka penawaran Efek melalui Layanan Urun Dana tersebut dinyatakan batal demi hukum."
              />
              <Item
                number="14"
                text="Pemodal mengerti dan memahami bahwa dalam hal penawaran Efek batal demi hukum, maka Penyelenggara wajib mengembalikan dana beserta seluruh manfaat yang timbul dari dana tersebut ke dalam saldo deposit Pemodal di platform Penyelenggara secara proporsional kepada Pemodal paling lambat 2 (dua) Hari Kerja setelah penawaran Efek dinyatakan batal demi hukum."
              />
              <Item
                number="15"
                text="Bagi Pemodal yang transaksinya tidak valid atau valid sebagian, maka LBS Urun Dana akan menghubungi Pemodal untuk melakukan konfirmasi. Apabila Pemodal tidak melakukan konfirmasi balik selama 5 (lima) Hari Kerja kepada Penyelenggara, maka transaksi Pemodal tersebut dimasukkan ke dalam saldo deposit Pemodal di platform Penyelenggara yang sewaktu-waktu dapat ditarik oleh Pemodal."
              />
              <Item
                number="16"
                text="Dalam hal transaksi pembelian Efek Pemodal dilakukan pada saat Efek telah dinyatakan habis/soldout, maka Pemodal berhak atas pengembalian pembelian Efek dengan melakukan konfirmasi kepada Penyelenggara melalui media komunikasi yang telah disediakan oleh Penyelenggara. Pengembalian pembayaran pembelian Efek tersebut akan masuk ke dalam saldo deposit Pemodal di platform Penyelenggara yang sewaktu-waktu dapat ditarik oleh Pemodal."
              />
              <Item
                number="17"
                text="Pemodal dapat membatalkan rencana pembelian Efek melalui Layanan Urun Dana paling lambat dalam waktu 48 (empat puluh delapan) jam setelah melakukan pembelian Efek. Dalam hal Pemodal membatalkan rencana pembelian Efek, Penyelenggara wajib mengembalikan dana kepada Pemodal selambatnya 2 (dua) Hari Kerja setelah pembatalan pemesanan Pemodal. Pengembalian tersebut akan masuk ke dalam menu deposit didalam aplikasi penyelenggara yang sewaktu-waktu dapat ditarik oleh Pemodal."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="V" text="DAFTAR PEMEGANG SAHAM" />
              <Item
                number="1"
                text="Pemodal mengerti dan memahami bahwa Penerbit wajib mencatatkan kepemilikan Saham Pemodal dalam daftar pemegang Efek."
              />
              <Item
                number="2"
                text="Persetujuan Pemodal terhadap terms and conditions ini berarti Pemodal setuju dan sepakat bahwa Pemodal memberikan kuasa kepada Penyelenggara untuk mewakili Pemodal sebagai pemegang Efek Penerbit termasuk dalam Rapat Umum Pemegang Saham (“RUPS”) Penerbit dan penandatanganan akta serta dokumen terkait lainnya."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="VI" text="PENGHIMPUNAN DANA" />
              <Item
                number="1"
                text="Pemodal mengerti dan memahami bahwa pembagian dividen, nisbah, bagi hasil, margin kepada para pemegang Efek tidak bersifat lifetime karena Penerbit merupakan badan usaha berbadan hukum berhak melakukan Buyback sebagaimana diatur dalam akta anggaran dasar Penerbit dan peraturan perundang-undangan yang berlaku."
              />
              <Item
                number="2"
                text="Dalam hal Efek bersifat ekuitas, Pemodal mengerti dan memahami bahwa:"
              />
              <>
                <Item2
                  number="a"
                  text="Pembagian dividen Penerbit diinformasikan di dalam kebijakan dividen dan didasarkan pada laba bersih Penerbit setelah dikurangi dengan pencadangan. Mekanisme pembagian dividen lainnya (termasuk pembagian dividen interim) mengacu pada anggaran dasar Penerbit dan peraturan perundang-undangan yang berlaku."
                />
                <Item2
                  number="b"
                  text="Pembagian dividen final Penerbit mengacu pada persetujuan Rapat Umum Pemegang Saham (“RUPS”) Penerbit."
                />
                <Item2
                  number="c"
                  text="Apabila terdapat beban operasional usaha yang harus dikeluarkan setiap periode tertentu, Penerbit tidak memiliki hak untuk membebankannya kepada Pemodal, melainkan beban tersebut dimasukkan ke dalam penghitungan biaya operasional yang kemudian dilaporkan dalam laporan keuangan periode tersebut."
                />
              </>
            </View>

            <View style={{marginTop: 24}}>
              <Title number="VII" text="KEWAJIBAN PEMODAL" width={36} />
              <Paragraph text="Tanpa mengesampingkan hak dan kewajiban lainnya sebagaimana telah tersebut dalam Perjanjian ini, maka kewajiban Pemodal adalah sebagai berikut:" />
              <Item
                number="1"
                text="Pemodal wajib menjaga nama baik dan reputasi Penyelenggara dengan tidak melakukan aktifitas yang mengandung unsur suku, agama dan ras, atau tidak melakukan penyebaran informasi yang tidak benar dengan mengatasnamakan Penyelenggara."
              />
              <Item
                number="2"
                text="Pemodal wajib setuju dan sepakat bersedia untuk memberikan akses audit internal maupun audit eksternal yang ditunjuk Penyelenggara serta audit Otoritas Jasa Keuangan (OJK) atau regulator berwenang lainnya setiap kali dibutuhkan terkait pelaksanaan Layanan Urun Dana ini."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="VIII" text="HAK PEMODAL" width={36} />
              <Paragraph text="Tanpa mengesampingkan hak dan kewajiban lainnya sebagaimana telah tersebut dalam Perjanjian ini, maka hak Pemodal adalah sebagai berikut:" />
              <Item
                number="1"
                text="Pemodal berhak untuk melakukan pembelian Efek yang ditawarkan Penerbit melalui Layanan Urun Dana yang diselenggarakan Penyelenggara."
              />
              <Item
                number="2"
                text="Pemodal berhak mendapat manfaat atas kepemilikan Efek yang dilakukan oleh Penerbit melalui Penyelenggara."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="IX" text="KEWAJIBAN PENYELENGGARA" width={36} />
              <Paragraph text="Tanpa mengesampingkan hak dan kewajiban lainnya sebagaimana telah tersebut dalam Perjanjian ini, maka kewajiban Penyelenggara adalah sebagai berikut:" />
              <Item
                number="1"
                text="Penyelenggara wajib memenuhi seluruh hak-hak Pemodal"
              />
              <Item
                number="2"
                text="Penyelenggara memonitor, menganalisa, dan memastikan bahwa Pengguna berada di jalur yang sesuai dengan visi misi Penyelenggara dan Layanan Urun Dana."
              />
              <Item
                number="3"
                text="Penyelenggara bertanggung jawab melakukan ganti rugi atas setiap kerugian Pemodal yang timbul disebabkan oleh kelalaian karyawan ataupun direksi Penyelenggara."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="X" text="HAK PENYELENGGARA" />
              <Paragraph text="Tanpa mengesampingkan hak dan kewajiban lainnya sebagaimana telah tersebut dalam Perjanjian ini, maka hak Penyelenggara adalah:" />
              <Item
                number="1"
                text="Penyelenggara berhak atas manfaat dari Pemodal atas Layanan Urun Dana yang sedang berlangsung."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XI" text="PERPAJAKAN" />
              <Paragraph text="Pembebanan pajak yang timbul dalam Layanan Urun Dana ini menjadi beban masing-masing pihak sesuai dengan ketentuan hukum perpajakkan yang berlaku di wilayah Negara Republik Indonesia." />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XII" text="HAK ATAS KEKAYAAN INTELEKTUAL" />
              <Item
                number="1"
                text="Hak atas kekayaan intelektual yang timbul atas pelaksanaan Layanan Urun Dana dan izin Penyelenggara, beserta fasilitas-fasilitas lain yang dimiliki Penyelenggara dan digunakan dalam Layanan Urun Dana ini adalah tetap dan seterusnya milik Penyelenggara dan tidak ada penyerahan hak dari Penyelenggara kepada Pemodal dalam Layanan Urun Dana ini."
              />
              <Item
                number="2"
                text="Pemodal tidak berhak untuk mengubah, mengembangkan, membagikan dan/atau menjual baik seluruh maupun sebagian hak atas kekayaan intelektual yang timbul atas pengembangan, inovasi, perubahan berupa fitur dan/atau fungsi terhadap sistem teknologi informasi."
              />
              <Item
                number="3"
                text="Penyelenggara dengan ini menjamin bahwa hak atas kekayaan intelektual yang terkandung dalam pelaksanaan Layanan Urun Dana ini tidak melanggar hak atas kekayaan intelektual milik pihak manapun, dan Penyelenggara membebaskan Pemodal dari segala tuntutan, gugatan dari pihak manapun, sehubungan dengan pelanggaran terhadap hak atas kekayaan intelektual yang terkandung dalam Layanan Urun Dana sesuai dengan terms and conditions ini."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title
                number="XIII"
                text="JANGKA WAKTU DAN PENGAKHIRAN"
                width={36}
              />
              <Item
                number="1"
                text="Jangka waktu Layanan Urun Dana antara Penyelenggara dan Pemodal ini berlaku selama Penerbit turut serta dalam Layanan Urun Dana."
              />
              <Item
                number="2"
                text="Layanan Urun Dana ini berakhir dengan sendirinya, apabila:"
              />
              <>
                <Item2 number="a" text="Penerbit melakukan Buyback Efek;" />
                <Item2 number="b" text="Diakhiri oleh Penyelenggara." />
              </>
              <Item
                number="3"
                text="Dalam hal Layanan Urun Dana ini berakhir dan/atau dinyatakan berakhir, maka Para Pihak sepakat bahwa ketentuan Informasi Rahasia sebagaimana diatur dalam terms and conditions ini tetap berlaku dan mengikat Para Pihak hingga kapanpun meskipun Layanan Urun Dana telah berakhir."
              />
              <Item
                number="4"
                text="Pengakhiran/pembatalan Layanan Urun Dana ini tidak menghapuskan kewajiban-kewajiban masing-masing Pihak yang telah atau akan timbul dan belum dilaksanakan pada saat berakhirnya Layanan Urun Dana ini."
              />
              <Item
                number="5"
                text="Dalam hal pengakhiran/pembatalan Layanan Urun Dana ini, Para Pihak sepakat untuk mengesampingkan keberlakuan ketentuan Pasal 1266 Kitab Undang-Undang Hukum Perdata, sepanjang ketentuan tersebut mensyaratkan adanya suatu putusan atau penetapan pengadilan untuk menghentikan atau mengakhiri suatu perjanjian, sehingga pengakhiran/pembatalan Layanan Urun Dana ini cukup dilakukan dengan pemberitahuan tertulis dari salah satu Pihak."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XIV" text="INFORMASI RAHASIA" width={36} />
              <Item
                number="1"
                text="Salah satu Pihak (selanjutnya disebut “ Pihak Pemberi ”) dapat memberikan Informasi Rahasia kepada Pihak lainnya (selanjutnya disebut “Pihak Penerima ”) dalam melaksanakan Layanan Urun Dana ini. Para Pihak sepakat bahwa pemberian, penerimaan dan penggunaan Informasi Rahasia tersebut dilakukan sesuai dengan terms and conditions ini."
              />
              <Item
                number="2"
                text="Informasi Rahasia yang dimaksud dalam ketentuan ini berarti informasi yang bersifat non-publik, termasuk namun tidak terbatas pada skema atau gambar produk, penjelasan material, spesifikasi, laporan keuangan dan informasi mengenai klien, kebijaksanaan dan praktek bisnis Pihak Pemberi dan informasi mana dapat dimuat dalam media cetak, tulis, disk / tape / compact disk komputer atau media lainnya yang sesuai."
              />
              <Item
                number="3"
                text="Tidak termasuk sebagai Informasi Rahasia adalah materi atau informasi yang mana dapat dibuktikan oleh Pihak Penerima bahwa:"
              />
              <>
                <Item2
                  number="a"
                  text="Pada saat penerimaannya sebagai milik publik ( public domain ) atau menjadi milik publik ( public domain ) atau menjadi milik publik ( public domain ) tanpa adanya pelanggaran oleh Pihak Penerima;"
                />
                <Item2
                  number="b"
                  text="Telah diketahui oleh Pihak Penerima pada saat diberikan oleh Pihak Pemberi;"
                />
                <Item2
                  number="c"
                  text="Telah didapatkan dari pihak ketiga tanpa adanya pelanggaran terhadap pengungkapan Informasi Rahasia;"
                />
                <Item2
                  number="d"
                  text="Dikembangkan sendiri oleh Pihak Penerima."
                />
              </>
              <Item
                number="4"
                text="Pihak Penerima dengan ini menyatakan bahwa tidak akan mengungkapkan Informasi Rahasia apapun yang diberikan Pihak Pemberi ke pihak lainnya selain daripada yang diperlukan dalam melaksanakan tugas, peran dan kewajibannya dalam Layanan Urun Dana ini, tanpa terlebih dahulu memperoleh persetujuan dari Pihak Pemberi dan Pihak Penerima akan melakukan semua tindakan-tindakan pencegahan yang wajar untuk mencegah terjadinya pelanggaran atau kelalaian dalam pengungkapan, penggunaan, pembuatan salinan ( copy ) atau pengalihan Informasi Rahasia tersebut."
              />
              <Item
                number="5"
                text="Masing-masing Pihak berkewajiban untuk menyimpan segala rahasia data atau sistem yang diketahuinya baik secara langsung maupun tidak langsung sehubungan Layanan Urun Dana yang dilaksanakan sesuai dengan terms and conditions ini dan bertanggung jawab atas segala kerugian yang diakibatkan karena pembocoran Informasi Rahasia tersebut, baik oleh masing-masing Pihak maupun karyawannya maupun perwakilannya."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XV" text="PERNYATAAN DAN JAMINAN" width={36} />
              <Item
                number="1"
                text="Tanpa mengesampingkan pernyataan dan jaminan yang diberikan oleh salah satu Pihak ke Pihak lainnya dalam Layanan Urun Dana ini, masing-masing Pihak dengan ini menyatakan dan menjamin Pihak lainnya dalam Layanan Urun Dana hal-hal sebagai berikut:"
              />
              <>
                <Item2
                  number="a"
                  text="Bahwa berdasarkan hukum negara Republik Indonesia, masing-masing Pihak cakap menurut hukum untuk memiliki harta kekayaan dan melakukan perbuatan hukum usahanya di wilayah Republik Indonesia serta memiliki segala perizinan yang diperlukan untuk menjalankan perbuatan hukum.;"
                />
                <Item2
                  number="b"
                  text="Bahwa masing-masing Pihak telah mengambil segala tindakan yang diperlukan untuk memastikan wakil dari masing-masing Pihak dalam Layanan Urun Dana telah memiliki kuasa dan wewenang penuh untuk mengikatkan diri dalam persetujuan terms and conditions ini;"
                />
                <Item2
                  number="c"
                  text="Bahwa masing-masing Pihak telah memastikan bahwa Layanan Urun Dana ini tidak melanggar ketentuan dari anggaran dasar masing-masing Pihak dalam Layanan Urun Dana dan tidak bertentangan dengan perjanjian apapun yang dibuat oleh masing-masing Pihak dengan pihak ketiga;"
                />
                <Item2
                  number="d"
                  text="Pelaksanaan ketentuan-ketentuan dalam Layanan Urun Dana ini dilaksanakan secara profesional dengan penuh tanggung jawab dan atas dasar hubungan yang saling menguntungkan."
                />
                <Item2
                  number="e"
                  text="Persetujuan terms and conditions ini tidak bertentangan atau melanggar atau berbenturan dengan kaidah-kaidah hukum dan peraturan perundang-undangan serta kebijakan-kebijakan pemerintah Republik Indonesia atau pihak yang berwenang lainnya;"
                />
                <Item2
                  number="f"
                  text="Bersedia untuk menerapkan, mendukung dan mematuhi ketentuan hukum dan peraturan perundang-undangan yang berlaku di Republik Indonesia termasuk namun tidak terbatas pada peraturan mengenai tindak pidana korupsi, anti pencucian uang dan anti penyuapan;"
                />
                <Item2
                  number="g"
                  text="Masing-masing Pihak akan melaksanakan Layanan Urun Dana ini dengan itikad baik dan secara jujur. Tidak satupun ketentuan dalam Layanan Urun Dana ini akan digunakan oleh salah satu Pihak untuk mengambil keuntungan secara tidak wajar dan mengakibatkan kerugian bagi Pihak lainnya dan tidak satupun ketentuan dalam Layanan Urun Dana ini dimaksudkan untuk memberikan keuntungan secara tidak wajar kepada Pihak lainnya."
                />
              </>
              <Item
                number="2"
                text="Tanpa mengesampingkan pernyataan dan jaminan yang diberikan oleh Penerbit ke Penyelenggara, Pemodal dengan ini menyatakan dan menjamin kepada Penyelenggara hal-hal sebagai berikut:"
              />
              <Item2
                number="a"
                text="Bahwa Pemodal akan membebaskan Penyelenggara dari klaim, tuntutan, gugatan dari pihak ketiga atas kelalaian Pemodal dan/atau karyawan Pemodal dalam melaksanakan Layanan Urun Dana ini;"
              />
              <Item2
                number="b"
                text="Bahwa Pemodal menyatakan tidak berkeberatan dalam hal Otoritas Jasa Keuangan dan/atau pihak lain yang sesuai undang-undang berwenang untuk melakukan pemeriksaan, akan melakukan pemeriksaan terhadap pelaksanaan Layanan Urun Dana ini;"
              />
              <Item2
                number="c"
                text="Bahwa Pemodal bersedia untuk kemungkinan pengubahan, pembuatan atau pengambil alih kegiatan yang dilaksanakan oleh Pemodal atau penghentian Layanan Urun Dana, dalam hal atas permintaan Otoritas Jasa Keuangan apabila diperlukan."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title
                number="XVI"
                text="KEADAAN MEMAKSA ( FORCE MAJEURE )"
                width={40}
              />
              <Item
                number="1"
                text="Keadaan Memaksa atau Force Majeure adalah kejadian-kejadian yang terjadi diluar kemampuan dan kekuasaan Para Pihak sehingga menghalangi Para Pihak untuk melaksanakan Layanan Urun Dana ini, termasuk namun tidak terbatas pada adanya kebakaran, banjir, gempa bumi,likuifaksi, badai, huru-hara, peperangan, epidemi, pertempuran, pemogokan, sabotase, embargo, peledakan yang mengakibatkan kerusakan sistem teknologi informasi yang menghambat pelaksanaan Layanan Urun Dana ini, serta kebijaksanaan pemerintah Republik Indonesia yang secara langsung berpengaruh terhadap pelaksanaan Layanan Urun Dana ini."
              />
              <Item
                number="2"
                text="Masing-masing Pihak dibebaskan untuk membayar denda apabila terlambat dalam melaksanakan kewajibannya dalam Layanan Urun Dana ini, karena adanya hal-hal Keadaan Memaksa."
              />
              <Item
                number="3"
                text="Keadaan Memaksa sebagaimana dimaksud harus diberitahukan oleh Pihak yang mengalami Keadaan Memaksa kepada Pihak lainnya dalam Layanan Urun Dana ini paling lambat 7 (tujuh) Hari Kalender dengan melampirkan pernyataan atau keterangan tertulis dari pemerintah untuk dipertimbangkan oleh Pihak lainnya beserta rencana pemenuhan kewajiban yang tertunda akibat terjadinya Keadaan Memaksa."
              />
              <Item
                number="4"
                text="Keadaan Memaksa yang menyebabkan keterlambatan pelaksanaan Layanan Urun Dana ini baik untuk seluruhnya maupun sebagian bukan merupakan alasan untuk pembatalan Layanan Urun Dana ini sampai dengan diatasinya Keadaan Memaksa tersebut."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title
                number="XVII"
                text="PENGALIHAN LAYANAN URUN DANA"
                width={46}
              />
              <Item
                number="1"
                text="Pemodal setuju dan sepakat untuk tidak mengalihkan sebagian atau keseluruhan hak dan kewajiban Penerbit dalam Layanan Urun Dana ini kepada pihak lainnya atau pihak manapun."
              />
              <Item
                number="2"
                text="Dalam hal adanya permintaan peralihan atas hak kepemilikan Saham dikarenakan Pemodal meninggal dunia, maka ahli waris mengajukan permohonan perubahan kepemilikan Saham kepada Penyelenggara dengan melengkapi dokumen sebagai sebagai berikut:"
              />
              <>
                <Item2
                  number="a"
                  text="Surat permohonan peralihan kepemilikan Saham dikarenakan Pemodal meninggal dunia;"
                />
                <Item2
                  number="b"
                  text="Softcopy surat kematian dari instansi berwenang;"
                />
                <Item2
                  number="c"
                  text="Softcopy surat keterangan ahli waris dari instansi berwenang dan/atau surat penetapan pengadilan tentang ahli waris;"
                />
                <Item2
                  number="d"
                  text="Softcopy E-KTP atas nama Pemodal dan ahli waris"
                />
                <Item2
                  number="e"
                  text="Softcopy Kartu Keluarga (KK) atas nama Pemodal"
                />
                <Item2
                  number="f"
                  text="Surat Penunjukan dan/atau Surat Kuasa dari ahli waris (apabila ahli waris lebih dari satu) untuk menunjuk dan/atau menguasakan peralihan kepemilikan Saham kepada salah satu ahli waris."
                />
              </>
            </View>

            <View style={{marginTop: 24}}>
              <Title
                number="XVIII"
                text="DOMISILI HUKUM DAN PENYELESAIAN SENGKETA"
                width={50}
              />
              <Item
                number="1"
                text="Layanan Urun Dana ini dibuat, ditafsirkan dan dilaksanakan berdasarkan hukum negara Republik Indonesia."
              />
              <Item
                number="2"
                text="Setiap perselisihan yang timbul sehubungan dengan Layanan Urun Dana ini, akan diupayakan untuk diselesaikan terlebih dahulu oleh Para Pihak dengan melaksanakan musyawarah untuk mufakat."
              />
              <Item
                number="3"
                text="Apabila penyelesaian perselisihan secara musyawarah tidak berhasil mencapai mufakat sampai dengan 20 (dua puluh) Hari Kalender sejak dimulainya musyawarah tersebut, maka Para Pihak sepakat untuk menyelesaikan perselisihan tersebut melalui proses pengadilan."
              />
              <Item
                number="4"
                text="Para Pihak sepakat untuk menyelesaikan perselisihan di Pengadilan Agama Jakarta Utara di Provinsi DKI Jakarta tanpa mengurangi hak dari salah satu untuk mengajukan gugatan pada domisili pengadilan lainnya ( non-exlusive jurisdiction )."
              />
              <Item
                number="5"
                text="Tanpa mengesampingkan penyelesaian sengketa atau perselisihan melalui pengadilan negeri, Para Pihak setuju dan sepakat apabila penyelesaian sengketa atau perselisihan di badan arbitrase dan badan alternatif penyelesaian sengketa yang ditunjuk oleh Otoritas Jasa Keuangan maupun regulator berwenang lainnya."
              />
              <Item
                number="6"
                text="Hasil putusan pengadilan negeri maupun badan arbitrase dan badan alternatif penyelesaian sengketa yang ditunjuk oleh Otoritas Jasa Keuangan maupun regulator berwenang lainnya bersifat final dan mempunyai kekuatan hukum tetap dan mengikat bagi Para Pihak."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XIX" text="KELALAIAN / WANPRESTASI" width={40} />
              <Item
                number="1"
                text="Dalam hal terjadi salah satu hal atau peristiwa yang ditetapkan di bawah ini, maka merupakan suatu kejadian kelalaian (wanprestasi) terhadap Layanan Urun Dana ini:"
              />
              <>
                <Item2 number="a" text="Kelalaian dalam Layanan Urun Dana" />
                <Item2 text="Dalam hal salah satu Pihak terbukti sama sekali tidak melaksanakan kewajiban, atau melaksanakan kewajiban tetapi tidak sebagaimana disepakati, atau melaksanakan kewajiban tetapi tidak sesuai dengan waktu yang disepakati, atau melakukan sesuatu yang tidak diperbolehkan dalam terms and conditions." />

                <Item2 number="b" text="Pernyataan Tidak Benar" />
                <Item2 text="Dalam hal ternyata bahwa sesuatu pernyataan atau jaminan yang diberikan oleh salah satu Pihak kepada Pihak lainnya dalam Layanan Urun Dana ini terbukti tidak benar atau tidak sesuai dengan kenyataannya dan menimbulkan kerugian langsung yang diderita salah satu Pihak." />

                <Item2 number="c" text="Kepailitan" />
                <Item2 text="Dalam hal salah satu Pihak dalam Layanan Urun Dana ini oleh instansi yang berwenang dinyatakan berada dalam keadaan pailit atau diberikan penundaan membayar hutang-hutang ( surseance van betaling )." />

                <Item2 number="c" text="Permohonan Kepailitan." />
                <Item2 text="Dalam hal salah satu Pihak dalam Layanan Urun Dana ini mengajukan permohonan kepada instansi yang berwenang untuk dinyatakan pailit atau untuk diberikan penundaan membayar hutang-hutang ( surseance van betaling ) atau dalam hal pihak lain mengajukan permohonan kepada instansi yang berwenang agar salah satu Pihak dalam Layanan Urun Dana ini dinyatakan dalam keadaan pailit." />
              </>
              <Item
                number="2"
                text="Dalam hal suatu kejadian kelalaian terjadi dan berlangsung, maka Pihak yang tidak lalai berhak menyampaikan peringatan sebanyak 3 (tiga) kali dengan tenggang waktu 7 (tujuh) Hari Kalender diantara masing-masing peringatan."
              />
              <Item
                number="3"
                text="Setelah menyampaikan 3 (tiga) kali peringatan, Pihak yang tidak lalai berhak mengajukan tuntutan berupa meminta pemenuhan prestasi dilakukan atau meminta prestasi dilakukan disertai ganti kerugian atau meminta ganti kerugian saja atau menuntut pembatalan Layanan Urun Dana disertai ganti kerugian."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XX" text="PENALTI" width={36} />
              <Paragraph text="Apabila dalam Layanan Urun Dana ini, Pemodal melanggar ketentuan dalam Layanan Urun Dana ini maka Penyelenggara berhak menon-aktifkan atau membekukan akun Pemodal, bahkan pengakhiran Layanan Urun Dana Pemodal oleh Penyelenggara dalam Layanan Urun Dana ini." />
            </View>

            <View style={{marginTop: 24}}>
              <Title
                number="XXI"
                text="MEKANISME DALAM HAL PENYELENGGARA TIDAK DAPAT MENJALANKAN OPERASIONALNYA"
                width={40}
              />
              <Paragraph text="Mekanisme penyelesaian Layanan Urun Dana dalam hal Penyelenggara tidak dapat menjalankan operasional adalah sebagai berikut:" />
              <Item
                number="1"
                text="Penyelenggara melakukan pemberitahuan atau pengumuman secara tertulis di website Penyelenggara dan media sosial lainnya kepada seluruh Pengguna atau khalayak umum bahwa Penyelenggara tidak dapat memberitahukan operasionalnya dengan mencantumkan alasan jelas;"
              />
              <Item
                number="2"
                text="Bahwa pengaturan tata cara Buyback mengacu pada akta anggaran dasar Penerbit dan undang-undang dasar tentang perseroan terbatas yang berlaku di Negara Republik Indonesia;"
              />
              <Item
                number="3"
                text="Buyback seluruh Saham yang dimiliki Pemodal dengan harga pasar atau disepakati secara tertulis oleh Para Pihak di kemudian hari."
              />
              <Item
                number="4"
                text="Menunjuk penyelenggara lain yang telah mendapat izin dari Otoritas Jasa Keuangan seperti Penyelenggara, dengan syarat dan ketentuan yang sudah disepakati bersama dengan Pemodal."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XXII" text="DISCLAIMER" width={46} />
              <Item
                number="1"
                text="Penyelenggara bertindak sebagi penyelenggara Layanan Urun Dana, bukan sebagai pihak yang menjalankan bisnis (Penerbit)."
              />
              <Item
                number="2"
                text="Semua data dan informasi yang tersaji di website, aplikasi dan prospektus diperoleh Penyelenggara dari Penerbit dan media online."
              />
              <Item
                number="3"
                text="Keputusan pembelian Efek, sepenuhnya merupakan hak dan pilihan Pemodal, sehingga segala risiko dan konsekuensi atas pembelian Efek merupakan tanggung jawab dan risiko Pemodal sepenuhnya."
              />
              <Item
                number="4"
                text="Dengan membeli Efek di Penyelenggara, berarti Pemodal dianggap telah membaca, memahami dan menyetujui seluruh syarat dan ketentuan serta memahami risiko investasi termasuk risiko kehilangan atau seluruh modal."
              />
            </View>

            <View style={{marginTop: 24}}>
              <Title number="XXIII" text="LAIN-LAIN" width={50} />
              <Item
                number="1"
                text="Para Pihak wajib tunduk dan patuh terhadap peraturan perundang-undangan yang berlaku di negara Republik Indonesia terkait pelaksanaan Layanan Urun Dana ini."
              />
              <Item
                number="2"
                text="Layanan Urun Dana ini diinterpretasikan dan dilaksanakan berdasarkan hukum yang berlaku di Negara Republik Indonesia."
              />
              <Item
                number="3"
                text="Keabsahan, penafsiran dan pelaksanaan Layanan Urun Dana ini, diatur serta tunduk pada hukum dan peraturan perundang-undangan yang berlaku di negara Republik Indonesia;"
              />
              <Item
                number="4"
                text="Dalam hal ada salah satu atau lebih ketentuan dalam terms and conditions ini dinyatakan tidak sah, tidak berlaku atau tidak dapat dilaksanakan berdasarkan hukum dan/atau peraturan perundang-undangan yang berlaku di Republik Indonesia, maka kedua belah pihak setuju bahwa keabsahan ketentuan lainnya dalam terms and conditions ini tetap berlaku dan dapat dilaksanakan serta tidak akan terpengaruh;"
              />
              <Item
                number="5"
                text="Penyelenggara berhak untuk mengubah terms and conditions ini sewaktu-waktu dalam rangka penyempurnaan dan penyesuaian dengan ketentuan hukum yang berlaku di Negara Republik Indonesia"
              />
              <Item
                number="6"
                text="Dokumen-dokumen atau kesepakatan-kesepakatan terkait dengan Layanan Urun Dana ini yang telah dibuat oleh Para Pihak sebelum disetujuinya terms and conditions ini dinyatakan dicabut dan tidak berlaku terhitung sejak disetujuinya terms and conditions."
              />
            </View>
          </>
        </View>
        <Gap height={24} />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: RGBAColors(0.2)[colorScheme].background,
        }}>
        <Gap height={24} />
        <CheckBox
          label="Saya sudah membaca serta menyetujui syarat dan ketentuan yang berlaku"
          value={hasRead}
          onChange={() => setHasRead(prev => !prev)}
          color={textColor}
        />
        {checkError.length > 0 && <Gap height={8} />}
        {checkError.map((item, id) => (
          <Text key={id} style={{fontSize: 12, color: textColorDanger}}>
            {item}
          </Text>
        ))}
        <Gap height={20} />
        <Button
          title="Kirim Data KYC"
          onPress={submitTerms}
          loading={submitLoading}
        />
        <Gap height={20} />
      </View>
    </ScreenWrapper>
  );
};

export default KYCTerms;

const styles = StyleSheet.create({});
