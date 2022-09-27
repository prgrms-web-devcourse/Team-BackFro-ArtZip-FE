import { unAuthRequest, authRequest } from 'apis/common';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

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
    const refreshToken = cookies.get('REFRESH_TOKEN');

    return refreshToken
      ? authRequest.get(`/api/v1/exhibitions/${exhibitionId}`)
      : unAuthRequest.get(`/api/v1/exhibitions/${exhibitionId}`);
  },
  search: (query: string, page: number, size: number, includeEnd: boolean) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions?query=${query}&page=${page}&size=${size}&include-end=${includeEnd}`,
    );
  },
  custom: (area?: string, month?: string, genre?: string, page?: number, size?: number) => {
    return unAuthRequest.get(
      `/api/v1/exhibitions/custom?areas=${area}&months=${month}&genres=${genre}&page=${page}&size=${size}`,
    );
  },
  likeToggle: (exhibitionId: number) => {
    return authRequest.patch(`/api/v1/exhibitions/${exhibitionId}/likes`);
  },
};

export default exhibitionAPI;
