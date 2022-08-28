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

interface CommentWriteProps {
  // isLogin: boolean;
  reviewId: number;
  onCommentReload?: () => void;
  parentId?: number;
  handleReplyCancel?: () => void;
}

// TODO: 유저의 로그인 상태는 전역 관리.
// 우선은 props로 받지만, 전역 관리 로직이 완료되면
// 컴포넌트 안에서 관리하도록 한다.
const CommentWrite = ({
  reviewId,
  parentId,
  handleReplyCancel,
  onCommentReload,
}: CommentWriteProps) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const currentUser = useRecoilValue(userAtom);
  const isLogin = currentUser.userId !== null;

  // 유저 상태
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCancel = () => {
    setComment('');
    setShow(false);
    handleReplyCancel && handleReplyCancel();
    // 답글의 경우 핸들하는 함수
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
    return !isLogin ? (
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
          <UserAvatar userId={currentUser.userId} profileImage={currentUser.profileImage} />
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
`;

const CommentWriteWrapper = styled.div``;

const CommentWriteUtilContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
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
