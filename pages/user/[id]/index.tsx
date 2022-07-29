import Head from 'next/head';
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>ArtZip | User</title>
      </Head>
      <div>User: {id}</div>
    </>
  );
};

export default UserPage;
