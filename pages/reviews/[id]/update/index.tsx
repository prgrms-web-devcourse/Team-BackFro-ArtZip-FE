import Head from 'next/head';
import { useRouter } from 'next/router';

const ReviewEditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>ArtZip | ReviewEditPage</title>
      </Head>
      <div>ReviewEditPage : {id}</div>
    </>
  );
};

export default ReviewEditPage;
