import { getRefreshToken } from 'utils';
import { authRequest, unAuthRequest } from 'apis/common';
import { CommentCreateRequest, CommentUpdateRequest } from 'types/apis/comment';

const commentAPI = {
  create: (reviewId: number, payload: CommentCreateRequest) => {
    return authRequest.post(`/api/v1/reviews/${reviewId}/comments`, payload);
  },
  update: (commentId: number, payload: CommentUpdateRequest) => {
    return authRequest.patch(`/api/v1/comments/${commentId}`, payload);
  },
  delete: (commentId: number) => {
    return authRequest.delete(`/api/v1/comments/${commentId}`);
  },
  getReplies: ({ commentId, page, size }: { commentId: number; page?: number; size?: number }) => {
    const refreshToken = getRefreshToken();
    const params = {
      ...(page ? { page: page } : {}),
      ...(size ? { size: size } : {}),
    };

    return refreshToken
      ? authRequest.get(`/api/v1/comments/${commentId}/children`, {
          params,
        })
      : unAuthRequest.get(`/api/v1/comments/${commentId}/children`, {
          params,
        });
  },
  likeToggle: (commentId: number) => {
    return authRequest.patch(`/api/v1/comments/${commentId}/like`);
  },
};

export default commentAPI;
