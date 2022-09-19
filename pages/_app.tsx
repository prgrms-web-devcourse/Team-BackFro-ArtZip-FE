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

const swrOptions = {
  fetcher: async (url: string) => {
    const isLoggedIn = cookie.load('REFRESH_TOKEN');
    const accessToken = cookie.load('ACCESS_TOKEN');

    if (isLoggedIn) {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}${url}`, {
        headers: {
          accessToken,
        },
      });
      return res.data.data;
    } else {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}${url}`);
      return res.data.data;
    }
  },
};

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

ArtZip.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const allCookies = cookies(ctx);

  const accessTokenByCookie = allCookies['ACCESS_TOKEN'];
  const refreshTokenByCookie = allCookies['REFRESH_TOKEN'];

  // TODO: setToken의 로직 수정, 토큰 자체를 디코드하여 유효기간을 설정하기
  // 현재 배포에서는 쿠키 확인 불가
  if (refreshTokenByCookie) {
    accessTokenByCookie && setToken('ACCESS_TOKEN', accessTokenByCookie);
    refreshTokenByCookie && setToken('REFRESH_TOKEN', refreshTokenByCookie);
  }

  return { ...appProps };
};

export default ArtZip;
