import cookie from 'react-cookies';
import { authRequest, unAuthRequest } from 'apis/common';

export const swrOptions = {
  fetcher: async (url: string, params: object = {}) => {
    const isLoggedIn = cookie.load('REFRESH_TOKEN');
    const request = isLoggedIn ? authRequest : unAuthRequest;
    const { data } = await request.get(url, {
      params,
    });
    return data.data;
  },
};
