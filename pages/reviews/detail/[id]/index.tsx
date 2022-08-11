import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { ReviewDetail, CommentWrite, CommentList } from 'components/organism';
import { ReviewSingleReadResponse } from 'types/apis/review';
import { reviewAPI } from 'apis';

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

  return (
    <>
      <Head>
        <title>ArtZip | ReviewDetailPage</title>
      </Head>
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
        onDeleteButtonClick={() => {
          console.log('삭제!');
        }}
      />

      {/* 전역 상태 머지 되면 로직 구현 */}
      <CommentWrite user={undefined} />
      <CommentList comments={comments} reviewId={reviewId} />
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
