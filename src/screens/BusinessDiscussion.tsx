import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import Header from '../components/Header';
import ICSort from '../components/icons/ICSort';
import {useThemeColor} from '../hooks/useThemeColor';
import CommentInput from '../components/CommentInput';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';
import BlurOverlay from '../components/BlurOverlay';
import IconWrapper from '../components/IconWrapper';
import {
  CommentType,
  InputDropdownOption,
  OrderStackParamList,
} from '../constants/Types';
import BottomSheet from '../components/BottomSheet';
import ComposedComment from '../components/ComposedComment';
import {useComment} from '../api/comment';
import {useAPI} from '../services/api';
import LoadingModal from '../components/LoadingModal';
import {useUser} from '../api/user';
import ICCancel from '../components/icons/ICCancel';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<OrderStackParamList, 'BusinessDiscussion'>;

const BusinessDiscussion = ({route}: Props) => {
  const {slug, businessStatus} = route.params;
  const {
    comments,
    commentLoading,
    getComments,
    commentMoreLoading,
    isLastPage,
    submitComment,
    submitLoading,
    comment,
    setComment,
    error,
  } = useComment();
  const colorScheme = useColorScheme();
  const tint = useThemeColor({}, 'tint');
  const textColor2 = useThemeColor({}, 'text2');
  const backgroundColor = useThemeColor({}, 'background');
  const {apiRequest} = useAPI();
  const {user, getUser} = useUser();

  const [showSortingOption, setShowSortingOption] = useState(false);
  const [sort, setSort] = useState('populer');
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const page = useRef(1);
  const isFetching = useRef(false);
  const [parent, setParrent] = useState({id: '', username: ''});

  const shortingOption: InputDropdownOption[] = [
    {label: 'Terbaru', id: 'terbaru'},
    {label: 'Terlama', id: 'terlama'},
    {label: 'Paling banyak disukai', id: 'populer'},
  ];

  const renderItem = ({item, index}: {item: CommentType; index: number}) => {
    return (
      <View
        style={{
          paddingHorizontal: 24,
          marginBottom: index !== comments.length - 1 ? 16 : 0,
        }}>
        <ComposedComment data={item} setParent={setParrent} />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <Gap height={24} />
        <Header
          title="Diskusi"
          rightIcon={
            <IconWrapper onPress={() => setShowSortingOption(true)}>
              <ICSort color={textColor2} />
            </IconWrapper>
          }
        />
        <Gap height={40} />
        {commentLoading && <ActivityIndicator color={tint} />}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        {commentMoreLoading && (
          <View style={{marginTop: 24}}>
            <ActivityIndicator color={tint} />
          </View>
        )}
        <Gap height={24} />
      </>
    );
  };

  const handleSorting = (currentSort: string) => {
    getComments(slug, 1, currentSort);
    setSort(currentSort);
    page.current = 1;
  };

  const handlePagination = (nextPage: number) => {
    if (!isFetching.current && !isLastPage.current && scrollEnabled) {
      getComments(slug, nextPage, sort);
      page.current = nextPage;
    }
  };

  useEffect(() => {
    const handlAsync = async () => {
      getUser();
      await getComments(slug, 1, sort);
      setScrollEnabled(true);
    };
    handlAsync();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" overlay>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter()}
        onEndReached={() => {
          if (!isFetching.current) {
            handlePagination(page.current + 1);
          }
          isFetching.current = true;
        }}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => (isFetching.current = false)}
        scrollEnabled={scrollEnabled}
      />
      {['LISTING', 'PRE-LISTING'].includes(businessStatus || 'null') && (
        <View>
          {parent.username && (
            <View style={[styles.replyTargetContainer, {backgroundColor}]}>
              <Text style={[styles.replyUsername, {color: textColor2}]}>
                Membalas komentar {parent.username}
              </Text>
              <TouchableOpacity
                onPress={() => setParrent({id: '', username: ''})}>
                <ICCancel color={textColor2} />
              </TouchableOpacity>
            </View>
          )}
          <View>
            <BlurOverlay />
            <View
              style={[
                styles.commentInputContainer,
                {backgroundColor: RGBAColors(0.3)[colorScheme].background},
              ]}>
              <CommentInput
                value={comment}
                onChange={value => setComment(value)}
                onSubmit={() =>
                  submitComment(
                    slug,
                    parent.id,
                    user.firstname + ' ' + user.lastname,
                  )
                }
                loading={submitLoading}
                error={error}
              />
            </View>
          </View>
        </View>
      )}

      {showSortingOption && (
        <BottomSheet
          setShow={() => setShowSortingOption(false)}
          snapPoints={['25']}>
          {shortingOption.map((item, index) => (
            <Text
              key={index}
              style={styles.sortItem}
              onPress={() => {
                handleSorting(String(item.id));
                setShowSortingOption(false);
              }}>
              {item.label}
            </Text>
          ))}
        </BottomSheet>
      )}
    </ScreenWrapper>
  );
};

export default BusinessDiscussion;

const styles = StyleSheet.create({
  commentInputContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  sortItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
  replyUsername: {
    flex: 1,
    marginRight: 8,
    fontSize: 12,
    lineHeight: 16,
  },
  replyTargetContainer: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
