import { UserInfo } from 'components/molecule';
import styled from '@emotion/styled';
import { Card, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReviewFeedProps } from 'types/model';
import { InfoGroup } from 'components/organism';
import { LinkButton } from 'components/atom';

const ReviewFeed = ({
  userProfileImage,
  userName,
  userId,
  feedCreateDate,
  exhibitionName,
  exhibitionId,
  feedTitle,
  feedContent,
  isLiked,
  likeCount,
  onLikeClick,
  commentCount,
  isMyFeed,
  reviewId,
  onDeleteButtonClick,
  reviewThumbnailImage,
}: ReviewFeedProps) => {
  const router = useRouter();

  return (
    <Card>
      <ReviewFeedWrapper>
        <ReviewFeedContent>
          <ReviewFeedHeader>
            <UserInfo
              profileImage={userProfileImage}
              nickname={userName}
              createdDate={feedCreateDate}
              userId={userId}
            ></UserInfo>
            <ReviewDetailLink href={`/exhibitions/detail/${exhibitionId}`}>
              <a># {exhibitionName}</a>
            </ReviewDetailLink>
          </ReviewFeedHeader>

          <ReviewFeedMain
            onClick={() => {
              router.push(`/reviews/detail/${reviewId}`);
            }}
          >
            <ReviewTitle>{feedTitle}</ReviewTitle>
            <ReviewContent>{feedContent}</ReviewContent>
          </ReviewFeedMain>

          <ReviewFeedBottom>
            <InfoGroup
              isLiked={isLiked}
              likeCount={likeCount}
              commentCount={commentCount}
              onLikeClick={onLikeClick}
            />

            {isMyFeed && (
              <FeedButtonGroup>
                <LinkButton href={`/reviews/${reviewId}/edit`}>수정</LinkButton>
                <Button type="text" onClick={onDeleteButtonClick}>
                  삭제
                </Button>
              </FeedButtonGroup>
            )}
          </ReviewFeedBottom>
        </ReviewFeedContent>

        <ReviewFeedThumbnail
          onClick={() => {
            router.push(`/reviews/detail/${reviewId}`);
          }}
        >
          <Image src={reviewThumbnailImage} width="200" height="200" alt="Review Thumbnail" />
        </ReviewFeedThumbnail>
      </ReviewFeedWrapper>
    </Card>
  );
};

const ReviewFeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;

const ReviewFeedContent = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

const ReviewFeedThumbnail = styled.div`
  &:hover {
    filter: brightness(80%);
  }
`;

const ReviewFeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewDetailLink = styled(Link)`
  // TODO: 테마 색 지정
  &:hover {
    // TODO: 호버 시 강조색 지정
  }
`;

const ReviewFeedMain = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
  }
`;

const ReviewTitle = styled.h2``;

const ReviewContent = styled.p``;

const ReviewFeedBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const FeedButtonGroup = styled.div`
  display: flex;
  align-content: center;
`;

export default ReviewFeed;
