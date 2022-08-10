import styled from '@emotion/styled';
import { Button, Comment, Tooltip } from 'antd';
import { useState } from 'react';
import { CommentProps } from 'types/model';
import { CommentWrite } from 'components/organism';
import router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { UserAvatar } from 'components/atom';
import moment from 'moment';
import { displayDate } from 'utils';
import { commentAPI } from 'apis';

const CommentUtils = ({ comment }: { comment: CommentProps }) => {
  // TODO: 로그인한 유저의 상태, 후에 전역 상태로 판단
  const user = undefined;

  const [showReply, setShowReplay] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [hasMoreReply, setHasMoreReply] = useState(false);
  const [showCommentWrite, setShowCommentWrite] = useState(false);

  const { childrenCount, commentId } = comment;

  const [replyList, setReplyList] = useState<CommentProps[] | []>([]);

  const handleReplyWriteButtonOnClick = () => {
    if (!user) {
      router.push('/signin');
    } else {
      setShowCommentWrite(true);
    }
  };

  const handleReplyShowButtonOnClick = async () => {
    setShowReplay(!showReply);
    if (!replyList.length) {
      await getReply();
    }
  };

  const getReply = async () => {
    const { data } = await commentAPI.getReplies(commentId);

    const newReplies: CommentProps[] = Object.values(data.data.content);
    setReplyList([...replyList, ...newReplies]);
    const totalPageResponse = data.data.totalPages;
    setTotalPage(totalPageResponse);

    if (currentPage < totalPageResponse) {
      setHasMoreReply(true);
    }
  };

  const getMoreReply = async () => {
    if (totalPage <= currentPage + 1) {
      setHasMoreReply(false);
    }

    const { data } = await axios.get(
      `${process.env.MOCKING_API_END_POINT}api/v1/comments/${commentId}/children?page=${
        currentPage + 1
      }`,
    );

    const newReplies: CommentProps[] = Object.values(data.data.content);
    setReplyList([...replyList, ...newReplies]);
    setCurrentPage(currentPage + 1);
  };

  return (
    <CommentUtilsWrapper>
      <CommentUtilContainer>
        {!!childrenCount && (
          <StyledButton type="text" onClick={handleReplyShowButtonOnClick}>
            {!showReply ? `답글 ${childrenCount}개` : `답글 접기`}
          </StyledButton>
        )}
        <StyledButton type="text" onClick={handleReplyWriteButtonOnClick}>
          답글 달기
        </StyledButton>
      </CommentUtilContainer>
      {showCommentWrite && (
        <CommentWrite user={undefined} handleReplyCancel={() => setShowCommentWrite(false)} />
      )}
      {showReply &&
        replyList.map((reply) => (
          <Comment
            key={reply.commentId}
            author={<Link href={`/user/${reply.user.userId}`}>{reply.user.nickname}</Link>}
            avatar={
              <UserAvatar userId={reply.user.userId} profileImage={reply.user.profileImage} />
            }
            content={<p>{reply.content}</p>}
            datetime={
              <Tooltip title={moment(reply.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{displayDate(reply.createdAt)}</span>
              </Tooltip>
            }
          />
        ))}
      {showReply && hasMoreReply && (
        <Button type="text" onClick={getMoreReply}>
          더보기
        </Button>
      )}
    </CommentUtilsWrapper>
  );
};

const CommentUtilContainer = styled.div`
  display: flex;
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

export default CommentUtils;
