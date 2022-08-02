import { ExhibitionProps, ReviewProps } from 'types/model';
import { BaseResponse } from '../base';

//다가오는 전시회 조회
export interface ExhibitionUpcomingResponse extends BaseResponse {
  data?: {
    content: ExhibitionProps[];
    numberOfElements: number; //content의 요소가 몇개인지
    offset: number; // 현재 페이지에서 시작하는 요소의 index 번호
    pageNumber: number; //페이지 넘버
    pageSize: number; //페이지 사이즈
    totalElements: number; // 전체 요소 수
    totalPages: number;
  };
}

//전시회 좋아요 토글
export interface ExhibitionLikeToggleResponse extends BaseResponse {
  data?: {
    exhibitionId: number;
    likeCount: number;
    isLiked: boolean;
  };
}

//전시회 상세조회
export interface ExhibitionDetailResponse extends BaseResponse {
  data?: {
    exhibitionId: number;
    name: string;
    thumbnail: string;
    startDate: string;
    endDate: string;
    area: string;
    url: string;
    placeUrl: string;
    inquiry: string;
    fee: string;
    genre: string | null;
    description: string | null;
    likeCount: number;
    placeAddr: string;
    lat: number;
    lng: number;
    isLiked: boolean;
    reviews: ReviewProps[];
  };
}

// 전시회검색
export interface ExhibitionSearchResponse extends BaseResponse {
  data?: {
    content: ReviewProps[];
    numberOfElements: number; //content의 요소가 몇개인지
    offset: number; // 현재 페이지에서 시작하는 요소의 index 번호
    pageNumber: number; //페이지 넘버
    pageSize: number; //페이지 사이즈
    totalElements: number; // 전체 요소 수
    totalPages: number;
  };
}
