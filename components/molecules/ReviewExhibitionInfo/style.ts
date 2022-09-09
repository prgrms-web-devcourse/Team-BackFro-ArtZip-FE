import styled from '@emotion/styled';
import { Button, Card } from 'antd';

export const ExhibitionInfoCard = styled(Card)`
  width: 90%;
  height: fit-content;
  border: none;
  border-radius: 30px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  padding: 0px 5px;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: fit-content;
    padding: 10px 50px;
  }
`;

export const ExhibitionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

export const ExhibitionInfoImage = styled.div`
  position: relative;
  width: 150px;
  height: 180px;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: block;
    width: 30vw;
    height: 40vw;
  }
`;

export const ExhibitionDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ExhibitionTextContainer = styled.div`
  color: ${({ theme }) => theme.color.font.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-left: 80px;
`;

export const ExhibitionLinkTitle = styled.p`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: block;
    font-size: 24px;
  }
`;

export const ExhibitionLinkPlainText = styled.p`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    font-size: 18px;
  }
`;

export const ExhibitionLinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 60px;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    font-size: 18px;
    justify-content: center;
    padding: 0;
  }
`;

export const ExhibitionLinkButton = styled(Button)`
  margin-top: 30px;
  color: ${({ theme }) => theme.color.blue.dark};
  font-size: 2rem;
  font-weight: bold;
  width: fit-content;
  height: fit-content;
  border-color: ${({ theme }) => theme.color.blue.dark};
  border-radius: 10px;

  &:hover {
    border-color: ${({ theme }) => theme.color.blue.light};
    color: ${({ theme }) => theme.color.blue.light};
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: block;
    font-size: 2rem;
  }
`;
