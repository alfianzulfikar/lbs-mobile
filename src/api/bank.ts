import {useState} from 'react';
import {BankType} from '../constants/Types';
import {useAPI} from '../services/api';

export const useBank = () => {
  const {apiRequest} = useAPI();
  const [paymentBankList, setPaymentBankList] = useState<BankType[]>([]);
  const [KYCBankList, setKYCBankList] = useState<BankType[]>([]);
  const [KYCBankListLoading, setKYCBankListLoading] = useState(false);

  const getPaymentBankList = async () => {
    try {
      const res = await apiRequest({
        endpoint: '/payment/banks',
        authorization: true,
      });
      if (res.length > 0) {
        let newArray: BankType[] = [];
        res.map((item: any) => {
          newArray.push({
            id: item.name,
            label: item.label,
            name: item.name,
            image: item.image,
            isMaintenance: item.is_maintenance,
          });
        });
        setPaymentBankList(newArray);
      }
    } catch {}
  };

  const getKYCBankList = async () => {
    setKYCBankListLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/list-bank',
        authorization: true,
      });
      let newKYCBankList: BankType[] = [];
      res.map((item: any) => {
        newKYCBankList.push({
          id: item.id,
          label: item.name,
        });
      });
      setKYCBankList(newKYCBankList);
    } catch (error) {
    } finally {
      setKYCBankListLoading(false);
    }
  };

  return {
    paymentBankList,
    getPaymentBankList,
    getKYCBankList,
    KYCBankList,
    KYCBankListLoading,
  };
};
