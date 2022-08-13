import styled from '@emotion/styled';

export const Map = styled.div<{
  width: number;
  height: number;
}>`
  #map {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    box-shadow: '0px 3px 22px rgba(112, 0, 0, 0.08)';
    border-radius: '10px';
    @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
      width: 700px;
      height: 400px;
    }
    @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      width: 400px;
      height: 250px;
    }
    .map-info-text {
      display: flex;
      flex-direction: column;
      width: 300px;
      padding: 5px;

      .more-info {
        color: ${({ theme }) => theme.color.blue.main};
        text-decoration: none;
      }
    }
  }
`;
