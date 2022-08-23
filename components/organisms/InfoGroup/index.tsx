import styled from '@emotion/styled';
import { CommentInfo, LikeInfo } from 'components/molecules';

interface InfoGroupProps {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLikeClick: () => void;
}

const InfoGroup = ({ isLiked, likeCount, commentCount, onLikeClick }: InfoGroupProps) => {
  return (
    <InfoGroupContainer>
      <LikeInfo isLiked={isLiked} likeCount={likeCount} onClick={onLikeClick} />
      <CommentInfo commentCount={commentCount} />
    </InfoGroupContainer>
  );
};

const InfoGroupContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
  align-content: center;
`;

export default InfoGroup;
