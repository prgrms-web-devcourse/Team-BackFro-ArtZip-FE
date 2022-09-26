import styled from '@emotion/styled';
import { Tabs, Pagination } from 'antd';
import { UserProfileCard, ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecules';
import { userAPI } from 'apis';
import { CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ReviewCardProps, ExhibitionProps } from 'types/model';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Spinner } from 'components/atoms';
import { AxiosResponse } from 'axios';

interface UserActivity<T> {
  payload: T[];
  currentPage: number;
  pageSize: number;
  totalSize: number;
}

const initialReview = {
  payload: [],
  currentPage: 1,
  pageSize: 4,
  totalSize: 0,
};

const initialExhibition = {
  payload: [],
  currentPage: 1,
  pageSize: 8,
  totalSize: 0,
};

interface Tab {
  name: '' | 'MY_REVIEW' | 'LIKED_REVIEW' | 'LIKED_EXHIBITION';
  cardList: UserActivity<ReviewCardProps | Required<ExhibitionProps>>;
  setCardList:
    | Dispatch<SetStateAction<UserActivity<ReviewCardProps>>>
    | Dispatch<SetStateAction<UserActivity<Required<ExhibitionProps>>>>;
  fetchCardList: (userId: number, page: number, size: number) => Promise<AxiosResponse>;
}

const UserPage = () => {
  const { id } = useRouter().query;
  const { data: userInfo } = useSWR(`api/v1/users/${id}/info`);
  const [myReview, setMyReview] = useState<UserActivity<ReviewCardProps>>({ ...initialReview });
  const [likedReview, setLikedReview] = useState<UserActivity<ReviewCardProps>>({
    ...initialReview,
  });
  const [likedExhibition, setLikedExhibition] = useState<UserActivity<Required<ExhibitionProps>>>({
    ...initialExhibition,
  });
  const tab = useRef<Tab>({
    name: '',
    cardList: myReview,
    setCardList: setMyReview,
    fetchCardList: userAPI.getMyReview,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    userInfo && handleTabClick('MY_REVIEW');
  }, [userInfo]);

  const handleTabClick = (tabName: string) => {
    if (tab.current.name !== tabName) {
      switch (tabName) {
        case 'MY_REVIEW': {
          tab.current = {
            name: tabName,
            cardList: myReview,
            setCardList: setMyReview,
            fetchCardList: userAPI.getMyReview,
          };
          break;
        }
        case 'LIKED_REVIEW': {
          tab.current = {
            name: tabName,
            cardList: likedReview,
            setCardList: setLikedReview,
            fetchCardList: userAPI.getLikedReview,
          };
          break;
        }
        case 'LIKED_EXHIBITION': {
          tab.current = {
            name: tabName,
            cardList: likedExhibition,
            setCardList: setLikedExhibition,
            fetchCardList: userAPI.getLikedExhibition,
          };
          break;
        }
        default:
          console.error('Invalid tabName');
      }
      handleChange(tab.current.cardList.currentPage);
    }
  };

  const handleChange = async (page: number) => {
    if (userInfo) {
      setIsLoaded(false);
      const { cardList, setCardList, fetchCardList } = tab.current;
      const { data } = await fetchCardList(userInfo.userId, page - 1, cardList.pageSize);

      setCardList({
        ...cardList,
        payload: data.data.content,
        currentPage: page,
      });
      setIsLoaded(true);
    }
  };

  if (!userInfo) {
    return <Spinner />;
  }

  const {
    userId,
    profileImage,
    nickname,
    email,
    reviewCount,
    reviewLikeCount,
    exhibitionLikeCount,
  } = userInfo;

  return (
    <PageContainer>
      <UserProfileCard
        data={{
          email,
          nickname,
          profileImage,
        }}
      />
      <TabCardContainer type="card" tabPosition="top" centered onTabClick={handleTabClick}>
        <Tab tab={`작성한 후기 (${reviewCount})`} key="MY_REVIEW">
          <ReviewContainer>
            {isLoaded ? (
              myReview.payload?.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  data={review}
                  thumbnail={review.exhibition.thumbnail}
                />
              ))
            ) : (
              <Spinner height="50vh" />
            )}
          </ReviewContainer>
          <Pagination
            defaultCurrent={myReview.currentPage}
            pageSize={myReview.pageSize}
            total={reviewCount}
            onChange={handleChange}
            hideOnSinglePage={true}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 후기 (${reviewLikeCount})`} key="LIKED_REVIEW">
          <ReviewContainer>
            {isLoaded ? (
              likedReview.payload.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  data={review}
                  thumbnail={review.exhibition.thumbnail}
                />
              ))
            ) : (
              <Spinner height="50vh" />
            )}
          </ReviewContainer>
          <Pagination
            defaultCurrent={likedReview.currentPage}
            pageSize={likedReview.pageSize}
            total={reviewLikeCount}
            onChange={handleChange}
            hideOnSinglePage={true}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 전시회 (${exhibitionLikeCount})`} key="LIKED_EXHIBITION">
          <ExhibitionContainer>
            {isLoaded ? (
              likedExhibition.payload.map((exhibition) => (
                <ExhibitionCard key={exhibition.exhibitionId} data={exhibition} />
              ))
            ) : (
              <Spinner height="50vh" />
            )}
          </ExhibitionContainer>
          <Pagination
            defaultCurrent={likedExhibition.currentPage}
            pageSize={likedExhibition.pageSize}
            total={userInfo.exhibitionLikeCount}
            hideOnSinglePage={true}
            onChange={handleChange}
            style={paginationStyle}
          />
        </Tab>
      </TabCardContainer>
      <SideNavigation
        paths={[
          {
            href: `/users/${userId}`,
            pageName: '사용자 정보',
          },
          {
            href: `/users/${userId}/edit`,
            pageName: '프로필 수정',
          },
          {
            href: `/users/${userId}/edit-password`,
            pageName: '비밀번호 변경',
          },
        ]}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const TabCardContainer = styled(Tabs)`
  margin-top: 30px;
`;

const Tab = styled(Tabs.TabPane)`
  text-align: left;
`;

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  padding: 0 70px 30px 70px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ExhibitionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  padding-bottom: 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const paginationStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '24px',
};

export default UserPage;
