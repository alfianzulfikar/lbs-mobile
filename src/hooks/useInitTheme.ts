import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setColorScheme} from '../slices/colorScheme';
import {useColorScheme} from 'react-native';

export const useInitTheme = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme() ?? 'light';

  const initTheme = async () => {
    const theme = await AsyncStorage.getItem('theme');
    if (!theme) {
      const currentTheme = colorScheme === 'dark' ? 'dark' : 'light';
      await AsyncStorage.setItem('theme', currentTheme);
      dispatch(setColorScheme(currentTheme));
    } else {
      const currentTheme = await AsyncStorage.getItem('theme');
      dispatch(setColorScheme(currentTheme === 'dark' ? 'dark' : 'light'));
    }
  };
  return {initTheme};
};
