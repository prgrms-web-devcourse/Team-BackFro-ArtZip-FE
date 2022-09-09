import { CommentProps } from 'types/model';
import Link from 'next/link';
import { Comment, Tooltip } from 'antd';
import { UserAvatar } from 'components/atoms';
import { CommentUtils } from 'components/organisms';
import moment from 'moment';
import { displayDate } from 'utils';
import styled from '@emotion/styled';
import { Alert } from 'antd';

const CommentList = ({
  comments,
  reviewId,
  onDeleteButtonClick,
  onEditButtonClick,
}: {
  comments: CommentProps[];
  reviewId: number;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
}) => {
  const commentList = comments.filter((comment) => !comment.isDeleted);

  return (
    <>
      {commentList && commentList.length === 0 && (
        <NoCommentAlert message="작성된 댓글이 없습니다." type="info" showIcon />
      )}
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
            author={<Link href={`/users/${comment.user.userId}`}>{comment.user.nickname}</Link>}
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

const NoCommentAlert = styled(Alert)`
  margin-top: 20px;
`;

export default CommentList;
