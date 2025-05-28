// useInsets.ts
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function useInsets() {
  const insets = useSafeAreaInsets();
  return {
    notchHeight: insets.top,
    bottomHeight: insets.bottom,
  };
}
