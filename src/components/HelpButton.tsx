import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ICHeadPhone from './icons/ICHeadPhone';
import LinearGradient from 'react-native-linear-gradient';
import {useThemeColor} from '../hooks/useThemeColor';
import {useColorScheme} from '../hooks/useColorScheme';

const HelpButton = () => {
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: 'white',
          // Platform.OS === 'ios'
          //   ? 'white'
          //   : colorScheme === 'dark'
          //   ? backgroundColor
          //   : tint,
        },
      ]}
      onPress={() =>
        Linking.openURL(
          "https://api.whatsapp.com/send?phone=6281290569559&text=Assalamu'alaikum%20Mohon%20Info%20Terbaru%20Tentang%20LBS%20Urun%20Dana",
        )
      }>
      {/* {Platform.OS === 'ios' && (
      )} */}
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? ['rgba(199, 173, 134, 1)', 'rgba(199, 173, 134, 0.5)']
            : ['#00827E', 'rgba(0, 130, 126, 0.5)']
        }
        locations={[0.5, 1]}
        style={styles.background}
      />
      <View style={{position: 'relative', zIndex: 2}}>
        <ICHeadPhone />
      </View>
    </TouchableOpacity>
  );
};

export default HelpButton;

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  background: {
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    transform: [{rotate: '-90deg'}],
  },
});
