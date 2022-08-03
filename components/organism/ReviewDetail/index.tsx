import styled from '@emotion/styled';
import { Button } from 'antd';
import { LinkButton } from 'components/atom';
import { UserInfo, ImageGroup } from 'components/molecule';
import { InfoGroup } from 'components/organism';
import { ReviewSingleReadData } from 'types/apis/review';

interface ReviewDetailProps extends ReviewSingleReadData {
  onDeleteButtonClick: () => void;
}

const ReviewDetail = ({
  id,
  createdAt,
  user,
  exhibition,
  title,
  isEdited,
  content,
  isLiked,
  likeCount,
  commentCount,
  photos,
  onDeleteButtonClick,
}: ReviewDetailProps) => {
  const { userId, nickname, profileImage } = user;
  // const { exhibitionId, name, startDate, endDate, thumbnail } = exhibition;

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
        </ReviewDetailTitle>
      </ReviewDetailHeader>

      <ReviewDetailSection>
        <ReviewDetailContent>
          <ReviewDetailContentText> {content} </ReviewDetailContentText>

          <ImageGroup imageSources={photos} />
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
              <LinkButton href={`/reviews/${id}/edit`}>수정</LinkButton>
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

const ReviewDetailContentText = styled.p``;

const ReviewDetailContentUtils = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

export default ReviewDetail;
