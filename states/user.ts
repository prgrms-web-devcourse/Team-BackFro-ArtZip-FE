import { userAPI } from 'apis';
import { atom, selector } from 'recoil';
import cookie from 'react-cookies';

const cookieEffect =
  (accessTokenKey: string, refreshTokenKey: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ setSelf, onSet }: any) => {
    const accessToken = cookie.load(accessTokenKey);
    const refreshToken = cookie.load(refreshTokenKey);

    if (!accessToken || !refreshToken) {
      cookie.remove('ACCESS_TOKEN');
      cookie.remove('REFRESH_TOKEN');
      setSelf({ userId: null });
    }

    onSet(async () => {
      try {
        const { data } = await userAPI.getMyInfo();
        const userId = data.data.userId;
        return { userId };
      } catch (error: unknown) {
        cookie.remove('ACCESS_TOKEN');
        cookie.remove('REFRESH_TOKEN');
        console.error(error);
        return { userId: null };
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
        console.log('암것도 없음');
        cookie.remove('ACCESS_TOKEN');
        cookie.remove('REFRESH_TOKEN');
        return { userId: null };
      }

      try {
        const { data } = await userAPI.getMyInfo();
        const userId = data.data.userId;
        return { userId };
      } catch (error: unknown) {
        cookie.remove('REFRESH_TOKEN');
        cookie.remove('ACCESS_TOKEN');
        return { userId: null };
      }
    },
  }),
});

export default userAtom;