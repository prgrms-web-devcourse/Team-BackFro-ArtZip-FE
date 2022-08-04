import styled from '@emotion/styled';

export const ExhibitionCard = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 270px;
  height: 400px;
  margin-top: 20px;
  padding-bottom: 20px;
  &:hover {
    .card-image {
      opacity: 0.7;
    }
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
  .heart-icon {
    color: ${({ theme }) => theme.color.red};
  }
`;

export const Description = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
  div {
    display: flex;
    align-items: center;
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
