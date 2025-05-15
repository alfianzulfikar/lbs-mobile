import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from './Text';
import {CommentType} from '../constants/Types';
import CommentItem from './CommentItem';
import Gap from './Gap';
import {useThemeColor} from '../hooks/useThemeColor';
import {RGBAColors} from '../constants/Colors';
import {useColorScheme} from '../hooks/useColorScheme';

const ComposedComment = ({
  data,
  setParent,
}: {
  data: CommentType;
  setParent: React.Dispatch<
    React.SetStateAction<{
      id: string;
      username: string;
    }>
  >;
}) => {
  const colorScheme = useColorScheme();
  const textColor2 = useThemeColor({}, 'text2');
  const textColor4 = useThemeColor({}, 'text4');
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'background');
  const [showReplies, setShowReplies] = useState(false);
  return (
    <View>
      {data.message ? (
        <>
          <CommentItem data={data} setParent={setParent} />
          {data.replies && data.replies.length > 0 ? (
            <>
              <Gap height={16} />
              {showReplies && (
                <>
                  {data.replies.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        marginLeft: 64,
                        marginBottom:
                          index !== (data.replies || []).length - 1 ? 16 : 0,
                      }}>
                      <CommentItem data={item} isReply />
                    </View>
                  ))}
                  <Gap height={16} />
                </>
              )}
              <TouchableOpacity
                style={[
                  styles.showRepliesButtonWrapper,
                  {marginLeft: showReplies ? 64 : 32},
                ]}
                onPress={() => setShowReplies(prev => !prev)}>
                <View style={[styles.line, {borderColor: textColor4}]}></View>
                <Text style={[styles.showRepliesText, {color: textColor4}]}>
                  {showReplies
                    ? 'Sembunyikan Balasan'
                    : `Lihat Balasan (${data.replies.length})`}
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
        </>
      ) : (
        <View
          style={[
            styles.deletedCommentContainer,
            {backgroundColor: RGBAColors(0.5)[colorScheme].background},
          ]}>
          <Text style={{color: textColor4}}>Komentar ini telah dihapus</Text>
        </View>
      )}
    </View>
  );
};

export default ComposedComment;

const styles = StyleSheet.create({
  showRepliesText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  line: {
    width: 40,
    borderTopWidth: 1,
    marginRight: 8,
  },
  showRepliesButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deletedCommentContainer: {
    padding: 16,
    borderRadius: 8,
  },
});
