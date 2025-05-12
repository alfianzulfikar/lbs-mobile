import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {useThemeColor} from '../hooks/useThemeColor';
import Toggle from '../components/Toggle';

const NotificationSetting = () => {
  const textColor2 = useThemeColor({}, 'text2');

  const [topicState, setTopicState] = useState({
    topic1: false,
  });

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Notifikasi" />
      <View style={{marginTop: 40, paddingHorizontal: 24, flexGrow: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.topicTitle}>
              Title of Required Notification
            </Text>
            <Text style={[styles.topicDesc, {color: textColor2}]}>
              Description for the notification, to inform user about the context
            </Text>
          </View>
          <Gap width={32} />
          <View style={{transform: [{translateY: 6}]}}>
            <Toggle
              toggleState={topicState.topic1}
              onPress={() =>
                setTopicState(prev => ({...prev, topic1: !prev.topic1}))
              }
            />
          </View>
        </View>
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
