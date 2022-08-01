import { ExhibitionCardProps, ReviewProps, UserProps } from "types/model";
import { BaseProps } from "../base";

export interface UserRegisterProps {
    data?:{
        userId: number;
        nickname: string;
        email: string;
    }
}

export interface UserInfoReviewLikeProps{
    data?: {
        content: ReviewProps[];
    }
}

export interface UserInfoExhibitionLikeProps{
    data?:{
        content: ExhibitionCardProps[];
    }
}

// export interface UserMePasswordProps{
//     message: string;
// }

// export interface userMeInfoProps{
//     message: string;
// }

export interface UserInfoProps extends BaseProps{
    data?:{
        userId: number;
        profileImage: string;
        email: string;
        reviewCount: number;
        likeCount: number;
        commentCount: number;
        reviews: ReviewProps[];
    }
}

export interface UserTokenProps {
    data?:{
        accessToken: string;
    }
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