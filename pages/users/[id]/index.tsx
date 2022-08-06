import styled from '@emotion/styled';
import { Tabs, Image, Input, Upload, Form, Button } from 'antd';
import Link from 'next/link';

const UserPage = () => {
  return (
    <PageContainer>
      <NavigationButtons>
        <Link href="/users/1/edit">
          <a>
            <NavigationButton type="primary">유저 정보</NavigationButton>
          </a>
        </Link>
        <Link href="/users/1/edit-password">
          <a>
            <NavigationButton type="default">계정 관리</NavigationButton>
          </a>
        </Link>
      </NavigationButtons>

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
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
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

const NavigationButtons = styled.nav`
  position: absolute;
  top: 20px;
  left: 0;
`;

const NavigationButton = styled(Button)`
  display: block;
  margin-bottom: 2px;
  padding-right: 24px;
  padding-left: 24px;
`;

const ProfileEditForm = styled.form``;

const PasswordEditForm = styled.form``;

const FieldSet = styled.fieldset``;

const Legend = styled.legend``;

export default UserPage;
