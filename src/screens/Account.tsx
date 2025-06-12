import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {ReactNode, useCallback, useState} from 'react';
import {useThemeColor} from '../hooks/useThemeColor';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import {RGBAColors} from '../constants/Colors';
import ICCheckedShield from '../components/icons/ICCheckedShield';
import Button from '../components/Button';
import ICTakePicture from '../components/icons/ICTakePicture';
import ICRoundedUser from '../components/icons/ICRoundedUser';
import ICChevronArrowRight from '../components/icons/ICChevronArrowRight';
import Gap from '../components/Gap';
import BlurOverlay from '../components/BlurOverlay';
import ICBell2 from '../components/icons/ICBell2';
import ICLock from '../components/icons/ICLock';
import ICBiometric from '../components/icons/ICBiometric';
import ICMoon from '../components/icons/ICMoon';
import ICBuilding from '../components/icons/ICBuilding';
import ICPrivacy from '../components/icons/ICPrivacy';
import ICFile2 from '../components/icons/ICFile2';
import ICFile3 from '../components/icons/ICFile3';
import ICLogout from '../components/icons/ICLogout';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useUser} from '../api/user';
import LoadingModal from '../components/LoadingModal';
import {useAPI} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '../components/BottomSheet';
import IconWrapper2 from '../components/IconWrapper2';
import ICCamera from '../components/icons/ICCamera';
import ICPicture from '../components/icons/ICPicture';
import ICWarning from '../components/icons/ICWarning';
import {useDispatch} from 'react-redux';
import {setColorScheme} from '../slices/colorScheme';
import {useColorScheme} from '../hooks/useColorScheme';
import {useInsets} from '../hooks/useInsets';
import ImagePicker, {Options} from 'react-native-image-crop-picker';

const MenuItem = ({
  title,
  icon,
  color,
  toggle,
  toggleState,
  onPress = () => {},
}: {
  title: string;
  icon: ReactNode;
  color?: string;
  toggle?: boolean;
  toggleState?: boolean;
  onPress?: () => void;
}) => {
  const tint = useThemeColor({}, 'tint3');
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  return (
    <Pressable
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={onPress}>
      {icon}
      <Text style={[styles.menuItemText, {color: color || textColor2}]}>
        {title}
      </Text>
      {toggle ? (
        <View
          style={[
            styles.toggleContainer,
            {
              backgroundColor: toggleState ? tint : backgroundColor,
              borderColor: toggleState ? tint : borderColor,
              justifyContent: toggleState ? 'flex-end' : 'flex-start',
            },
          ]}>
          <View
            style={[
              styles.toggleCircle,
              {backgroundColor: toggleState ? '#FFFFFF' : borderColor},
            ]}></View>
        </View>
      ) : (
        <ICChevronArrowRight color={color || textColor2} />
      )}
    </Pressable>
  );
};

const Account = () => {
  const {apiRequest} = useAPI();
  const {notchHeight} = useInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const tint = useThemeColor({}, 'tint');
  const textWarning = useThemeColor({}, 'textWarning');
  const textDanger = useThemeColor({}, 'textDanger');
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const [biometric, setBiometric] = useState(false);
  const [dark, setDark] = useState(colorScheme === 'dark');
  const [loading, setLoading] = useState(false);
  const [showChangePhoto, setShowChangePhoto] = useState(false);

  const {user, getUser, getKycProgress, kycProgressLoading, userLoading} =
    useUser();

  const logout = async () => {
    setLoading(true);
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const res = await apiRequest({
        endpoint: '/auth/logout',
        method: 'put',
        authorization: true,
        body: {
          refresh_token: refreshToken,
        },
      });
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      navigation.dispatch(StackActions.replace('Auth'));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleTheme = async () => {
    dispatch(setColorScheme(dark ? 'light' : 'dark'));
    await AsyncStorage.setItem('theme', dark ? 'light' : 'dark');
    setDark(!dark);
  };

  const handleImageRes = (res: any) => {
    navigation.navigate('ImagePreview', {
      base64: res.data || '',
      path: res.path || '',
    });
  };

  const takePicture = async ({type}: {type: 'camera' | 'galery'}) => {
    try {
      const options: Options = {
        width: 500,
        height: 500,
        cropping: true,
        includeBase64: true,
      };
      if (type === 'galery') {
        ImagePicker.openPicker(options).then(image => {
          handleImageRes(image);
        });
      } else {
        ImagePicker.openCamera(options).then(image => {
          handleImageRes(image);
        });
      }
    } catch (error) {
      console.log('take picture error', error);
    } finally {
      setShowChangePhoto(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const asyncFunc = async () => {
        setLoading(true);
        await getKycProgress();
        await getUser();
        setLoading(false);
      };
      asyncFunc();

      return () => {};
    }, []),
  );

  return (
    <ScreenWrapper background backgroundType="pattern" scrollView>
      <View
        style={[
          styles.profilePicture,
          {
            top: 24,
            backgroundColor,
            width: (width * 39) / 100,
            height: (width * 39) / 100,
          },
        ]}>
        <Image
          source={
            user.image
              ? {uri: user.image}
              : colorScheme === 'dark'
              ? require('../assets/images/profile-picture-dark.png')
              : require('../assets/images/profile-picture-light.png')
          }
          resizeMode="cover"
          style={{width: 160, height: 160}}
        />
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              Platform.OS === 'ios'
                ? RGBAColors(colorScheme === 'dark' ? 0.1 : 0.8)[colorScheme]
                    .background
                : RGBAColors(0.8)[colorScheme].background,
          },
        ]}>
        {Platform.OS === 'android' && colorScheme === 'dark' && (
          <ImageBackground
            source={require('../assets/images/profile-bg-dark.jpg')}
            resizeMode="cover"
            style={{width: '100%', height: '100%', position: 'absolute'}}
          />
        )}
        <BlurOverlay blurAmount={60} />
        <View
          style={{
            paddingTop: 16,
            paddingHorizontal: 24,
            paddingBottom: 40,
            zIndex: 2,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              title="Ubah Foto Profil"
              type="secondary"
              paddingVertical={8}
              paddingHorizontal={12}
              icon={() => <ICTakePicture color={textColor} />}
              fontSize={14}
              onPress={() => setShowChangePhoto(true)}
            />
          </View>
          <Text style={styles.name}>
            {user.firstname + ' ' + user.lastname}
          </Text>
          {!kycProgressLoading && !userLoading ? (
            <View style={{flexDirection: 'row', marginTop: 8}}>
              {user.kycStatus ? (
                <ICCheckedShield color={tint} />
              ) : user.kycStatus === null ? (
                <ICWarning />
              ) : null}
              <Text
                style={[
                  styles.kycStatus,
                  {
                    color: user.kycStatus ? tint : textWarning,
                    marginLeft: user.kycStatus === false ? 0 : 4,
                  },
                ]}
                onPress={() =>
                  user.kycStatus === null
                    ? navigation.navigate('KYC', {
                        screen:
                          user.kycScreen === 'KYCPersonal'
                            ? 'KYCScreen'
                            : user.kycScreen,
                      })
                    : null
                }>
                {user.kycStatus
                  ? 'Kyc Terverifikasi'
                  : user.kycStatus === null
                  ? 'Lengkapi data KYC Anda '
                  : 'Data KYC Anda sedang diproses.'}
                {user.kycStatus === null && (
                  <Text
                    style={[
                      styles.kycStatus,
                      {textDecorationLine: 'underline', color: textWarning},
                    ]}>
                    di sini.
                  </Text>
                )}
              </Text>
            </View>
          ) : null}
          <Text style={styles.menuCategory}>Akun</Text>
          <MenuItem
            title="Data Pribadi"
            icon={<ICRoundedUser color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'PersonalData',
              })
            }
          />
          <Text style={styles.menuCategory}>Pengaturan</Text>
          <MenuItem
            title="Notifikasi"
            icon={<ICBell2 color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'NotificationSetting',
              })
            }
          />
          <Gap height={48} />
          <MenuItem
            title="Ubah Kata Sandi"
            icon={<ICLock color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'ChangePassword',
              })
            }
          />
          {/* <Gap height={48} />
          <MenuItem
            title="Biometrik"
            icon={<ICBiometric color={textColor2} />}
            toggle
            toggleState={biometric}
            onPress={() => setBiometric(prev => !prev)}
          /> */}
          <Gap height={48} />
          <MenuItem
            title="Mode Gelap"
            icon={<ICMoon color={textColor2} />}
            toggle
            toggleState={dark}
            onPress={() => handleTheme()}
          />
          <Text style={styles.menuCategory}>Informasi</Text>
          <MenuItem
            title="Tentang LBS Urun Dana"
            icon={<ICBuilding color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'AboutUs',
              })
            }
          />
          <Gap height={48} />
          <MenuItem
            title="Kebijakan Privasi"
            icon={<ICPrivacy color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'PrivacyPolicy',
              })
            }
          />
          <Gap height={48} />
          <MenuItem
            title="Syarat & Ketentuan"
            icon={<ICFile2 color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'TermsAndConditions',
              })
            }
          />
          <Gap height={48} />
          <MenuItem
            title="Prosedur Pengaduan"
            icon={<ICFile3 color={textColor2} />}
            onPress={() =>
              navigation.navigate('Account', {
                screen: 'ComplaintProcedure',
              })
            }
          />
          <Gap height={48} />
          <MenuItem
            title="Keluar Akun"
            color={textDanger}
            icon={<ICLogout color={textDanger} />}
            onPress={logout}
          />
          <Gap height={80} />
        </View>
      </View>

      {loading && <LoadingModal />}

      {showChangePhoto && (
        <BottomSheet
          setShow={() => setShowChangePhoto(false)}
          snapPoints={['40%']}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{alignItems: 'center', width: 100}}
              onPress={() => takePicture({type: 'camera'})}>
              <IconWrapper2>
                <ICCamera color={tint} />
              </IconWrapper2>
              <Text style={styles.photoOptionText}>Ambil dengan Kamera</Text>
            </TouchableOpacity>
            <Gap width={16} />
            <TouchableOpacity
              style={{alignItems: 'center', width: 100}}
              onPress={() => takePicture({type: 'galery'})}>
              <IconWrapper2>
                <ICPicture color={tint} />
              </IconWrapper2>
              <Text style={styles.photoOptionText}>Ambil dari Galeri</Text>
            </TouchableOpacity>
          </View>
          <Gap height={40} />
        </BottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default Account;

const styles = StyleSheet.create({
  profilePicture: {
    maxWidth: 160,
    maxHeight: 160,
    borderRadius: 80,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    left: 24,
    position: 'absolute',
    zIndex: 2,
  },
  container: {
    marginTop: 100,
    zIndex: 1,
    borderTopLeftRadius: 40,
    flex: 1,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginTop: 52,
  },
  kycStatus: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    flex: 1,
  },
  menuCategory: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginTop: 40,
    marginBottom: 24,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginLeft: 8,
    flex: 1,
  },
  toggleContainer: {
    width: 52,
    height: 24,
    borderRadius: 100,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  photoOptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});
