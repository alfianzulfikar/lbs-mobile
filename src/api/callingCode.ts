import {useState} from 'react';
import {useAPI} from '../services/api';

type CallingCodeType = {
  id: string;
  label: string;
};
export const useCallingCode = () => {
  const {apiRequest} = useAPI();

  const [callingCodeLoading, setCallingCodeLoading] = useState(false);
  const [callingCodeList, setCallingCodeList] = useState<CallingCodeType[]>([]);

  const getCallingCodes = async () => {
    setCallingCodeLoading(true);
    try {
      const res = await apiRequest({
        url: 'https://restcountries.com/v2/all',
      });
      const newArray: CallingCodeType[] = [];
      res.map((item: any) => {
        const code =
          item.callingCodes && item.callingCodes.length > 0
            ? item.callingCodes[0]
            : '';
        newArray.push({
          id: code,
          label: `+${code}`,
        });
      });
      setCallingCodeList(newArray);
    } catch {
    } finally {
      setCallingCodeLoading(false);
    }
  };

  return {getCallingCodes, callingCodeLoading, callingCodeList};
};
