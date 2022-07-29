import Head from 'next/head';
import { useRouter } from 'next/router';

const ExhibitionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>ArtZip | ExhibitionDetail</title>
      </Head>
      <div>ExhibitionDetail : {id}</div>
    </>
  );
};

export default ExhibitionDetailPage;
