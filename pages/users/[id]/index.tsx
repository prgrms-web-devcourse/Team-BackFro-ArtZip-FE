import styled from '@emotion/styled';
import { Tabs, Image, Spin, Pagination } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecules';
import { userAPI } from 'apis';
import { CSSProperties, useEffect, useState } from 'react';
import { ReviewCardProps, ExhibitionProps } from 'types/model';
import useSWR from 'swr';

const UserPage = () => {
  const { data: userInfo } = useSWR(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/users/27/info`,
  );
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/users/27/info/my/reviews?page=0&size=4`,
  );
  const reviews = data?.content;

  useEffect(() => {
    setMyReviews(reviews);
  }, [reviews]);

  const [myReviews, setMyReviews] = useState<ReviewCardProps[]>();
  const [likeReviews, setLikeReviews] = useState<ReviewCardProps[]>();
  const [likeExhibitions, setLikeExhibitions] = useState<Required<ExhibitionProps>[]>();

  const handleTabClick = (key: string) => {
    switch (key) {
      case 'myReview': {
        return;
      }
      case 'likeReview': {
        getLikeReviews();
        return;
      }
      case 'likeExhibition': {
        getLikeExhibitions();
        return;
      }
      default:
        console.error('Invalid key');
    }
  };

  const getLikeReviews = async () => {
    if (userInfo && !likeReviews) {
      const { content } = await userAPI
        .getLikeReview(userInfo.userId, 0, 4)
        .then((res) => res.data.data);
      setLikeReviews(content);
    }
  };

  const getLikeExhibitions = async () => {
    if (userInfo && !likeExhibitions) {
      const { content } = await userAPI
        .getLikeExhibition(userInfo.userId, 0, 8)
        .then((res) => res.data.data);
      setLikeExhibitions(content);
    }
  };

  const handleChange = (page: number) => {
    console.log(page);
  };

  return userInfo && myReviews ? (
    <PageContainer>
      <ProfileContainer>
        <ProfileImage src={userInfo.profileImage} alt="프로필 이미지" />
        <UserName>{userInfo.nickname}</UserName>
        <UserEmail>{userInfo.email}</UserEmail>
      </ProfileContainer>
      <TabCardContainer type="card" tabPosition="top" centered onTabClick={handleTabClick}>
        <Tab tab={`작성한 후기 (${userInfo.reviewCount})`} key="myReview">
          <ReviewContainer>
            {myReviews?.map((review) => (
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
            onChange={handleChange}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 후기 (${userInfo.reviewLikeCount})`} key="likeReview">
          <ReviewContainer>
            {likeReviews ? (
              likeReviews.map((review) => (
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
            onChange={handleChange}
            style={paginationStyle}
          />
        </Tab>
        <Tab tab={`좋아하는 전시회 (${userInfo.exhibitionLikeCount})`} key="likeExhibition">
          <ExhibitionContainer>
            {likeExhibitions ? (
              likeExhibitions.map((exhibition) => (
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
            onChange={handleChange}
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
  ) : (
    <Spinner size="large" />
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
