import styled from '@emotion/styled';
import { Button } from 'antd';
import { LinkButton } from 'components/atom';
import { UserInfo, ImageGroup, ReviewExhibitionInfo } from 'components/molecule';
import { InfoGroup } from 'components/organism';
import { ReviewSingleReadData } from 'types/apis/review';

interface ReviewDetailProps extends Omit<ReviewSingleReadData, 'comments'> {
  onDeleteButtonClick: () => void;
}

const ReviewDetail = ({
  reviewId,
  createdAt,
  user,
  exhibition,
  date,
  title,
  isPublic,
  isEdited,
  content,
  isLiked,
  likeCount,
  commentCount,
  photos,
  onDeleteButtonClick,
}: ReviewDetailProps) => {
  const { userId, nickname, profileImage } = user;

  return (
    <ReviewDetailContainer>
      <ReviewDetailHeader>
        <UserInfo
          profileImage={profileImage}
          nickname={nickname}
          createdDate={createdAt}
          userId={userId}
        />
        <ReviewDetailTitle>
          <h1>{title}</h1>
          {isEdited && <ReviewDetailEdited>수정됨</ReviewDetailEdited>}
          {isPublic ? (
            <ReviewDetailPublic>전체 공개</ReviewDetailPublic>
          ) : (
            <ReviewDetailPublic>비공개</ReviewDetailPublic>
          )}
        </ReviewDetailTitle>
      </ReviewDetailHeader>

      <ReviewDetailSection>
        <ReviewDetailContent>
          <ReviewDetailContentText> {content} </ReviewDetailContentText>
          <ImageGroup imageSources={photos} />
          <ReviewExhibitionInfo exhibition={exhibition} />
          <ReviewDetailContentUtils>
            <InfoGroup
              isLiked={isLiked}
              likeCount={likeCount}
              commentCount={commentCount}
              onLikeClick={() => {
                console.log('like Click!');
              }}
            />

            {/* TODO: 전역 유저 로그인 상태에 따라서, 수정 / 삭제 버튼 렌더링 */}
            <ButtonGroup>
              <LinkButton href={`/reviews/${reviewId}/edit`}>수정</LinkButton>
              <Button type="text" onClick={onDeleteButtonClick}>
                삭제
              </Button>
            </ButtonGroup>
          </ReviewDetailContentUtils>
        </ReviewDetailContent>
      </ReviewDetailSection>
    </ReviewDetailContainer>
  );
};

const ReviewDetailContainer = styled.main`
  margin: 20px 0;
`;

const ReviewDetailHeader = styled.div``;

const ReviewDetailEdited = styled.span`
  color: ${({ theme }) => theme.color.font.light};
  font-size: 1.5rem;
`;

const ReviewDetailPublic = styled.span`
  color: ${({ theme }) => theme.color.font.light};
  border: 1px solid ${({ theme }) => theme.color.font.light};
  padding: 2px 6px;
  border-radius: 20px;
  font-size: 1.5rem;
`;

const ReviewDetailSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ReviewDetailTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ReviewDetailContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewDetailContentText = styled.p`
  font-size: 2rem;
`;

const ReviewDetailContentUtils = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

export default ReviewDetail;
