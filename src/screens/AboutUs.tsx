import {
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {useThemeColor} from '../hooks/useThemeColor';
import YoutubeIframe from 'react-native-youtube-iframe';
import {RGBAColors} from '../constants/Colors';
import ICTaqwa from '../components/icons/ICTaqwa';
import ICJujur from '../components/icons/ICJujur';
import ICProfessional from '../components/icons/ICProfessional';
import ICAmanah from '../components/icons/ICAmanah';
import ICCommitment from '../components/icons/ICCommitment';
import {useColorScheme} from '../hooks/useColorScheme';

const AboutUs = () => {
  const colorScheme = useColorScheme();
  const {width} = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');

  const companyValue = [
    {
      title: 'Taqwa',
      desc: 'Ketaatan sempurna terhadap aturan-aturan Allah dan Rasul-Nya dalam menjalankan Muamalah Maaliyyah.',
      icon: <ICTaqwa color={textColor} />,
    },
    {
      title: 'Jujur',
      desc: 'Transparan tanpa manipulasi - setiap informasi disampaikan apa adanya dengan akurasi penuh.',
      icon: <ICJujur color={textColor} />,
    },
    {
      title: 'Profesional',
      desc: 'Ditenagai oleh sumber daya manusia yang berkompeten tinggi dalam keahliannya masing-masing.',
      icon: <ICProfessional color={textColor} />,
    },
    {
      title: 'Amanah',
      desc: 'Memegang teguh & menjalankan kepercayaan yang diamanahkan oleh pemodal dan penerbit.',
      icon: <ICAmanah color={textColor} />,
    },
    {
      title: 'Komitmen',
      desc: 'Senantiasa berusaha memberikan nilai yang optimal bagi pemodal dan penerbit.',
      icon: <ICCommitment color={textColor} />,
    },
  ];

  const milestone = [
    {
      year: 2021,
      dateMilestone: [
        {
          date: '7 Januari',
          desc: 'Berdirinya LBS Urun Dana dengan nama PT LBS Urun Dana',
        },
      ],
      image: (
        <Image
          source={require('../assets/images/lbs-establish.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      year: 2022,
      dateMilestone: [
        {
          date: '18 Maret',
          desc: 'Memperoleh izin resmi dari OJK sebagai penyelenggara Securities Crowdfunding',
        },
        {
          date: '28 April',
          desc: 'Penerbitan efek pertama (Saham PT Bali Internusa Gelatonesia)',
        },
      ],
      monthMilestone: {
        month: 'Desember',
        milestones: [
          'Jumlah investor terdaftar tahun 2022 lebih dari 3 Ribu Investor',
          'Total dana yang tersalurkan tahun 2022 lebih dari Rp12 Miliar',
        ],
      },
      image: (
        <>
          <Image
            source={require('../assets/images/lbs-press-confrence.png')}
            style={{width: '100%'}}
            resizeMode="contain"
          />
          <Gap height={8} />
          <Image
            source={require('../assets/images/lbs-press-confrence-2.png')}
            style={{width: '100%'}}
            resizeMode="contain"
          />
        </>
      ),
    },
    {
      year: 2023,
      dateMilestone: [],
      monthMilestone: {
        month: 'Desember',
        milestones: [
          'Jumlah investor terdaftar tahun 2022-2023 lebih dari 7 Ribu Investor',
          'Total dana yang tersalurkan tahun 2022-2023 lebih dari Rp48 Miliar',
        ],
      },
      image: (
        <Image
          source={require('../assets/images/lbs-seminar.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      ),
    },
    {
      year: 2024,
      dateMilestone: [
        {
          date: '10 Desember',
          desc: 'Penghargaan “Best Number of Disbursement” dari Kementerian UMKM',
        },
      ],
      monthMilestone: {
        month: 'Desember',
        milestones: [
          'Jumlah investor terdaftar tahun 2022–2024 lebih dari 10 Ribu Investor',
          'Total dana yang tersalurkan sepanjang 2022–2024 lebih dari Rp139 Miliar',
        ],
      },
      image: (
        <>
          <Image
            source={require('../assets/images/lbs-award.png')}
            style={{width: '100%'}}
            resizeMode="contain"
          />
          <Gap height={8} />
          <Image
            source={require('../assets/images/lbs-award-2.png')}
            style={{width: '100%'}}
            resizeMode="contain"
          />
        </>
      ),
    },
  ];

  const crew = [
    {name: 'Ustadz Dr. Erwandi Tarmizi, MA', position: 'Founder', image: ''},
    {name: "Ir. Solachudin Al'af Ghoni", position: 'Commissioner', image: ''},
    {
      name: 'Rezza Zulkasi, MAppFin',
      position: 'Chief Executive Officer',
      image: '',
    },
    {name: 'Murdani Aji, S.Kom', position: 'Chief Business Officer', image: ''},
    {name: 'Bemby Oktora, ST', position: 'Chief Technology Officer', image: ''},
    {
      name: 'Muhamad Anjas Tanjung',
      position: 'Head of Business Acquisition',
      image: '',
    },
    {name: 'Yuddy Iskandar', position: 'Head of Operation', image: ''},
    {
      name: 'Fandrey Nanda Afindra',
      position: 'Head of Marketing & Branding',
      image: '',
    },
    {name: 'Arief Firmanto', position: 'Head of Research & Analyst', image: ''},
    {name: 'I Made Adi Saputra', position: 'Head of Post Listing', image: ''},
    {
      name: 'Andri Agustaman',
      position: 'Head of Investor Relations',
      image: '',
    },
    {name: 'Prasetyo Hendirasmoyo', position: 'Head of IT', image: ''},
  ];

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      header
      headerTitle="Tentang Kami"
      scrollView>
      <View style={{paddingHorizontal: 24}}>
        <Text style={[styles.heading]}>
          Solusi Investasi Halal, Nyaman dan Berkah
        </Text>

        <View
          style={[
            styles.youtubeContainer,
            {backgroundColor: RGBAColors(0.3).light.background},
          ]}>
          <View style={styles.youtubeContainer2}>
            <YoutubeIframe
              height={(width * 9) / 16}
              width={'100%'}
              videoId={'UX6cb8y_Vkg'}
              webViewStyle={{opacity: 0.99}}
              volume={100}
              mute={false}
            />
          </View>
        </View>

        <Text style={[styles.pharagraph, {color: textColor2}]}>
          LBS Urun Dana adalah platform urun dana (securities crowdfunding) yang
          mengedepankan nilai kehalalan dan kenyamanan dalam setiap
          transaksinya. Didirikan pada tahun 2021, LBS Urun Dana telah berizin
          dan diawasi oleh Otoritas Jasa Keuangan (OJK) sehingga memenuhi
          standar keamanan dan kredibilitas yang tinggi. Sebagai platform yang
          amanah dan transparan, LBS Urun Dana menjembatani para investor dengan
          bisnis-bisnis potensial melalui saham & sukuk yang bebas dari riba,
          gharar dan dzhalim.
        </Text>

        <Text style={styles.heading2}>Nilai-Nilai Perusahaan</Text>
        <View style={{marginTop: 24}}>
          {companyValue.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: index !== companyValue.length - 1 ? 24 : 0,
              }}
              key={index}>
              <View style={styles.iconWrapper}>{item.icon}</View>
              <View style={{flex: 1}}>
                <Text style={styles.companyValueTitle}>{item.title}</Text>
                <Text style={[styles.companyValueDesc, {color: textColor2}]}>
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.heading2}>Milestone</Text>
        <View style={{marginTop: 24}}>
          {milestone.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  zIndex: 2,
                  flexDirection: (index + 1) % 2 === 0 ? 'row-reverse' : 'row',
                  marginBottom: index !== milestone.length - 1 ? 0 : 0,
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems:
                      (index + 1) % 2 === 0 ? 'flex-start' : 'flex-end',
                  }}>
                  <Text
                    style={[
                      styles.year,
                      {textAlign: (index + 1) % 2 === 0 ? 'left' : 'right'},
                    ]}>
                    {item.year}
                  </Text>
                  {item.dateMilestone && item.dateMilestone.length > 0 ? (
                    <>
                      <Gap height={8} />
                      <View>
                        {item.dateMilestone.map((item2, index2) => (
                          <Text
                            style={[
                              styles.milestoneText,
                              {
                                textAlign:
                                  (index + 1) % 2 === 0 ? 'left' : 'right',
                                marginBottom:
                                  index2 !== item.dateMilestone.length - 1
                                    ? 4
                                    : 0,
                              },
                            ]}
                            key={index2}>
                            <Text style={{fontWeight: '700'}}>
                              {item2.date}
                            </Text>{' '}
                            {item2.desc}
                          </Text>
                        ))}
                      </View>
                    </>
                  ) : null}
                  {item.monthMilestone && (
                    <>
                      <Gap height={8} />
                      <View>
                        <Text
                          style={[
                            styles.month,
                            {
                              textAlign:
                                (index + 1) % 2 === 0 ? 'left' : 'right',
                              color: textColor2,
                            },
                          ]}>
                          {item.monthMilestone.month}:
                        </Text>
                        {item.monthMilestone.milestones.map((item2, index2) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                            }}
                            key={index2}>
                            {(index + 1) % 2 === 0 && (
                              <>
                                <View
                                  style={{
                                    backgroundColor: textColor2,
                                    width: 4,
                                    height: 4,
                                    borderRadius: 2,
                                    transform: [{translateY: 7}],
                                  }}></View>
                                <Gap width={4} />
                              </>
                            )}
                            <Text
                              style={[
                                styles.milestoneText,
                                {
                                  textAlign:
                                    (index + 1) % 2 === 0 ? 'left' : 'right',
                                  marginBottom:
                                    index2 !==
                                    item.monthMilestone.milestones.length - 1
                                      ? 2
                                      : 0,
                                },
                              ]}
                              key={index2}>
                              {(index + 1) % 2 !== 0 ? '• ' : ''}
                              {item2}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                </View>
                <View
                  style={[
                    styles.point,
                    {
                      backgroundColor: RGBAColors(
                        colorScheme == 'dark' ? 0.3 : 0.8,
                      ).light.background,
                    },
                  ]}>
                  <View
                    style={[styles.innerPoint, {backgroundColor: tint}]}></View>
                </View>
                <View style={{flex: 1}}>
                  {item.image}
                  <Gap height={24} />
                </View>
              </View>
              {index !== milestone.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: RGBAColors(0.5).light.background,
                    },
                  ]}></View>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.heading2}>Tim LBS Urun Dana</Text>
        <View
          style={{
            marginTop: 24,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {crew.map((item, index) => (
            <View
              style={[
                styles.crewContainer,
                {
                  width: (width - 48) / 2 - 14,
                  marginBottom: ![crew.length - 1, crew.length - 2].includes(
                    index,
                  )
                    ? 40
                    : 0,
                },
              ]}
              key={index}>
              <View style={styles.crewImageContainer}>
                <Image
                  source={
                    colorScheme === 'dark'
                      ? require('../assets/images/profile-picture-dark.png')
                      : require('../assets/images/profile-picture-light.png')
                  }
                  style={{width: 160}}
                />
              </View>
              <Text style={styles.crewName}>{item.name}</Text>
              <Text style={[styles.crewPosition, {color: textColor2}]}>
                {item.position}
              </Text>
            </View>
          ))}
        </View>

        <Gap height={24} />
      </View>
    </ScreenWrapper>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    textAlign: 'center',
    marginTop: 20,
  },
  youtubeContainer: {
    // aspectRatio: 354 / 200,
    width: '100%',
    borderRadius: 24,
    marginTop: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
    // overflow: 'hidden',
    padding: 6,
  },
  youtubeContainer2: {
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  pharagraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginTop: 40,
  },
  heading2: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 40,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  companyValueTitle: {fontSize: 14, fontWeight: '600', lineHeight: 20},
  companyValueDesc: {fontSize: 12, lineHeight: 16, marginTop: 4},
  point: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  innerPoint: {width: 10, height: 10, borderRadius: 5},
  year: {fontSize: 14, fontWeight: '600', lineHeight: 20},
  milestoneText: {
    fontSize: 12,
    lineHeight: 16,
    // flex: 1,
  },
  month: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    marginBottom: 2,
  },
  crewContainer: {
    //
  },
  crewImageContainer: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 99,
  },
  crewName: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 24,
  },
  crewPosition: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  line: {
    position: 'absolute',
    width: 2,
    height: '100%',
    left: '50%',
    transform: [{translateX: '-50%'}],
    top: 4,
  },
});
