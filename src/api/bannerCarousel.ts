import {useState} from 'react';
import {BannerType} from '../constants/Types';
import {useAPI} from '../services/api';
import {envMode} from '../constants/Env';

export const useBannerCarousel = () => {
  const {apiRequest} = useAPI();
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [bannersLoading, setBannersLoading] = useState(false);

  const getBanners = async () => {
    setBannersLoading(true);
    try {
      const res = await apiRequest({endpoint: '/cms/carousel'});
      const newBanners: BannerType[] = [];
      res.map((item: any) => {
        newBanners.push({
          image: item.image,
          link:
            envMode === 'prod'
              ? 'https://www.lbs.id/publication/investasi/cuan-atau-boncos-ini-prospek-investasi-pasar-modal-syariah-di-indonesia'
              : 'https://dev.lbs.id/publication/investasi/why-do-we-use-it',
          isPublished: item.publish,
        });
      });
      setBanners(newBanners);
    } catch {
    } finally {
      setBannersLoading(false);
    }
  };

  return {banners, bannersLoading, getBanners};
};
