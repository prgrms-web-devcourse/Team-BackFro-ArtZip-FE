import styled from '@emotion/styled';
import { Button, message, Modal, Form, Input } from 'antd';
import { commentAPI } from 'apis';
import { LikeInfo } from 'components/molecules';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { CommentProps } from 'types/model';

// 댓글 정보 받고 수정버튼 삭제버튼
const ReplyUtils = ({
  reply,
  onDeleteButtonClick,
  onEditButtonClick,
  onLikeToggle,
}: {
  reply: CommentProps;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
  onLikeToggle: () => void;
}) => {
  const currentUser = useRecoilValue(userAtom);
  const { TextArea } = Input;

  const { content, commentId, isLiked, likeCount } = reply;
  // 답글 수정
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isLikeComment, setIsLikeComment] = useState(isLiked);
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);

  // Modal 관련
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = async () => {
    setIsDeleteModalVisible(false);
    const { data } = await commentAPI.delete(commentId);
    const { message: responseMessage } = data;
    message.success(responseMessage);
    onDeleteButtonClick();
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditContent(content);
    setIsEditModalVisible(false);
  };

  const handleEditOk = async () => {
    setIsEditModalVisible(false);
    const { data } = await commentAPI.update(commentId, { content: editContent });
    const { message: responseMessage } = data;
    message.success(responseMessage);
    onEditButtonClick();
  };

  const handleCommentLikeClick = async (commentId: number) => {
    if (!currentUser.userId) {
      message.warning('로그인 해주세요');
      return;
    }

    if (likeLoading) {
      return;
    }

    setLikeLoading(true);
    setIsLikeComment(!isLikeComment);
    setCommentLikeCount(isLikeComment ? commentLikeCount - 1 : commentLikeCount + 1);

    const { data } = await commentAPI.likeToggle(commentId);
    const { likeCount, isLiked } = data.data;

    setIsLikeComment(isLiked);
    setCommentLikeCount(likeCount);
    setLikeLoading(false);
    onLikeToggle();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  return (
    <>
      <ReplyUtilsContainer>
        <LikeInfo
          isLiked={isLikeComment}
          likeCount={commentLikeCount}
          onClick={() => handleCommentLikeClick(commentId)}
        />
        {currentUser.userId === reply.user.userId && (
          <ReplyUtilsButtons>
            <StyledButton
              type="text"
              onClick={() => {
                showEditModal();
              }}
            >
              수정
            </StyledButton>
            <StyledButton
              type="text"
              onClick={() => {
                showDeleteModal();
              }}
            >
              삭제
            </StyledButton>
          </ReplyUtilsButtons>
        )}
      </ReplyUtilsContainer>
      <Modal
        title="댓글을 삭제할까요?"
        visible={isDeleteModalVisible}
        onOk={() => handleDeleteOk()}
        okText="삭제하기"
        onCancel={handleDeleteModalCancel}
        cancelText="취소"
      >
        <p>이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠어요?</p>
      </Modal>
      <Modal
        title="댓글을 수정할까요?"
        visible={isEditModalVisible}
        onOk={() => handleEditOk()}
        okText="수정하기"
        onCancel={handleEditModalCancel}
        cancelText="취소"
      >
        <Form>
          <Form.Item>
            <TextArea defaultValue={editContent} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const ReplyUtilsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ReplyUtilsButtons = styled.div``;

const StyledButton = styled(Button)`
  padding: 0;
  margin-right: 10px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.font.dark};
`;

export default ReplyUtils;
