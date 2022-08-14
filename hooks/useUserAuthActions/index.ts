import { userAPI } from 'apis';
import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'states';
import { UserLocalLoginRequest } from 'types/apis/user';
import { setToken } from 'utils';
import cookie from 'react-cookies';
import { message } from 'antd';
import { SIGNOUT_USER_STATE } from '../../constants';

function useUserAuthActions() {
  const setUser = useSetRecoilState(userAtom);
  const localLogin = async (values: UserLocalLoginRequest) => {
    try {
      const res = await userAPI.localLogin(values);
      const { accessToken, refreshToken } = res.data.data;
      setToken('ACCESS_TOKEN', accessToken);
      setToken('REFRESH_TOKEN', refreshToken);
      const { data } = await userAPI.getMyInfo();
      const { userId, email, nickname, profileImage } = data.data;
      setUser({ userId, email, nickname, profileImage });
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
    try {
      await userAPI.logout();
      setUser(SIGNOUT_USER_STATE);
      cookie.remove('REFRESH_TOKEN');
      cookie.remove('ACCESS_TOKEN');
      message.success('로그아웃 되었습니다.');
      router.push('/');
    } catch (e) {
      message.error('로그아웃 실패'); // TODO: 에러 처리 보강
      throw e;
    }
  };

  return {
    localLogin,
    logout,
  };
}
export default useUserAuthActions;
