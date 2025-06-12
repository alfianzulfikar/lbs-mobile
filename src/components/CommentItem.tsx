import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';
import ICLike from './icons/ICLike';
import {CommentType} from '../constants/Types';
import dateTimeFormat from '../utils/dateTimeFormat';
import {useColorScheme} from '../hooks/useColorScheme';
import ICChecked from './icons/ICChecked';

const CommentItem = ({
  data,
  isReply,
  setParent,
}: {
  data: CommentType;
  isReply?: boolean;
  setParent?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      username: string;
    }>
  >;
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textColor2 = useThemeColor({}, 'text2');
  const textColor4 = useThemeColor({}, 'text4');
  const tint = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, {backgroundColor}]}>
        <Image
          source={
            colorScheme === 'dark'
              ? require('../assets/images/profile-picture-dark.png')
              : require('../assets/images/profile-picture-light.png')
          }
          style={{width: 24, height: 24}}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 1, marginLeft: 8}}>
        <Text
          style={[
            styles.username,
            {color: data.isOfficial ? tint : textColor},
          ]}>
          {data.username}{' '}
          {data.isOfficial ? (
            <View style={{transform: [{translateY: 2}]}}>
              <ICChecked color={tint} />
            </View>
          ) : null}
        </Text>

        <Text style={[styles.date, {color: textColor4}]}>
          {dateTimeFormat(data.date)}
        </Text>

        <Text style={[styles.message, {color: textColor2}]}>
          {data.message}
        </Text>

        <View style={styles.infoContainer}>
          <ICLike color={textColor2} size={16} />
          <Text style={styles.numberOfLikes}>{String(data.numberOfLikes)}</Text>
          {!isReply && (
            <>
              <View style={[styles.dot, {backgroundColor: '#616161'}]}></View>
              <TouchableOpacity
                onPress={() => {
                  if (setParent) {
                    setParent({id: data.id, username: data.username});
                  }
                }}>
                <Text style={[styles.replyButton, {color: tint}]}>
                  Balas Komentar
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  imageContainer: {width: 24, height: 24, borderRadius: 12, overflow: 'hidden'},
  username: {fontSize: 16, fontWeight: '600', lineHeight: 24},
  date: {fontSize: 12, lineHeight: 16, marginTop: 4},
  message: {fontSize: 14, lineHeight: 20, marginTop: 8},
  numberOfLikes: {fontSize: 12, lineHeight: 16, marginLeft: 4},
  dot: {width: 4, height: 4, borderRadius: 2, marginHorizontal: 8},
  replyButton: {fontSize: 12, fontWeight: '600', lineHeight: 16},
  infoContainer: {flexDirection: 'row', marginTop: 8, alignItems: 'center'},
});
