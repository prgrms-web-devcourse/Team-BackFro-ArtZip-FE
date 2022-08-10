import Head from 'next/head';
import styled from '@emotion/styled';
import { Banner } from 'components/molecule';
import { useInfiniteScroll } from 'hooks';
import { useState } from 'react';
import { ReviewMultiReadResponse, ReviewSingleReadData } from 'types/apis/review';
import { ReviewFeed } from 'components/organism';
import { reviewAPI } from 'apis';
import { GetServerSidePropsContext } from 'next';

const CommunityPage = ({ data }: ReviewMultiReadResponse) => {
  const { totalPages, content } = data;
  const [currentPage, setCurrentPage] = useState(0);

  const getMoreFeed = async () => {
    if (totalPages <= currentPage) {
      return;
    }
    const { data } = await reviewAPI.getReviewMulti({ page: currentPage + 1 });
    const newFeeds: ReviewSingleReadData[] = Object.values(data.data.content);
    setFeeds((feeds) => [...feeds, ...newFeeds]);
    setCurrentPage(currentPage + 1);
  };

  const [fetching, setFetching] = useInfiniteScroll(getMoreFeed);
  const [feeds, setFeeds] = useState([...content]);

  return (
    <>
      <Head>
        <title>ArtZip | COMMUNITY</title>
      </Head>

      <CommunityPageWrapper>
        <Banner title="커뮤니티" content={'Art.zip에서 다양한 전시회 후기를 만나보세요'} />
        {feeds.map((feed) => {
          const { reviewId } = feed;
          return (
            <ReviewFeed
              key={reviewId}
              feed={feed}
              // 전역 상태로 관리, 우선은 true
              isMyFeed={true}
              onLikeClick={() => {
                console.log('like click!');
              }}
              onDeleteButtonClick={() => {
                console.log('delete click!');
              }}
            />
          );
        })}
      </CommunityPageWrapper>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const exhibitionId = query.exhibitionId;
  const { data } = await reviewAPI.getReviewMulti({ exhibitionId: Number(exhibitionId) });

  return {
    props: {
      data: data.data,
    },
  };
};

const CommunityPageWrapper = styled.div``;

export default CommunityPage;
