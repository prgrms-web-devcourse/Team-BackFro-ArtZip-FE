import Head from 'next/head';
import { useRouter } from 'next/router';

const CommunityExhibitionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>ArtZip | COMMUNITY</title>
      </Head>
      <div>COMMUNITY {id}</div>
    </>
  );
};

export default CommunityExhibitionPage;
