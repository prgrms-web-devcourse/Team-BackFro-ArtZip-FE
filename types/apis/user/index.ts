import { ExhibitionCardProps, ReviewProps, UserProps } from 'types/model';
import { BaseResponse } from '../base';

export interface UserRegisterResponse extends BaseResponse {
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
    content: ExhibitionCardProps[];
  };
}

// export interface UserMePasswordProps{
//     message: string;
// }

// export interface userMeInfoProps{
//     message: string;
// }

export interface UserInfoProps extends BaseResponse {
  data?: {
    userId: number;
    profileImage: string;
    email: string;
    reviewCount: number;
    likeCount: number;
    commentCount: number;
    reviews: ReviewProps[];
  };
}

export interface UserTokenProps extends BaseResponse {
  data?: {
    accessToken: string;
  };
}

export type UserOauthLoginProps = UserProps;

export type UserLocalLoginProps = UserProps;

export interface UserCheckProps extends BaseResponse {
  isUnique: boolean;
}

// TODO
// users/me/info
// users/me/info/exhibitions/like?
// users/me/info/reviews/like?
