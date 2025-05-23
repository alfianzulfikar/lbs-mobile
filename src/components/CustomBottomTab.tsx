import {StyleSheet, View, Pressable, Platform} from 'react-native';
import ICHome from './icons/ICHome';
import ICBusiness from './icons/ICBusiness';
import ICTransaction from './icons/ICTransaction';
import ICUser from './icons/ICUser';
import {useThemeColor} from '../hooks/useThemeColor';
import {Colors, RGBAColors} from '../constants/Colors';
import Text from './Text';
import BlurOverlay from './BlurOverlay';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useColorScheme} from '../hooks/useColorScheme';

const ActiveLine = () => {
  const activeColors = useThemeColor({}, 'tint');
  return (
    <View
      style={[
        tabStyles.ActiveLine,
        {transform: [{translateY: Platform.OS === 'ios' ? -41 : -40}]},
        {backgroundColor: activeColors, shadowColor: activeColors},
      ]}></View>
  );
};

const CustomBottomTab = (props: any) => {
  const {state, navigation} = props;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <View
      // colors={
      //   colorScheme === 'dark'
      //     ? ['rgba(74, 74, 74, 0.5)', 'rgba(45, 45, 45, 0.5)']
      //     : ['rgba(255, 255, 255, 0.5)', 'rgba(237, 237, 237, 0.5)']
      // }
      style={[
        tabStyles.container,
        {
          // marginBottom: 48,
          backgroundColor:
            Platform.OS === 'ios'
              ? RGBAColors(0.6)[colorScheme].background
              : backgroundColor,
        },
      ]}>
      <BlurOverlay />
      <View style={tabStyles.navbarContainer}>
        {state.routeNames.map((route: string, index: number) => {
          const isFocused = state.index === index;
          const iconType = isFocused ? 'fill' : 'outline';
          const iconName =
            route === 'Home'
              ? 'Beranda'
              : route === 'Business'
              ? 'Cari Bisnis'
              : route === 'Transaction'
              ? 'Transaksi'
              : 'Akun';
          const iconColor = isFocused ? colors.tint2 : colors.tabIconDefault;
          const iconNameWeight = isFocused ? '700' : '400';

          const Icon = (props: {color: string; type: 'outline' | 'fill'}) => {
            return iconName === 'Beranda' ? (
              <ICHome {...props} />
            ) : iconName === 'Cari Bisnis' ? (
              <ICBusiness {...props} />
            ) : iconName === 'Transaksi' ? (
              <ICTransaction {...props} />
            ) : (
              <ICUser {...props} />
            );
          };

          return (
            <Pressable
              onPress={() => navigation.navigate(route)}
              style={tabStyles.tabItem}
              key={index}>
              {isFocused ? <ActiveLine /> : null}
              <Icon color={iconColor} type={iconType} />
              <Text
                style={[
                  tabStyles.name,
                  {color: iconColor, fontWeight: iconNameWeight},
                ]}>
                {iconName}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 80,
    width: '100%',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blurLayer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    flex: 1,
  },
  navbarContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    zIndex: 2,
  },
  tabItem: {
    alignItems: 'center',
    width: 66,
    height: 80,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    paddingTop: 8,
    fontSize: 12,
  },
  ActiveLine: {
    width: 66,
    height: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
});

export default CustomBottomTab;
