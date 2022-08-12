import styled from '@emotion/styled';
import { Tabs, Image, Spin } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecule';
import { userAPI } from 'apis';
import { GetServerSideProps } from 'next';
import { UserInfoResponse, UserReviewResponse } from 'types/apis/user';
import { useState } from 'react';
import { ReviewCardProps, ExhibitionProps } from 'types/model';

interface UserPageProps {
  userInfoResponse: UserInfoResponse;
  userReviewResponse: UserReviewResponse;
}

const UserPage = ({ userInfoResponse, userReviewResponse }: UserPageProps) => {
  const userInfo = userInfoResponse.data;
  const userReviews = userReviewResponse.data?.content;

  const [myReviews, setMyReviews] = useState<ReviewCardProps[] | undefined>(userReviews);
  const [likeReviews, setLikeReviews] = useState<ReviewCardProps[]>();
  const [likeExhibitions, setLikeExhibitions] = useState<Required<ExhibitionProps>[]>();

  const handleTabClick = (key: string) => {
    switch (key) {
      case 'myReview': {
        return;
      }
      case 'likeReview': {
        fetchLikeReviews();
        return;
      }
      case 'likeExhibition': {
        fetchLikeExhibitions();
        return;
      }
      default:
        console.error('Invalid key');
    }
  };

  const fetchLikeReviews = async () => {
    if (userInfo && !likeReviews) {
      const { content } = await userAPI
        .getLikeReview(userInfo.userId, 0, 10)
        .then((res) => res.data.data);
      setLikeReviews(content);
    }
  };

  const fetchLikeExhibitions = async () => {
    if (userInfo && !likeExhibitions) {
      const { content } = await userAPI
        .getLikeExhibition(userInfo.userId, 0, 10)
        .then((res) => res.data.data);
      setLikeExhibitions(content);
    }
  };

  return userInfo && userReviews ? (
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
                photo={review.photos[0]?.path}
                userId={review.user.userId}
                nickname={review.user.nickname}
                profileImage={review.user.profileImage}
              />
            ))}
          </ReviewContainer>
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
                  photo={review.photos[0]?.path}
                  userId={review.user.userId}
                  nickname={review.user.nickname}
                  profileImage={review.user.profileImage}
                />
              ))
            ) : (
              <Spinner size="large" />
            )}
          </ReviewContainer>
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
        </Tab>
      </TabCardContainer>
      <SideNavigation
        paths={[
          {
            href: `/users/${userInfo.userId}`,
            pageName: '사용자 정보',
          },
          {
            href: `/users/${userInfo.userId}/edit`,
            pageName: '프로필 수정',
          },
          {
            href: `/users/${userInfo.userId}/edit-password`,
            pageName: '비밀번호 변경',
          },
        ]}
      />
    </PageContainer>
  ) : (
    <Spinner size="large" />
  );
};

// TODO: 추후 getStaticProps로 변경 예정 (getStaticPaths도 추가)
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params) {
    const userInfoResponse = await userAPI.getUserInfo(Number(params.id)).then((res) => res.data); // 추후 then을 await으로 변경

    const userReviewResponse = await userAPI
      .getMyReview(Number(params.id), 0, 10)
      .then((res) => res.data);

    return {
      props: {
        userInfoResponse,
        userReviewResponse,
      },
    };
  }
  return {
    props: {
      userInfoResponse: {},
      userReviewResponse: {},
    },
  };
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
  width: 200px;
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

export default UserPage;
