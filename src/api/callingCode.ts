import {useState} from 'react';
import {useAPI} from '../services/api';
import {CallingCodeType} from '../constants/Types';

export const useCallingCode = () => {
  const {apiRequest} = useAPI();

  const [callingCodeLoading, setCallingCodeLoading] = useState(false);
  const [callingCodeList, setCallingCodeList] = useState<CallingCodeType[]>([]);

  const getCallingCodes = async () => {
    setCallingCodeLoading(true);
    try {
      // const res = await apiRequest({
      //   url: 'https://restcountries.com/v2/all',
      // });
      // const newArray: CallingCodeType[] = [];
      // res.map((item: any) => {
      //   const code =
      //     item.callingCodes && item.callingCodes.length > 0
      //       ? item.callingCodes[0]
      //       : '';
      //   newArray.push({
      //     id: code,
      //     label: `+${code}`,
      //   });
      // });
      setCallingCodeList([
        {id: '1', label: '+1'},
        {id: '20', label: '+20'},
        {id: '41', label: '+41'},
        {id: '43', label: '+43'},
        {id: '44', label: '+44'},
        {id: '49', label: '+49'},
        {id: '60', label: '+60'},
        {id: '61', label: '+61'},
        {id: '62', label: '+62'},
        {id: '64', label: '+64'},
        {id: '65', label: '+65'},
        {id: '86', label: '+86'},
        {id: '90', label: '+90'},
        {id: '673', label: '+673'},
        {id: '886', label: '+886'},
        {id: '852', label: '+852'},
        {id: '962', label: '+962'},
        {id: '965', label: '+965'},
        {id: '966', label: '+966'},
        {id: '968', label: '+968'},
        {id: '970', label: '+970'},
        {id: '971', label: '+971'},
        {id: '973', label: '+973'},
        {id: '974', label: '+974'},
      ]);
    } catch {
    } finally {
      setCallingCodeLoading(false);
    }
  };

  return {getCallingCodes, callingCodeLoading, callingCodeList};
};
