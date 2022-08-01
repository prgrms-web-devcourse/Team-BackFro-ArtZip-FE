import { ExhibitionCardProps, ReviewProps, UserProps } from "types/model";
import { BaseProps } from "../base";

export interface UserRegisterProps {
    userId: number;
    nickname: string;
    email: string;
}

export interface UserInfoReviewLikeProps{
    content: ReviewProps[];
}

export interface UserInfoExhibitionLikeProps{
    content: ExhibitionCardProps[];
}

// export interface UserMePasswordProps{
//     message: string;
// }

// export interface userMeInfoProps{
//     message: string;
// }

export interface UserInfoProps extends BaseProps{
    userId: number;
    profileImage: string;
    email: string;
    reviewCount: number;
    likeCount: number;
    commentCount: number;
    reviews: ReviewProps[];
}

export interface UserTokenProps {
    accessToken: string;
}

export type UserOauthLoginProps = UserProps

export type UserLocalLoginProps = UserProps

export interface UserCheckProps {
    isUnique: boolean;
}


// TODO 
// users/me/info
// users/me/info/exhibitions/like?
// users/me/info/reviews/like?