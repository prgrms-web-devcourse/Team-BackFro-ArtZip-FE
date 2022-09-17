import styled from '@emotion/styled';

export const ExhibitionCard = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 250px;
  height: 374px;
  margin-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
  position: relative;

  &:hover {
    filter: brightness(50%);
  }

  .card-image {
    max-height: 300px;
    min-height: 300px;
  }

  .ant-card-body {
    padding: 0px;
  }

  .ant-card-head {
    height: 0px;
  }

  .exhibition-card {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 200px;
    height: 320px;
  }
`;

export const HoverContent = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  gap: 10px;
  color: white;
  font-size: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  font-weight: 700;
  .heart-icon {
    color: ${({ theme }) => theme.color.red};
  }
`;

export const Description = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    h3 {
      color: ${({ theme }) => theme.color.font.dark};
    }
  }
`;

export const Title = styled.div``;
export const Dday = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.blue.main};
  color: white;
  font-size: 15px;
  border-radius: 15px;
  width: 50px;
  height: 30px;
`;
