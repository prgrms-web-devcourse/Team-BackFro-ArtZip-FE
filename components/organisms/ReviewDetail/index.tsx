import { Button, message } from 'antd';
import { reviewAPI } from 'apis';
import { LinkButton } from 'components/atoms';
import { UserInfo, ImageGroup, ReviewExhibitionInfo } from 'components/molecules';
import { InfoGroup } from 'components/organisms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { ReviewSingleReadData } from 'types/apis/review';
import * as S from './style';

interface ReviewDetailProps {
  reviewDetail: Omit<ReviewSingleReadData, 'comments'>;
  commentCount: number;
  onDeleteButtonClick: () => void;
}

const ReviewDetail = ({ reviewDetail, commentCount, onDeleteButtonClick }: ReviewDetailProps) => {
  const {
    reviewId,
    user,
    exhibition,
    title,
    content,
    createdAt,
    isEdited,
    isLiked,
    isPublic,
    likeCount,
    photos,
  } = reviewDetail;

  const { userId, nickname, profileImage } = user;
  const isMyReview = useRecoilValue(userAtom).userId === userId;
  const [detailLikeCount, setDetailLikeCount] = useState(likeCount);
  const [isLikeDetail, setIsLikedFeed] = useState(isLiked);
  const [likeLoading, setLikeLoading] = useState(false);
  const userState = useRecoilValue(userAtom);

  useEffect(() => {
    setIsLikedFeed(isLiked);
    setDetailLikeCount(likeCount);
  }, [isLiked, likeCount]);

  const handleLikeClick = async (reviewId: number) => {
    if (!userState.userId) {
      message.warning('로그인 해주세요');
      return;
    }

    if (likeLoading) {
      return;
    }

    setLikeLoading(true);
    setIsLikedFeed(!isLikeDetail);
    setDetailLikeCount(isLikeDetail ? detailLikeCount - 1 : detailLikeCount + 1);

    const { data } = await reviewAPI.likeToggle(reviewId);
    const { likeCount, isLiked } = data.data;
    setIsLikedFeed(isLiked);
    setDetailLikeCount(likeCount);

    setLikeLoading(false);
  };

  return (
    <S.ReviewDetailContainer>
      <S.ReviewDetailHeader>
        <S.ReviewDetailTitle>
          <h1>{title}</h1>
        </S.ReviewDetailTitle>
        <S.ReviewInfoContainer>
          <UserInfo
            profileImage={profileImage}
            nickname={nickname}
            createdDate={createdAt}
            userId={userId}
          />
          <S.ReviewStateContainer>
            {isEdited && <S.ReviewDetailEdited>수정됨</S.ReviewDetailEdited>}
            {isPublic ? (
              <S.ReviewDetailPublic>전체 공개</S.ReviewDetailPublic>
            ) : (
              <S.ReviewDetailPublic>비공개</S.ReviewDetailPublic>
            )}
          </S.ReviewStateContainer>
        </S.ReviewInfoContainer>
      </S.ReviewDetailHeader>

      <S.ReviewDetailSection>
        <S.ReviewDetailContent>
          <S.ReviewDetailContentText> {content} </S.ReviewDetailContentText>
          <ImageGroup imageSources={photos} />
        </S.ReviewDetailContent>
      </S.ReviewDetailSection>

      <S.ReviewDetailBottom>
        <S.ReviewExhibitionInfoContainer>
          <ReviewExhibitionInfo exhibition={exhibition} />
        </S.ReviewExhibitionInfoContainer>

        <S.ReviewDetailContentUtils>
          <InfoGroup
            isLiked={isLikeDetail}
            likeCount={detailLikeCount}
            commentCount={commentCount}
            onLikeClick={() => handleLikeClick(reviewId)}
          />

          {isMyReview && (
            <S.ButtonGroup>
              <LinkButton href={`/reviews/update/${reviewId}`}>수정</LinkButton>
              <Button type="text" onClick={onDeleteButtonClick}>
                삭제
              </Button>
            </S.ButtonGroup>
          )}
        </S.ReviewDetailContentUtils>
      </S.ReviewDetailBottom>
    </S.ReviewDetailContainer>
  );
};

export default ReviewDetail;
