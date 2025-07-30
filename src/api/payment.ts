import {useState} from 'react';
import {PaymentType} from '../constants/Types';
import {useAPI} from '../services/api';

export const usePayment = () => {
  const {apiRequest} = useAPI();
  const [payment, setPayment] = useState<PaymentType>({
    type: '',
    paymentCode: '',
    merkDagang: '',
    businessCode: '',
    billingExpired: '',
    bank: '',
    nominal: 0,
    total: 0,
    platformFee: 0,
    va: '',
    discount: 0,
    status: '',
    bankFee: 0,
    price: 0,
    volume: 0,
  });
  const [paymentLoading, setPaymentLoading] = useState(false);

  const getPayment = async (paymentCode: string, type: string) => {
    setPaymentLoading(true);
    try {
      const res = await apiRequest({
        endpoint: `/waiting-payment/${paymentCode}`,
        authorization: true,
      });
      const biayaPlatform = Math.round((res.nominal * res.percentage) / 100);
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
      setPayment({
        type: res.bisnis_transaksi[0]?.type_bisnis || '',
        paymentCode,
        merkDagang: res.bisnis_transaksi[0]?.merk_dagang || '',
        businessCode: res.bisnis_transaksi[0]?.kode_saham || '',
        billingExpired: res.billing_expired || '',
        bank: res.bank_name || '',
        nominal: res.nominal || 0,
        total: res.total_nominal || 0,
        platformFee: res.fee || 0,
        va: res.account_va || '',
        discount: res.discount || 0,
        status: res.status_transaksi?.name || '',
        bankFee: res.total_nominal - res.nominal - biayaPlatform,
        price: 0,
        volume: 0,
      });
    } catch {
    } finally {
      setPaymentLoading(false);
    }
  };
  return {payment, getPayment, paymentLoading};
};
