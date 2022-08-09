import { authRequest, unAuthRequest } from 'apis/common';

const reviewAPI = {
  likeToggle: (reviewId: number) => {
    return authRequest.patch(`/api/v1/reviews/${reviewId}/like`);
  },
  getComments: (reviewId: number, page: number, size: number) => {
    return unAuthRequest.get(`/api/v1/reviews/${reviewId}/comments?page=${page}&size=${size}`);
  },
  searchExhibition: (query: string) => {
    return unAuthRequest.get(`/api/v1/reviews/search/exhibitions?query=${query}`);
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
