import Head from 'next/head';
import { useRouter } from 'next/router';

const SearchResultPage = () => {
  const router = useRouter();
  const { exhibition } = router.query;

  return (
    <>
      <Head>
        <title>ArtZip | SearchResult</title>
      </Head>
      <div>SearchResult: {exhibition}</div>
    </>
  );
};

export default SearchResultPage;
