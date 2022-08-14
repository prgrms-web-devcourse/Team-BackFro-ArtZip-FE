import { useRecoilValue } from 'recoil';
import { authRequest, unAuthRequest } from 'apis/common';
import cookie from 'react-cookies';
import { userAtom } from 'states';

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

    // TODO: 배포를 위한 임시 코드, 이슈 해결 후 삭제
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userState = useRecoilValue(userAtom);

    return refreshToken || userState.userId !== null
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

    // TODO: 배포를 위한 임시 코드, 이슈 해결 후 삭제
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userState = useRecoilValue(userAtom);

    return refreshToken || userState.userId !== null
      ? authRequest.get(`/api/v1/reviews`, {
          params,
        })
      : unAuthRequest.get(`/api/v1/reviews`, {
          params,
        });
  },
  getReviewSingle: (reviewId: number) => {
    const refreshToken = cookie.load('REFRESH_TOKEN');

    // TODO: 배포를 위한 임시 코드, 이슈 해결 후 삭제
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userState = useRecoilValue(userAtom);

    return refreshToken || userState.userId !== null
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
