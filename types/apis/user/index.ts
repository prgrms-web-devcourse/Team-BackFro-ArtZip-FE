import { ExhibitionProps, ReviewProps } from 'types/model';
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

export interface UserInfoReviewLikeResponse extends BaseResponse {
  data?: {
    content: ReviewProps[];
  };
}

export interface UserInfoExhibitionLikeResponse extends BaseResponse {
  data?: {
    content: ExhibitionProps[];
  };
}

// export interface UserMePasswordProps{
//     message: string;
// }

// export interface userMeInfoProps{
//     message: string;
// }

export interface UserInfoResponse extends BaseResponse {
  data?: {
    nickname: string;
    userId: number;
    profileImage: string;
    email: string;
    reviewCount: number;
    likeCount: number;
    commentCount: number;
    reviews: ReviewProps[];
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

// TODO
// users/me/info
// users/me/info/exhibitions/like?
// users/me/info/reviews/like?
