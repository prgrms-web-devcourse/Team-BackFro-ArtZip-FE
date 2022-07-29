import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Header, Footer } from '../../organism';
import { breakPoint } from 'constants/styles/breakPoint';

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PageWrapper>
      <Header />
      {children}
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.section`
  width: 80%;
  max-width: 1400px;
  padding-top: 200px;
  padding-bottom: 200px;
  margin: 0 auto;

  @media (max-width: ${breakPoint.mobile}) {
    width: 90%;
  }
`;

export default Layout;
