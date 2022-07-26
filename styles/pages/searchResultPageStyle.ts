import styled from '@emotion/styled';

export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .pagination {
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const SearchResultContents = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
