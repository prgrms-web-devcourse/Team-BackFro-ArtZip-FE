import { userAPI } from 'apis';
import { atom, selector } from 'recoil';
import { Cookies } from 'react-cookie';
import { SIGNOUT_USER_STATE } from '../constants';
import { authorizeFetch } from 'utils';

const cookies = new Cookies();

const cookieEffect =
  (accessTokenKey: string, refreshTokenKey: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ setSelf, onSet }: any) => {
    onSet(async () => {
      console.log('onSet');

      try {
        if (!cookies.get(accessTokenKey) || !cookies.get(refreshTokenKey)) {
          cookies.remove('ACCESS_TOKEN', { path: '/' });
          cookies.remove('REFRESH_TOKEN', { path: '/' });
          return SIGNOUT_USER_STATE;
        }

        const accessToken = cookies.get(accessTokenKey);
        const refreshToken = cookies.get(refreshTokenKey);

        const { isAuth, data } = await authorizeFetch({
          accessToken,
          refreshToken,
          apiURL: `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/users/me/info`,
        });

        const { userId, email, nickname, profileImage } = data;
        return { userId, email, nickname, profileImage, isLoggedIn: true };
      } catch (error: unknown) {
        cookies.remove('REFRESH_TOKEN', { path: '/' });
        cookies.remove('ACCESS_TOKEN', { path: '/' });
        console.error(error);

        return SIGNOUT_USER_STATE;
      }
    });
  };

const userAtom = atom({
  key: `user/${new Date().getUTCMilliseconds() * Math.random()}`,
  effects: [cookieEffect('ACCESS_TOKEN', 'REFRESH_TOKEN')],
  default: SIGNOUT_USER_STATE,
});

export default userAtom;
