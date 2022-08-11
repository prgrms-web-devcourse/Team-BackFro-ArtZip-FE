import { Button } from 'antd';
import { LinkButton } from 'components/atom';
import { UserInfo, ImageGroup, ReviewExhibitionInfo } from 'components/molecule';
import { InfoGroup } from 'components/organism';
import { ReviewSingleReadData } from 'types/apis/review';
import * as S from './style';

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
    <S.ReviewDetailContainer>
      <S.ReviewDetailHeader>
        <UserInfo
          profileImage={profileImage}
          nickname={nickname}
          createdDate={createdAt}
          userId={userId}
        />
        <S.ReviewDetailTitle>
          <h1>{title}</h1>
          {isEdited && <S.ReviewDetailEdited>수정됨</S.ReviewDetailEdited>}
          {isPublic ? (
            <S.ReviewDetailPublic>전체 공개</S.ReviewDetailPublic>
          ) : (
            <S.ReviewDetailPublic>비공개</S.ReviewDetailPublic>
          )}
        </S.ReviewDetailTitle>
      </S.ReviewDetailHeader>

      <S.ReviewDetailSection>
        <S.ReviewDetailContent>
          <S.ReviewDetailContentText> {content} </S.ReviewDetailContentText>
          <ImageGroup imageSources={photos} />
        </S.ReviewDetailContent>
      </S.ReviewDetailSection>

      <S.ReviewDetailBottom>
        <ReviewExhibitionInfo exhibition={exhibition} />
        <S.ReviewDetailContentUtils>
          <InfoGroup
            isLiked={isLiked}
            likeCount={likeCount}
            commentCount={commentCount}
            onLikeClick={() => {
              console.log('like Click!');
            }}
          />

          {/* TODO: 전역 유저 로그인 상태에 따라서, 수정 / 삭제 버튼 렌더링 */}
          <S.ButtonGroup>
            <LinkButton href={`/reviews/${reviewId}/edit`}>수정</LinkButton>
            <Button type="text" onClick={onDeleteButtonClick}>
              삭제
            </Button>
          </S.ButtonGroup>
        </S.ReviewDetailContentUtils>
      </S.ReviewDetailBottom>
    </S.ReviewDetailContainer>
  );
};

export default ReviewDetail;
