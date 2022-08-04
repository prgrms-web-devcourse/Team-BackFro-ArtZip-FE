import styled from '@emotion/styled';
import { Image, Button } from 'antd';

export const ExhibitionPageContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 70px 0px 15px 0px;
    width: 80%;
    display: flex;
    justify-content: flex-start;
    font-size: 2.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.font.main};
  }
`;
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

export const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoTextBold = styled.p`
  min-width: 80px;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.font.main};
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    min-width: 55px;
  }
`;
export const InfoText = styled.p`
  font-size: 1.8rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const DescriptionWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.border.light};
  width: 80%;
  margin: 0px 40px;
  padding: 30px;
  border-radius: 40px;
  font-size: 1.8rem;
  line-height: 200%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
`;

export const PlaceInfo = styled.div`
  margin: 5px 0px 15px 0px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.font.main};
`;

export const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;
  margin-bottom: 70px;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
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

export const ButtonContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 70%;
  }
`;

export const StyledButton = styled(Button)`
  width: 20rem;
  height: 7rem;
  font-size: 2rem;
  background-color: ${({ theme }) => theme.color.blue.light};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${({ theme }) => theme.color.blue.dark};
  }
`;
