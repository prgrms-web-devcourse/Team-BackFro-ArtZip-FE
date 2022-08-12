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
    return authRequest.patch('/api/v1/users/logout');
  },
  nicknameCheck: (nickname: string) => {
    return unAuthRequest.get(`/api/v1/users/check?nickname=${nickname}`);
  },
  reissueToken: (payload: UserReissueTokenRequest) => {
    return unAuthRequest.post(`api/v1/users/token/reissue`, payload);
  },
  getMyInfo: () => {
    return authRequest.get(`api/v1/users/me/info`);
  },
  getUserInfo: (userId: number) => {
    return unAuthRequest.get(`/api/v1/users/${userId}/info`);
  },
  getMyReview: (userId: number, page: number, size: number) => {
    return unAuthRequest.get(`/api/v1/users/${userId}/info/my/reviews?page=${page}&size=${size}`);
  },
  getLikeReview: (userId: number, page: number, size: number) => {
    return unAuthRequest.get(`/api/v1/users/${userId}/info/reviews/like?page=${page}&size=${size}`);
  },
  getLikeExhibition: (userId: number, page: number, size: number) => {
    return unAuthRequest.get(
      `/api/v1/users/${userId}/info/exhibitions/like?page=${page}&size=${size}`,
    );
  },
};

export default userAPI;
