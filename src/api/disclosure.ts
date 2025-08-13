import {useState} from 'react';
import {DisclosureType, GroupedDisclosureType} from '../constants/Types';
import {useAPI} from '../services/api';

export const useDisclosure = () => {
  const {apiRequest} = useAPI();
  const [disclosureList, setDisclosureList] = useState<DisclosureType[]>([]);
  const [groupedDisclosureList, setGroupedDisclosureList] = useState<
    GroupedDisclosureType[]
  >([]);
  const [disclosureListLoading, setDisclosureListLoading] = useState(false);
  const [moreDisclosureListLoading, setMoreDisclosureListLoading] =
    useState(false);
  const [hasNext, setHasNext] = useState(true);

  const getDisclosureList = async (
    page?: number,
    perPage?: number,
    search?: string,
    slug?: string,
  ) => {
    if (page && page > 1) {
      setMoreDisclosureListLoading(true);
    } else {
      setDisclosureListLoading(true);
    }
    try {
      const res = await apiRequest({
        endpoint: slug
          ? `/keterbukaan-informasi/${slug}`
          : `/keterbukaan-informasi?page=${page || 1}&per_page=${perPage || 3}${
              search ? '&q=' + search : ''
            }`,
      });
      if (slug) {
        const data: any = res.data;
        if (
          data?.keterbukaan_informasi &&
          data?.keterbukaan_informasi?.length > 0
        ) {
        }
        let newDisclosureList: DisclosureType[] = [];
        data.keterbukaan_informasi.map((item: any) => {
          const newItem: DisclosureType = {
            name: item.title,
            file: item.file,
            date: item.created_at,
            merkDagang: data.merk_dagang,
          };
          newDisclosureList.push(newItem);
        });
        setDisclosureList(newDisclosureList);
      } else {
        const data: any[] = res.data;
        setHasNext(res.pagination.has_next);
        let newGroupedDisclosureList: GroupedDisclosureType[] =
          page && page > 1 ? [...groupedDisclosureList] : [];
        let newDisclosureList: DisclosureType[] =
          page && page > 1 ? [...disclosureList] : [];
        data.map((item: any) => {
          let newTempDisclosureList: DisclosureType[] = [];
          if (item.keterbukaan_informasi.length > 0) {
            item.keterbukaan_informasi.map((item2: any) => {
              const newItem: DisclosureType = {
                name: item2.title,
                file: item2.file,
                date: item2.created_at,
                merkDagang: item.merk_dagang,
              };
              newTempDisclosureList.push(newItem);
              newDisclosureList.push(newItem);
            });
          }
          newGroupedDisclosureList.push({
            merkDagang: item.merk_dagang,
            list: newTempDisclosureList,
          });
        });
        setDisclosureList(newDisclosureList);
        setGroupedDisclosureList(newGroupedDisclosureList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (page && page > 1) {
        setMoreDisclosureListLoading(false);
      } else {
        setDisclosureListLoading(false);
      }
    }
  };

  return {
    getDisclosureList,
    groupedDisclosureList,
    disclosureList,
    disclosureListLoading,
    moreDisclosureListLoading,
    hasNext,
  };
};
