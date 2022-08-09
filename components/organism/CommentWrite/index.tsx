import styled from '@emotion/styled';
import { Input, Button } from 'antd';
import { UserAvatar, NotLoginAvatar } from 'components/atom';
import { useRef, useState } from 'react';
import { UserProps } from 'types/model';
import { useClickAway } from 'hooks';
import router from 'next/router';

interface CommentWriteProps {
  user?: UserProps;
  parentId?: number;
  handleReplyCancel?: () => void;
}

// TODO: 유저의 로그인 상태는 전역 관리.
// 우선은 props로 받지만, 전역 관리 로직이 완료되면
// 컴포넌트 안에서 관리하도록 한다.
const CommentWrite = ({ user, parentId, handleReplyCancel }: CommentWriteProps) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const commentContainerRef = useRef<HTMLDivElement>(null);

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

  const handleOnClick = () => {
    // TODO: 댓글 작성 api 호출하는 로직
    // TODO: 댓글과 답글 로직을 구분, 답글의 경우, parentId(commentId)를 받음
    if (parentId) {
      console.log('답글 작성 api 호출');
    } else {
      console.log('댓글 작성 api 호출');
    }

    console.log('보낼 content', comment);
    setShow(false);
    setComment('');
  };

  {
    return !user ? (
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
          <UserAvatar userId={user.userId} profileImage={user.profileImage} />
          <CommentInput
            value={comment}
            placeholder="댓글을 작성하세요."
            onClick={() => setShow(true)}
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

const CommentInput = styled(Input)``;

export default CommentWrite;
