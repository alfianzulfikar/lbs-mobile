import {
  Animated,
  Modal,
  Platform,
  StyleSheet,
  useAnimatedValue,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RGBAColors} from '../constants/Colors';
import BlurOverlay from './BlurOverlay';
import Header from './Header';
import IconWrapper from './IconWrapper';
import ICCancel from './icons/ICCancel';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import Gap from './Gap';
import PlusMinusInput from './PlusMinusInput';
import {BusinessType} from '../constants/Types';
import numberFormat from '../utils/numberFormat';
import ScreenWrapper from './ScreenWrapper';
import {useColorScheme} from '../hooks/useColorScheme';
import {maxScreenWidth} from '../constants/Screen';

const Calculator = ({
  business,
  onClose,
}: {
  business: BusinessType;
  onClose: () => void;
}) => {
  let colorScheme = useColorScheme();
  const iconColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
  const {width} = useWindowDimensions();

  const {height} = useWindowDimensions();
  const translateYAnim = useAnimatedValue(height);

  const slideIn = () => {
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(translateYAnim, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const [volume, setVolume] = useState(0);
  const [nominal, setNominal] = useState(0);
  const [keuntungan, setKeuntungan] = useState(0);

  const lembarTersisa =
    business?.target && business.hargaPerLembar
      ? (business.target - business.terpenuhi) / business.hargaPerLembar
      : 0;
  const lembarTerjual = business.hargaPerLembar
    ? business.terpenuhi / business.hargaPerLembar
    : 0;
  const presentaseTersisa = business?.target
    ? (business.terpenuhi * 100) / business.target
    : 0;
  const presentaseTerjual = business?.target
    ? ((business.target - business.terpenuhi) * 100) / business.target
    : 0;
  const roi =
    business.roi && business.tenor ? (business.roi / 12) * business.tenor : 0;
  const info = [
    {
      label: 'Harga Per Lembar',
      value: 'Rp' + numberFormat(business?.hargaPerLembar),
    },
    {
      label: 'Perkiraan ROI',
      value: numberFormat(roi.toFixed(0)) + '%',
    },
    {
      label: 'Perkiraan ROI Per Annum',
      value: numberFormat(business?.roi || 0) + '%',
    },
    {
      label: 'Sukuk Tersisa',
      value: `${numberFormat(
        lembarTersisa,
      )} Lembar / ${presentaseTersisa.toFixed(0)}%`,
    },
    {
      label: 'Sukuk Terjual',
      value: `${numberFormat(
        lembarTerjual,
      )} Lembar / ${presentaseTerjual.toFixed(0)}%`,
    },
  ];

  useEffect(() => {
    if (volume && business?.hargaPerLembar) {
      setNominal(volume * business?.hargaPerLembar);
    } else {
      setNominal(0);
    }
  }, [volume]);

  useEffect(() => {
    if (business.roi && business.tenor) {
      setKeuntungan(((nominal * (business.roi / 100)) / 12) * business.tenor);
    }
  }, [nominal]);

  useEffect(() => {
    slideIn();
  }, []);

  return (
    <Modal transparent>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          transform: [{translateY: translateYAnim}],
          backgroundColor:
            Platform.OS === 'ios'
              ? RGBAColors(0.4).light.background
              : backgroundColor,
          zIndex: 2,
        }}>
        {/* <BlurOverlay blurAmount={50} /> */}
        <ScreenWrapper
          background
          backgroundType="gradient"
          scrollView
          statusBar
          overlay
          notch={Platform.OS === 'ios' ? true : false}>
          <View style={{flexGrow: 1}}>
            <Gap height={24} />
            <Header
              title="Kalkulator Investasi"
              backButton={false}
              rightIcon={
                <IconWrapper onPress={() => slideOut()}>
                  <ICCancel color={iconColor} />
                </IconWrapper>
              }
            />
            <View style={styles.infoContainer}>
              {info.map((item, infoId) => (
                <View key={infoId}>
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, {color: textColor2}]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.infoValue, {color: textColor}]}>
                      {item.value}
                    </Text>
                  </View>
                  {infoId !== info.length - 1 && <Gap height={16} />}
                </View>
              ))}
              <Gap height={32} />
              <Text style={[styles.centerLabel, {color: textColor2}]}>
                Masukkan Jumlah Lembar
              </Text>
              <Gap height={16} />
            </View>
            <View
              style={{
                flex: 1,
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 5,
                shadowOpacity: 0.2,
                elevation: 5,
                shadowColor:
                  colorScheme === 'dark' ? '#FFFFFF' : 'rgba(0,0,0,0.2)',
              }}>
              <View
                style={[
                  styles.resultContainer,
                  {
                    backgroundColor:
                      Platform.OS === 'ios'
                        ? RGBAColors(0.2).light.background
                        : backgroundColor,
                    width: width > maxScreenWidth ? '100%' : 640,
                    borderTopLeftRadius: width > maxScreenWidth ? 120 : 320,
                    borderTopRightRadius: width > maxScreenWidth ? 120 : 320,
                  },
                ]}>
                {Platform.OS === 'ios' && <BlurOverlay blurAmount={40} />}
              </View>
              <View style={{paddingHorizontal: 24}}>
                <PlusMinusInput value={volume} onChange={setVolume} />
                <Gap height={24} />
                <Text style={[styles.centerLabel, {color: textColor2}]}>
                  Nilai Investasi
                </Text>
                <Text style={styles.total}>Rp{numberFormat(nominal)}</Text>
                <Text style={styles.estimationTitle}>Estimasi Keuntungan:</Text>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <Text style={[styles.estimation, {color: textColor2}]}>
                    Keuntungan*
                  </Text>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: textColor,
                        textAlign: 'right',
                        fontWeight: '600',
                      },
                    ]}>
                    Rp{numberFormat(keuntungan.toFixed(0))}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <Text style={[styles.estimation, {color: textColor2}]}>
                    Pajak (10%)
                  </Text>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: textColor,
                        textAlign: 'right',
                        fontWeight: '600',
                      },
                    ]}>
                    Rp{numberFormat(((keuntungan * 10) / 100).toFixed())}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: colorScheme === 'dark' ? '#93FD9D' : '#00970F',
                        fontWeight: '700',
                      },
                    ]}>
                    Keuntungan Bersih
                  </Text>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: colorScheme === 'dark' ? '#93FD9D' : '#00970F',
                        textAlign: 'right',
                        fontWeight: '700',
                      },
                    ]}>
                    Rp{numberFormat(keuntungan - (keuntungan * 10) / 100)}
                  </Text>
                </View>
                <Text style={[styles.footnote, {color: textColor2}]}>
                  *Indikasi imbal hasil bukan angka pasti yang didapatkan
                  pemodal pada saat sukuk jatuh tempo
                </Text>
                <Gap height={24} />
              </View>
            </View>
          </View>
        </ScreenWrapper>
        {/* <View style={{flex: 1, zIndex: 2}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingTop: notchHeight + 40}}>
          <View style={{flexGrow: 1}}>
            <Header
              title="Kalkulator Investasi"
              backButton={false}
              rightIcon={
                <IconWrapper onPress={() => slideOut()}>
                  <ICCancel color={iconColor} />
                </IconWrapper>
              }
            />
            <View style={styles.infoContainer}>
              {info.map((item, infoId) => (
                <View key={infoId}>
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, {color: textColor2}]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.infoValue, {color: textColor}]}>
                      {item.value}
                    </Text>
                  </View>
                  {infoId !== info.length - 1 && <Gap height={16} />}
                </View>
              ))}
              <Gap height={32} />
              <Text style={[styles.centerLabel, {color: textColor2}]}>
                Masukkan Jumlah Lembar
              </Text>
              <Gap height={16} />
            </View>
            <View
              style={{
                flex: 1,
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 5,
                shadowOpacity: 0.2,
                elevation: 5,
                shadowColor:
                  colorScheme === 'dark' ? '#FFFFFF' : 'rgba(0,0,0,0.2)',
              }}>
              <View
                style={[
                  styles.resultContainer,
                  {
                    backgroundColor:
                      Platform.OS === 'ios'
                        ? RGBAColors(colorScheme === 'dark' ? 1 : 0.2).light
                            .background
                        : backgroundColor,
                  },
                ]}>
                {Platform.OS === 'ios' && <BlurOverlay blurAmount={40} />}
              </View>
              <View style={{paddingHorizontal: 24}}>
                <PlusMinusInput value={volume} onChange={setVolume} />
                <Gap height={24} />
                <Text style={[styles.centerLabel, {color: textColor2}]}>
                  Nilai Investasi
                </Text>
                <Text style={styles.total}>Rp{numberFormat(nominal)}</Text>
                <Text style={styles.estimationTitle}>Estimasi Keuntungan:</Text>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <Text style={[styles.estimation, {color: textColor2}]}>
                    Keuntungan
                  </Text>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: textColor,
                        textAlign: 'right',
                        fontWeight: '600',
                      },
                    ]}>
                    Rp{numberFormat(keuntungan.toFixed(0))}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <Text style={[styles.estimation, {color: textColor2}]}>
                    Pajak (10%)
                  </Text>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: textColor,
                        textAlign: 'right',
                        fontWeight: '600',
                      },
                    ]}>
                    Rp{numberFormat(((keuntungan * 10) / 100).toFixed())}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: colorScheme === 'dark' ? '#93FD9D' : '#00970F',
                        fontWeight: '700',
                      },
                    ]}>
                    Keuntungan Bersih
                  </Text>
                  <Text
                    style={[
                      styles.estimation,
                      {
                        color: colorScheme === 'dark' ? '#93FD9D' : '#00970F',
                        textAlign: 'right',
                        fontWeight: '700',
                      },
                    ]}>
                    Rp{numberFormat(keuntungan - (keuntungan * 10) / 100)}
                  </Text>
                </View>
                <Text style={[styles.footnote, {color: textColor2}]}>
                  *Indikasi imbal hasil bukan angka pasti yang didapatkan
                  pemodal pada saat sukuk jatuh tempo
                </Text>
                <Gap height={24} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View> */}
      </Animated.View>
    </Modal>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  infoContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  infoItem: {
    flexDirection: 'row',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  centerLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
  },
  resultContainer: {
    position: 'absolute',
    height: '100%',
    overflow: 'hidden',
    // width: '100%',
    left: '50%',
    transform: [{translateX: '-50%'}],
  },
  total: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 48,
    textAlign: 'center',
    marginTop: 8,
  },
  estimationTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 24,
  },
  estimation: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 16,
  },
});
