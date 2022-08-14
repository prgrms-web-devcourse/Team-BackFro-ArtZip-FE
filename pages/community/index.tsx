import Head from 'next/head';
import styled from '@emotion/styled';
import { Banner } from 'components/molecule';
import { useInfiniteScroll } from 'hooks';
import { useEffect, useState } from 'react';
import { ReviewFeed } from 'components/organism';
import { reviewAPI } from 'apis';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { useRouter } from 'next/router';
import { ReviewSingleReadData } from 'types/apis/review';

const CommunityPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const exhibitionId = router.query.exhibitionId;

  useEffect(() => {
    const getFeed = async () => {
      const { data } = await reviewAPI.getReviewMulti({
        exhibitionId: Number(exhibitionId),
      });
      setFeeds([...data.data.content]);
      setTotalPages(data.data.totalPages);
    };
    getFeed();
  }, []);

  const [feeds, setFeeds] = useState<ReviewSingleReadData[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const getMoreFeed = async () => {
    if (totalPages <= currentPage) {
      return;
    }
    const { data } = await reviewAPI.getReviewMulti({
      page: currentPage + 1,
      exhibitionId: Number(exhibitionId),
    });
    const newFeeds: ReviewSingleReadData[] = Object.values(data.data.content);
    setFeeds((feeds) => [...feeds, ...newFeeds]);
    setCurrentPage(currentPage + 1);
  };

  const [fetching, setFetching] = useInfiniteScroll(getMoreFeed);

  const { userId } = useRecoilValue(userAtom);

  const handleDeleteButtonClick = async () => {
    const { exhibitionId } = router.query;
    const { data } = await reviewAPI.getReviewMulti({ exhibitionId: Number(exhibitionId) });
    setFeeds([...data.data.content]);
  };

  return (
    <>
      <Head>
        <title>ArtZip | COMMUNITY</title>
      </Head>

      <>
        <Banner title="커뮤니티" content={'Art.zip에서 다양한 전시회 후기를 만나보세요'} />
        <CommunityFeedWrapper>
          {feeds.map((feed) => {
            const { reviewId, user } = feed;
            return (
              <ReviewFeed
                key={reviewId}
                feed={feed}
                isMyFeed={userId === user.userId}
                onDeleteButtonClick={handleDeleteButtonClick}
              />
            );
          })}
        </CommunityFeedWrapper>
      </>
    </>
  );
};

const CommunityFeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default CommunityPage;
