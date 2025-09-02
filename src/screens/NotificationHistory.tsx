import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import {useNotificationAPI} from '../api/notification';
import NotificationItem from '../components/NotificationItem';
import {useThemeColor} from '../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import {replace} from '../services/navigation';

const NotificationHistory = () => {
  const {
    notifications,
    getNotifications,
    notificationsLoading,
    moreNotificationsLoading,
    page,
    isFetching,
  } = useNotificationAPI();
  const navigation = useNavigation();

  const onEndReachedCalledDuringMomentum = useRef(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');

  const handlePagination = (nextPage: number) => {
    if (!isFetching.current) {
      getNotifications(nextPage);
    }
  };

  const renderFooter = () => (
    <>
      {/* <Gap height={24} /> */}
      {moreNotificationsLoading ? <ActivityIndicator color={tint} /> : null}
      <Gap height={24} />
    </>
  );

  useEffect(() => {
    const asyncFunc = async () => {
      await getNotifications();
      setScrollEnabled(true);
    };
    asyncFunc();
  }, []);

  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      header
      headerTitle="Notifikasi"
      childScrollY={scrollY}>
      {notificationsLoading && <ActivityIndicator color={tint} />}
      {!notificationsLoading && notifications.length === 0 && (
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 24,
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={styles.emptyContainer}>
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../assets/images/empty-notification-dark.png')
                  : require('../assets/images/empty-notification-light.png')
              }
              style={{width: 240, height: 240}}
              resizeMode="cover"
            />
          </View>
          <Text style={[styles.emptyTitle, {color: textColor}]}>
            Belum Ada Notifikasi
          </Text>
          <Text style={[styles.emptyDesc, {color: textColor2}]}>
            Saat ini belum ada notifikasi yang masuk.
          </Text>
          <Gap maxHeight={160} flex={1} />
        </View>
      )}
      <FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        data={notificationsLoading ? [] : notifications}
        renderItem={({item, index}) => (
          <View
            style={{
              marginBottom: index !== notifications.length - 1 ? 32 : 0,
              marginTop: index === 0 ? 20 : 0,
            }}>
            <NotificationItem
              data={item}
              disabled={item?.data?.key === 'Home'}
              onPress={() => {
                const data = item.data;
                if (data) {
                  if (data.key === 'Transaction') {
                    navigation.navigate('MainTab', {
                      screen: 'Transaction',
                      params: {
                        screen: 'TransactionScreen',
                        params: {paymentCode: data.value || ''},
                      },
                    });
                  } else if (data.key === 'PaymentSuccess') {
                    navigation.navigate('MainTab', {
                      screen: 'Transaction',
                      params: {
                        screen: 'TransactionScreen',
                        params: {paymentCode: data.value || ''},
                      },
                    });
                  } else if (data.key === 'PortfolioDetail') {
                    navigation.navigate('Portfolio', {
                      screen: 'PortfolioDetail',
                      params: {slug: data.value || '', openDisclosure: true},
                    });
                  } else if (data.key === 'BusinessDiscussion') {
                    navigation.navigate('Order', {
                      screen: 'BusinessDetail',
                      params: {slug: data.value || '', openDiscussion: true},
                    });
                  }
                }
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{marginTop: 0, paddingHorizontal: 24}}
        ListFooterComponent={renderFooter()}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current && scrollEnabled) {
            handlePagination(page + 1);
          }
          onEndReachedCalledDuringMomentum.current = true;
        }}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </ScreenWrapper>
  );
};

export default NotificationHistory;

const styles = StyleSheet.create({
  emptyContainer: {
    width: 216,
    height: 216,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});
