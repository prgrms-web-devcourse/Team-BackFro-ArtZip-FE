import styled from '@emotion/styled';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

interface LikeToggleProps {
  isLiked: boolean;
  onClick: () => void;
}

const LikeToggle = ({ isLiked, onClick }: LikeToggleProps) => {
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
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
  }
`;

export default LikeToggle;
