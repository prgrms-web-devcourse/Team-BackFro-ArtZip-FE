import { userAPI } from 'apis';
import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { cookie, storage } from 'utils';

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const currentRefreshToken = cookie.getItem('REFRESH_TOKEN', '');
  const { value, expire } = storage.getItem('ACCESS_TOKEN', '');

  const currentAccessToken = value;
  const expireAt = expire;

  // TODO: api 준비되면 구현이 살짝 바뀜

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userId = useRecoilValue(userAtom);

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
    config.headers['Authorization'] = `Bearer ${newAccessToken}`;
  }

  if (!config.headers) {
    config.headers = {};
  }

  // 토큰이 만료되지 않은 경우
  config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
  return config;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refreshErrorHandle = (err: unknown) => {
  cookie.removeItem('REFRESH_TOKEN');
};

export { refresh, refreshErrorHandle };
