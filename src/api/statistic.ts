import {useState} from 'react';
import {useAPI} from '../services/api';

export const useStatistc = () => {
  const {apiRequest} = useAPI();
  const [marketStatus, setMarketStatus] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: '',
  });
  const [statisticLoading, setStatisticLoading] = useState(false);

  const getStatistic = async () => {
    setStatisticLoading(true);
    try {
      const res = await apiRequest({endpoint: '/info-statistik'});
      if (res.secondary_market) {
        setMarketStatus({
          isOpen: res.secondary_market.is_open || false,
          message:
            res.secondary_market.message ||
            (res.secondary_market.is_open
              ? 'Sesi perdagangan saham telah dibuka'
              : 'Tidak ada sesi perdagangan saham'),
        });
      }
    } catch {
    } finally {
      setStatisticLoading(false);
    }
  };

  return {marketStatus, statisticLoading, getStatistic};
};
