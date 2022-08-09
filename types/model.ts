export interface ExhibitionProps {
  exhibitionId: number;
  name: string;
  thumbnail: string;
  startDate?: string;
  endDate?: string;
  likeCount?: number;
  reviewCount?: number;
  isLiked?: boolean;
}

export interface ReviewFeedProps {
  userProfileImage: string;
  userName: string;
  userId: number;
  feedCreateDate: string;
  exhibitionName: string;
  exhibitionId: number;
  feedTitle: string;
  feedContent: string;
  isLiked: boolean;
  likeCount: number;
  onLikeClick: () => void;
  commentCount: number;
  isMyFeed: boolean;
  reviewId: number;
  onDeleteButtonClick: () => void;
  reviewThumbnailImage: string;
}

export interface ReviewProps {
  reviewId: number;
  name: string;
  thumbnail: string;
  likeCount: number;
  isPublic: boolean;
  commentCount: number;
  isLiked: boolean;
}

// TODO: 명세서 올라오면 수정하기
export interface CommentProps {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isDeleted: boolean;
  user: UserProps;
  childrenCount?: number; // 대 댓글이 아닐때만
}

export interface UserProps {
  userId: number;
  nickname: string;
  profileImage: string;
}

export interface PhotoProps {
  photoId: number;
  path: string;
}
