import { unAuthRequest, authRequest } from 'apis/common';
import cookie from 'react-cookies';

const exhibitionAPI = {
  getUpcoming: (page: number, size: number) => {
    return unAuthRequest.get(`/api/v1/exhibitions/upcoming?page=${page}&size=${size}`);
  },
  getMostLike: (page: number, size: number, includeEnd: boolean) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions/mostlike?page=${page}&size=${size}&include-end=${includeEnd}`,
    );
  },
  getDetail: (exhibitionId: number) => {
    const refreshToken = cookie.load('REFRESH_TOKEN');
    return refreshToken
      ? authRequest.get(`/api/v1/exhibitions/${exhibitionId}`)
      : unAuthRequest.get(`/api/v1/exhibitions/${exhibitionId}`);
  },
  search: (query: string, page: number, size: number, includeEnd: boolean) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions?query=${query}&page=${page}&size=${size}&include-end=${includeEnd}`,
    );
  },
  custom: (area?: string, month?: string, page?: number, size?: number) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions/custom?areas=${area}&months=${month}&page=${page}&size=${size}`,
    );
  },
  likeToggle: (exhibitionId: number) => {
    return authRequest.patch(`/api/v1/exhibitions/${exhibitionId}/likes`);
  },
};

export default exhibitionAPI;
