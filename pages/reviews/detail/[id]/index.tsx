import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { ReviewDetail } from 'components/organism';

// TODO: 분리해둔 interface 사용
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReviewDetailPage = ({ review }: any) => {
  const {
    exhibition,
    id,
    isEdited,
    isLiked,
    likeCount,
    // photos,
    title,
    content,
    createdAt,
    // updatedAt,
    commentCount,
    user,
  } = review;
  const { nickname, profileImage, userId } = user;
  const { exhibitionId, name, startDate, endDate, thumbnail } = exhibition;

  return (
    <>
      <Head>
        <title>ArtZip | ReviewDetailPage</title>
      </Head>

      <ReviewDetail
        reviewId={id}
        profileImage={profileImage}
        nickname={nickname}
        createdAt={createdAt}
        userId={userId}
        title={title}
        isEdited={isEdited}
        content={content}
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={commentCount}
        exhibitionId={exhibitionId}
        name={name}
        thumbnail={thumbnail}
        startDate={startDate}
        endDate={endDate}
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

  const { id } = context.params;
  const { data } = await axios.get(`${process.env.MOCKING_API_END_POINT}api/v1/reviews/${id}`);

  return {
    props: {
      review: data.data[0],
    },
  };
};

export default ReviewDetailPage;
