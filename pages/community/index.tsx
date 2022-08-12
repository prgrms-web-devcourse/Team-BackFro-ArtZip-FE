import Head from 'next/head';
import styled from '@emotion/styled';
import { Banner } from 'components/molecule';
import { useInfiniteScroll } from 'hooks';
import { useState } from 'react';
import { ReviewMultiReadResponse, ReviewSingleReadData } from 'types/apis/review';
import { ReviewFeed } from 'components/organism';
import { reviewAPI } from 'apis';
import { GetServerSidePropsContext } from 'next';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

const CommunityPage = ({ data }: ReviewMultiReadResponse) => {
  const { totalPages, content } = data;
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

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
  const [loading, setLoding] = useState(false);

  const { userId } = useRecoilValue(userAtom);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
          {!loading &&
            feeds.map((feed) => {
              const { reviewId, user } = feed;
              return (
                <ReviewFeed
                  key={reviewId}
                  feed={feed}
                  // 전역 상태로 관리, 우선은 true
                  isMyFeed={userId === user.userId}
                  onDeleteButtonClick={handleDeleteButtonClick}
                />
              );
            })}

          {loading && [...Array(20)].map((_, i) => <Spin indicator={antIcon} key={i} />)}
        </CommunityFeedWrapper>
      </>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const exhibitionId = context.query.exhibitionId;
  const { data } = await reviewAPI.getReviewMulti({ exhibitionId: Number(exhibitionId) });
  return {
    props: {
      data: data.data,
    },
  };
};

const CommunityFeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default CommunityPage;
