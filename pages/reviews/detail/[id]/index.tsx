import Head from 'next/head';
import { ReviewDetail, CommentWrite, CommentList } from 'components/organisms';
import { ReviewSingleReadData, ReviewSingleReadResponse } from 'types/apis/review';
import { reviewAPI } from 'apis';
import { message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteScroll } from 'hooks';
import { CommentProps } from 'types/model';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { GetServerSidePropsContext } from 'next';
import { authorizeFetch } from 'utils';
import { Spinner } from 'components/atoms';

const ReviewDetailPage = (reviewSingleRes: { reviewSingleRes: ReviewSingleReadData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: reviewCommentData } = useSWR(`api/v1/reviews/${id}/comments`);
  const { reviewSingleRes: reviewSingleData } = reviewSingleRes;
  const { reviewId, commentCount, comments } = reviewSingleData;
  const { totalPage, pageNumber } = comments;

  useEffect(() => {
    if (reviewCommentData) {
      setReviewComments(reviewCommentData.comments.content);
    }
  }, [reviewCommentData]);

  const [reviewComments, setReviewComments] = useState<CommentProps[]>([...comments.content]);
  const [reviewCommentCount, setReviewCommentCount] = useState(commentCount);
  const [currentPage, setCurrentPage] = useState(pageNumber);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // 댓글 무한 스크롤
  const getMoreComment = async () => {
    if (totalPage <= currentPage) {
      return;
    }
    const { data } = await reviewAPI.getComments({ reviewId: Number(id), page: currentPage + 1 });
    const newComments: CommentProps[] = Object.values(data.data.comments.content);
    setReviewComments([...reviewComments, ...newComments]);
    setCurrentPage(currentPage + 1);
  };

  const target = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { count } = useInfiniteScroll({
    target: target,
    targetArray: reviewComments,
    threshold: 0.2,
    pageSize: 10,
    endPoint: 5,
  });

  useEffect(() => {
    if (count === 0) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      getMoreComment();
      setIsLoading(false);
    }, 1000);
  }, [count]);

  // 댓글 액션
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

  const handleCommentReload = async () => {
    const { data } = await reviewAPI.getComments({ reviewId: Number(id) });
    const { comments, commentCount } = data.data;
    setReviewComments(comments.content);
    setReviewCommentCount(commentCount);
  };

  return (
    <>
      <Head>
        <title>ArtZip | 후기 상세보기</title>
      </Head>

      <>
        <ReviewDetail
          reviewDetail={reviewSingleData}
          onDeleteButtonClick={showModal}
          commentCount={reviewCommentCount}
        />
        <CommentContainer ref={target}>
          <CommentWrite reviewId={reviewId} onCommentReload={handleCommentReload} />
          {reviewComments && (
            <CommentList
              comments={reviewComments}
              reviewId={reviewId}
              onDeleteButtonClick={handleCommentReload}
              onEditButtonClick={handleCommentReload}
              onCommentReload={handleCommentReload}
            />
          )}
        </CommentContainer>
        {isLoading && <Spinner />}
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

const CommentContainer = styled.div`
  margin: 0 20px;
  margin-bottom: 50px;
`;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return;
  }

  const { id: reviewId } = context.params;
  const accessToken = context.req.cookies['ACCESS_TOKEN'];
  const refreshToken = context.req.cookies['REFRESH_TOKEN'];
  const reviewSingleURL = `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/reviews/${reviewId}`;

  if (accessToken && refreshToken) {
    const { data: reviewSingleRes } = await authorizeFetch({
      accessToken,
      refreshToken,
      apiURL: reviewSingleURL,
    });

    return {
      props: {
        reviewSingleRes: reviewSingleRes,
      },
    };
  }

  const { data: reviewSingleRes } = await reviewAPI.getReviewSingle(Number(reviewId));
  return {
    props: {
      reviewSingleRes: reviewSingleRes.data,
    },
  };
};

export default ReviewDetailPage;
