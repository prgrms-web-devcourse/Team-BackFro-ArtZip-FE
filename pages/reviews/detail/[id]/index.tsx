import Head from 'next/head';
import { ReviewDetail, CommentWrite, CommentList } from 'components/organisms';
import { ReviewSingleReadData } from 'types/apis/review';
import { reviewAPI } from 'apis';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteScroll } from 'hooks';
import { CommentProps } from 'types/model';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styled from '@emotion/styled';
import useSWR from 'swr';

const ReviewDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { data: reviewDetailData } = useSWR(`api/v1/reviews/${id}`);
  const { data: reviewCommentData } = useSWR(`api/v1/reviews/${id}/comments`);

  useEffect(() => {
    if (reviewDetailData) {
      setReview(reviewDetailData);
      setReviewCommentCount(reviewDetailData.commentCount);
      setTotalPage(reviewDetailData.comments.totalPage);
      setPageNumber(reviewDetailData.pageNumber);
    }
    if (reviewCommentData) {
      setReviewComments(reviewCommentData.comments.content);
    }
  }, [reviewDetailData, reviewCommentData]);

  const [review, setReview] = useState<ReviewSingleReadData>();
  const [reviewComments, setReviewComments] = useState<CommentProps[]>([]);
  const [reviewCommentCount, setReviewCommentCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
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

  const [fetching, setFetching] = useInfiniteScroll(getMoreComment);

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
        <title>ArtZip | ReviewDetailPage</title>
      </Head>

      {review && (
        <>
          <>
            <ReviewDetail
              reviewDetail={review}
              onDeleteButtonClick={showModal}
              commentCount={reviewCommentCount}
            />
            <CommentContainer>
              <CommentWrite reviewId={review.reviewId} onCommentReload={handleCommentReload} />
              {reviewComments && (
                <CommentList
                  comments={reviewComments}
                  reviewId={review.reviewId}
                  onDeleteButtonClick={handleCommentReload}
                  onEditButtonClick={handleCommentReload}
                />
              )}
            </CommentContainer>
          </>

          <Modal
            title="리뷰를 삭제할까요?"
            visible={isModalVisible}
            onOk={() => handleOk(review.reviewId)}
            okText="삭제하기"
            onCancel={handleCancel}
            cancelText="취소"
          >
            <p>이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠어요?</p>
          </Modal>
        </>
      )}

      {!review && <Spin indicator={antIcon} />}
    </>
  );
};

const CommentContainer = styled.div`
  margin: 0 150px;
`;

export default ReviewDetailPage;
