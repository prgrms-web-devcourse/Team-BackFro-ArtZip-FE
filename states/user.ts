import { userAPI } from 'apis';
import { atom, selector } from 'recoil';
import cookie from 'react-cookies';
import { SIGNOUT_USER_STATE } from '../constants';

const cookieEffect =
  (accessTokenKey: string, refreshTokenKey: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ setSelf, onSet }: any) => {
    const accessToken = cookie.load(accessTokenKey);
    const refreshToken = cookie.load(refreshTokenKey);

    if (!accessToken || !refreshToken) {
      cookie.remove('ACCESS_TOKEN');
      cookie.remove('REFRESH_TOKEN');
      setSelf(SIGNOUT_USER_STATE);
    }

    onSet(async () => {
      try {
        if (!cookie.load(accessTokenKey) || !cookie.load(refreshTokenKey)) {
          cookie.remove('ACCESS_TOKEN');
          cookie.remove('REFRESH_TOKEN');
          return SIGNOUT_USER_STATE;
        }

        const { data } = await userAPI.getMyInfo();
        const { userId, email, nickname, profileImage } = data.data;
        return { userId, email, nickname, profileImage };
      } catch (error: unknown) {
        cookie.remove('ACCESS_TOKEN');
        cookie.remove('REFRESH_TOKEN');
        console.error(error);

        return SIGNOUT_USER_STATE;
      }
    });
  };

const userAtom = atom({
  key: 'user',
  effects: [cookieEffect('ACCESS_TOKEN', 'REFRESH_TOKEN')],
  default: selector({
    key: 'user/get',
    get: async () => {
      if (!cookie.load('ACCESS_TOKEN') || !cookie.load('REFRESH_TOKEN')) {
        cookie.remove('ACCESS_TOKEN');
        cookie.remove('REFRESH_TOKEN');
        return SIGNOUT_USER_STATE;
      }

      try {
        const { data } = await userAPI.getMyInfo();
        const { userId, email, nickname, profileImage } = data.data;
        return { userId, email, nickname, profileImage };
      } catch (error: unknown) {
        cookie.remove('ACCESS_TOKEN');
        cookie.remove('REFRESH_TOKEN');
        return SIGNOUT_USER_STATE;
      }
    },
  }),
});

export default userAtom;
