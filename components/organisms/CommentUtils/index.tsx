import styled from '@emotion/styled';
import { Button, Comment, message, Tooltip, Modal, Input, Form } from 'antd';
import { useState } from 'react';
import { CommentProps } from 'types/model';
import { CommentWrite, ReplyUtils } from 'components/organisms';
import router from 'next/router';
import Link from 'next/link';
import { UserAvatar } from 'components/atoms';
import moment from 'moment';
import { displayDate } from 'utils';
import { commentAPI } from 'apis';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { LikeInfo } from 'components/molecules';

const CommentUtils = ({
  comment,
  reviewId,
  parentId,
  onDeleteButtonClick,
  onEditButtonClick,
}: {
  comment: CommentProps;
  reviewId: number;
  parentId: number;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
}) => {
  const currentUser = useRecoilValue(userAtom);
  const { childrenCount, commentId, user, isLiked, likeCount, content } = comment;
  const { TextArea } = Input;

  // 답글 관련 상태
  const [showReply, setShowReply] = useState(false);
  const [commentChildrenCount, setCommentChildrenCount] = useState(childrenCount);
  const [replyList, setReplyList] = useState<CommentProps[]>([]);
  const [replyCount, setReplyCount] = useState(childrenCount);
  const [showReplyCount, setShowReplyCount] = useState(replyCount === 0 ? false : true);

  // 답글  더보기
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [hasMoreReply, setHasMoreReply] = useState(false);

  // 답글 작성
  const [showCommentWrite, setShowCommentWrite] = useState(false);

  // 답글 삭제
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // 답글 좋아요
  const [likeLoading, setLikeLoading] = useState(false);
  const [isLikeComment, setIsLikeComment] = useState(isLiked);
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);

  // 답글 수정
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editContent, setEditContent] = useState(content);

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

  // 답글 관련
  const handleReplyWriteButtonOnClick = () => {
    if (!currentUser.isLoggedIn) {
      router.push('/signin');
    } else {
      setShowCommentWrite(!showCommentWrite);
    }
  };

  const handleReplyShowButtonOnClick = async () => {
    setShowReply(!showReply);
    if (!replyList.length) {
      await getReply();
    }
  };

  const getReply = async () => {
    const { data } = await commentAPI.getReplies({ commentId: commentId });
    const newReplies: CommentProps[] = Object.values(data.data.content);
    const newChildrenCount = data.data.content.filter(
      (comment: CommentProps) => !comment.isDeleted,
    ).length;
    setReplyList([...newReplies.filter((reply) => !reply.isDeleted)]);
    setReplyCount(data.data.totalElements);
    const totalPageResponse = data.data.totalPage;
    setTotalPage(totalPageResponse - 1);
    if (currentPage < totalPageResponse - 1) {
      setHasMoreReply(true);
    }
    setCommentChildrenCount(newChildrenCount);
  };

  const getMoreReply = async () => {
    if (totalPage <= currentPage + 1) {
      setHasMoreReply(false);
    }
    const { data } = await commentAPI.getReplies({ commentId: commentId, page: currentPage + 1 });
    const newReplies: CommentProps[] = Object.values(data.data.content);
    setReplyList([...replyList, ...newReplies.filter((reply) => !reply.isDeleted)]);
    setCurrentPage(currentPage + 1);
  };

  const handleReplyReload = async () => {
    getReply();
    setShowReply(true);
    setShowReplyCount(true);
  };

  // 댓글 좋아요
  const handleCommentLikeClick = async (commentId: number) => {
    if (!currentUser.isLoggedIn) {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  return (
    <>
      <CommentUtilsWrapper>
        <CommentUtilContainer>
          <CommentReplayUtils>
            {showReplyCount && (
              <StyledButton type="text" onClick={handleReplyShowButtonOnClick}>
                {!showReply ? `답글 ${commentChildrenCount}개` : `답글 접기`}
              </StyledButton>
            )}
            <StyledButton type="text" onClick={handleReplyWriteButtonOnClick}>
              답글 달기
            </StyledButton>
            <LikeInfo
              isLiked={isLikeComment}
              likeCount={commentLikeCount}
              onClick={() => {
                handleCommentLikeClick(commentId);
              }}
            />
          </CommentReplayUtils>
          {user.userId === currentUser.userId && (
            <CommentButtonContainer>
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
            </CommentButtonContainer>
          )}
        </CommentUtilContainer>
        {showCommentWrite && (
          <CommentWrite
            handleReplyCancel={() => setShowCommentWrite(false)}
            parentId={parentId}
            reviewId={reviewId}
            onCommentReload={handleReplyReload}
          />
        )}
        {showReply &&
          replyList.map((reply) => (
            <Comment
              key={reply.commentId}
              author={<Link href={`/users/${reply.user.userId}`}>{reply.user.nickname}</Link>}
              avatar={
                <UserAvatar userId={reply.user.userId} profileImage={reply.user.profileImage} />
              }
              content={
                <p>
                  {reply.content} {reply.isEdited && <EditText>(수정됨)</EditText>}
                </p>
              }
              datetime={
                <Tooltip title={moment(reply.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{displayDate(reply.createdAt)}</span>
                </Tooltip>
              }
              actions={[
                [
                  <ReplyUtils
                    key={reply.commentId}
                    reply={reply}
                    onDeleteButtonClick={getReply}
                    onEditButtonClick={getReply}
                    onLikeToggle={getReply}
                  />,
                ],
              ]}
            />
          ))}
        {showReply && hasMoreReply && (
          <Button type="text" onClick={getMoreReply}>
            더보기
          </Button>
        )}
      </CommentUtilsWrapper>
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

const CommentUtilContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentUtilsWrapper = styled.div`
  width: 100%;
  margin-top: -10px;
`;

const StyledButton = styled(Button)`
  padding: 0;
  margin-right: 10px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.font.dark};
`;

const CommentReplayUtils = styled.div`
  display: flex;
`;

const CommentButtonContainer = styled.div``;

const EditText = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.color.font.light};
`;

export default CommentUtils;
