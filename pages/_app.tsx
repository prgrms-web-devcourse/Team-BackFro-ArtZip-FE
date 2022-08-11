import '../styles/global/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Layout } from 'components/template';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/global/theme';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'ENABLED') {
//   import('../mocks');
// }

declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

function App({ Component, pageProps }: AppProps) {
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

export default App;
