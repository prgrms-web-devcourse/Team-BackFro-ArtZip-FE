import { authRequest, unAuthRequest } from 'apis/common';
import { CommentCreateRequest, CommentUpdateRequest } from 'types/apis/comment';
import cookie from 'react-cookies';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';

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
    const refreshToken = cookie.load('REFRESH_TOKEN');
    const params = {
      ...(page ? { page: page } : {}),
      ...(size ? { size: size } : {}),
    };

    // TODO: 배포를 위한 임시 코드, 이슈 해결 후 삭제
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userState = useRecoilValue(userAtom);

    return refreshToken || userState.userId !== null
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
