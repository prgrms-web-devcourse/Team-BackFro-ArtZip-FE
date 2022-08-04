import { UserInfo } from 'components/molecule';
import styled from '@emotion/styled';
import { Card, Button, Image } from 'antd';
import Link from 'next/link';
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
    <ReviewFeedCard>
      <ReviewFeedWrapper>
        <ReviewFeedContent>
          <ReviewFeedHeader>
            <UserInfo
              profileImage={userProfileImage}
              nickname={userName}
              createdDate={feedCreateDate}
              userId={userId}
            ></UserInfo>
            <Link href={`/exhibitions/detail/${exhibitionId}`}>
              <a>
                <ReviewTagText># {exhibitionName}</ReviewTagText>
              </a>
            </Link>
          </ReviewFeedHeader>

          <ReviewFeedMainWrapper>
            <ReviewFeedMain
              onClick={() => {
                router.push(`/reviews/detail/${reviewId}`);
              }}
            >
              <ReviewTitle>{feedTitle}</ReviewTitle>
              <ReviewContent>
                {feedContent.length < 50 ? feedContent : feedContent.slice(0, 50).concat('...')}
              </ReviewContent>
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
          </ReviewFeedMainWrapper>
        </ReviewFeedContent>

        <ReviewFeedThumbnail
          onClick={() => {
            router.push(`/reviews/detail/${reviewId}`);
          }}
        >
          <Image
            src={reviewThumbnailImage}
            width={150}
            height={150}
            preview={false}
            alt="Review Thumbnail"
          />
        </ReviewFeedThumbnail>
      </ReviewFeedWrapper>
    </ReviewFeedCard>
  );
};

const ReviewFeedCard = styled(Card)`
  margin: 30px 0;
`;

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

const ReviewTagText = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.color.blue.main};

  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

const ReviewFeedMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewFeedMain = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
  }
`;

const ReviewTitle = styled.p`
  font-size: 2.2rem;
  margin-top: 10px;
  font-weight: bold;
`;

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
