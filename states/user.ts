import { atom } from 'recoil';
import { Cookies } from 'react-cookie';
import { SIGNOUT_USER_STATE } from '../constants';
import { authorizeFetch, removeTokenAll } from 'utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const cookies = new Cookies();

const cookieEffect =
  (accessTokenKey: string, refreshTokenKey: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ setSelf, onSet }: any) => {
    onSet(async () => {
      try {
        if (!cookies.get(accessTokenKey) || !cookies.get(refreshTokenKey)) {
          removeTokenAll();
          return SIGNOUT_USER_STATE;
        }

        const accessToken = cookies.get(accessTokenKey);
        const refreshToken = cookies.get(refreshTokenKey);

        const { data } = await authorizeFetch({
          accessToken,
          refreshToken,
          apiURL: `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/users/me/info`,
        });

        const { userId, email, nickname, profileImage } = data;
        return { userId, email, nickname, profileImage, isLoggedIn: true };
      } catch (error: unknown) {
        removeTokenAll();
        console.error(error);

        return SIGNOUT_USER_STATE;
      }
    });
  };

const userAtom = atom({
  key: `user/${new Date().getUTCMilliseconds() * Math.random()}`,
  effects: [cookieEffect(ACCESS_TOKEN, REFRESH_TOKEN)],
  default: SIGNOUT_USER_STATE,
});

export default userAtom;
