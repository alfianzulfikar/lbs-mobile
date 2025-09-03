import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {useThemeColor} from '../hooks/useThemeColor';
import Toggle from '../components/Toggle';
import {useNotificationAPI} from '../api/notification';
import {TopicType} from '../constants/Types';
import CustomBottomSheet from '../components/BottomSheet';
import ContactAndPromotionExplanation from '../components/ContactAndPromotionExplanation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setCanBeCall} from '../slices/user';

const TopicItem = ({
  index,
  topicsLength,
  updateSettings,
  label,
  descriptionText,
  descriptionComponent,
  isSubscribed,
}: {
  index?: number;
  topicsLength?: number;
  updateSettings: () => Promise<void>;
  label: string;
  descriptionText?: string;
  descriptionComponent?: React.JSX.Element;
  isSubscribed: boolean;
}) => {
  const textColor2 = useThemeColor({}, 'text2');

  const [toggleLoading, setToggleLoading] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom:
          (index || index === 0) && topicsLength
            ? index !== topicsLength - 1
              ? 24
              : 0
            : 0,
      }}>
      <View style={{flex: 1}}>
        <Text style={styles.topicTitle}>{label}</Text>
        {descriptionComponent ? (
          descriptionComponent
        ) : (
          <Text style={[styles.topicDesc, {color: textColor2}]}>
            {descriptionText}
          </Text>
        )}
      </View>
      <Gap width={32} />
      <View style={{transform: [{translateY: 6}]}}>
        <Toggle
          toggleState={isSubscribed}
          onPress={async () => {
            setToggleLoading(true);
            await updateSettings();
            setToggleLoading(false);
          }}
          disabled={toggleLoading}
        />
      </View>
    </View>
  );
};

const NotificationSetting = () => {
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const dispatch = useDispatch();

  const {
    getTopics,
    topics,
    setTopics,
    topicsLoading,
    subscribeTopic,
    unsubscribeTopic,
    setContactAndPromotionAgreement,
  } = useNotificationAPI();
  const {canBeCalled} = useSelector((item: RootState) => item.user);

  const [showContactAndPromotion, setShowContactAndPromotion] = useState(false);

  const updateSettings = async (
    topicId: number | string,
    type: 'subscribe' | 'unsubscribe',
  ) => {
    let status: true | false | null = null;
    if (type === 'unsubscribe') {
      status = await unsubscribeTopic(topicId);
    } else {
      status = await subscribeTopic(topicId);
    }
    let newTopics: TopicType[] = [];
    if (status) {
      topics.map(item => {
        if (item.id === topicId) {
          newTopics.push({
            ...item,
            isSubscribed: type === 'subscribe' ? true : false,
          });
        } else {
          newTopics.push(item);
        }
      });
      setTopics(newTopics);
    }
  };

  const updateContacAndPromotionAgreement = async () => {
    const status = await setContactAndPromotionAgreement(!canBeCalled);
    if (status && status?.msg === 'Success') {
      dispatch(setCanBeCall(!canBeCalled));
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Notifikasi" />
      <View style={{marginTop: 40, paddingHorizontal: 24, flexGrow: 1}}>
        {topicsLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <View>
            <Text style={[styles.category, {color: tint}]}>
              Push Notification
            </Text>
            <View style={{marginTop: 16}}>
              {topics.map((item, index) => (
                <TopicItem
                  key={index}
                  index={index}
                  topicsLength={topics.length}
                  label={item.label || ''}
                  descriptionText={item.description || ''}
                  isSubscribed={item.isSubscribed}
                  updateSettings={async () => {
                    await updateSettings(
                      item.id,
                      item.isSubscribed ? 'unsubscribe' : 'subscribe',
                    );
                  }}
                />
              ))}
            </View>

            {/* Setting WhatsApp, Email dan Telepon */}
            <View>
              <Gap height={40} />
              <Text style={[styles.category, {color: tint}]}>
                WhatsApp, Email dan Telepon
              </Text>
              <View style={{marginTop: 16}}>
                <TopicItem
                  label="Kontak & Promosi"
                  descriptionComponent={
                    <Text style={[styles.topicDesc, {color: textColor2}]}>
                      Anda setuju untuk menerima informasi, promosi, dan peluang
                      investasi sesuai dengan{' '}
                      <Text
                        style={{
                          color: tint,
                          fontWeight: '700',
                          textDecorationLine: 'underline',
                        }}
                        onPress={() => setShowContactAndPromotion(true)}>
                        Kebijakan Kontak & Promosi
                      </Text>{' '}
                      yang berlaku melalui WhatsApp, email, atau telepon.
                    </Text>
                  }
                  isSubscribed={canBeCalled}
                  updateSettings={async () => {
                    await updateContacAndPromotionAgreement();
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <Gap height={24} />

      {showContactAndPromotion && (
        <ContactAndPromotionExplanation
          onDismiss={() => setShowContactAndPromotion(false)}
        />
      )}
    </ScreenWrapper>
  );
};

export default NotificationSetting;

const styles = StyleSheet.create({
  topicTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  topicDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  category: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  contactAndPromotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
  },
  contactAndPromotionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 15,
    transform: [{translateY: 8}],
  },
});
