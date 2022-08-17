import styled from '@emotion/styled';

export const SearchToolbar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 30px;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
`;
export const Icon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.color.blue.main};
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  .content-box-title {
    font-weight: 700;
    white-space: no-wrap;
    font-size: 1.8rem;
  }
  .content-box-sub {
    margin-top: 1rem;
    font-size: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    white-space: nowrap;
    cursor: pointer;
  }

  .content-box-input {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }
`;
