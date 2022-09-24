import styled from '@emotion/styled';
import { Tabs, Image, Pagination } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecules';
import { userAPI } from 'apis';
import { CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ReviewCardProps, ExhibitionProps } from 'types/model';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Spinner } from 'components/atoms';
import DEFAULT_IMAGE from 'constants/defaultImage';
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
  state: UserActivity<ReviewCardProps | Required<ExhibitionProps>>;
  setState:
    | Dispatch<SetStateAction<UserActivity<ReviewCardProps>>>
    | Dispatch<SetStateAction<UserActivity<Required<ExhibitionProps>>>>;
  fetcher: (userId: number, page: number, size: number) => Promise<AxiosResponse>;
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
    state: myReview,
    setState: setMyReview,
    fetcher: userAPI.getMyReview,
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
            state: myReview,
            setState: setMyReview,
            fetcher: userAPI.getMyReview,
          };
          break;
        }
        case 'LIKED_REVIEW': {
          tab.current = {
            name: tabName,
            state: likedReview,
            setState: setLikedReview,
            fetcher: userAPI.getLikedReview,
          };
          break;
        }
        case 'LIKED_EXHIBITION': {
          tab.current = {
            name: tabName,
            state: likedExhibition,
            setState: setLikedExhibition,
            fetcher: userAPI.getLikedExhibition,
          };
          break;
        }
        default:
          console.error('Invalid tabName');
      }
      handleChange(tab.current.state.currentPage);
    }
  };

  const handleChange = async (page: number) => {
    if (userInfo) {
      setIsLoaded(false);
      const { state, setState, fetcher } = tab.current;
      const { data } = await fetcher(userInfo.userId, page - 1, state.pageSize);

      setState({
        ...state,
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
      <ProfileContainer>
        <ProfileImage src={profileImage || DEFAULT_IMAGE.USER_PROFILE} alt="프로필 이미지" />
        <UserName>{nickname}</UserName>
        <UserEmail>{email}</UserEmail>
      </ProfileContainer>
      <TabCardContainer type="card" tabPosition="top" centered onTabClick={handleTabClick}>
        <Tab tab={`작성한 후기 (${reviewCount})`} key="MY_REVIEW">
          <ReviewContainer>
            {isLoaded ? (
              myReview.payload?.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  reviewId={review.reviewId}
                  title={review.title}
                  content={review.content}
                  thumbnail={review.exhibition.thumbnail}
                  createdAt={review.createdAt}
                  likeCount={review.likeCount}
                  commentCount={review.commentCount}
                  photo={review.photos}
                  userId={review.user.userId}
                  nickname={review.user.nickname}
                  profileImage={review.user.profileImage}
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
                  reviewId={review.reviewId}
                  title={review.title}
                  content={review.content}
                  thumbnail={review.exhibition.thumbnail}
                  createdAt={review.createdAt}
                  likeCount={review.likeCount}
                  commentCount={review.commentCount}
                  photo={review.photos}
                  userId={review.user.userId}
                  nickname={review.user.nickname}
                  profileImage={review.user.profileImage}
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
                <ExhibitionCard
                  key={exhibition.exhibitionId}
                  exhibitionId={exhibition.exhibitionId}
                  name={exhibition.name}
                  thumbnail={exhibition.thumbnail}
                  startDate={exhibition.startDate}
                  endDate={exhibition.endDate}
                  likeCount={exhibition.likeCount}
                  reviewCount={exhibition.reviewCount}
                  isLiked={exhibition.isLiked}
                />
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

const ProfileContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 20px;
`;

const ProfileImage = styled(Image)`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserName = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;

const UserEmail = styled.span`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.font.dark};
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
