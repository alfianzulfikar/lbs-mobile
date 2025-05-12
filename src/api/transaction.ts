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
      };
    });
    setTransactionDetailLoading(true);
    try {
      const res = await apiRequest({
        endpoint: `/waiting-payment/${paymentCode}`,
        authorization: true,
      });
      const jenisTransaksi = type;
      const fee = res.total_nominal - res.nominal;
      let feeObject = {};
      if (
        (jenisTransaksi == 'Penjualan' || jenisTransaksi == 'Pembelian') &&
        fee &&
        res.percentage >= 0
      ) {
        feeObject = {
          biayaPlatform: Math.round((res.nominal * res.percentage) / 100),
          biayaAdminBank:
            fee - Math.round((res.nominal * res.percentage) / 100),
        };
      }
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
          totalTransaksi:
            jenisTransaksi === 'Penjualan'
              ? res.nominal - fee
              : res.total_nominal,
          jenisBisnis:
            res.bisnis_transaksi.length > 0
              ? res.bisnis_transaksi[0].type_bisnis
              : '',
          hargaPerLembar: Number(
            Number(res.nominal / res.jumlah_lembar).toFixed(),
          ),
          jumlahLembar: res.jumlah_lembar || 0,
          nominal: res.nominal || 0,
          ...feeObject,
          jenisTransaksi: jenisTransaksi,
          statusTransaksi: res.status_transaksi.name || '',
        };
      });
    } catch {
    } finally {
      setTransactionDetailLoading(false);
    }
  };

  return {transactionDetail, getTransactionDetail, transactionDetailLoading};
};
