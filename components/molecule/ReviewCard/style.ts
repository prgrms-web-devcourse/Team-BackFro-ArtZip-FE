import styled from '@emotion/styled';
import { Avatar } from 'antd';
import { Card } from 'antd';

export const ReviewCard = styled(Card)`
  width: 600px;
  height: 270px;
  border: none;
  border-radius: 30px;
  padding: 10px 5px 10px 5px;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-weight: 400;
  font-size: 18px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &:hover {
    cursor: pointer;
  }
`;

export const UserInfoAvatar = styled(Avatar)`
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  width: fit-content;
  margin-bottom: 15px;
`;

export const UserInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserInfoName = styled.span`
  font-size: 22px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const UserInfoDate = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.color.font.light};
`;

export const PhotoWrapper = styled.div``;

export const Photo = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  position: absolute;
  top: 25px;
  right: 25px;
`;

export const HoverContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  gap: 5px;
  color: white;
  position: absolute;
  top: 25px;
  right: 25px;
  &:hover {
    cursor: pointer;
  }
`;
