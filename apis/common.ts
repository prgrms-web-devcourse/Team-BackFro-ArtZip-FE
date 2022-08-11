import { userAPI } from 'apis';
import axios from 'axios';
import { parseJwt, setToken } from 'utils';
import cookie from 'react-cookies';
const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authRequest = axios.create({
  baseURL,
});

const unAuthRequest = axios.create({
  baseURL,
});

authRequest.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.accessToken = cookie.load('ACCESS_TOKEN');
    return config;
  }
});

authRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const UNAUTHORIZE_CODE = 'U005';
    if (
      error.response.status === 401 ||
      (error.response.status === 403 && error.response.data.code === UNAUTHORIZE_CODE)
    ) {
      originalRequest._retry = true;
      const accessToken = cookie.load('ACCESS_TOKEN');
      const refreshToken = cookie.load('REFRESH_TOKEN');

      const { userId } = parseJwt(accessToken);

      const tokenRequestBody = {
        userId: parseInt(userId),
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      const { data } = await userAPI.reissueToken(tokenRequestBody);
      const newAccessToken = data.data.accessToken;
      originalRequest.headers.accessToken = newAccessToken;
      setToken('ACCESS_TOKEN', newAccessToken);
      return authRequest(originalRequest);
    }
    return Promise.reject(error);
  },
);

export { authRequest, unAuthRequest };
