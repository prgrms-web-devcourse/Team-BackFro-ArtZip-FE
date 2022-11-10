import { ExhibitionProps, UserProps, PhotoProps, CommentProps } from 'types/model';
import { BaseResponse, PaginationResponse } from '../base';

// 후기 생성
export interface ReviewIdData {
  reviewId: number;
}

export interface ReviewCreateResponseData extends BaseResponse {
  data?: ReviewIdData;
}

//후기 수정
export interface ReviewUpdateResponse extends BaseResponse {
  data?: ReviewIdData;
}

// 후기 단건 조회
export interface ReviewSingleReadData {
  reviewId: number;
  user: UserProps;
  exhibition: ExhibitionProps;
  date: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: number;
  isEdited: boolean;
  isLiked: boolean;
  isPublic: boolean;
  likeCount: number;
  commentCount: number;
  photos: PhotoProps[];
  comments: PaginationResponse<CommentProps>;
}

export interface ReviewSingleReadResponse extends BaseResponse {
  data: ReviewSingleReadData;
}

// 후기 다건 조회
export interface ReviewMultiReadData {
  content: Omit<ReviewSingleReadData, 'comment'>[];
  numberOfElements: number; //content의 요소가 몇개인지
  offset: number; // 현재 페이지에서 시작하는 요소의 index 번호
  pageNumber: number; //페이지 넘버
  pageSize: number; //페이지 사이즈
  totalElements: number; // 전체 요소 수
  totalPage: number; //전체 페이지 수
}

export interface ReviewMultiReadResponse extends BaseResponse {
  data: ReviewMultiReadData;
}

// 후기 좋아요 등록 / 해제
export interface ReviewLikeToggleData {
  reviewId: number;
  likeCount: number;
  isLiked: boolean;
}

export interface ReviewLikeToggleResponse {
  data?: ReviewLikeToggleData;
}
