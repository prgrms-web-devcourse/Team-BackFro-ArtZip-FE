import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Header, Footer } from '../../organism';

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </>
  );
};

const PageWrapper = styled.div`
  width: 80%;
  max-width: 1400px;
  padding-top: 200px;
  padding-bottom: 230px;
  margin: 0 auto;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    padding-bottom: 220px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 90%;
    padding-bottom: 200px;
  }
`;

export default Layout;
