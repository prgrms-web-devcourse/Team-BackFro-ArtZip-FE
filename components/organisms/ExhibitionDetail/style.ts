import styled from '@emotion/styled';
import { Image } from 'antd';

export const ExhibitionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 90%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const Thumbnail = styled(Image)`
  margin-top: 10px;
  width: 320px;
  height: 450px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 240px;
    height: 350px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 300px;
    height: 420px;
    margin-bottom: 40px;
    position: relative;
  }
`;

export const InfoContainer = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    margin-left: 20px;
    width: 90%;
  }
`;

export const Title = styled.h2`
  width: 80%;
  font-weight: 700;
  font-size: 3rem;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.font.light};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const IconContainer = styled.div`
  height: 7rem;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 3rem;
  color: ${({ theme }) => theme.color.font.dark};
  cursor: pointer;
`;

export const Container = styled.div`
  margin-left: 40px;
  width: 55%;
  display: flex;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 80%;
  }
`;
