import { userAPI } from 'apis';
import axios from 'axios';
import { parseJwt, setToken, getRefreshToken, getAccessToken } from 'utils';
import { ACCESS_TOKEN } from '../constants';

const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authRequest = axios.create({
  baseURL,
});

const unAuthRequest = axios.create({
  baseURL,
});

authRequest.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.accessToken = getAccessToken();
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
    const LOGOUT_TOKEN = 'U017';

    if (
      error.response.status === 401 ||
      (error.response.status === 400 &&
        (error.response.data.code === UNAUTHORIZE_CODE ||
          error.response.data.code === LOGOUT_TOKEN))
    ) {
      originalRequest._retry = true;

      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      const { userId } = parseJwt(accessToken);

      const tokenRequestBody = {
        userId: parseInt(userId),
        accessToken,
        refreshToken,
      };

      const { data } = await userAPI.reissueToken(tokenRequestBody);
      const newAccessToken = data.data.accessToken;
      originalRequest.headers.accessToken = newAccessToken;
      setToken(ACCESS_TOKEN, newAccessToken);
      return authRequest(originalRequest);
    }
    return Promise.reject(error);
  },
);

export { authRequest, unAuthRequest };
