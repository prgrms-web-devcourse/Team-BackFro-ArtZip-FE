import { useState } from 'react';
import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style';
import Link from 'next/link';
import { displayDate } from 'utils';

interface ReviewCardProps {
  reviewId: number;
  thumbnail: string;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  profileImage: string;
  nickname: string;
  likeCount: number;
  commentCount: number;
  photo?: string;
}

const ReviewCard = ({
  reviewId,
  thumbnail,
  title,
  content,
  createdAt,
  userId,
  profileImage,
  nickname,
  likeCount,
  commentCount,
  photo,
}: ReviewCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const mouseHover = () => setIsHover((isHover) => !isHover);
  return (
    <Link href={`/reviews/detail/${reviewId}`}>
      <a>
        <S.ReviewCard>
          <S.PhotoWrapper onMouseEnter={mouseHover} onMouseLeave={mouseHover}>
            <S.Photo
              preview={false}
              src={'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg'}
            />
            {isHover ? (
              <S.HoverContent>
                <HeartOutlined /> {likeCount} <MessageOutlined /> {commentCount}
              </S.HoverContent>
            ) : null}
          </S.PhotoWrapper>
          <S.UserInfoContainer>
            <Link href={`/users/${userId}`}>
              <S.UserInfoAvatar src={'https://joeschmoe.io/api/v1/random'} size={60} />
            </Link>
            <S.UserInfoTextContainer>
              <Link href={`/users/${userId}`}>
                <S.UserInfoName>{nickname}</S.UserInfoName>
              </Link>
              <S.UserInfoDate>{displayDate(createdAt)}</S.UserInfoDate>
            </S.UserInfoTextContainer>
          </S.UserInfoContainer>
          <S.Title>{title}</S.Title>
          <S.Content>{content}</S.Content>
        </S.ReviewCard>
      </a>
    </Link>
  );
};

export default ReviewCard;
