import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Text from './Text';
import {BusinessType} from '../constants/Types';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import Badge from './Badge';
import ICTarget from './icons/ICTarget';
import IconWrapper2 from './IconWrapper2';
import ICRoi from './icons/ICRoi';
import numberFormat from '../utils/numberFormat';
import capitalize from '../utils/capitalize';
import RoundedProgressIndicator from './RoundedProgressIndicator';
import {useNavigation} from '@react-navigation/native';
import Gap from './Gap';
import ICPrelisting from './icons/ICPrelisting';
import ICListing from './icons/ICListing';
import ICTerpenuhi from './icons/ICTerpenuhi';
import ICBerjalan from './icons/ICBerjalan';
import ICSelesai from './icons/ICSelesai';
import BlurOverlay from './BlurOverlay';
import ListingRemainingTime from './ListingRemainingTime';
import {maxScreenWidth} from '../constants/Screen';
import ProgressIndicator from './ProgressIndicator';

const BusinessCard2 = ({
  business,
  orientation,
}: {
  business: BusinessType;
  orientation?: 'vertical' | 'horizontal';
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const tint = useThemeColor({}, 'tint');
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <Pressable
      style={[
        styles.container,
        {
          width:
            orientation === 'horizontal'
              ? width > maxScreenWidth
                ? ((width - 72) * 50) / 100
                : width - 48
              : (width * 76) / 100,
          // minHeight: orientation === 'horizontal' ? 'auto' : 508,
        },
        ...(orientation !== 'horizontal' ? [{maxWidth: 308}] : []),
      ]}
      onPress={() =>
        navigation.navigate('Order', {
          screen: 'BusinessDetail',
          params: {slug: business.slug},
        })
      }>
      <View style={[styles.imageContainer, {backgroundColor}]}>
        {business.image && (
          <Image
            source={{uri: business.image}}
            style={{width: '100%', aspectRatio: 308 / 172}}
            resizeMode="cover"
          />
        )}
      </View>
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor:
              colorScheme === 'dark'
                ? 'transparent'
                : RGBAColors(0.7)[colorScheme].background,
          },
        ]}>
        {Platform.OS === 'android' && colorScheme === 'dark' ? (
          <ImageBackground
            source={require('../assets/images/bg-business-card-dark.png')}
            style={{position: 'absolute', width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        ) : null}
        <BlurOverlay />
        <View style={{padding: 16, paddingBottom: 24, zIndex: 2}}>
          <View style={{flexDirection: 'row'}}>
            <Badge text={capitalize(business.tipeBisnis || '')} />
            <Gap width={8} />
            <Badge
              text={capitalize(business.status)}
              transparent
              icon={
                capitalize(business.status) === 'Pre-listing' ? (
                  <ICPrelisting color={textColor2} size={16} />
                ) : capitalize(business.status) === 'Listing' ? (
                  <ICListing color={textColor2} size={16} />
                ) : capitalize(business.status) === 'Terpenuhi' ? (
                  <ICTerpenuhi color={textColor2} size={16} />
                ) : capitalize(business.status) === 'Berjalan' ? (
                  <ICBerjalan color={textColor2} size={16} />
                ) : (
                  <ICSelesai color={textColor2} size={16} />
                )
              }
            />
            {orientation === 'horizontal' && business.roi && (
              <>
                <Gap width={8} />
                <Badge
                  text={`ROI ${business.roi}% p.a`}
                  transparent
                  icon={<ICRoi color={textColor2} size={16} />}
                />
              </>
            )}
          </View>
          <Text
            style={[
              styles.title,
              // {height: orientation === 'horizontal' ? 'auto' : 72},
            ]}
            numberOfLines={3}>
            {business.merkDagang}
          </Text>
          {orientation === 'horizontal' ? (
            <>
              <Gap height={16} />
              {business.status !== 'PRE-LISTING' && (
                <>
                  <ProgressIndicator
                    target={business.target}
                    current={business.terpenuhi}
                  />
                  <Gap height={8} />
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 12, color: textColor2}}>
                    Target Dana
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '700', color: textColor}}>
                    Rp{numberFormat(Number(business.target))}
                  </Text>
                </View>
                {business.status !== 'PRE-LISTING' && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: textColor2,
                        textAlign: 'right',
                      }}>
                      Dana Terkumpul
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: tint,
                        textAlign: 'right',
                      }}>
                      Rp
                      {numberFormat(
                        business.terpenuhi > business.target
                          ? business.target
                          : business.terpenuhi,
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </>
          ) : (
            <>
              <View style={{flexDirection: 'row', marginTop: 24}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <IconWrapper2 size={32}>
                    <ICTarget color={textColor2} size={22} />
                  </IconWrapper2>
                  <View style={{marginLeft: 8}}>
                    <Text style={[styles.targetLabel, {color: textColor2}]}>
                      Target
                    </Text>
                    <Text style={[styles.targetValue, {color: textColor}]}>
                      Rp{numberFormat(business.target, true)}
                    </Text>
                  </View>
                </View>
                {business.roi && (
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <IconWrapper2 size={32}>
                      <ICRoi color={textColor2} size={22} />
                    </IconWrapper2>
                    <View style={{marginLeft: 8}}>
                      <Text style={[styles.targetLabel, {color: textColor2}]}>
                        ROI
                      </Text>
                      <Text style={[styles.targetValue, {color: textColor}]}>
                        {business.roi}% p.a
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 24,
                  opacity:
                    capitalize(business.status) !== 'Pre-listing' ? 1 : 0,
                }}>
                <RoundedProgressIndicator
                  current={business.terpenuhi}
                  target={business.target}
                  type="medium"
                />
                <View
                  style={{marginLeft: 8, flex: 1, justifyContent: 'center'}}>
                  <Text style={[styles.terkumpulLabel, {color: textColor2}]}>
                    Dana Terkumpul
                  </Text>
                  <Text style={[styles.terkumpulValue, {color: textColor}]}>
                    Rp{numberFormat(business.terpenuhi)}
                  </Text>
                </View>
              </View>
            </>
          )}
          {business.status === 'LISTING' && (
            <View style={{marginTop: 16}}>
              <ListingRemainingTime targetDate={business.targetDate || ''} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default BusinessCard2;

const styles = StyleSheet.create({
  container: {
    // minHeight: 508,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 308 / 172,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  contentContainer: {
    // padding: 16,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    // height: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginTop: 16,
  },
  targetLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  targetValue: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 4,
  },
  terkumpulLabel: {
    fontSize: 12,
  },
  terkumpulValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
