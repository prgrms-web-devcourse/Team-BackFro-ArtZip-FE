import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setToken, storage } from 'utils';
import cookie from 'utils/cookie';

const Callback = () => {
  const router = useRouter();
  const { query } = router;

  const { accessToken, refreshToken } = query;

  useEffect(() => {
    if (accessToken && refreshToken) {
      cookie.setItem('REFRESH_TOKEN', refreshToken.toString());
      cookie.setItem('ACCESS_TOKEN', accessToken.toString());

      storage.setItem('ACCESS_TOKEN', accessToken.toString());
    }

    // router.push('/');
  }, []);

  return <></>;
};

export default Callback;
