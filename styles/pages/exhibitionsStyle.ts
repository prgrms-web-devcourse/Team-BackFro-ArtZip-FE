import styled from '@emotion/styled';
import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

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

export const DescriptionWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.border.white};
  width: 80%;
  margin: 0px 40px;
  padding: 30px;
  border-radius: 40px;
  font-size: 1.8rem;
  line-height: 200%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
`;

export const PlaceInfo = styled.div`
  margin: 5px 0px 30px 0px;
  width: 80%;
  display: flex;
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

export const ButtonContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    max-width: 320px;
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

export const MapWrapper = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 700px;
    height: 250px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 400px;
    height: 200px;
  }
`;

export const StyledCopyButton = styled.button`
  margin-left: 10px;
  position: relative;
  top: 1px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

export const Clipboard = styled(CopyOutlined)`
  font-size: 1.9rem;
`;
