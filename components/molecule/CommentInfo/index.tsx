import styled from '@emotion/styled';
import { MessageOutlined } from '@ant-design/icons';

interface CommentInfoProps {
  commentCount: number;
}

const CommentInfo = ({ commentCount }: CommentInfoProps) => {
  return (
    <CommentWrapper>
      <MessageOutlined />
      <CommentInfoCount>{commentCount}</CommentInfoCount>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInfoCount = styled.span`
  padding: 5px;
`;

CommentInfo;
