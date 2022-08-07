import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { ReviewDetail, CommentWrite, CommentList } from 'components/organism';
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
    comments,
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

      {/* 코멘트 영역 */}
      {/* TODO: 무한 스크롤로 코멘트 렌더링 -> 이건 역시 컴포넌트로 빼둔다.
      TODO: 답글 달기 로직 구현
      TODO: 답글 보기 로직 구현 */}
      <CommentWrite user={null} />
      <CommentList comments={comments} reviewId={reviewId} />
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
