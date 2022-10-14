import { message } from 'antd';
import { userAPI } from 'apis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'states';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants';
import { setToken } from 'utils';

const Callback = () => {
  const setUser = useSetRecoilState(userAtom);

  const router = useRouter();
  const { query } = router;

  const { accessToken, refreshToken } = query;

  useEffect(() => {
    const loginSocial = async () => {
      if (accessToken && refreshToken) {
        setToken(ACCESS_TOKEN, refreshToken.toString());
        setToken(REFRESH_TOKEN, accessToken.toString());
        const { data } = await userAPI.getMyInfo();
        const { userId, email, nickname, profileImage } = data.data;
        setUser({ userId, email, nickname, profileImage, isLoggedIn: true });
        message.success('소셜 로그인 성공');
      }
    };
    loginSocial();
    router.push('/');
  }, []);

  return <></>;
};

export default Callback;
