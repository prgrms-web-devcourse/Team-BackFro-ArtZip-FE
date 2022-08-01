import { CommentProps } from "antd";
import { UserProps } from "types/model";
import { BaseProps } from "../base";

//댓글 조회
export interface CommentExhibitionProps extends BaseProps{
    data?: {
        content: CommentProps[];
        numberOfElements: number; //content의 요소가 몇개인지
        offset: number; // 현재 페이지에서 시작하는 요소의 index 번호
        pageNumber: number; //페이지 넘버
        pageSize: number; //페이지 사이즈
        totalElements: number; // 전체 요소 수
        totalPages: number 
    }
}

//댓글 삭제
export interface CommentDeleteExhibitionProps extends BaseProps{
    data?:{
        commentId: number;
        createdAt: string;
        isDeleted: boolean;
    }
}

//댓글 수정
export interface CommentEditExhibitionProps extends BaseProps{
    data?:{
        commentId: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        isEdited: boolean;
        isDeleted: boolean;
        user: UserProps[];
    }
}

//댓글 생성

export interface CommentCreateExhibitionProps extends BaseProps {
    data?: {
        commentId: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        isEdited: boolean;
        isDeleted: boolean;
        user: UserProps[];
    }
}
