import styled from '@emotion/styled';
import { Card, Image } from 'antd';

export const ReviewFeedCard = styled(Card)`
  width: 70%;
  margin: 30px 0;
  height: 230px;
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
  height: 150px;
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

export const ReviewTagText = styled.span`
  font-size: 2.3rem;
  max-width: 150px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.color.blue.main};

  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

export const ReviewFeedMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  -webkit-line-clamp: 2;
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

export const FeedImage = styled(Image)`
  width: 150px;
  height: 150px;

  @media (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 150px;
    height: 150px;
  }
  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 80px;
    height: 80px;
  }
`;
