import { CommentProps } from 'types/model';
import { BaseResponse, PaginationResponse } from '../base';

//댓글 조회
export interface CommentReadResponse extends BaseResponse {
  data?: PaginationResponse<CommentProps>;
}

//댓글 삭제
export interface CommentDeleteExhibitionResponse extends BaseResponse {
  data?: {
    commentId: number;
    createdAt: string;
    isDeleted: boolean;
  };
}

//댓글 수정
export interface CommentEditExhibitionResponse extends BaseResponse {
  data?: CommentProps;
}

export interface CommentUpdateRequest {
  content: string;
}

//댓글 생성
export interface CommentCreateRequest {
  content: string;
  parentId?: number;
}

export interface CommentCreateExhibitionProps extends BaseResponse {
  data?: CommentProps;
}
