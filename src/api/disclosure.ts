import {useState} from 'react';
import {DisclosureType} from '../constants/Types';
import {useAPI} from '../services/api';

export const useDisclosure = () => {
  const {apiRequest} = useAPI();
  const [disclosureList, setDisclosureList] = useState<DisclosureType[]>([]);
  const [disclosureListLoading, setDisclosureListLoading] = useState(false);

  const getDisclosureList = async () => {
    setDisclosureListLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/keterbukaan-informasi',
      });
      const newArray: DisclosureType[] = [];
      res.map((item: any) => {
        if (item.keterbukaan_informasi.length > 0) {
          item.keterbukaan_informasi.map((item2: any) => {
            newArray.push({
              name: item2.title,
              file: item2.file,
              date: item2.created_at,
            });
          });
        }
      });
      setDisclosureList(newArray);
    } catch (error) {
      console.log(error);
    } finally {
      setDisclosureListLoading(false);
    }
  };

  return {disclosureList, getDisclosureList, disclosureListLoading};
};
