import { unAuthRequest, authRequest } from 'apis/common';
import { UserLocalLoginRequest, UserReissueTokenRequest, UserSignupRequest } from 'types/apis/user';

const userAPI = {
  localLogin: (payload: UserLocalLoginRequest) => {
    return unAuthRequest.post('/api/v1/users/local/login', payload);
  },
  oauthLogin: (code: string) => {
    return unAuthRequest.post(`api/v1/users/oauth/login?code=${code}`);
  },
  signUp: (payload: UserSignupRequest) => {
    return unAuthRequest.post('api/v1/users/signup', payload);
  },
  logout: () => {
    return unAuthRequest.patch('/api/v1/users/logout');
  },
  nicknameCheck: (nickname: string) => {
    return unAuthRequest.get(`/api/v1/users/check?nickname=${nickname}`);
  },
  getUserInfo: (userId: number) => {
    return unAuthRequest.get(`api/v1/users/${userId}/info`);
  },
  reissueToken: (payload: UserReissueTokenRequest) => {
    return authRequest.post(`api/v1/users/token/reissue`, payload);
  },
  getMyInfo: () => {
    return authRequest.get(`api/v1/users/me/info`);
  },
};

export default userAPI;
