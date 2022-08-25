import styled from '@emotion/styled';
import { Tabs, Image, Spin, Pagination } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecules';
import { userAPI } from 'apis';
import { CSSProperties, useEffect, useState } from 'react';
import { ReviewCardProps, ExhibitionProps } from 'types/model';
import useSWR from 'swr';
import { useRouter } from 'next/router';

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

const UserPage = () => {
  const [myReview, setMyReview] = useState<UserActivity<ReviewCardProps>>(initialReview);
  const [likeReview, setLikeReview] = useState<UserActivity<ReviewCardProps>>(initialReview);
  const [likeExhibition, setLikeExhibition] =
    useState<UserActivity<Required<ExhibitionProps>>>(initialExhibition);
  const { id } = useRouter().query;

  const { data: userInfo } = useSWR(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/users/${id}/info`,
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    userInfo && handleTabClick('MY_REVIEW');
  }, [userInfo]);

  const handleTabClick = (tabName: string) => {
    switch (tabName) {
      case 'MY_REVIEW': {
        handleMyReviewChange(myReview.currentPage);
        return;
      }
      case 'LIKE_REVIEW': {
        handleLikeReviewChange(likeReview.currentPage);
        return;
      }
      case 'LIKE_EXHIBITION': {
        handleLikeExhibitionChange(likeExhibition.currentPage);
        return;
      }
      default:
        console.error('Invalid key');
    }
  };

  const handleMyReviewChange = async (page: number) => {
    if (userInfo) {
      const payload = await userAPI
        .getMyReview(userInfo.userId, page - 1, myReview.pageSize)
        .then((res) => res.data.data.content);

      setMyReview({
        ...myReview,
        payload,
        currentPage: page,
      });
    }
  };

  const handleLikeReviewChange = async (page: number) => {
    if (userInfo) {
      const payload = await userAPI
        .getLikeReview(userInfo.userId, page - 1, myReview.pageSize)
        .then((res) => res.data.data.content);

      setLikeReview({
        ...likeReview,
        payload,
        currentPage: page,
      });
    }
  };

  const handleLikeExhibitionChange = async (page: number) => {
    if (userInfo) {
      const payload = await userAPI
        .getLikeExhibition(userInfo.userId, page - 1, likeExhibition.pageSize)
        .then((res) => res.data.data.content);

      setLikeExhibition({
        ...likeExhibition,
        payload,
        currentPage: page,
      });
    }
  };

  if (!userInfo) {
    return <Spinner size="large" />;
  }

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfileImage src={userInfo.profileImage} alt="프로필 이미지" />
        <UserName>{userInfo.nickname}</UserName>
        <UserEmail>{userInfo.email}</UserEmail>
      </ProfileContainer>
      <TabCardContainer type="card" tabPosition="top" centered onTabClick={handleTabClick}>
        <Tab tab={`작성한 후기 (${userInfo.reviewCount})`} key="MY_REVIEW">
          <ReviewContainer>
            {myReview.payload?.map((review) => (
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
            ))}
          </ReviewContainer>
          <Pagination
            defaultCurrent={1}
            pageSize={4}
            total={userInfo.reviewCount}
            hideOnSinglePage={true}
            onChange={handleMyReviewChange}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 후기 (${userInfo.reviewLikeCount})`} key="LIKE_REVIEW">
          <ReviewContainer>
            {likeReview ? (
              likeReview.payload.map((review) => (
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
              <Spinner size="large" />
            )}
          </ReviewContainer>
          <Pagination
            defaultCurrent={1}
            pageSize={4}
            total={userInfo.reviewLikeCount}
            hideOnSinglePage={true}
            onChange={handleLikeReviewChange}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 전시회 (${userInfo.exhibitionLikeCount})`} key="LIKE_EXHIBITION">
          <ExhibitionContainer>
            {likeExhibition ? (
              likeExhibition.payload.map((exhibition) => (
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
              <Spinner size="large" />
            )}
          </ExhibitionContainer>
          <Pagination
            defaultCurrent={1}
            pageSize={8}
            total={userInfo.exhibitionLikeCount}
            hideOnSinglePage={true}
            onChange={handleLikeExhibitionChange}
            style={paginationStyle}
          />
        </Tab>
      </TabCardContainer>
      <SideNavigation
        paths={[
          {
            pathName: `/users/${userInfo.userId}`,
            pageName: '사용자 정보',
          },
          {
            pathName: `/users/${userInfo.userId}/edit`,
            pageName: '프로필 수정',
            query: userInfo, // TODO: 유저의 정보(nickname, profileImage)를 전역 데이터로 관리
          },
          {
            pathName: `/users/${userInfo.userId}/edit-password`,
            pageName: '비밀번호 변경',
            query: userInfo,
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

const Spinner = styled(Spin)`
  margin-bottom: 400px;
`;

const paginationStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '24px',
};

export default UserPage;
