import styled from '@emotion/styled';
import theme from 'styles/theme';

export const SearchToolbar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 30px;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.font.light};
  width: 50px;
  border-radius: 50%;
  flex-shrink: 0;
`;
export const Icon = styled.span`
  font-size: 30px;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  .content-box-title {
    font-weight: 700;
    white-space: no-wrap;
    font-size: 1.9rem;
  }
  .content-box-sub {
    margin-top: 1rem;
    font-size: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    white-space: nowrap;
    cursor: pointer;
  }
`;
