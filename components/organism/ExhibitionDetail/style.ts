import styled from '@emotion/styled';
import { Image, Button } from 'antd';

export const ExhibitionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 90%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 100%;
  }
`;
export const Thumbnail = styled(Image)`
  margin-top: 10px;
  width: 320px;
  height: 450px;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 240px;
    height: 350px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 200px;
    height: 280px;
  }
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
`;

export const InfoContainer = styled.div`
  margin-left: 40px;
  width: 55%;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    margin-left: 20px;
  }
`;

export const Line = styled.hr`
  width: 80%;
  margin-bottom: 20px;
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.font.light};
  border: 0;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 10px;
`;

export const IconContainer = styled.div`
  height: 7rem;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 3rem;
  color: ${({ theme }) => theme.color.font.dark};
  cursor: pointer;
`;
