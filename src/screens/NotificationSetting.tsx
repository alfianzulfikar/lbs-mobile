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

const NotificationSetting = () => {
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');

  const {
    getTopics,
    topics,
    setTopics,
    topicsLoading,
    subscribeTopic,
    unsubscribeTopic,
  } = useNotificationAPI();

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
          topics.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: index !== topics.length ? 24 : 0,
              }}
              key={index}>
              <View style={{flex: 1}}>
                <Text style={styles.topicTitle}>{item.label}</Text>
                <Text style={[styles.topicDesc, {color: textColor2}]}>
                  {item.description}
                </Text>
              </View>
              <Gap width={32} />
              <View style={{transform: [{translateY: 6}]}}>
                <Toggle
                  toggleState={item.isSubscribed}
                  onPress={() =>
                    updateSettings(
                      item.id,
                      item.isSubscribed ? 'unsubscribe' : 'subscribe',
                    )
                  }
                />
              </View>
            </View>
          ))
        )}
      </View>
      <Gap height={24} />
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
});
