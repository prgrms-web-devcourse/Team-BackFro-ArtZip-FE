import { authRequest, unAuthRequest } from 'apis/common';
import cookie from 'react-cookies';

const reviewAPI = {
  likeToggle: (reviewId: number) => {
    return authRequest.patch(`/api/v1/reviews/${reviewId}/like`);
  },
  getComments: ({ reviewId, page, size }: { reviewId: number; page?: number; size?: number }) => {
    const refreshToken = cookie.load('REFRESH_TOKEN');
    const params = {
      ...(page ? { page: page } : {}),
      ...(size ? { size: size } : {}),
    };

    return refreshToken
      ? authRequest.get(`/api/v1/reviews/${reviewId}/comments`, {
          params,
        })
      : unAuthRequest.get(`/api/v1/reviews/${reviewId}/comments`, {
          params,
        });
  },
  searchExhibition: (query: string) => {
    return unAuthRequest.get(`/api/v1/reviews/search/exhibitions?query=${query}`);
  },
  getReviewMulti: ({
    exhibitionId,
    page,
    size,
    sort,
  }: {
    exhibitionId?: number;
    page?: number;
    size?: number;
    sort?: string;
  }) => {
    const refreshToken = cookie.load('REFRESH_TOKEN');

    const params = {
      ...(exhibitionId ? { exhibitionId: exhibitionId } : {}),
      ...(page ? { page: page } : {}),
      ...(size ? { size: size } : {}),
      ...(sort ? { sort: sort } : {}),
    };

    return refreshToken
      ? authRequest.get(`/api/v1/reviews`, {
          params,
        })
      : unAuthRequest.get(`/api/v1/reviews`, {
          params,
        });
  },
  getReviewSingle: (reviewId: number) => {
    const refreshToken = cookie.load('REFRESH_TOKEN');
    return refreshToken
      ? authRequest.get(`/api/v1/reviews/${reviewId}`)
      : unAuthRequest.get(`/api/v1/reviews/${reviewId}`);
  },
  createReview: (formData: FormData) => {
    return authRequest.post('/api/v1/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteReview: (reviewId: number) => {
    return authRequest.delete(`/api/v1/reviews/${reviewId}`);
  },
};

export default reviewAPI;
