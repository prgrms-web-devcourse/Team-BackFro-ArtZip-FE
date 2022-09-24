import { userAPI } from 'apis';
import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'states';
import { UserLocalLoginRequest } from 'types/apis/user';
import { setToken, getErrorMessage } from 'utils';
import cookie from 'react-cookies';
import { message } from 'antd';
import { SIGNOUT_USER_STATE } from '../../constants';
import { useState } from 'react';

function useUserAuthActions() {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  const localLogin = async (values: UserLocalLoginRequest) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await userAPI.localLogin(values);
        const { accessToken, refreshToken } = res.data.data;
        setToken('ACCESS_TOKEN', accessToken);
        setToken('REFRESH_TOKEN', refreshToken);
        const { data } = await userAPI.getMyInfo();
        const { userId, email, nickname, profileImage } = data.data;
        setUser({ userId, email, nickname, profileImage, isLoggedIn: true });
        message.success(res.data.message);
        router.push('/');
      } catch (e) {
        message.error(getErrorMessage(e));
        console.error(e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  const logout = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        await userAPI.logout();
        setUser(SIGNOUT_USER_STATE);
        cookie.remove('REFRESH_TOKEN');
        cookie.remove('ACCESS_TOKEN');
        message.success('로그아웃 되었습니다.');
        router.push('/');
      } catch (e) {
        message.error(getErrorMessage(e));
        console.error(e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  return {
    localLogin,
    logout,
  };
}
export default useUserAuthActions;
