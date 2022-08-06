import { authRequest } from 'apis/common';
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
};

export default commentAPI;
