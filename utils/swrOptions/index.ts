import { Cookies } from 'react-cookie';
import { authRequest, unAuthRequest } from 'apis/common';

const cookies = new Cookies();

export const swrOptions = {
  fetcher: async (url: string, params: object = {}) => {
    const isLoggedIn = cookies.get('REFRESH_TOKEN');
    const request = isLoggedIn ? authRequest : unAuthRequest;
    const { data } = await request.get(url, {
      params,
    });
    return data.data;
  },
};
