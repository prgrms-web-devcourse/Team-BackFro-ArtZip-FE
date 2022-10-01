import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { MutableSnapshot, RecoilRoot, useSetRecoilState } from 'recoil';
import { Layout } from 'components/templates';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/global/theme';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import cookies from 'next-cookies';
import App from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { swrOptions } from 'utils';
import axios from 'axios';
import { userAtom } from 'states';
import { SIGNOUT_USER_STATE } from '../constants';
declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArtZip({ Component, pageProps, userData }: AppProps | any) {
  const { pathname } = useRouter();

  const initialState = ({ set }: MutableSnapshot) => {
    const { userId, email, nickname, profileImage } = userData;
    const isLoggedIn = userId !== null;
    console.log(userId, email, nickname, profileImage, isLoggedIn);
    set(userAtom, { userId, email, nickname, profileImage, isLoggedIn });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <RecoilRoot initializeState={initialState}>
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

  const accessToken = allCookies['ACCESS_TOKEN'];
  const refreshToken = allCookies['REFRESH_TOKEN'];

  let userState = SIGNOUT_USER_STATE;

  if (refreshToken) {
    // 이 값을 통하여 내 정보를 조회하기
    const headers = {
      ...(accessToken ? { accessToken: accessToken } : {}),
    };
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/users/me/info`,
      {
        headers,
      },
    );

    userState = data.data;
  }

  // console.log('userState', userState);
  return { ...appProps, userData: userState };
};

export default ArtZip;
