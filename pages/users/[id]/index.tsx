import styled from '@emotion/styled';
import { Tabs, Image, Input, Upload } from 'antd';

const UserPage = () => {
  return (
    <PageContainer>
      <TabContainer tabPosition="left" size="large" tabBarStyle={{ fontWeight: 'bold' }} centered>
        <Tab tab="프로필" key="1">
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
              작성한 글
            </Tab>
            <Tab tab="좋아하는 전시회 (6)" key={2}>
              좋아하는 전시회
            </Tab>
            <Tab tab="좋아하는 후기 (17)" key={3}>
              좋아하는 후기
            </Tab>
          </TabCardContainer>
        </Tab>
        <Tab tab="정보 수정" key="2">
          <ProfileEditForm>
            <fieldset>
              <legend>계정 관리</legend>
              <label htmlFor="">이메일</label>
              <Input type="email" defaultValue="gitul0515@gmail.com" disabled />

              <label htmlFor="">닉네임</label>
              <Input type="text" defaultValue="미스터공공" />

              <Upload name="avatar" />
            </fieldset>
          </ProfileEditForm>
        </Tab>
        <Tab tab="비밀번호 변경" key="3">
          비밀번호 변경
        </Tab>
      </TabContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin-left: 100px;
  margin-right: 240px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    margin: 0 auto;
  }
`;

const TabContainer = styled(Tabs)`
  margin-top: 50px;
`;

const Tab = styled(Tabs.TabPane)`
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

const ProfileEditForm = styled.form``;

const PasswordEditForm = styled.form``;

export default UserPage;
