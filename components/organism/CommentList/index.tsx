import { CommentProps } from 'types/model';
import { PaginationResponse } from 'types/apis/base';
import { useInfiniteScroll } from 'hooks';
import { useState } from 'react';
import Link from 'next/link';
import { Comment, Tooltip } from 'antd';
import { UserAvatar } from 'components/atom';
import { CommentUtils } from 'components/organism';
import moment from 'moment';
import { displayDate } from 'utils';
import reviewAPI from 'apis/review';

const CommentList = ({
  comments,
  reviewId,
}: {
  comments: PaginationResponse<CommentProps>;
  reviewId: number;
}) => {
  const getMoreComment = async () => {
    if (totalPage <= currentPage) {
      return;
    }
    const { data } = await reviewAPI.getComments(reviewId, currentPage + 1);
    const newComments: CommentProps[] = Object.values(data.data);
    setCurrentComments([...currentComments, ...newComments]);
    setCurrentPage(currentPage + 1);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useInfiniteScroll(getMoreComment);
  const [currentComments, setCurrentComments] = useState(comments.content);

  const { totalPage } = comments;

  return (
    <>
      {currentComments &&
        currentComments.map((comment) => (
          <Comment
            key={comment.commentId}
            actions={[<CommentUtils key={comment.commentId} comment={comment} />]}
            author={<Link href={`/user/${comment.user.userId}`}>{comment.user.nickname}</Link>}
            avatar={
              <UserAvatar userId={comment.user.userId} profileImage={comment.user.profileImage} />
            }
            content={<p>{comment.content}</p>}
            datetime={
              <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{displayDate(comment.createdAt)}</span>
              </Tooltip>
            }
          />
        ))}
    </>
  );
};

export default CommentList;
