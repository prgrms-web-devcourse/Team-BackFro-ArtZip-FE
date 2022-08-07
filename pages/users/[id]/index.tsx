import styled from '@emotion/styled';
import { Tabs, Image } from 'antd';
import { ReviewCard, ExhibitionCard, SideNavigation } from 'components/molecule';

const UserPage = () => {
  return (
    <PageContainer>
      <ProfileContainer>
        <ProfileImage
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="profile image"
          preview={false}
        />
        <UserName>비긴어게인</UserName>
        <UserEmail>gitul0515@gmail.com</UserEmail>
      </ProfileContainer>
      <TabCardContainer type="card" tabPosition="top" centered>
        <Tab tab="작성한 글 (12)" key={1}>
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
            <ReviewCard
              reviewId={reviewDummy.reviewId}
              thumbnail={reviewDummy.exhibition.thumbnail}
              title={reviewDummy.title}
              content="오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~"
              createdAt={reviewDummy.createdAt}
              likeCount={reviewDummy.likeCount}
              commentCount={reviewDummy.commentCount}
              photo={reviewDummy.photos[0]}
              userId={reviewDummy.user.userId}
              nickname={reviewDummy.user.nickname}
              profileImage={reviewDummy.user.profileImage}
            />
            <ReviewCard
              reviewId={reviewDummy.reviewId}
              thumbnail={reviewDummy.exhibition.thumbnail}
              title={reviewDummy.title}
              content="오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ "
              createdAt={reviewDummy.createdAt}
              likeCount={reviewDummy.likeCount}
              commentCount={reviewDummy.commentCount}
              photo={reviewDummy.photos[0]}
              userId={reviewDummy.user.userId}
              nickname={reviewDummy.user.nickname}
              profileImage={reviewDummy.user.profileImage}
            />
            <ReviewCard
              reviewId={reviewDummy.reviewId}
              thumbnail={reviewDummy.exhibition.thumbnail}
              title={reviewDummy.title}
              content="오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~ 오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~"
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
        <Tab tab="좋아하는 전시회 (6)" key={2}>
          <ExhibitionContainer>
            <ExhibitionCard
              exhibitionId={exhibitionDummy.exhibitionId}
              name={exhibitionDummy.name}
              thumbnail={exhibitionDummy.thumbnail}
              startDate={exhibitionDummy.startDate}
              endDate={exhibitionDummy.endDate}
              likeCount={exhibitionDummy.likeCount}
              reviewCount={exhibitionDummy.reviewCount}
              isLiked={exhibitionDummy.isLiked}
            />
            <ExhibitionCard
              exhibitionId={exhibitionDummy.exhibitionId}
              name={exhibitionDummy.name}
              thumbnail={exhibitionDummy.thumbnail}
              startDate={exhibitionDummy.startDate}
              endDate={exhibitionDummy.endDate}
              likeCount={exhibitionDummy.likeCount}
              reviewCount={exhibitionDummy.reviewCount}
              isLiked={exhibitionDummy.isLiked}
            />
            <ExhibitionCard
              exhibitionId={exhibitionDummy.exhibitionId}
              name={exhibitionDummy.name}
              thumbnail={exhibitionDummy.thumbnail}
              startDate={exhibitionDummy.startDate}
              endDate={exhibitionDummy.endDate}
              likeCount={exhibitionDummy.likeCount}
              reviewCount={exhibitionDummy.reviewCount}
              isLiked={exhibitionDummy.isLiked}
            />
            <ExhibitionCard
              exhibitionId={exhibitionDummy.exhibitionId}
              name={exhibitionDummy.name}
              thumbnail={exhibitionDummy.thumbnail}
              startDate={exhibitionDummy.startDate}
              endDate={exhibitionDummy.endDate}
              likeCount={exhibitionDummy.likeCount}
              reviewCount={exhibitionDummy.reviewCount}
              isLiked={exhibitionDummy.isLiked}
            />
            <ExhibitionCard
              exhibitionId={exhibitionDummy.exhibitionId}
              name={exhibitionDummy.name}
              thumbnail={exhibitionDummy.thumbnail}
              startDate={exhibitionDummy.startDate}
              endDate={exhibitionDummy.endDate}
              likeCount={exhibitionDummy.likeCount}
              reviewCount={exhibitionDummy.reviewCount}
              isLiked={exhibitionDummy.isLiked}
            />
          </ExhibitionContainer>
        </Tab>
        <Tab tab="좋아하는 후기 (17)" key={3}>
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
      </TabCardContainer>
      <SideNavigation
        paths={[
          {
            href: '/users/1', // TODO: `/users/${userId}`로 수정
            pageName: '사용자 정보',
          },
          {
            href: '/users/1/edit',
            pageName: '프로필 수정',
          },
          {
            href: '/users/1/edit-password',
            pageName: '비밀번호 변경',
          },
        ]}
      />
    </PageContainer>
  );
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

const exhibitionDummy = {
  exhibitionId: 1,
  name: '번아웃증후군',
  thumbnail: 'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg',
  startDate: '2022-08-04',
  endDate: '2022-08-10',
  isLiked: false,
  likeCount: 5,
  reviewCount: 3,
};

export default UserPage;
