import {useState} from 'react';
import {useAPI} from '../services/api';
import {InputDropdownOption} from '../constants/Types';

type AddressType = 'current' | 'ktp' | null;
export const useAddress = () => {
  const {apiRequest} = useAPI()
  const [provinceKTPList, setProvinceKTPList] = useState<InputDropdownOption[]>(
    [],
  );
  const [provinceKTPListLoading, setProvinceKTPListLoading] = useState(false);

  const [provinceList, setProvinceList] = useState<InputDropdownOption[]>([]);
  const [provinceListLoading, setProvinceListLoading] = useState(false);

  const [cityKTPList, setCityKTPList] = useState<InputDropdownOption[]>([]);
  const [cityKTPListLoading, setCityKTPListLoading] = useState(false);

  const [cityList, setCityList] = useState<InputDropdownOption[]>([]);
  const [cityListLoading, setCityListLoading] = useState(false);

  const [regionKTPList, setRegionKTPList] = useState<InputDropdownOption[]>([]);
  const [regionKTPListLoading, setRegionKTPListLoading] = useState(false);

  const [regionList, setRegionList] = useState<InputDropdownOption[]>([]);
  const [regionListLoading, setRegionListLoading] = useState(false);

  const getProvinceList = async (type: AddressType) => {
    if (type === 'ktp') {
      setProvinceKTPListLoading(true);
    } else {
      setProvinceListLoading(true);
    }
    try {
      const res = await apiRequest({
        endpoint: '/user/provinsi',
        authorization: true,
      });
      const newArray: InputDropdownOption[] = [];
      res.map((item: any) => {
        newArray.push({
          id: item.id,
          label: item.name,
        });
      });
      if (type === 'ktp') {
        setProvinceKTPList(newArray);
      } else {
        setProvinceList(newArray);
      }
    } catch (error) {
      console.log('getProvinceList error', error);
    } finally {
      if (type === 'ktp') {
        setProvinceKTPListLoading(false);
      } else {
        setProvinceListLoading(false);
      }
    }
  };

  const getCityList = async (type: AddressType, provinceId: number) => {
    if (type === 'ktp') {
      setCityKTPListLoading(true);
    } else {
      setCityListLoading(true);
    }
    try {
      const res = await apiRequest({
        endpoint: `/user/kota/${provinceId}`,
        authorization: true,
      });
      const newArray: InputDropdownOption[] = [];
      res.map((item: any) => {
        newArray.push({
          id: item.id,
          label: item.name,
        });
      });
      if (type === 'ktp') {
        setCityKTPList(newArray);
      } else {
        setCityList(newArray);
      }
    } catch (error) {
      console.log('getCityList error', error);
    } finally {
      if (type === 'ktp') {
        setCityKTPListLoading(false);
      } else {
        setCityListLoading(false);
      }
    }
  };

  const getRegionList = async (
    type: AddressType,
    provinceId: number,
    cityId: number,
  ) => {
    if (type === 'ktp') {
      setRegionKTPListLoading(true);
    } else {
      setRegionListLoading(true);
    }
    try {
      const res = await apiRequest({
        endpoint: `/user/kecamatan?provinsi_id=${provinceId}&kota_id=${cityId}`,
        authorization: true,
      });
      const newArray: InputDropdownOption[] = [];
      res.map((item: any) => {
        newArray.push({
          id: item.id,
          label: item.name,
        });
      });
      if (type === 'ktp') {
        setRegionKTPList(newArray);
      } else {
        setRegionList(newArray);
      }
    } catch (error) {
      console.log('getRegionList error', error);
    } finally {
      if (type === 'ktp') {
        setRegionKTPListLoading(false);
      } else {
        setRegionListLoading(false);
      }
    }
  };

  return {
    provinceKTPList,
    cityKTPList,
    regionKTPList,
    provinceList,
    regionList,
    cityList,
    getProvinceList,
    getCityList,
    getRegionList,
    provinceKTPListLoading,
    cityKTPListLoading,
    regionKTPListLoading,
    provinceListLoading,
    cityListLoading,
    regionListLoading,
  };
};
