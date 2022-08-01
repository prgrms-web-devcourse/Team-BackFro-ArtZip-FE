import styled from '@emotion/styled';

export const Footer = styled.footer`
  width: 100%;
  height: 230px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.color.blue.light};
  padding: 0px 30px 0px 30px;
  @media screen and (min-width: 768px) and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    height: 220px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    height: 200px;
  }
`;

export const Wrapper = styled.div`
  max-width: 900px;
  min-width: 400px;
  padding-top: 30px;
  margin: auto;
  @media screen and (min-width: 768px) and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    max-width: 800px;
    padding-top: 25px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    max-width: 600px;
    padding-top: 25px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.color.border.light};
  font-weight: 500;
  font-size: 2.8rem;
  margin-bottom: 10px;
`;

export const Description = styled.h4`
  color: ${({ theme }) => theme.color.border.light};
  font-weight: 300;
  font-size: 1.5rem;
  margin-bottom: 25px;
`;

export const DeveloperFE = styled.h5`
  color: ${({ theme }) => theme.color.border.light};
  font-weight: 100;
  font-size: 1.3rem;
  display: flex;
  justify-content: flex-end;
`;

export const DeveloperBE = styled.h5`
  color: ${({ theme }) => theme.color.border.light};
  font-weight: 100;
  font-size: 1.3rem;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const Copyright = styled.h5`
  color: ${({ theme }) => theme.color.border.light};
  font-weight: 300;
  display: flex;
  justify-content: center;
`;
