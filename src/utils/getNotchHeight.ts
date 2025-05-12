import {useSafeAreaInsets} from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();
export const notchHeight = insets.top;
export const bottomHeight = insets.bottom;
