import { userAPI } from 'apis';
import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'states';
import { UserLocalLoginRequest } from 'types/apis/user';
import { setToken } from 'utils';
import cookie from 'react-cookies';

function useUserAuthActions() {
  const setUser = useSetRecoilState(userAtom);
  const localLogin = async (values: UserLocalLoginRequest) => {
    try {
      const res = await userAPI.localLogin(values);
      const { userId, accessToken, refreshToken } = res.data.data;
      setToken('ACCESS_TOKEN', accessToken);
      setToken('REFRESH_TOKEN', refreshToken);
      setUser({ userId: userId });
      alert(res.data.message);
      router.push('/');
      // eslint-disable-next-line
    } catch (e: any) {
      e.message = 'SigninError';
      alert(e.response.data.message);
      throw e;
    }
  };
  // TODO: 소셜 로그인 로직 여기에 구현

  const logout = async () => {
    userAPI.logout();
    setUser({ userId: null });
    cookie.remove('REFRESH_TOKEN');
    cookie.remove('ACCESS_TOKEN', { path: '/' });
  };

  return {
    localLogin,
    logout,
  };
}
export default useUserAuthActions;
