import { authRequest, unAuthRequest } from 'apis/common';
import { CommentCreateRequest, CommentUpdateRequest } from 'types/apis/comment';

const commentAPI = {
  create: (reviewId: number, payload: CommentCreateRequest) => {
    return authRequest.post(`/api/v1/reviews/${reviewId}/comments`, payload);
  },
  update: (commentId: number, payload: CommentUpdateRequest) => {
    authRequest.patch(`/api/v1/comments/${commentId}`, payload);
  },
  delete: (commentId: number) => {
    authRequest.delete(`/api/v1/comments/${commentId}`);
  },

  getReplies: ({
    commentId,
    pages,
    size,
  }: {
    commentId: number;
    pages?: number;
    size?: number;
  }) => {
    return unAuthRequest.get(`/api/v1/comments/${commentId}/children`, {
      params: {
        ...(pages ? { pages: pages } : {}),
        ...(size ? { size: size } : {}),
      },
    });
  },
};

export default commentAPI;
