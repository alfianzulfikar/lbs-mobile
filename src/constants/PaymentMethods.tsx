import {BankProcedureType} from './Types';

export const PAYMENT_METHODS: BankProcedureType[] = [
  {
    bank: 'MANDIRI',
    bank_name: 'MANDIRI',
    list: [
      {
        title: "Livin' by Mandiri",
        list: [
          "Login ke Livin'",
          'Pilih menu "Bayar"',
          'Ketik "DOKU VA Aggregator" atau "888999013" pada bagian search',
          'Masukkan No VA "888999013XXXXXXX" secara keseluruhan, lalu masukan nominal, kemudian tekan Lanjutkan',
          'Pastikan detail pembayaran sudah sesuai seperti no VA, Jumlah Pembayaran dan detail lainnya',
          'Pilih Rekening Sumber',
          'Pilih Lanjut Bayar kemudian masukkan PIN dan konfirmasi',
          'Transaksi selesai dan simpan resi sebagai bukti transaksi',
        ],
      },
      {
        title: 'ATM Mandiri',
        list: [
          'Masukkan Kartu ATM Mandiri, lalu pilih Bahasa',
          'Masukkan PIN ATM',
          'Pilih menu "Bayar/Beli"',
          'Pilih menu "Lainnya"',
          'Kemudian tekan kembali "Lainnya"',
          'Pilih menu "Multipayment"',
          'Masukkan 5 digit pertama dari kode pembayaran/Nomor VA Anda sebagai kode Perusahaan / Institusi. kemudian tekan BENAR',
          'Masukkan No VA "888999013XXXXXXX" secara keseluruhan, lalu masukan nominal, kemudian tekan Lanjutkan',
          'Pastikan detail pembayaran sudah sesuai seperti no VA, Jumlah Pembayaran dan detail lainnya',
          'Konfirmasi pembayaran dengan pilih "YA"',
          'Transaksi selesai dan simpan resi sebagai bukti transaksi',
        ],
      },
      {
        title: 'ATM Bank Lain',
        list: [
          'Masukkan PIN',
          'Pilih menu "Transfer"',
          'Pilih "Ke Rek Bank Lain"',
          'Masukkan Kode Bank Mandiri 008 dan kode bayar 88899013XXXXXXX sebagai rekening tujuan, kemudian tekan "Benar"',
          'Masukkan Jumlah pembayaran dan pilih "Benar"',
          'Muncul Layar Konfirmasi Transfer yang berisi Nomor rekening tujuan dan Nama beserta jumlah yang dibayar, jika sudah benar, Tekan "Benar"',
          'Selesai',
        ],
      },
    ],
  },
  {
    bank: 'BSI',
    bank_name: 'BSI',
    list: [
      {
        title: 'BSI Mobile',
        list: [
          'Pilih menu pembayaran',
          'Pilih e-commerce DOKU"',
          'Masukan Nomor Virtual Account, misal 3010XXXXXXX',
        ],
      },
      {
        title: 'BYOND by BSI',
        list: [
          'Pilih menu Beli dan Bayar',
          'Pilih menu Virtual Account',
          'Masukan nomor virtual account diawali dengan 6059, misal 60593010XXXXXXX',
          'Klik tombol Confirm',
        ],
      },
    ],
  },
  {
    bank: 'CIMB Niaga',
    bank_name: 'CIMB',
    list: [
      {
        title: 'Octo Mobile',
        list: [
          'Login ke Octo Mobile',
          'Pilih menu : Transfer',
          'Pilih menu : Transfer to Other CIMB Niaga Account',
          'Pilih "Source of fund"/"Source of Account"',
          'Masukkan nomor virtual account 18991020XXXXXXXX',
          'Masukkan jumlah pembayaran (Amount) sesuai tagihan',
          'Klik tombol Next',
          'Nomor virtual account, nama virtual account dan jumlah pembayaran (Amount) ditampilkan pada layar',
          'Klik tombol Confirm',
          'Masukkan Mobile Banking PIN',
        ],
      },
      {
        title: 'Internet Banking Bank Lain',
        list: [
          'Login ke internet banking',
          'Pilih menu transfer ke Bank Lain Online',
          'Pilih bank tujuan Bank CIMB Niaga (kode bank: 022)',
          'Masukkan nomor virtual account 18991020XXXXXXXX',
          'Masukkan jumlah pembayaran sesuai tagihan',
          'Nomor, nama virtual account dan jumlah billing ditampilkan pada layar',
          'Ikuti instruksi untuk menyelesaikan transaksi',
          'Konfirmasi pembayaran ditampilkan pada layar',
        ],
      },
      {
        title: 'OCTO Clicks',
        list: [
          'Login ke OCTO Clicks',
          'Pilih menu : Pembayaran Tagihan',
          'Pilih kategori transaksi : Virtual Account',
          'Pilih rekening sumber dana',
          'Masukkan nomor virtual account 18991020XXXXXXXX dan klik tombol : Lanjutkan untuk verifikasi detail',
          'Nomor virtual account, nama virtual account dan total tagihan ditampilkan pada layar',
          'Masukkan 6 digit OTP dan tekan tombol Submit',
          'Klik tombol Konfirmasi untuk memproses pembayaran',
        ],
      },
      {
        title: 'ATM Alto / Bersama / Prima',
        list: [
          'Masukkan Kartu ATM dan PIN Anda pada mesin ATM bank tersebut',
          'Pilih menu TRANSFER > TRANSFER KE BANK LAIN',
          'Masukkan kode bank CIMB Niaga: 022',
          'Masukkan jumlah pembayaran sesuai tagihan',
          'Masukkan nomor virtual account 18991020XXXXXXXX',
          'Ikuti instruksi untuk menyelesaikan transaksi',
          'Konfirmasi pembayaran ditampilkan pada layar',
        ],
      },
      {
        title: 'ATM CIMB',
        list: [
          'Masukkan Kartu ATM dan PIN CIMB Anda',
          'Pilih menu Pembayaran > Lanjut > Virtual Account',
          'Masukkan nomor virtual account 18991020XXXXXXXX',
          'Pilih rekening debit',
          'Nomor, nama virtual account dan jumlah billing ditampilkan pada layar',
          'Pilih OK untuk melakukan pembayaran',
          'Konfirmasi pembayaran ditampilkan pada layar',
        ],
      },
    ],
  },
  {
    bank: 'BRI',
    bank_name: 'BRI',
    list: [
      {
        title: 'ATM BRI',
        list: [
          'Masukkan Kartu ATM BRI, lalu masukkan PIN ATM',
          'Pilih menu Transaksi Lain > Pembayaran > Lainnya > BRIVA',
          'Masukkan kode pembayaran / virtual account number Anda : 123627012XXXXXXX',
          'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan dan Jumlah Pembayaran',
          'Ikuti instruksi untuk menyelesaikan transaksi',
          'Simpan struk transaksi sebagai bukti pembayaran',
        ],
      },
      {
        title: 'Mobile Banking BRI',
        list: [
          'Login aplikasi BRI Mobile',
          'Pilih menu BRIVA',
          'Pilih pembayaran baru',
          'Masukkan kode pembayaran / virtual account number Anda : 123627012XXXXXXX',
          'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan dan Total Pembayaran',
          'Masukkan PIN',
          'Simpan notifikasi SMS sebagai bukti pembayaran',
        ],
      },
      {
        title: 'Internet Banking BRI',
        list: [
          'Login ke Internet Banking BRI',
          'Pilih menu Pembayaran Tagihan > Pembayaran > BRIVA',
          'Masukkan kode pembayaran / virtual account number Anda : 123627012XXXXXXX',
          'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan dan Jumlah Pembayaran',
          'Masukkan password dan mToken',
          'Cetak/simpan struk pembayaran BRIVA sebagai bukti pembayaran',
        ],
      },
      {
        title: 'Mini ATM/EDC BRI',
        list: [
          'Pilih menu Mini ATM > Pembayaran > BRIVA',
          'Swipe Kartu Debit BRI Anda',
          'Masukkan kode pembayaran / virtual account number Anda : 123627012XXXXXXX',
          'Masukkan PIN',
          'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan dan Jumlah Pembayaran',
          'Simpan struk transaksi sebagai bukti pembayaran',
        ],
      },
      {
        title: 'ATM Bank Lain/Mobile Banking lain',
        list: [
          'Masukkan Kartu ATM dan PIN ATM',
          'Pilih menu Transaksi Lainnya > Transfer > Ke Rekening Bank Lain',
          'Masukkan kode bank BRI kemudian diikuti kode pembayaran / virtual account number Anda : 123627012XXXXXXX',
          'Ikuti instruksi untuk menyelesaikan transaksi',
          'Simpan struk transaksi sebagai bukti pembayaran',
        ],
      },
    ],
  },
  {
    bank: 'DANAMON',
    bank_name: 'DANAMON',
    list: [
      {
        title: 'ATM Danamon',
        list: [
          'Pilih Menu Pembayaran > Lainnya > Virtual Account',
          'Input Nomor Virtual Account sesuai instruksi pembayaran, misal 7656XXXXXXXXXXXX"',
          'Pilih Benar',
          'Data Virtual Account akan ditampilkan',
          'Konfirmasi Pembayaran, Pilih Ya jika sudah sesuai',
          'Ambil bukti bayar Anda',
        ],
      },
      {
        title: 'Moblie Banking Danamon',
        list: [
          'Login Danamon Mobile',
          'Pilih menu Pembayaran > Pilih Virtual Account',
          'Pilih No VA atau Tambah Biller Baru > Tekan Lanjut',
          'Input Nomor Virtual Account sesuai instruksi pembayaran, misal 7656XXXXXXXXXXXX > Tekan Ajukan',
          'Layar Konfirmasi > Data Virtual Account akan ditampilkan',
          'Jika sudah sesuai, Masukkan mPIN',
          'Pilih Konfirmasi',
          'Bukti bayar akan dikirim melalui sms',
        ],
      },
      {
        title: 'ATM Bank Lain',
        list: [
          'Pilih Menu Transfer ke Bank Lain',
          'Masukan Kode Bank “011” Bank Danamon',
          'Input Nomor Virtual Account, misal 7656XXXXXXXXXXXX',
          'Masukan Nominal Transfer (Harus sesuai dengan yang tertera pada instruksi pembayaran)',
          'Masukan No Referensi (Boleh dikosongkan)',
          'Pilih Sumber Dana Tabungan/Giro/Kartu Kredit',
          'Screen Konfirmasi, jika sesuai Pilih Proses/OK',
        ],
      },
      {
        title: 'Mobile/Internet Banking Bank Lain',
        list: [
          'Pilih Menu Transfer Antar Bank',
          'Pilih Bank Penerima Dana → Bank Danamon',
          'Input Nomor Virtual Account sesuai instruksi pembayaran, misal 7656XXXXXXXXXXXX',
          'Masukan Nominal Transfer (Harus sesuai dengan instruksi bayaran)',
          'Screen Konfirmasi (Pastikan sudah sesuai)',
          'Jika sesuai, ikuti proses selanjutnya',
          'Simpan bukti transfer Anda',
        ],
      },
    ],
  },
];
