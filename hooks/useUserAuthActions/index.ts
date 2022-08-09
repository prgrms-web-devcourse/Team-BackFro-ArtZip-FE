import { userAPI } from 'apis';
import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { authAtom, userAtom } from 'states';
import { UserLocalLoginRequest } from 'types/apis/user';
import { cookie, storage } from 'utils';

function useUserAuthActions() {
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const localLogin = async (values: UserLocalLoginRequest) => {
    try {
      const res = await userAPI.localLogin(values);
      const { userId, accessToken, refreshToken } = res.data.data;
      console.log(accessToken, refreshToken);
      storage.setItem<string>('ACCESS_TOKEN', accessToken);
      cookie.setItem<string>('REFRESH_TOKEN', refreshToken);
      // 전역상태에 access 토큰 저장
      setAuth(accessToken);
      // { userId: userId }
      setUser(userId);
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
    setAuth(null);
    setUser(null);
  };

  return {
    localLogin,
    logout,
  };
}

export default useUserAuthActions;
