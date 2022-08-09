import { unAuthRequest } from 'apis/common';
import { UserLocalLoginRequest, UserSignupRequest } from 'types/apis/user';

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
};

export default userAPI;
