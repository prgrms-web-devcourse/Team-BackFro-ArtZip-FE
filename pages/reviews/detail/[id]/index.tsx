import Head from 'next/head';
import { useRouter } from 'next/router';

const ReviewDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>ArtZip | ReviewDetailPage</title>
      </Head>
      <div>ReviewDetailPage : {id}</div>
    </>
  );
};

export default ReviewDetailPage;
