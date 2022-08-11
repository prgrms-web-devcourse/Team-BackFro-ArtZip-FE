import { userAPI } from 'apis';
import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { cookie, storage } from 'utils';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const currentRefreshToken = cookie.getItem('REFRESH_TOKEN', '');
  const { value: currentAccessToken, expire: expireAt } = storage.getItem('ACCESS_TOKEN', '');

  const userId = parseJwt(currentAccessToken).userId;

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때 + 유저가 로그인 했을 때
  if (userId && moment(expireAt).diff(moment()) < 0 && currentRefreshToken) {
    const body = {
      userId,
      accessToken: currentAccessToken,
      refreshToken: currentRefreshToken,
    };

    // 토큰 갱신 서버통신
    const { data } = await userAPI.reissueToken(body);
    const newAccessToken = data.data.accessToken;
    storage.setItem('ACCESS_TOKEN', newAccessToken);

    if (!config.headers) {
      config.headers = {};
    }
    config.headers.accessToken = newAccessToken;
  }

  if (!config.headers) {
    config.headers = {};
  }

  // 토큰이 만료되지 않은 경우
  storage.setItem('userTest', userId);
  config.headers.accessToken = currentAccessToken;
  return config;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refreshErrorHandle = (err: unknown) => {
  cookie.removeItem('REFRESH_TOKEN');
};

export { refresh, refreshErrorHandle };
