import { ExhibitionProps, ReviewCardProps } from 'types/model';
import { BaseResponse } from '../base';

export interface UserLocalLoginRequest {
  email: string;
  password: string;
}

export interface UserSignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface UserSignupResponse extends BaseResponse {
  data?: {
    userId: number;
    nickname: string;
    email: string;
  };
}

export interface UserReissueTokenRequest {
  userId: number;
  accessToken: string; // 만료된 accessToken
  refreshToken: string; // 만료되지 않은 refreshToken
}

export interface UserReviewResponse extends BaseResponse {
  data?: {
    content: ReviewCardProps[];
  };
}

export interface UserInfoExhibitionLikeResponse extends BaseResponse {
  data?: {
    content: ExhibitionProps[];
  };
}

export interface UserInfoResponse extends BaseResponse {
  data: {
    nickname: string;
    userId: number;
    profileImage: string;
    email: string;
    reviewCount: number;
    reviewLikeCount: number;
    exhibitionLikeCount: number;
    commentCount: number;
  };
}

export interface UserTokenResponse extends BaseResponse {
  data?: {
    accessToken: string;
  };
}

export interface UserCheckResponse extends BaseResponse {
  isUnique: boolean;
}

export interface UserChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
