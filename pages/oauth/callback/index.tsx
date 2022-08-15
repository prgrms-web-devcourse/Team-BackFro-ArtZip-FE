import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setToken, storage } from 'utils';

const Callback = () => {
  const router = useRouter();
  const { query } = router;

  const { accessToken, refreshToken } = query;

  useEffect(() => {
    if (accessToken && refreshToken) {
      setToken('REFRESH_TOKEN', refreshToken.toString());
      setToken('ACCESS_TOKEN', accessToken.toString());

      storage.setItem('ACCESS_TOKEN', accessToken.toString);
    }
  }, []);

  return <></>;
};

export default Callback;
