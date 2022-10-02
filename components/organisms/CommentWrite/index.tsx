import styled from '@emotion/styled';
import { Input, Button } from 'antd';
import { UserAvatar, NotLoginAvatar } from 'components/atoms';
import { useEffect, useRef, useState } from 'react';
import { CommentProps, UserProps } from 'types/model';
import { useClickAway } from 'hooks';
import router from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { commentAPI } from 'apis';
import DEFAULT_IMAGE from 'constants/defaultImage';
interface CommentWriteProps {
  isLogin: boolean;
  reviewId: number;
  onCommentReload?: () => void;
  parentId?: number;
  handleReplyCancel?: () => void;
}

const CommentWrite = ({
  reviewId,
  parentId,
  handleReplyCancel,
  onCommentReload,
}: CommentWriteProps) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const { userId, email, nickname, profileImage, isLoggedIn } = useRecoilValue(userAtom);
  // const isLogin = currentUser.userId !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCancel = () => {
    setComment('');
    setShow(false);
    handleReplyCancel && handleReplyCancel();
  };

  const clickAwayHandler = () => {
    setShow(false);
  };

  useClickAway(commentContainerRef, clickAwayHandler);

  const handleOnClick = async () => {
    if (parentId) {
      const { data } = await commentAPI.create(reviewId, {
        content: comment,
        parentId,
      });
      onCommentReload && onCommentReload();
    } else {
      const { data } = await commentAPI.create(reviewId, {
        content: comment,
      });
      onCommentReload && onCommentReload();
    }
    setShow(false);
    setComment('');
  };

  {
    return !isLoggedIn ? (
      <CommentWriteContainer
        onClick={() => {
          router.push('/signin');
        }}
      >
        <NotLoginAvatar size={36} />
        <CommentInput placeholder="로그인해야 댓글을 작성할 수 있습니다." disabled />
      </CommentWriteContainer>
    ) : (
      <CommentWriteWrapper ref={commentContainerRef}>
        <CommentWriteContainer>
          {userId && (
            <UserAvatar
              userId={userId}
              profileImage={profileImage ? profileImage : DEFAULT_IMAGE.USER_PROFILE}
            />
          )}
          <CommentInput
            value={comment}
            placeholder="댓글을 작성하세요."
            onClick={() => {
              setShow(true);
            }}
            onChange={handleChange}
          />
        </CommentWriteContainer>
        {show && (
          <CommentWriteUtilContainer>
            <CancelButton type="text" onClick={handleCancel}>
              취소
            </CancelButton>
            <CommentButton
              disabled={comment.length <= 0}
              type="primary"
              onClick={() => handleOnClick()}
            >
              댓글
            </CommentButton>
          </CommentWriteUtilContainer>
        )}
      </CommentWriteWrapper>
    );
  }
};

const CommentWriteContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CommentWriteWrapper = styled.div``;

const CommentWriteUtilContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 10px;
`;

const CommentButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.blue.main};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue.dark};
  }
`;
const CancelButton = styled(Button)`
  margin-right: 10px;
`;

const CommentInput = styled(Input)`
  margin-left: 15px;
`;

export default CommentWrite;
