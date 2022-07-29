import { ReactElement } from 'react';
import { Header, Footer } from '../../organism';
import { PageWrapper } from '../../atom';

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

export default Layout;
