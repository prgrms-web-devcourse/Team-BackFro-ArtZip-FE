import { ExhibitionProps, ReviewProps } from 'types/model';
import { BaseResponse, PaginationResponse } from '../base';

//다가오는 전시회, 인기 많은 전시회 조회

// ExhibitionProps
export interface ExhibitionReadResponse extends BaseResponse {
  data?: PaginationResponse<ExhibitionProps>;
}

//전시회 좋아요 토글
export interface ExhibitionLikeToggleResponse extends BaseResponse {
  data?: {
    exhibitionId: number;
    likeCount: number;
    isLiked: boolean;
  };
}

export interface ExhibitionSingleData {
  exhibitionId: number;
  name: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  area: string;
  url: string;
  placeUrl: string;
  inquiry: string;
  // fee: string;
  genre: string | null;
  description: string | null;
  likeCount: number;
  placeAddress: string;
  lat: number;
  lng: number;
  isLiked: boolean;
  reviews: ReviewProps[] | null;
  reviewCount: number;
}

//전시회 상세조회
export interface ExhibitionDetailResponse extends BaseResponse {
  data: ExhibitionSingleData;
}

// 전시회검색
export interface ExhibitionSearchResponse extends BaseResponse {
  data?: PaginationResponse<ReviewProps>;
}
