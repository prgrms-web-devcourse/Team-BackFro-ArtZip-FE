import styled from '@emotion/styled';

export const ReviewDetailContainer = styled.main`
  margin: 20px 10px;
`;

export const ReviewDetailHeader = styled.div`
  margin-bottom: 20px;
`;

export const ReviewStateContainer = styled.div`
  display: flex;
`;

export const ReviewDetailEdited = styled.span`
  position: relative;
  color: ${({ theme }) => theme.color.font.light};
  font-size: 1.5rem;
  bottom: -23px;
  margin-right: 14px;
`;

export const ReviewDetailPublic = styled.span`
  position: relative;
  height: fit-content;
  bottom: -23px;
  border: 1px solid ${({ theme }) => theme.color.blue.dark};
  padding: 1px 6px;
  border-radius: 20px;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.blue.dark};
`;

export const ReviewDetailSection = styled.section`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.color.border.light};
  padding-top: 40px;
`;

export const ReviewDetailTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ReviewDetailContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const ReviewDetailContentText = styled.p`
  font-size: 2rem;
  margin-bottom: 40px;
  white-space: pre-wrap;
`;

export const ReviewExhibitionInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReviewDetailContentUtils = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewDetailBottom = styled.div`
  margin-top: 50px;
`;

export const ReviewInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
