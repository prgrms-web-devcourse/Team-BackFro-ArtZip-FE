import axios from 'axios';
import cookie from 'react-cookies';

export const swrOptions = {
  fetcher: async (url: string, params: object = {}) => {
    const isLoggedIn = cookie.load('REFRESH_TOKEN');
    const accessToken = cookie.load('ACCESS_TOKEN');

    if (isLoggedIn) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}${url}`, {
        headers: {
          accessToken,
        },
        params,
      });
      return data.data;
    } else {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}${url}`, {
        params,
      });
      return data.data;
    }
  },
};
