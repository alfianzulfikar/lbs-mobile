import {Alert} from 'react-native';
import {BusinessType, CommentType} from '../constants/Types';
import {useAPI} from '../services/api';
import {useRef, useState} from 'react';

export const useBusiness = () => {
  const {apiRequest} = useAPI();

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [preListingBusinesses, setPrelistingBusinesses] = useState<any[]>([]);
  const [listingBusinesses, setListingBusinesses] = useState<any[]>([]);
  const [error, setError] = useState<any>({});
  const [prelistingError, setPrelistingError] = useState<any>({});
  const [listingError, setListingError] = useState<any>({});
  const [business, setBusiness] = useState<BusinessType>({
    slug: '',
    merkDagang: '',
    tipeBisnis: '',
    image: '',
    target: 0,
    terpenuhi: 0,
    status: '',
    provinsi: '',
    kota: '',
    kode: '',
    hargaPerLembar: 0,
    lembarTersisa: 0,
    minimalPemesanan: 0,
    file: '',
    businessContent: [],
    id: null,
    targetDate: '',
  });
  const [prelistingLoading, setPrelistingLoading] = useState(false);
  const [businessesLoading, setBusinessesLoading] = useState(false);
  const [businessesMoreLoading, setBusinessesMoreLoading] = useState(false);
  const [businessStatus, setBusinessStatus] = useState<any[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const getBusinesses = async (
    page?: number,
    perpage?: number,
    prelisting?: boolean | null,
    search?: string,
    filter?: {
      order: string;
      progress: string;
    },
  ) => {
    if (page && page > 1) {
      setBusinessesMoreLoading(true);
    } else {
      if (prelisting) {
        setPrelistingLoading(true);
      } else {
        setBusinessesLoading(true);
      }
    }
    try {
      const response = await apiRequest({
        endpoint: `/${search ? 'search' : 'list-bisnis'}?page=${
          page || 1
        }&per_page=${perpage || 10}${
          prelisting || prelisting === false ? '&pra_listing=' + prelisting : ''
        }${search ? '&query=' + search : ''}${
          filter?.progress ? '&dana_terkumpul=' + filter?.progress : ''
        }${filter?.order ? '&order_posted=' + filter?.order : ''}`,
      });
      let newArray: BusinessType[] = [];
      if (response && response.length > 0) {
        if (page && page > 1) {
          newArray = [...businesses];
        }
        response.map((item: any) => {
          let businessHighlight = item.bisnis_content.find(
            (item: any) => item?.name?.target_dana,
          );

          let target = 0;
          let image = '';
          let kode = '';
          let hargaPerLembar = 0;
          let minimalPemesanan = 0;
          let lembarTersisa = 0;
          let targetDate = '';
          if (businessHighlight) {
            target = businessHighlight?.name?.target_dana || 0;
            image = businessHighlight?.name?.thumbnail || '';
            kode = businessHighlight?.name?.kode_saham || '';
            hargaPerLembar =
              businessHighlight?.name?.harga_per_lembar_saham || 0;
            minimalPemesanan = businessHighlight?.name?.minimal_investasi || 0;
            lembarTersisa = item.saham_tersisa / hargaPerLembar;
            targetDate = businessHighlight?.name?.target_date || '';
          }

          const investmentHighlight = item?.bisnis_content
            ? item.bisnis_content.find(
                (bisnisContentItem: any) =>
                  bisnisContentItem.bisnis_side_menu.name ===
                  'Investment Highlight',
              ) || {}
            : {};

          newArray.push({
            id: item.id,
            slug: item.slug_merk_dagang,
            merkDagang: item.merk_dagang,
            tipeBisnis: item.type_bisnis,
            image,
            target,
            terpenuhi: item.total_investasi,
            status: item.bisnis_status.name,
            provinsi: item.name_province,
            kota: item.name_district,
            kode,
            hargaPerLembar,
            minimalPemesanan,
            lembarTersisa,
            ...(investmentHighlight?.name
              ? {
                  roi: investmentHighlight?.name.roi || 0,
                  tenor: investmentHighlight?.name.tenor || 0,
                }
              : {}),
            targetDate,
          });
        });
        if (prelisting) {
          setPrelistingBusinesses(newArray);
        } else if (prelisting === false) {
          setListingBusinesses(newArray);
        } else {
          setBusinesses(newArray);
        }
      } else if (response && response.length === 0) {
        if ((page && page === 1) || !page) {
          setBusinesses([]);
        }
        setIsLastPage(true);
      }
    } catch (e) {
      if (prelisting) {
        setPrelistingError(e);
      } else if (prelisting === false) {
        setListingError(e);
      } else {
        setError(e);
      }
    } finally {
      if (page && page > 1) {
        setBusinessesMoreLoading(false);
      } else {
        if (prelisting) {
          setPrelistingLoading(false);
        } else {
          setBusinessesLoading(false);
        }
      }
    }
  };

  const getBusinessDetail = async (slug: string) => {
    setBusinessLoading(true);
    try {
      const response = await apiRequest({endpoint: `/bisnis/detail/${slug}`});
      let businessContent = response.bisnis_content;
      let businessHighlight = response.bisnis_content.find(
        (item: any) => item?.name?.target_dana,
      );

      let target = 0;
      let image = '';
      let kode = '';
      let hargaPerLembar = 0;
      let minimalPemesanan = 0;
      let lembarTersisa = 0;
      let file = '';
      let targetDate = '';
      if (businessHighlight) {
        target = businessHighlight?.name?.target_dana || 0;
        image = businessHighlight?.name?.thumbnail || '';
        kode = businessHighlight?.name?.kode_saham || '';
        hargaPerLembar = Number(
          businessHighlight?.name?.harga_per_lembar_saham || 0,
        );
        minimalPemesanan = Number(
          businessHighlight?.name?.minimal_investasi || 0,
        );
        lembarTersisa = response.saham_tersisa / hargaPerLembar;
        file = businessHighlight?.name?.prospektus || '';
        targetDate = businessHighlight?.name?.target_date || '';
      }

      const investmentHighlight = response?.bisnis_content
        ? response.bisnis_content.find(
            (item: any) =>
              item.bisnis_side_menu.name === 'Investment Highlight',
          )
        : {};

      const data = {
        id: response.id,
        slug: response.slug_merk_dagang,
        merkDagang: response.merk_dagang,
        tipeBisnis: response.type_bisnis,
        image,
        target,
        terpenuhi: response.total_investasi,
        status: response.bisnis_status.name,
        provinsi: response.name_province,
        kota: response.name_district,
        kode,
        hargaPerLembar,
        lembarTersisa,
        minimalPemesanan,
        ...(investmentHighlight?.name
          ? {
              roi: investmentHighlight?.name.roi || 0,
              tenor: investmentHighlight?.name.tenor || 0,
            }
          : {}),
        file,
        businessContent,
        targetDate,
      };
      setBusiness(data);
    } catch (error: any) {
      if (error?.status === 404) {
        setIsNotFound(true);
      }
    } finally {
      setBusinessLoading(false);
    }
  };

  const getBusinessStatus = async () => {
    try {
      const res = await apiRequest({endpoint: '/status-bisnis'});
      setBusinessStatus(res);
    } catch {}
  };

  const getBusinessLike = async () => {
    setLikeLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/bookmarks',
      });
      let tempBusinessLikesId: any = [];
      res.forEach((businessLikesItem: any) => {
        tempBusinessLikesId.push(businessLikesItem.id);
      });
      if (tempBusinessLikesId.includes(business.id)) {
        setIsLiked(true);
      }
    } catch {
    } finally {
      setLikeLoading(false);
    }
  };

  const handleLike = async (slug: string, type: 'like' | 'delete') => {
    setLikeLoading(true);
    try {
      const res = await apiRequest({
        method: type === 'delete' ? 'delete' : 'post',
        endpoint: `/bisnis/detail/${slug}/bookmark`,
        authorization: true,
        body: {},
      });
      setIsLiked(type === 'delete' ? false : true);
    } catch {
    } finally {
      setLikeLoading(false);
    }
  };

  return {
    businesses,
    preListingBusinesses,
    listingBusinesses,
    error,
    prelistingError,
    listingError,
    business,
    businessStatus,
    getBusinesses,
    getBusinessDetail,
    getBusinessStatus,
    businessesLoading,
    setBusinesses,
    isLastPage,
    setIsLastPage,
    businessesMoreLoading,
    handleLike,
    isLiked,
    getBusinessLike,
    likeLoading,
    prelistingLoading,
    businessLoading,
    isNotFound,
  };
};
