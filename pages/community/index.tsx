import Head from 'next/head';
import styled from '@emotion/styled';
import { Banner } from 'components/molecule';
import { useInfiniteScroll } from 'hooks';
import { useState } from 'react';
import axios from 'axios';
import { ReviewMultiReadResponse, ReviewSingleReadData } from 'types/apis/review';
import { ReviewFeed } from 'components/organism';

const CommunityPage = ({ data }: ReviewMultiReadResponse) => {
  const { totalPages } = data;
  const [currentPage, setCurrentPage] = useState(0);

  const getMoreFeed = async () => {
    if (totalPages <= currentPage) {
      return;
    }
    const res = await fetch(
      `${process.env.MOCKING_API_END_POINT}api/v1/reviews?page=${currentPage + 1}`,
    );
    const { data } = await res.json();
    const newFeeds: ReviewSingleReadData[] = Object.values(data);
    setFeeds((feeds) => [...feeds, ...newFeeds]);
    setCurrentPage(currentPage + 1);
  };

  const [fetching, setFetching] = useInfiniteScroll(getMoreFeed);
  const [feeds, setFeeds] = useState([...data.content]);

  return (
    <>
      <Head>
        <title>ArtZip | COMMUNITY</title>
      </Head>

      <CommunityPageWrapper>
        <Banner title="커뮤니티" content={'Art.zip에서 다양한 전시회 후기를 만나보세요'} />

        {/* TODO: 무한 스크롤으로 피드 렌더링 */}
        {feeds.map((feed) => {
          const {
            exhibition,
            id,
            isLiked,
            likeCount,
            title,
            content,
            createdAt,
            user,
            commentCount,
            photos,
          } = feed;
          return (
            <ReviewFeed
              key={id}
              userProfileImage={user.profileImage}
              userName={user.nickname}
              userId={user.userId}
              feedCreateDate={createdAt}
              exhibitionName={exhibition.name}
              exhibitionId={exhibition.exhibitionId}
              feedTitle={title}
              feedContent={content}
              isLiked={isLiked}
              likeCount={likeCount}
              onLikeClick={() => {
                console.log('like click!');
              }}
              commentCount={commentCount}
              // 전역 상태로 관리, 우선은 true로 표시
              isMyFeed={true}
              reviewId={id}
              onDeleteButtonClick={() => {
                console.log('delete click!');
              }}
              // 사진이 없는 경우에는 디폴트 이미지, 사진이 있는 경우에는 0번 이미지
              reviewThumbnailImage={photos.length ? photos[0].path : exhibition.thumbnail}
            />
          );
        })}
      </CommunityPageWrapper>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.MOCKING_API_END_POINT}api/v1/reviews`);

  return {
    props: {
      data: data.data,
    },
  };
};

const CommunityPageWrapper = styled.div``;

export default CommunityPage;
