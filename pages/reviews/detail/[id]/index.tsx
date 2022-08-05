import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { ReviewDetail } from 'components/organism';
import { ReviewSingleReadResponse } from 'types/apis/review';

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
        user={user}
        onDeleteButtonClick={() => {
          console.log('삭제!');
        }}
      />
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return;
  }

  // TODO: 실패했을 때, 성공했을 때 나눠서 응답값을 받아야 함
  const { id } = context.params;
  const { data } = await axios.get(`${process.env.MOCKING_API_END_POINT}api/v1/reviews/${id}`);

  return {
    props: {
      data: data.data[0],
    },
  };
};

export default ReviewDetailPage;
