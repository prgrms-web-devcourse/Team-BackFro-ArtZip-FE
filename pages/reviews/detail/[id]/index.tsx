import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { ReviewDetail, CommentWrite, CommentList } from 'components/organism';
import { ReviewSingleReadResponse } from 'types/apis/review';
import { reviewAPI } from 'apis';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ReviewDetailPage = ({ data }: ReviewSingleReadResponse) => {
  const {
    exhibition,
    user,
    reviewId,
    isPublic,
    isEdited,
    isLiked,
    likeCount,
    photos,
    title,
    content,
    createdAt,
    updatedAt,
    commentCount,
    comments,
    date,
  } = data;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (reviewId: number) => {
    setIsModalVisible(false);

    const { data } = await reviewAPI.deleteReview(reviewId);
    const { message: responseMessage } = data;
    message.success(responseMessage);

    router.push('/community');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Head>
        <title>ArtZip | ReviewDetailPage</title>
      </Head>
      <>
        <ReviewDetail
          reviewId={reviewId}
          likeCount={likeCount}
          commentCount={commentCount}
          isLiked={isLiked}
          createdAt={createdAt}
          title={title}
          isPublic={isPublic}
          isEdited={isEdited}
          content={content}
          photos={photos}
          updatedAt={updatedAt}
          exhibition={exhibition}
          date={date}
          user={user}
          onDeleteButtonClick={showModal}
        />

        {/* 전역 상태 머지 되면 로직 구현 */}
        <CommentWrite user={undefined} />
        <CommentList comments={comments} reviewId={reviewId} />
      </>
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return;
  }

  const { id } = context.params;
  const { data } = await reviewAPI.getReviewSingle(Number(id));

  return {
    props: {
      data: data.data,
    },
  };
};

export default ReviewDetailPage;
