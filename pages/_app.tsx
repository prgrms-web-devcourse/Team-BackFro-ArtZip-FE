import '../styles/index.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return <RecoilRoot>hello</RecoilRoot>;
}

export default MyApp;
