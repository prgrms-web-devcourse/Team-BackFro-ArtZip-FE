import { userAPI } from 'apis';
import { atom, selector } from 'recoil';
import cookie from 'react-cookies';

const userAtom = atom({
  key: 'user',
  default: selector({
    key: 'user/get',
    get: async () => {
      if (!cookie.load('ACCESS_TOKEN') || !cookie.load('REFRESH_TOKEN')) {
        cookie.remove('ACCESS_TOKEN');
        cookie.remove('REFRESH_TOKEN');
        return { userId: null };
      }

      try {
        const { data } = await userAPI.getMyInfo();
        const userId = data.data.userId;
        return { userId };
      } catch (error: unknown) {
        cookie.remove('ACCESS_TOKEN');
        console.error(error);
        return { userId: null };
      }
    },
  }),
});

export default userAtom;
