import styled from '@emotion/styled';

export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .pagination {
    margin-top: 20px;
  }
`;

export const SearchResultContents = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
