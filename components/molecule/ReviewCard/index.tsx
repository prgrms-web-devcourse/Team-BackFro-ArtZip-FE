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
  photo: string | null;
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
    <>
      <Link href={`/reviews/detail/${reviewId}`}>
        <S.ReviewCard>
          <S.PhotoWrapper onMouseEnter={mouseHover} onMouseLeave={mouseHover}>
            <S.Photo
              src={'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg'}
            ></S.Photo>
            {isHover ? (
              <S.HoverContent>
                <HeartOutlined /> {likeCount} <MessageOutlined /> {commentCount}
              </S.HoverContent>
            ) : null}
          </S.PhotoWrapper>
          <S.UserInfoContainer>
            <Link href={`/user/${userId}`}>
              <S.UserInfoAvatar src={'https://joeschmoe.io/api/v1/random'} size={60} />
            </Link>
            <S.UserInfoTextWrapper>
              <Link href={`/user/${userId}`}>
                <S.UserInfoName>{nickname}</S.UserInfoName>
              </Link>
              <S.UserInfoDate>{displayDate(new Date(createdAt))}</S.UserInfoDate>
            </S.UserInfoTextWrapper>
          </S.UserInfoContainer>
          <S.Title>{title}</S.Title>
          <S.Content>{content}</S.Content>
        </S.ReviewCard>
      </Link>
    </>
  );
};

export default ReviewCard;
