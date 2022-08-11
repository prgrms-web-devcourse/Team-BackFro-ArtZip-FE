import styled from '@emotion/styled';
import { Tabs, Image } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecule';
import { userAPI } from 'apis';
import { GetServerSideProps, GetStaticProps } from 'next';
import { UserInfoResponse } from 'types/apis/user';
import { useEffect, useState } from 'react';
import { ExhibitionProps } from 'types/model';
import imageUrl from 'constants/imageUrl';

interface UserPageProps {
  userInfo: {
    nickname: string;
    userId: number;
    profileImage: string;
    email: string;
    reviewCount: number;
    reviewLikeCount: number;
    exhibitionLikeCount: number;
    commentCount: number;
  };
  userExhibitions: {
    exhibitionId: number;
    name: string;
    thumbnail: string;
    startDate: string;
    endDate: string;
    likeCount: number;
    reviewCount: number;
    isLiked: boolean;
  }[];
}

const UserPage = ({ userInfo, userExhibitions }: UserPageProps) => {
  const [myReviews, setMyReviews] = useState();
  const [likeReviews, setLikeReviews] = useState();

  const handleTabClick = (key: string) => {
    switch (key) {
      case 'myReview': {
        fetchMyReviews();
        return;
      }
      case 'likeReview': {
        fetchLikeReviews();
        return;
      }
      case 'likeExhibition': {
        return;
      }
      default:
        console.error('유효하지 않은 key입니다.');
    }
  };

  const fetchMyReviews = async () => {
    const result = await userAPI.getMyReview(userInfo.userId, 0, 10).then((res) => res.data);
    console.log(result);
  };

  const fetchLikeReviews = async () => {
    const result = await userAPI.getLikeReview(userInfo.userId, 0, 10).then((res) => res.data);
    console.log(result);
  };

  return userInfo && userExhibitions ? (
    <PageContainer>
      <ProfileContainer>
        <ProfileImage src={userInfo.profileImage} alt="프로필 이미지" preview={false} />
        <UserName>{userInfo.nickname}</UserName>
        <UserEmail>{userInfo.email}</UserEmail>
      </ProfileContainer>
      <TabCardContainer type="card" tabPosition="top" centered onTabClick={handleTabClick}>
        <Tab tab={`작성한 후기 (${userInfo.reviewCount})`} key="myReview"></Tab>
        <Tab tab={`좋아하는 후기 (${userInfo.reviewLikeCount})`} key="likeReview">
          <ReviewContainer>
            <ReviewCard
              reviewId={reviewDummy.reviewId}
              thumbnail={reviewDummy.exhibition.thumbnail}
              title={reviewDummy.title}
              content={reviewDummy.content}
              createdAt={reviewDummy.createdAt}
              likeCount={reviewDummy.likeCount}
              commentCount={reviewDummy.commentCount}
              photo={reviewDummy.photos[0]}
              userId={reviewDummy.user.userId}
              nickname={reviewDummy.user.nickname}
              profileImage={reviewDummy.user.profileImage}
            />
          </ReviewContainer>
        </Tab>
        <Tab tab={`좋아하는 전시회 (${userInfo.exhibitionLikeCount})`} key="likeExhibition">
          <ExhibitionContainer>
            {userExhibitions.map((exhibition) => (
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
            ))}
          </ExhibitionContainer>
        </Tab>
      </TabCardContainer>
      <SideNavigation
        paths={[
          {
            href: `/users/${userInfo.userId}`, // TODO: `/users/${userId}`로 수정
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
    '로딩 중입니다.'
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params) {
    const userInfo = await userAPI.getInformation(Number(params.id)).then((res) => res.data.data);

    const userExhibitions = await userAPI
      .getLikeExhibition(Number(params.id), 0, 10)
      .then((res) => res.data.data.content);

    return {
      props: {
        userInfo,
        userExhibitions,
      },
    };
  }
  return {
    props: {
      userInfo: {},
      userExhibitions: {},
    },
  };
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1000px;
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
  justify-items: center;
  padding-bottom: 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const reviewDummy = {
  reviewId: 43,
  user: {
    userId: 11,
    profileImage: 'https~',
    nickname: 'Emily',
  },
  exhibition: {
    exhibitionId: 24,
    name: '전시회 이름',
    startDate: '2022-10-11',
    thumbnail: 'https~~',
  },
  title: '번아웃증후군 전시회 다녀옴~',
  content:
    '오늘 핸드아트코리아 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 핸드아트코리아 전시회를 다녀왔다. 정말 재밌었다~~',
  createdAt: '2022-03-22T22:33:11',
  updatedAt: '2022-03-23T13:03:51',
  isEdited: true,
  isLiked: false,
  isPublic: true,
  likeCount: 32,
  commentCount: 2,
  photos: ['https~', 'https~'],
};

const exhibitionCardStyle = {
  width: '240px',
  height: '350px',
};

export default UserPage;
