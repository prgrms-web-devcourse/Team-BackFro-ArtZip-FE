import styled from '@emotion/styled';

export const SearchToolbar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 300px;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ececec;
  width: 50px;
  border-radius: 50%;
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
  }
  .content-box-sub {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    white-space: nowrap;
    cursor: pointer;
  }
`;
