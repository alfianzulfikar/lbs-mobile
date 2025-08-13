import {useEffect, useState} from 'react';
import {
  AskOrderbookType,
  BidOrderbookType,
  DailyType,
  DisclosureType,
  StockOverviewType,
  StockType,
  TradebookType,
} from '../constants/Types';
import {useAPI} from '../services/api';
import {useDisclosure} from './disclosure';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

export const useMarket = () => {
  const {apiRequest} = useAPI();
  const {disclosureList, getDisclosureList} = useDisclosure();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [stockList, setStockList] = useState<StockType[]>([]);
  const [stockListLoading, setStockListLoading] = useState(false);

  // overview
  const [overview, setOverview] = useState<StockOverviewType>({
    currentPrice: null,
    closePrice: null,
    openPrice: null,
    lowestPrice: null,
    highestPrice: null,
    buyShares: null,
    sellShares: null,
    fairValue: null,
    feeBuy: null,
    feeSell: null,
  });
  const [overviewLoading, setOverviewLoading] = useState(false);

  // order
  const [orderError, setOrderError] = useState<{
    price: string[];
    volume: string[];
    bank: string[];
  }>({
    price: [],
    volume: [],
    bank: [],
  });
  const [showConfirmOrderDialog, setShowConfirmOrderDialog] = useState(false);
  const [showSuccessOrderDialog, setShowSuccessOrderDialog] = useState(false);
  const [bidLoading, setBidLoading] = useState(false);
  const [askLoading, setAskLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentCode, setPaymentCode] = useState('');

  // OTP
  const [otpError, setOtpError] = useState<string[]>([]);
  const [otpLoading, setOtpLoading] = useState(false);

  // orderbook
  const [numberOfOrderRow, setNumberOfOrderRow] = useState(0);
  const [bidList, setBidList] = useState<BidOrderbookType[]>([]);
  const [askList, setAskList] = useState<AskOrderbookType[]>([]);
  const [orderbookLoading, setOrderbookLoading] = useState(false);

  // tradebook
  const [tradebookList, setTradebookList] = useState<TradebookType[]>([]);
  const [tradebookLoading, setTradebookLoading] = useState(false);

  // daily
  const [dailyList, setDailyList] = useState<DailyType[]>([]);
  const [dailyLoading, setDailyLoading] = useState(false);

  // information
  const [computedDisclosure, setComputedDisclosure] = useState<
    DisclosureType[]
  >([]);
  const [disclosureLoading, setDisclosureLoading] = useState(false);
  const [merkDagangState, setMerkDagangState] = useState('');

  const getStockList = async () => {
    setStockListLoading(true);
    try {
      const res = await apiRequest({endpoint: '/market/', authorization: true});
      const newArray: StockType[] = [];
      res.map((item: any) => {
        newArray.push({
          id: item.id,
          code: item.perusahaan,
          merkDagang: item.merk_dagang,
          slug: item.slug,
          currentPrice: item.overview?.current_price,
          closePrice: item.overview?.close_price,
          openPrice: item.overview?.open_price,
          lowestPrice: item.overview?.lowest_price,
          highestPrice: item.overview?.highest_price,
          buyShares: item.overview?.buy_shares,
          sellShares: item.overview?.sell_shares,
          fairValue: item.overview?.fair_value,
        });
      });
      setStockList(newArray);
    } catch {
    } finally {
      setStockListLoading(false);
    }
  };

  const getOverview = async (id: number) => {
    setOverviewLoading(true);
    try {
      const res = await apiRequest({endpoint: `/market/${id}/overview`});
      setOverview({
        currentPrice: res?.current_price || null,
        closePrice: res?.close_price || null,
        openPrice: res?.open_price || null,
        lowestPrice: res?.lowest_price || null,
        highestPrice: res?.highest_price || null,
        buyShares: res?.buy_shares || null,
        sellShares: res?.sell_shares || null,
        fairValue: res?.fair_value || null,
        feeBuy: res?.fee_buy || null,
        feeSell: res?.fee_sell || null,
      });
    } catch {
    } finally {
      setOverviewLoading(false);
    }
  };

  const getOrderbook = async (id: number) => {
    setOrderbookLoading(true);
    try {
      const res = await apiRequest({endpoint: `/market/${id}/orderbook`});

      let newBid: BidOrderbookType[] = [];
      res.map((orderItem: any) => {
        if (orderItem.B_Lembar && orderItem.Bid_Rp) {
          newBid.push({
            B_Lembar: orderItem.B_Lembar || null,
            Bid_Rp: orderItem.Bid_Rp || null,
          });
        }
      });
      setBidList(newBid);

      let newAsk: AskOrderbookType[] = [];
      res.map((orderItem: any) => {
        if (orderItem.Ask_Rp && orderItem.A_Lembar) {
          newAsk.push({
            Ask_Rp: orderItem.Ask_Rp || null,
            A_Lembar: orderItem.A_Lembar || null,
          });
        }
      });
      setAskList(newAsk);
    } catch {
    } finally {
      setOrderbookLoading(false);
    }
  };

  const getTradebook = async (id: number) => {
    setTradebookLoading(true);
    try {
      const res = await apiRequest({endpoint: `/market/${id}/tradebook`});
      const newArray: TradebookType[] = [];
      res.map((item: any, index: number) => {
        newArray.push({
          frequency: item.frequency || null,
          price: item.price || null,
          value: item.value || null,
          volume: item.total || null,
        });
      });
      setTradebookList(newArray);
    } catch {
    } finally {
      setTradebookLoading(false);
    }
  };

  const getDaily = async (id: number) => {
    setDailyLoading(true);
    try {
      const res = await apiRequest({endpoint: `/market/${id}/daily`});
      const newArray: DailyType[] = [];
      res.map((item: any, index: number) => {
        newArray.push({
          date: item.date ? item.date.replaceAll('/', ' / ') : '',
          open: item.open || null,
          close: item.close || null,
          volume: item.volume || null,
          change:
            index == res.length - 1
              ? 0
              : res[index].close - res[index + 1].close,
        });
      });
      setDailyList(newArray);
    } catch {
    } finally {
      setDailyLoading(false);
    }
  };

  const getDisclosure = async (slug: string) => {
    setDisclosureLoading(true);
    // setMerkDagangState(merkDagang);
    try {
      await getDisclosureList(undefined, undefined, undefined, slug);
    } catch {}
  };

  const getTransactionStatus = async (type: string, id: number) => {
    setDisabledButton(true);
    if (type === 'ask') {
      setAskLoading(true);
    } else {
      setBidLoading(true);
    }
    try {
      const res = await apiRequest({
        endpoint: `/market/${id}/check-active-transaction`,
      });
      return res.has_active_transaction;
    } catch {
      return null;
    } finally {
      setDisabledButton(false);
      if (type === 'ask') {
        setAskLoading(false);
      } else {
        setBidLoading(false);
      }
    }
  };

  const continueOrder = async (
    type: 'ask' | 'bid',
    id?: number | null,
    body?: any,
  ) => {
    if (type === 'ask' && id) {
      navigation.dispatch(
        StackActions.replace('OTP', {
          market: {id, body},
        }),
      );
    } else {
      navigation.dispatch(
        StackActions.replace('Order', {
          screen: 'WaitingPayment',
          params: {code: paymentCode},
        }),
      );
      setShowSuccessOrderDialog(false);
    }
  };

  const order = async (
    type: 'ask' | 'bid',
    id: number,
    {
      price,
      volume,
      bank,
      otpMethod,
    }: {
      price: number;
      volume: number;
      bank?: string;
      otpMethod?: string;
    },
  ) => {
    setOrderError({
      price: [],
      volume: [],
      bank: [],
    });
    setOrderLoading(true);
    try {
      let body: any = {
        price,
        volume,
      };
      let endpoint = '';
      if (type === 'bid') {
        body = {
          ...body,
          bank_transfer: `${bank}`,
        };
        endpoint = `/market/${id}/bid`;
      } else {
        body = {
          ...body,
          otp_methods: `${otpMethod}`,
        };
        endpoint = `/market/${id}/sell`;
      }
      const res = await apiRequest({
        method: 'post',
        endpoint,
        body,
        authorization: true,
      });
      setPaymentCode(res?.kode || '');
      if (type === 'bid') {
        setShowSuccessOrderDialog(true);
      } else {
        continueOrder('ask', id, body);
      }
    } catch (error: any) {
      if (error.status === 422) {
        if (error.data.errors) {
          setOrderError({
            price: error.data.errors.price || [],
            volume: error.data.errors.volume || [],
            bank: error.data.errors.bank_transfer || [],
          });
        }
      } else if (error.status === 403) {
        dispatch(
          setAlert({
            title: error.data.errors.msg || 'Maaf, permintaan tertolak',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      } else {
        dispatch(
          setAlert({
            title: 'Terjadi kesalahan pada sistem',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      }
    } finally {
      setOrderLoading(false);
      setShowConfirmOrderDialog(false);
    }
  };

  const sell = async (
    id: number,
    body: {
      price: number;
      volume: number;
      otp: string;
      otp_methods: 'whatsapp' | 'sms';
    },
  ) => {
    setOtpLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: `/market/${id}/sell/confirm`,
        authorization: true,
        body,
      });
      navigation.dispatch(
        StackActions.replace('PaymentSuccess', {
          paymentCode: res?.kode,
          type: 'Penjualan',
        }),
      );
    } catch (error: any) {
      if (error?.status === 422) {
        setOtpError(error?.data?.errors?.otp || ['Eror OTP']);
      } else if (error?.status === 403) {
        setOrderError(
          error?.data?.errors?.msg || ['Maaf, permintaan tertolak'],
        );
      } else {
        dispatch(
          setAlert({
            title: `Terjadi kesalahan ${error?.status || 'jaringan'}`,
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOTP = async (
    id: number,
    body: {price: number; volume: number; otp_methods: 'whatsapp' | 'sms'},
  ) => {
    setOrderError({
      price: [],
      volume: [],
      bank: [],
    });
    setOtpLoading(true);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: `/market/${id}/sell`,
        body,
      });
    } catch (error: any) {
      if (error?.status === 422) {
        console.log('resend otp', error?.data?.errors);
        dispatch(
          setAlert({
            title: 'Maaf, terjadi kesalahan',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      } else if (error?.status === 403) {
        dispatch(
          setAlert({
            title: error?.data?.errors?.msg || 'Maaf, permintaan tertolak',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      } else {
        dispatch(
          setAlert({
            title: 'Terjadi kesalahan pada sistem',
            desc: '',
            type: 'danger',
            showAlert: true,
          }),
        );
      }
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    setNumberOfOrderRow(
      askList.length > bidList.length ? askList.length : bidList.length,
    );
  }, [bidList, askList]);

  useEffect(() => {
    const newArray: DisclosureType[] = [];
    disclosureList.map(item => {
      if (item.merkDagang === merkDagangState) {
        newArray.push(item);
      }
    });
    setComputedDisclosure(newArray);
    setDisclosureLoading(false);
  }, [disclosureList, merkDagangState]);

  return {
    getStockList,
    stockList,
    stockListLoading,
    getOverview,
    overview,
    overviewLoading,
    getOrderbook,
    numberOfOrderRow,
    bidList,
    askList,
    orderbookLoading,
    getTradebook,
    tradebookList,
    tradebookLoading,
    getDaily,
    dailyList,
    dailyLoading,
    getDisclosure,
    computedDisclosure,
    disclosureLoading,
    getTransactionStatus,
    askLoading,
    bidLoading,
    disabledButton,
    // order
    order,
    showConfirmOrderDialog,
    showSuccessOrderDialog,
    continueOrder,
    orderError,
    orderLoading,
    setShowConfirmOrderDialog,
    setShowSuccessOrderDialog,
    paymentCode,
    // otp
    otpError,
    otpLoading,
    sell,
    resendOTP,
  };
};
