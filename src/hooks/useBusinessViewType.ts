import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setViewType} from '../slices/businessViewType';

export const useBusinessViewType = () => {
  const dispatch = useDispatch();

  const setBusinessViewType = async () => {
    const viewType: any = await AsyncStorage.getItem('businessViewType');
    dispatch(setViewType({viewType: viewType || 'vertical'}));
  };

  return {setBusinessViewType};
};
