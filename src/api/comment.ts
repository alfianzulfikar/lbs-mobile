import {useRef, useState} from 'react';
import {CommentType, ReplyType} from '../constants/Types';
import {useAPI} from '../services/api';

export const useComment = () => {
  const {apiRequest} = useAPI();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentMoreLoading, setCommentMoreLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string[]>([]);

  const isLastPage = useRef(false);

  const getComments = async (slug: string, page?: number, sort?: string) => {
    if (page && page > 1) {
      setCommentMoreLoading(true);
    } else {
      setCommentLoading(true);
    }
    try {
      let sortByTime = '';
      let sortByPopuler = '';
      if (sort) {
        if (sort == 'terbaru') {
          sortByTime = 'created_at=desc';
        } else if (sort == 'terlama') {
          sortByTime = 'created_at=asc';
        }

        if (sort == 'populer') {
          sortByPopuler = 'popular=desc';
        }
      }

      const res = await apiRequest({
        endpoint: `/bisnis/detail/${slug}/comments?page=${page ? page : 1}${
          sortByTime ? '&' + sortByTime : ''
        }${sortByPopuler ? '&' + sortByPopuler : ''}`,
      });
      console.log('get comment res', res);
      if (res?.result) {
        let newComments: CommentType[] = [];
        res.result.map((comment: any) => {
          let newReplies: ReplyType[] = [];
          if (comment?.replies?.result) {
            comment.replies.result.map((reply: any) => {
              newReplies.push({
                username: reply.fullname || '',
                id: reply.id || '',
                date: reply.created_at || '',
                message: reply.comment || '',
                numberOfLikes: reply.total_like || 0,
                image: '',
                canDelete: reply.can_delete || false,
                isOfficial:
                  (reply?.fullname || '').includes('Official') ||
                  (reply?.fullname || '').includes('LBS Urun Dana'),
              });
            });
          }
          newComments.push({
            username: comment.fullname || '',
            id: comment.id || '',
            date: comment.created_at || '',
            message: comment.comment || '',
            numberOfLikes: comment.total_like || 0,
            image: '',
            canDelete: comment.can_delete || false,
            isOfficial: (comment?.fullname || '').includes('Official'),
            replies: newReplies,
          });
        });
        console.log('mapping res', newComments);
        if (res?.result && res?.result.length > 0) {
          if (page && page > 1) {
            setComments(prev => [...prev, ...newComments]);
          } else {
            setComments(newComments);
            isLastPage.current = false;
          }
        } else {
          isLastPage.current = true;
        }
      }
    } catch (error) {
      console.log('get comment error', error);
    } finally {
      if (page && page > 1) {
        setCommentMoreLoading(false);
      } else {
        setCommentLoading(false);
      }
    }
  };

  const submitComment = async (
    slug: string,
    parentId: string,
    username: string,
  ) => {
    setSubmitLoading(true);
    try {
      const res = await apiRequest({
        endpoint: `/bisnis/detail/${slug}/comments`,
        authorization: true,
        method: 'post',
        body: {
          comment,
          ...(parentId ? {parent_id: parentId} : {}),
        },
      });
      console.log('submit res', res);
      if (parentId) {
        let newComments: CommentType[] = [];
        comments.map((item, index) => {
          if (item.id === parentId) {
            newComments.push({
              ...item,
              replies: [
                {
                  id: res.id,
                  message: comment,
                  date: res.created_at,
                  image: '',
                  numberOfLikes: 0,
                  isOfficial: false,
                  canDelete: true,
                  username,
                },
                ...(item?.replies || []),
              ],
            });
          } else {
            newComments.push(item);
          }
        });
        setComments(newComments);
      } else {
        setComments(prev => [
          {
            id: res.id,
            message: comment,
            date: res.created_at,
            image: '',
            numberOfLikes: 0,
            isOfficial: false,
            canDelete: true,
            username,
            replies: [],
          },
          ...prev,
        ]);
      }
      setComment('');
      setError([]);
    } catch (error: any) {
      if (error?.status === 422) {
        setError(error?.data?.errors?.comment || []);
      }
      console.log('submit error', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    comments,
    commentLoading,
    commentMoreLoading,
    getComments,
    isLastPage,
    submitComment,
    submitLoading,
    comment,
    setComment,
    error,
  };
};
