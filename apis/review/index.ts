import { authRequest, unAuthRequest } from 'apis/common';

const reviewAPI = {
  likeToggle: (reviewId: number) => {
    return authRequest.patch(`/api/v1/reviews/${reviewId}/like`);
  },
  getComments: ({ reviewId, page, size }: { reviewId: number; page?: number; size?: number }) => {
    return unAuthRequest.get(`/api/v1/reviews/${reviewId}/comments`, {
      params: {
        ...(page ? { page: page } : {}),
        ...(size ? { size: size } : {}),
      },
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
    return unAuthRequest.get(`/api/v1/reviews`, {
      params: {
        ...(exhibitionId ? { exhibitionId: exhibitionId } : {}),
        ...(page ? { page: page } : {}),
        ...(size ? { size: size } : {}),
        ...(sort ? { sort: sort } : {}),
      },
    });
  },
  getReviewSingle: (reviewId: number) => {
    return unAuthRequest.get(`/api/v1/reviews/${reviewId}`);
  },
  createReview: (formData: FormData) => {
    return authRequest.post('/api/v1/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default reviewAPI;
