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
import styled from '@emotion/styled';

const CommentList = ({
  comments,
  reviewId,
  onDeleteButtonClick,
  onEditButtonClick,
}: {
  comments: PaginationResponse<CommentProps>;
  reviewId: number;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
}) => {
  const getMoreComment = async () => {
    if (totalPage <= currentPage) {
      return;
    }
    const { data } = await reviewAPI.getComments({ reviewId: reviewId, page: currentPage + 1 });
    const newComments: CommentProps[] = Object.values(data.data);
    setCurrentComments([...currentComments, ...newComments]);
    setCurrentPage(currentPage + 1);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useInfiniteScroll(getMoreComment);
  const commentList = [...Object.values(comments.content.filter((comment) => !comment.isDeleted))];
  const [currentComments, setCurrentComments] = useState(commentList);

  const { totalPage } = comments;

  return (
    <>
      {commentList &&
        commentList.map((comment) => (
          <Comment
            key={comment.commentId}
            actions={[
              <CommentUtils
                key={comment.commentId}
                comment={comment}
                reviewId={reviewId}
                parentId={comment.commentId}
                onDeleteButtonClick={onDeleteButtonClick}
                onEditButtonClick={onEditButtonClick}
              />,
            ]}
            author={<Link href={`/user/${comment.user.userId}`}>{comment.user.nickname}</Link>}
            avatar={
              <UserAvatar userId={comment.user.userId} profileImage={comment.user.profileImage} />
            }
            content={
              <p>
                {comment.content}
                {comment.isEdited && <EditText>(수정됨)</EditText>}
              </p>
            }
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

const EditText = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.color.font.light};
`;

export default CommentList;
