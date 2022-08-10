import styled from '@emotion/styled';
import { Card } from 'antd';

export const ReviewFeedCard = styled(Card)`
  margin: 30px 0;
`;

export const ReviewFeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`;

export const ReviewFeedContent = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

export const ReviewFeedThumbnail = styled.div`
  &:hover {
    filter: brightness(80%);
  }
`;

export const ReviewFeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewTagText = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.color.blue.main};

  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

export const ReviewFeedMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ReviewFeedMain = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
  }
`;

export const ReviewTitle = styled.p`
  font-size: 2.2rem;
  margin-top: 10px;
  font-weight: bold;
`;

export const ReviewContent = styled.p`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ReviewFeedBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

export const FeedButtonGroup = styled.div`
  display: flex;
  align-content: center;
`;
