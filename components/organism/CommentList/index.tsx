import { CommentProps } from 'types/model';
import { PaginationResponse } from 'types/apis/base';
import { useInfiniteScroll } from 'hooks';
import { useState } from 'react';
import { Comment, Tooltip } from 'antd';
import Link from 'next/link';
import { UserAvatar } from 'components/atom';
import { CommentUtils } from 'components/organism';
import moment from 'moment';
import { displayDate } from 'utils';
import axios from 'axios';

const CommentList = ({
  comments,
  reviewId,
}: {
  comments: PaginationResponse<CommentProps>;
  reviewId: number;
}) => {
  const getMoreComment = async () => {
    if (totalPages <= currentPage) {
      return;
    }

    const { data } = await axios.get(
      `${process.env.MOCKING_API_END_POINT}api/v1/reviews/${reviewId}/comments?page=${
        currentPage + 1
      }`,
    );

    const newComments: CommentProps[] = Object.values(data.data);
    setCurrentComments([...currentComments, ...newComments]);
    setCurrentPage(currentPage + 1);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useInfiniteScroll(getMoreComment);
  const [currentComments, setCurrentComments] = useState(comments.content);

  const { totalPages } = comments;

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
