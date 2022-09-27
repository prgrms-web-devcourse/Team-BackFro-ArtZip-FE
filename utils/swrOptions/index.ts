import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const swrOptions = {
  fetcher: async (url: string, params: object = {}) => {
    const isLoggedIn = cookies.get('REFRESH_TOKEN');
    const accessToken = cookies.get('ACCESS_TOKEN');

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
