export interface ExhibitionProps {
  exhibitionId: number;
  name: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  likeCount: number;
  reviewCount: number;
}

export interface ReviewFeedProps {
  userProfileImage: string;
  userName: string;
  userId: number;
  feedCreateDate: Date;
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

export interface CommentProps {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isDeleted: boolean;
  user: UserProps;
  children: CommentProps[];
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
