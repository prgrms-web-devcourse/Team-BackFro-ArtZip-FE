import '../styles/global/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Layout } from 'components/template';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/global/theme';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import cookies from 'next-cookies';
import { setToken } from 'utils';
import { authRequest } from 'apis/common';
import cookie from 'react-cookies';
import App from 'next/app';
import { userAPI } from 'apis';
declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

function ArtZip({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

ArtZip.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies['ACCESS_TOKEN'];

  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = allCookies['REFRESH_TOKEN'] || '';
    authRequest.interceptors.request.use(async (config) => {
      if (config.headers) {
        config.headers.accessToken = cookie.load('ACCESS_TOKEN');
        return config;
      }
    });
  }

  return { ...appProps };
};

export default ArtZip;
