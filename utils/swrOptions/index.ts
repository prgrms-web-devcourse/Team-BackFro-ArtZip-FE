import { getRefreshToken } from 'utils';
import { authRequest, unAuthRequest } from 'apis/common';

export const swrOptions = {
  fetcher: async (url: string, params: object = {}) => {
    const isLoggedIn = getRefreshToken();
    const request = isLoggedIn ? authRequest : unAuthRequest;
    const { data } = await request.get(url, {
      params,
    });
    return data.data;
  },
};
