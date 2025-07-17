import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import IconWrapper from '../components/IconWrapper';
import ICDownload from '../components/icons/ICDownload';
import {useThemeColor} from '../hooks/useThemeColor';
import {useDownload} from '../utils/downloadFile';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import Badge from '../components/Badge';
import CategoryFilter from '../components/CategoryFilter';
import {InputDropdownOption, OrderStackParamList} from '../constants/Types';
import Html from '../components/Html';
import numberFormat from '../utils/numberFormat';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<OrderStackParamList, 'Prospectus'>;

const Prospectus = ({route}: Props) => {
  const {file, businessContent, tipeBisnis, terjual, tersisa} = route.params;
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const {downloadFile} = useDownload();

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [category, setCategory] = useState<string | number | boolean>('');
  const [htmlBody, setHtmlBody] = useState('');
  const [categoryOption, setCategoryOption] = useState<InputDropdownOption[]>(
    [],
  );
  const [businessHightlightInfoState, setBusinessHighlightInfoState] = useState(
    {
      kode: '',
      target: 0,
      totalLembar: 0,
      hargaPerLembar: 0,
      minimalInvestasi: 0,
      periode: '',
    },
  );
  const [shareOfferingInfo, setShareOfferingInfo] = useState({
    terjual: 0,
    persenTerjual: 0,
    lembarTerjual: 0,
    tersisa: 0,
    persenTersisa: 0,
    lembarTersisa: 0,
  });
  const [mapSource, setMapSource] = useState('');

  const businessHightlightInfo = [
    {field: `Kode ${tipeBisnis}`, value: businessHightlightInfoState.kode},
    {
      field: 'Target Dana yang Dibutuhkan',
      value: `Rp${numberFormat(Number(businessHightlightInfoState.target))}`,
    },
    {
      field: `Total Lembar  ${tipeBisnis}`,
      value: `${numberFormat(businessHightlightInfoState.totalLembar)} Lembar`,
    },
    {
      field: `Harga Per Lembar  ${tipeBisnis}`,
      value: `Rp${numberFormat(
        Number(businessHightlightInfoState.hargaPerLembar),
      )}`,
    },
    {
      field: 'Minimal Investasi',
      value: `Rp${numberFormat(businessHightlightInfoState.minimalInvestasi)}`,
    },
    {
      field: 'Periode Pembagian Imbal Hasil',
      value: businessHightlightInfoState.periode,
    },
  ];

  const handleDownload = async () => {
    setDownloadLoading(true);
    await downloadFile({type: 'download-directly', fileUrl: file});
    setDownloadLoading(false);
  };

  const handleFilter = (value: string) => {
    let currentContent = businessContent.find(
      item => String(item.bisnis_side_menu.id) === value,
    );
    setHtmlBody(currentContent?.name?.deskripsi || '');
  };

  useEffect(() => {
    if (businessContent) {
      // set category
      let newCategory: InputDropdownOption[] = [];
      businessContent.map(item => {
        if (![13, 15].includes(item.bisnis_side_menu.id)) {
          newCategory.push({
            id: String(item.bisnis_side_menu.id),
            label: item.bisnis_side_menu.name,
          });
        }
      });
      setCategory(newCategory.length > 1 ? newCategory[0].id : '');
      setCategoryOption(newCategory);

      // set html body
      const businessHighlight = businessContent.find(
        item => item.bisnis_side_menu.id === 1,
      );
      setHtmlBody(businessHighlight?.name?.deskripsi || '');

      // set business highlight info
      const target = businessHighlight?.name?.target_dana || 0;
      const hargaPerLembar =
        businessHighlight?.name?.harga_per_lembar_saham || 0;
      setBusinessHighlightInfoState({
        kode: businessHighlight?.name?.kode_saham || '',
        hargaPerLembar,
        minimalInvestasi: Number(
          businessHighlight?.name?.minimal_investasi || 0,
        ),
        periode: businessHighlight?.name?.periode_pembagian_dividen || '',
        target,
        totalLembar: hargaPerLembar > 0 ? target / hargaPerLembar : 0,
      });

      // set map
      const companyOverview = businessContent.find(
        item => item.bisnis_side_menu.id === 5,
      );
      let mapUrl = companyOverview?.name?.textarea || '';
      mapUrl = mapUrl.match(/src="([^"]+)"/);
      mapUrl = mapUrl ? mapUrl[0] : '';
      setMapSource(mapUrl);

      // set share offering info
      setShareOfferingInfo({
        terjual,
        persenTerjual: (terjual * 100) / target,
        lembarTerjual: terjual / hargaPerLembar,
        tersisa,
        persenTersisa: (tersisa * 100) / target,
        lembarTersisa: tersisa / hargaPerLembar,
      });
    }
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      scrollView
      header
      customHeader={
        <Header
          rightIcon={
            file ? (
              <IconWrapper width={182} onPress={handleDownload}>
                {downloadLoading ? (
                  <ActivityIndicator color={tint} />
                ) : (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ICDownload color={textColor} />
                    <Text style={styles.downloadText}>Unduh Prospektus</Text>
                  </View>
                )}
              </IconWrapper>
            ) : (
              <></>
            )
          }
        />
      }>
      <Gap height={20} />
      <View
        style={[
          styles.container,
          {backgroundColor: RGBAColors(0.5)[colorScheme].background},
        ]}>
        <View>
          <CategoryFilter
            options={categoryOption}
            value={String(category)}
            setValue={value => {
              setCategory(value);
              handleFilter(value);
            }}
            activeColor={textColor}
          />
        </View>
        <View style={{paddingHorizontal: 24, marginTop: 24}}>
          <Html source={htmlBody} />

          {category === '1' && (
            <View style={{marginTop: 40}}>
              {businessHightlightInfo.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom:
                      index !== businessHightlightInfo.length - 1 ? 24 : 0,
                  }}>
                  <Text
                    style={[
                      styles.businessHighlightInfoField,
                      {color: textColor2},
                    ]}>
                    {item.field}
                  </Text>
                  <Text style={styles.businessHighlightInfoValue}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {category === '2' && (
            <View style={{borderWidth: 1, borderColor: textColor2}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 64,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderColor: textColor2,
                    paddingBottom: 4,
                  }}></View>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: textColor2,
                    paddingLeft: 4,
                    paddingBottom: 4,
                  }}>
                  <Text style={[{color: textColor2, fontWeight: '600'}]}>
                    Tersisa
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: textColor2,
                    paddingLeft: 4,
                    paddingBottom: 4,
                  }}>
                  <Text style={[{color: textColor2, fontWeight: '600'}]}>
                    Terjual
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 64,
                    borderRightWidth: 1,
                    borderColor: textColor2,
                    paddingTop: 4,
                    paddingLeft: 4,
                  }}>
                  <Text style={[{color: textColor2, fontWeight: '600'}]}>
                    Pers.
                  </Text>
                </View>
                <View style={{flex: 1, paddingLeft: 4, paddingTop: 4}}>
                  <Text style={[{color: textColor2}]}>
                    {shareOfferingInfo.persenTersisa}%
                  </Text>
                </View>
                <View style={{flex: 1, paddingLeft: 4, paddingTop: 4}}>
                  <Text style={[{color: textColor2}]}>
                    {shareOfferingInfo.persenTerjual}%
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 64,
                    borderRightWidth: 1,
                    borderColor: textColor2,
                    paddingLeft: 4,
                  }}>
                  <Text style={[{color: textColor2, fontWeight: '600'}]}>
                    Jumlah
                  </Text>
                </View>
                <View style={{flex: 1, paddingLeft: 4}}>
                  <Text style={[{color: textColor2}]}>
                    Rp{numberFormat(shareOfferingInfo.tersisa)}
                  </Text>
                </View>
                <View style={{flex: 1, paddingLeft: 4}}>
                  <Text style={[{color: textColor2}]}>
                    Rp{numberFormat(shareOfferingInfo.terjual)}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 64,
                    borderRightWidth: 1,
                    borderColor: textColor2,
                    paddingLeft: 4,
                    paddingBottom: 4,
                  }}>
                  <Text style={[{color: textColor2, fontWeight: '600'}]}>
                    Lembar
                  </Text>
                </View>
                <View style={{flex: 1, paddingLeft: 4, paddingBottom: 4}}>
                  <Text style={[{color: textColor2}]}>
                    {numberFormat(shareOfferingInfo.lembarTersisa)}
                  </Text>
                </View>
                <View style={{flex: 1, paddingLeft: 4, paddingBottom: 4}}>
                  <Text style={[{color: textColor2}]}>
                    {numberFormat(shareOfferingInfo.lembarTerjual)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {category === '5' && mapSource ? (
            <WebView
              source={{
                html: `<iframe width="100%" height="100%" id="gmap_canvas" ${mapSource} frameborder="0" scrolling="yes" marginheight="0" marginwidth="0"></iframe>`,
              }}
              style={{height: 315, borderRadius: 20}}
            />
          ) : null}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Prospectus;

const styles = StyleSheet.create({
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  container: {
    flexGrow: 1,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    paddingVertical: 24,
  },
  businessHighlightInfoField: {
    fontSize: 16,
    lineHeight: 24,
  },
  businessHighlightInfoValue: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    marginTop: 4,
  },
});
