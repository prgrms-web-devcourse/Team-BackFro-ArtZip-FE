import styled from '@emotion/styled';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

interface LikeToggleProps {
  isLiked: boolean;
  onClick: () => void;
}

const LikeInfo = ({ isLiked, onClick }: LikeToggleProps) => {
  return (
    <LikeWrapper onClick={onClick}>{isLiked ? <HeartFilled /> : <HeartOutlined />}</LikeWrapper>
  );
};

const LikeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 5px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    // TODO: 이후에 테마색으로 변경
    background-color: pink;
  }
`;

export default LikeInfo;
