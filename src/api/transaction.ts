import {useState} from 'react';
import {useAPI} from '../services/api';

export const useTransaction = () => {
  const {apiRequest} = useAPI();
  const [transactionDetail, setTransactionDetail] = useState({
    kodeEfek: '',
    kodePembayaran: '',
    merkDagang: '',
    totalTransaksi: 0,
    jenisBisnis: '',
    hargaPerLembar: 0,
    jumlahLembar: 0,
    nominal: 0,
    biayaAdminBank: 0,
    biayaPlatform: 0,
    jenisTransaksi: '',
    statusTransaksi: '',
    periodePembayaran: '',
    tanggalPembayaran: '',
    isIPO: false,
  });
  const [transactionDetailLoading, setTransactionDetailLoading] =
    useState(false);

  const getTransactionDetail = async ({
    paymentCode,
    type,
  }: {
    paymentCode: string;
    type: string;
  }) => {
    setTransactionDetail(prev => {
      return {
        ...prev,
        kodeEfek: '',
        kodePembayaran: '',
        merkDagang: '',
        totalTransaksi: 0,
        jenisBisnis: '',
        hargaPerLembar: 0,
        jumlahLembar: 0,
        nominal: 0,
        biayaAdminBank: 0,
        biayaPlatform: 0,
        jenisTransaksi: '',
        statusTransaksi: '',
        isIPO: false,
      };
    });
    setTransactionDetailLoading(true);
    try {
      const res = await apiRequest({
        endpoint: `/waiting-payment/${paymentCode}`,
        authorization: true,
      });
      const jenisTransaksi = type || 'Pembelian';
      const biayaPlatform = Math.round((res.nominal * res.percentage) / 100);
      const biayaAdminBank =
        jenisTransaksi == 'Penjualan'
          ? 2900
          : jenisTransaksi == 'Pembelian'
          ? 5900
          : 0;
      const fee = biayaPlatform + biayaAdminBank;
      const isIPO = res.total_nominal - res.nominal !== 0 ? false : true;
      // let feeObject = {};
      // if (
      //   (jenisTransaksi == 'Penjualan' || jenisTransaksi == 'Pembelian') &&
      //   fee &&
      //   res.percentage >= 0
      // ) {
      //   feeObject = {
      //     biayaPlatform: Math.round((res.nominal * res.percentage) / 100),
      //     biayaAdminBank: jenisTransaksi === 'Penjualan' ? 2900 : 5900,
      //   };
      // }
      setTransactionDetail(prev => {
        return {
          ...prev,
          kodeEfek:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].kode_saham
              : '',
          kodePembayaran: res.kode || '',
          merkDagang:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].merk_dagang
              : '',
          totalTransaksi: isIPO
            ? res.nominal
            : jenisTransaksi == 'Penjualan'
            ? res.nominal - fee
            : jenisTransaksi == 'Pembelian'
            ? res.nominal + fee
            : res.nominal,
          // jenisTransaksi === 'Penjualan'
          //   ? res.nominal - fee
          //   : res.total_nominal,
          jenisBisnis:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].type_bisnis
              : '',
          hargaPerLembar: Number(
            Number(res.nominal / res.jumlah_lembar).toFixed(),
          ),
          jumlahLembar: res.jumlah_lembar || 0,
          nominal: res.nominal || 0,
          biayaAdminBank: !isIPO ? biayaAdminBank : 0,
          biayaPlatform: !isIPO ? biayaPlatform : 0,
          jenisTransaksi: jenisTransaksi,
          statusTransaksi: res.status_transaksi.name || '',
          isIPO,
        };
      });
    } catch {
    } finally {
      setTransactionDetailLoading(false);
    }
  };

  return {
    transactionDetail,
    getTransactionDetail,
    transactionDetailLoading,
    setTransactionDetail,
  };
};
