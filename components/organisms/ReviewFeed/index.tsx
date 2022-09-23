import { UserInfo } from 'components/molecules';
import * as S from './style';
import { Button, message, Tooltip, Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReviewFeedProps } from 'types/model';
import { InfoGroup } from 'components/organisms';
import { LinkButton } from 'components/atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { reviewAPI } from 'apis';
import Image from 'next/image';

const ReviewFeed = ({ feed, isMyFeed, onDeleteButtonClick }: ReviewFeedProps) => {
  const router = useRouter();
  const { userId } = useRecoilValue(userAtom);

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
  const [isLikeFeed, setIsLikedFeed] = useState(isLiked);
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsLikedFeed(isLiked);
    setFeedLikeCount(likeCount);
  }, [isLiked, likeCount]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (reviewId: number) => {
    setIsModalVisible(false);

    const { data } = await reviewAPI.deleteReview(reviewId);
    const { message: responseMessage } = data;
    message.success(responseMessage);

    onDeleteButtonClick();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLikeClick = async (reviewId: number) => {
    if (!userId) {
      message.warning('로그인 해주세요');
      return;
    }

    if (likeLoading) {
      return;
    }

    setLikeLoading(true);
    // 낙관적 업데이트
    setIsLikedFeed(!isLikeFeed);
    setFeedLikeCount(isLikeFeed ? feedLikeCount - 1 : feedLikeCount + 1);

    const { data } = await reviewAPI.likeToggle(reviewId);
    const { likeCount, isLiked } = data.data;
    setIsLikedFeed(isLiked);
    setFeedLikeCount(likeCount);

    setLikeLoading(false);
  };

  return (
    <>
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
                <Tooltip title={exhibition.name}>
                  <a>
                    <S.ReviewTagText># {exhibition.name}</S.ReviewTagText>
                  </a>
                </Tooltip>
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
                  isLiked={isLikeFeed}
                  likeCount={feedLikeCount}
                  commentCount={commentCount}
                  onLikeClick={() => handleLikeClick(reviewId)}
                />

                {isMyFeed && (
                  <S.FeedButtonGroup>
                    <LinkButton href={`/reviews/update/${reviewId}`}>수정</LinkButton>
                    <Button
                      type="text"
                      onClick={() => {
                        showModal();
                      }}
                    >
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
            <S.FeedImage>
              <Image
                src={photos.length ? photos[0].path : exhibition.thumbnail}
                layout="fill"
                alt="Review Thumbnail"
              />
            </S.FeedImage>
          </S.ReviewFeedThumbnail>
        </S.ReviewFeedWrapper>
      </S.ReviewFeedCard>

      <Modal
        title="리뷰를 삭제할까요?"
        visible={isModalVisible}
        onOk={() => handleOk(reviewId)}
        okText="삭제하기"
        onCancel={handleCancel}
        cancelText="취소"
      >
        <p>이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠어요?</p>
      </Modal>
    </>
  );
};

export default ReviewFeed;
