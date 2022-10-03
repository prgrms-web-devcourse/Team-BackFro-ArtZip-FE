import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="미술 전시회를 조회하고 후기를 공유할 수 있는 서비스입니다."
        />
        <meta name="keywords" content="전시, 전시회, 미술, 아트집" />
        <meta
          name="author"
          content="권기홍, 김다은, 마혜경, 조윤정, 정현서, 홍유석, 박상혁, 김승은"
        />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="아트집(Art.zip)" />
        <meta
          property="og:description"
          content="미술 전시회를 조회하고 후기를 공유할 수 있는 서비스입니다."
        />
        <meta property="og:image" content="/logo3.png" />
        <meta property="og:url" content="https://artzip.shop" />
        <meta property="og:site_name" content="Art.zip" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="아트집(Art.zip)" />
        <meta
          name="twitter:description"
          content="미술 전시회를 조회하고 후기를 공유할 수 있는 서비스입니다."
        />
        <meta name="twitter:image" content="/logo3.png" />
        <meta name="twitter:url" content="https://artzip.shop" />
        <meta name="twitter:creator" content="Gihong Kwon" />

        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
