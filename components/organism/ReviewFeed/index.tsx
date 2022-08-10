import { UserInfo } from 'components/molecule';
import styled from '@emotion/styled';
import * as S from './style';
import { Card, Button, Image } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReviewFeedProps } from 'types/model';
import { InfoGroup } from 'components/organism';
import { LinkButton } from 'components/atom';

const ReviewFeed = ({ feed, isMyFeed, onLikeClick, onDeleteButtonClick }: ReviewFeedProps) => {
  const router = useRouter();

  const {
    exhibition,
    reviewId,
    isLiked,
    likeCount,
    title,
    content,
    createdAt,
    user,
    commentCount,
    photos,
  } = feed;

  return (
    <S.ReviewFeedCard>
      <S.ReviewFeedWrapper>
        <S.ReviewFeedContent>
          <S.ReviewFeedHeader>
            <UserInfo
              profileImage={user.profileImage}
              nickname={user.nickname}
              createdDate={createdAt}
              userId={user.userId}
            ></UserInfo>
            <Link href={`/exhibitions/detail/${exhibition.exhibitionId}`}>
              <a>
                <S.ReviewTagText># {exhibition.name}</S.ReviewTagText>
              </a>
            </Link>
          </S.ReviewFeedHeader>

          <S.ReviewFeedMainWrapper>
            <S.ReviewFeedMain
              onClick={() => {
                router.push(`/reviews/detail/${reviewId}`);
              }}
            >
              <S.ReviewTitle>{title}</S.ReviewTitle>
              <S.ReviewContent>{content}</S.ReviewContent>
            </S.ReviewFeedMain>

            <S.ReviewFeedBottom>
              <InfoGroup
                isLiked={isLiked}
                likeCount={likeCount}
                commentCount={commentCount}
                onLikeClick={onLikeClick}
              />

              {isMyFeed && (
                <S.FeedButtonGroup>
                  <LinkButton href={`/reviews/${reviewId}/edit`}>수정</LinkButton>
                  <Button type="text" onClick={onDeleteButtonClick}>
                    삭제
                  </Button>
                </S.FeedButtonGroup>
              )}
            </S.ReviewFeedBottom>
          </S.ReviewFeedMainWrapper>
        </S.ReviewFeedContent>

        <S.ReviewFeedThumbnail
          onClick={() => {
            router.push(`/reviews/detail/${reviewId}`);
          }}
        >
          <Image
            src={photos.length ? photos[0].path : exhibition.thumbnail}
            width={150}
            height={150}
            preview={false}
            alt="Review Thumbnail"
          />
        </S.ReviewFeedThumbnail>
      </S.ReviewFeedWrapper>
    </S.ReviewFeedCard>
  );
};

export default ReviewFeed;
