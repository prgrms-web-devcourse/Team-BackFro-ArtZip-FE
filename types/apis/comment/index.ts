import { CommentProps } from 'antd';
import { UserProps } from 'types/model';
import { BaseResponse } from '../base';

//댓글 조회
export interface CommentReadResponse extends BaseResponse {
  data?: {
    content: CommentProps[];
    numberOfElements: number;
    offset: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
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
  data?: {
    commentId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
    isDeleted: boolean;
    user: UserProps;
  };
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
  data?: {
    commentId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
    isDeleted: boolean;
    user: UserProps[];
  };
}
