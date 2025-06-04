import {useRef, useState} from 'react';
import {useAPI} from '../services/api';
import {PortfolioType} from '../constants/Types';

export const usePortfolio = () => {
  const {apiRequest} = useAPI();
  const [portfolioList, setPortfolioList] = useState<PortfolioType[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioType>({
    merkDagang: '',
    type: '',
    status: '',
    total: 0,
    id: 0,
    slug: '',
    company: '',
    lembar: 0,
    hargaPasar: 0,
    average: 0,
    return: 0,
    transactions: [],
  });

  // loading
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [morePortfolioLoading, setMorePortfolioLoading] = useState(false);

  const isLastPage = useRef(false);
  const isFetchingPortfolio = useRef(false);

  const composeData = (res: any) => {
    let total = res.total;
    let hargaPasar = 0;
    if (res.overview) {
      hargaPasar =
        res.overview.current_price ||
        res.overview.close_price ||
        res.overview.fair_value;
      total =
        res.type_bisnis == 'SAHAM'
          ? hargaPasar
            ? hargaPasar * res.total_lembar_saham
            : res.average * res.total_lembar_saham
          : res.total;
    }
    const transactions = res?.history
      ? res.history.map((item: any) => ({
          status: item.status,
          kode: item.kode,
          nominal: item.nominal,
          date: item.created_at,
          type: item.type,
        }))
      : [];
    const disclosureRes = res?.keterbukaan_informasi?.documents
      ? res?.keterbukaan_informasi?.documents
      : [];
    const disclosures =
      disclosureRes.length > 0
        ? disclosureRes.map((item: any) => ({
            name: item.title,
            date: item.created_at,
            file: item.file,
          }))
        : [];
    const result: PortfolioType = {
      merkDagang: res.merk_dagang,
      type: res.type_bisnis,
      status: res.status,
      total,
      id: res.id,
      slug: res.slug,
      company: res.nama_perusahaan,
      lembar: res.total_lembar_saham,
      hargaPasar,
      average: res.average,
      return: hargaPasar
        ? (hargaPasar - res.average) * res.total_lembar_saham
        : 0,
      transactions,
      disclosures,
    };
    return result;
  };

  const getPortfolioList = async ({
    page,
    filter,
  }: {
    page: number;
    filter: {type: string; status: string; order: string};
  }) => {
    isFetchingPortfolio.current = true;
    if (page && page > 1) {
      setMorePortfolioLoading(true);
    } else {
      setPortfolioLoading(true);
    }
    try {
      const res = await apiRequest({
        endpoint: `/user/investasi?page=${page ? page : 1}&per_page=8${
          filter?.type ? '&jenis=' + filter?.type : ''
        }${filter?.status ? '&status=' + filter?.status : ''}${
          filter?.order ? '&order=' + filter?.order : ''
        }`,
        authorization: true,
      });
      let newArray: PortfolioType[] = [];
      if (page > 1) {
        newArray = [...portfolioList];
      } else {
        isLastPage.current = false;
      }
      res.map((item: any) => {
        newArray.push(composeData(item));
      });
      setPortfolioList(newArray);
    } catch (error: any) {
      if (error?.status === 404) {
        isLastPage.current = true;
      }
      console.log('getPortfolioList error', error);
    } finally {
      isFetchingPortfolio.current = false;
      if (page && page > 1) {
        setMorePortfolioLoading(false);
      } else {
        setPortfolioLoading(false);
      }
    }
  };

  const getPortfolio = async ({slug}: {slug: string}) => {
    try {
      const res = await apiRequest({
        endpoint: `/user/investasi/${slug}`,
        authorization: true,
      });
      setPortfolio(composeData(res));
    } catch (error) {}
  };

  return {
    portfolioList,
    portfolio,
    getPortfolioList,
    getPortfolio,
    morePortfolioLoading,
    portfolioLoading,
    isLastPage,
    isFetchingPortfolio,
  };
};
