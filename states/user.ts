import { userAPI } from 'apis';
import { atom, selector } from 'recoil';
import cookie from 'react-cookies';

const userAtom = atom({
  key: 'user',
  default: selector({
    key: 'user/get',
    get: async () => {
      if (!cookie.load('ACCESS_TOKEN')) {
        return null;
      }
      try {
        const { data } = await userAPI.getMyInfo();
        const userId = data.data.userId;
        return { userId };
      } catch (error: unknown) {
        console.error(error);
        return null;
      }
    },
  }),
});

export default userAtom;
