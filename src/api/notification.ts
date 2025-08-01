import {useAPI} from '../services/api';
import {useRef, useState} from 'react';
import {NotificationType, TopicType} from '../constants/Types';
import {useNavigation} from '@react-navigation/native';
import {useNotification} from '../services/notification';

export const useNotificationAPI = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const {createChannel} = useNotification();

  const [topics, setTopics] = useState<TopicType[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [moreNotificationsLoading, setMoreNotificationsLoading] =
    useState(false);
  const [page, setPage] = useState(1);

  const isFetching = useRef(false);
  const isLastPage = useRef(false);

  const registerFCMToken = async ({
    name,
    email,
    fcmToken,
    platform,
  }: {
    name: string;
    email: string;
    fcmToken: string;
    platform: string;
  }) => {
    console.log('registerFCMToken', name);
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/notification/register',
        authorization: true,
        body: {
          fullname: name,
          email: email,
          firebase_token: fcmToken,
          platform: platform,
        },
      });
      console.log('registerFCMToken success', res);
      await createChannel();
    } catch {
      console.log('registerFCMToken error');
    }
  };

  const getTopics = async () => {
    setTopicsLoading(true);
    isFetching.current = true;
    try {
      const res = await apiRequest({
        endpoint: '/notification/topics',
        authorization: true,
      });
      console.log('get Topics', res);
      const newArray: TopicType[] = [];
      if (res.status) {
        res.data.map((item: any) => {
          // if (item.name === 'news') {
          // }
          newArray.push({
            id: item.id,
            description:
              item.name === 'news'
                ? 'Pemberitahuan mengenai bisnis yang sedang listing dan pra listing'
                : item.description,
            name: item.name,
            isSubscribed: item.is_subscribed,
            label: item.name === 'news' ? 'Listing & Pra Listing' : item.name,
          });
        });
      }
      setTopics(newArray);
    } catch (error) {
      console.log('get topics error', error);
    } finally {
      setTopicsLoading(false);
      isFetching.current = false;
    }
  };

  const subscribeTopic = async (topicId: string | number) => {
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/notification/topics/subscribe',
        authorization: true,
        body: {
          topic_id: topicId,
        },
      });
      console.log('subscribe topic', res);
      return res.status;
    } catch (error) {
      console.log('subscribe topic error', error);
    }
  };

  const unsubscribeTopic = async (topicId: string | number) => {
    try {
      const res = await apiRequest({
        method: 'post',
        endpoint: '/notification/topics/unsubscribe',
        authorization: true,
        body: {
          topic_id: topicId,
        },
      });
      console.log('unsubscribe topic', res);
      return res.status;
    } catch (error) {
      console.log('unsubscribe topic error', error);
    }
  };

  const getNotifications = async (nextPage?: number) => {
    if (nextPage) {
      setMoreNotificationsLoading(true);
    } else {
      setNotificationsLoading(true);
    }
    try {
      if (!isLastPage.current) {
        const res = await apiRequest({
          endpoint: `/notification/${nextPage ? '?page=' + nextPage : ''}`,
          authorization: true,
        });
        console.log('getNotifications', res);
        let newArray: NotificationType[] = [];
        if (nextPage) {
          newArray = [...notifications];
        }
        if (res.data?.items && res.data.items.length > 0) {
          res.data.items.map((item: any) => {
            newArray.push({
              title: item.title,
              description: item.message,
              icon: item.icon,
              data: item.data || {key: '', value: ''},
            });
          });
        }
        setNotifications(newArray);
        const rest = res.data.total - res.data.page * res.data.per_page;
        if (rest <= 0) {
          isLastPage.current = true;
        }
        if (nextPage) {
          setPage(nextPage);
        }
      }
    } catch {
    } finally {
      if (nextPage) {
        setMoreNotificationsLoading(false);
      } else {
        setNotificationsLoading(false);
      }
    }
  };

  return {
    registerFCMToken,
    topics,
    setTopics,
    getTopics,
    subscribeTopic,
    unsubscribeTopic,
    topicsLoading,
    getNotifications,
    notifications,
    notificationsLoading,
    page,
    setPage,
    moreNotificationsLoading,
    isFetching,
  };
};
