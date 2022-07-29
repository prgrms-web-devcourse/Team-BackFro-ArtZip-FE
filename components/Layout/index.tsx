import { ReactElement } from 'react';
import Header from './Header';
import Footer from './Footer';
import PageWrapper from './PageWrapper';

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
