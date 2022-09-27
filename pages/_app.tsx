import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Layout } from 'components/templates';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/global/theme';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import cookies from 'next-cookies';
import App from 'next/app';
import { setToken } from 'utils';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { swrOptions } from 'utils';

declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

function ArtZip({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <RecoilRoot>
      <SWRConfig value={swrOptions}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default ArtZip;
