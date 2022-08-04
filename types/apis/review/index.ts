import { ExhibitionProps, ReviewProps, UserProps, PhotoProps, CommentProps } from 'types/model';
import { BaseResponse } from '../base';

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
  id: number;
  user: UserProps;
  exhibition: ExhibitionProps;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: number;
  isEdited: boolean;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  photos: PhotoProps[];
  comments?: CommentProps;
}

export interface ReviewSingleReadResponse extends BaseResponse {
  data: ReviewSingleReadData;
}

// 후기 다건 조회
export interface ReviewMultiReadData {
  content: ReviewSingleReadData[];
}

export interface ReviewMultiReadResponse extends BaseResponse {
  data?: ReviewMultiReadData;
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
