import Head from 'next/head';
import styled from '@emotion/styled';
import { Banner } from 'components/molecules';
import { useInfiniteScroll } from 'hooks';
import { useEffect, useState } from 'react';
import { ReviewFeed } from 'components/organisms';
import { reviewAPI } from 'apis';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { useRouter } from 'next/router';
import { ReviewSingleReadData } from 'types/apis/review';
import { swrOptions } from 'utils';
import useSWRInfinite from 'swr/infinite';

const CommunityPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const router = useRouter();
  const exhibitionId = router.query.exhibitionId;

  const getKey = (currentPage: number, totalPage: number) => {
    if (totalPage < currentPage) {
      return null;
    }
    return `api/v1/reviews${
      exhibitionId ? `?exhibitionId=${exhibitionId}` : ''
    }?page=${currentPage}`;
  };

  const { data: exhibitionData } = useSWRInfinite(getKey, swrOptions.fetcher);

  useEffect(() => {
    if (exhibitionData) {
      setFeeds([...exhibitionData[0].content]);
      setTotalPage(exhibitionData[0].totalPage);
    }
  }, [exhibitionData]);

  const [feeds, setFeeds] = useState<ReviewSingleReadData[]>([]);

  const getMoreFeed = async () => {
    if (totalPage <= currentPage) {
      return;
    }

    const { data } = await reviewAPI.getReviewMulti({
      page: currentPage + 1,
      exhibitionId: Number(exhibitionId),
    });
    const newFeeds: ReviewSingleReadData[] = Object.values(data.data.content);

    console.log('newwFeeds', newFeeds);
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
        <Banner
          subtitle="Art.zip 커뮤니티"
          title="아트집에서 다양한 후기를 만나보고"
          content={'여러 사람들과 소통하세요 !'}
        />
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
