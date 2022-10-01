import { userAPI } from 'apis';
import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import { parseJwt } from 'utils/parseJwt';

function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  // 개발 환경에 따라서 설정

  // const HTTP_ONLY = !(process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOP');
  const expires = new Date();
  const cookies = new Cookies();

  expires.setDate(expires.getDate() + 14);

  cookies.set(key, token, {
    path: '/',
    expires: key === 'REFRESH_TOKEN' ? expires : undefined,
    // httpOnly: HTTP_ONLY,
  });
}

async function authorizeFetch({
  accessToken,
  refreshToken,
  apiURL,
}: {
  accessToken: string;
  refreshToken: string;
  apiURL: string;
}) {
  const headers = {
    ...(accessToken ? { accessToken: accessToken } : {}),
  };

  try {
    const { data } = await axios.get(apiURL, {
      headers,
    });
    return { isAuth: true, data: data.data };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response && e.response.status === 401) {
        const { userId } = parseJwt(accessToken as string);

        try {
          const { data: newTokenData } = await userAPI.reissueToken({
            userId: parseInt(userId),
            accessToken,
            refreshToken,
          });

          const newAccessToken = newTokenData.data.accessToken;
          setToken('ACCESS_TOKEN', newAccessToken);

          const { data: newAuthData } = await axios.get(apiURL, {
            headers: {
              accessToken: newAccessToken,
            },
          });

          return { isAuth: true, data: newAuthData.data };
        } catch (e) {
          const { data } = await axios.get(apiURL);
          return { isAuth: false, data: data.data };
        }
      }
    }
    const { data } = await axios.get(apiURL);
    return { isAuth: false, data: data.data };
  }
}
export { setToken, authorizeFetch };
