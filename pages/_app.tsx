import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { MutableSnapshot, RecoilRoot } from 'recoil';
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
import { userAtom } from 'states';
import { SIGNOUT_USER_STATE } from '../constants';
import { Cookies } from 'react-cookie';
import { authorizeFetch } from 'utils';
declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArtZip({ Component, pageProps, userData }: AppProps | any) {
  const { pathname } = useRouter();

  // TODO: 테스트용 콘솔 지우기
  console.log('userData', userData);

  const initialState = ({ set }: MutableSnapshot) => {
    const { userId, email, nickname, profileImage } = userData;
    const isLoggedIn = userId !== null;
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

  const clientCookies = new Cookies();

  const cleanAllUserData = () => {
    userState = SIGNOUT_USER_STATE;
    clientCookies.remove('REFRESH_TOKEN');
    clientCookies.remove('ACCESS_TOKEN');
  };

  if (refreshToken && accessToken) {
    const { isAuth, data } = await authorizeFetch({
      accessToken,
      refreshToken,
      apiURL: `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/users/me/info`,
    });

    userState = isAuth ? { ...data, isLoggedIn: true } : SIGNOUT_USER_STATE;

    if (!isAuth) {
      cleanAllUserData();
    }
  }
  return { ...appProps, userData: userState };
};

export default ArtZip;
