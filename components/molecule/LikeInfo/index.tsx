import styled from '@emotion/styled';
import { LikeToggle } from 'components/atom';
interface LikeInfoProps {
  isLiked: boolean;
  likeCount: number;
  onClick: () => void;
}

const LikeInfo = ({ isLiked, likeCount, onClick }: LikeInfoProps) => {
  return (
    <LikeInfoWrapper>
      <LikeToggle isLiked={isLiked} onClick={onClick} />
      <LikeCount>{likeCount}</LikeCount>
    </LikeInfoWrapper>
  );
};

const LikeInfoWrapper = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    // TODO: 이후에 테마색으로 변경
    color: red;
  }
`;

const LikeCount = styled.span``;

export default LikeInfo;
