import {
  Animated,
  Modal,
  Platform,
  StyleSheet,
  useAnimatedValue,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import ScreenWrapper from './ScreenWrapper';
import {RGBAColors} from '../constants/Colors';
import Gap from './Gap';
import Header from './Header';
import IconWrapper from './IconWrapper';
import ICCancel from './icons/ICCancel';
import BlurOverlay from './BlurOverlay';
import numberFormat from '../utils/numberFormat';
import {useColorScheme} from '../hooks/useColorScheme';

const LimitExplanation = ({
  onClose,
  sisa,
  total,
}: {
  onClose: () => void;
  sisa?: number;
  total?: number;
}) => {
  let colorScheme = useColorScheme();
  const iconColor = useThemeColor({}, 'icon');
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
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

  useEffect(() => {
    slideIn();
  }, []);

  return (
    <Modal transparent>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          minHeight: '100%',
          top: 0,
          left: 0,
          transform: [{translateY: translateYAnim}],
          backgroundColor:
            Platform.OS === 'ios'
              ? RGBAColors(0.4).light.background
              : backgroundColor,
          zIndex: 2,
        }}>
        <BlurOverlay blurAmount={50} />
        <ScreenWrapper
          background
          backgroundType="gradient"
          scrollView
          statusBar={false}
          notch={Platform.OS === 'ios' ? true : false}>
          <View style={{flexGrow: 1}}>
            <Gap height={24} />
            <Header
              title="Limit Investasi/Tahun"
              backButton={false}
              rightIcon={
                <IconWrapper onPress={() => slideOut()}>
                  <ICCancel color={iconColor} />
                </IconWrapper>
              }
            />
            <Gap height={40} />
            <View style={{paddingHorizontal: 24}}>
              <View style={[styles.card, {backgroundColor: backgroundColor}]}>
                {total === 999999999999 ? (
                  <Text style={[styles.text, {color: textColor2}]}>
                    Anda telah memenuhi kriteria untuk bertransaksi{' '}
                    <Text style={{color: tint, fontWeight: '600'}}>
                      tanpa batasan limit tahunan.
                    </Text>
                  </Text>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.text, {color: textColor2}]}>
                        Sisa Limit
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            fontWeight: '600',
                            color:
                              colorScheme === 'dark' ? '#FEE099' : '#D9A220',
                          },
                        ]}>
                        Rp{numberFormat(sisa || 0)}
                      </Text>
                    </View>
                    <Gap height={8} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.text, {color: textColor2}]}>
                        Total Limit
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            fontWeight: '600',
                          },
                        ]}>
                        Rp{numberFormat(total || 0)}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <Gap height={24} />
              <Text style={[styles.text, {color: textColor2}]}>
                Berdasarkan POJK No. 57 Tahun 2020, pemodal akan dikenakan limit
                investasi dengan ketentuan:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, {width: 20, color: textColor2}]}>
                  1.
                </Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {color: textColor2}]}>
                    5% dari penghasilan per-tahun untuk pemodal dengan
                    penghasilan per-tahun maksimal Rp 500.000.000
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, {width: 20, color: textColor2}]}>
                  2.
                </Text>
                <Text style={[styles.text, {color: textColor2, flex: 1}]}>
                  10% dari penghasilan per-tahun untuk pemodal dengan
                  penghasilan per-tahun diatas Rp 500.000.000
                </Text>
              </View>
              <Gap height={20} />
              <Text style={[styles.text, {color: textColor2}]}>
                Anda dapat berinvestasi tanpa Batasan limit tahunan jika:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, {width: 20, color: textColor2}]}>
                  1.
                </Text>
                <Text style={[styles.text, {color: textColor2, flex: 1}]}>
                  Memiliki rekening efek selama 2 tahun atau lebih (dibuktikan
                  dengan memiliki Single Investor Identification/SID)
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, {width: 20, color: textColor2}]}>
                  2.
                </Text>
                <Text style={[styles.text, {color: textColor2, flex: 1}]}>
                  Atau merupakan wakil/karyawan badan hukum
                </Text>
              </View>
            </View>
          </View>
        </ScreenWrapper>
      </Animated.View>
    </Modal>
  );
};

export default LimitExplanation;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
});
