import {useSelector} from 'react-redux';
import {RootState} from '../store';

export const useColorScheme = () => {
  const {colorScheme} = useSelector((item: RootState) => item.colorScheme);
  return colorScheme;
};
