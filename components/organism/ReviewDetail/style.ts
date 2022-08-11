import styled from '@emotion/styled';

export const ReviewDetailContainer = styled.main`
  margin: 20px 0;
`;

export const ReviewDetailHeader = styled.div`
  margin-bottom: 20px;
`;

export const ReviewDetailEdited = styled.span`
  color: ${({ theme }) => theme.color.font.light};
  font-size: 1.5rem;
`;

export const ReviewDetailPublic = styled.span`
  color: ${({ theme }) => theme.color.font.light};
  border: 1px solid ${({ theme }) => theme.color.font.light};
  padding: 2px 6px;
  border-radius: 20px;
  font-size: 1.5rem;
`;

export const ReviewDetailSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const ReviewDetailTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ReviewDetailContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const ReviewDetailContentText = styled.p`
  font-size: 2rem;
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
