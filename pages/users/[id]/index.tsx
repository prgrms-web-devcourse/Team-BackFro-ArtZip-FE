import styled from '@emotion/styled';
import { UserProfileCard, SideNavigation } from 'components/molecules';
import { useRouter } from 'next/router';
import { UserActivityCardList } from 'components/organisms';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';

const UserPage = () => {
  const { userId } = useRecoilValue(userAtom);
  const { id } = useRouter().query;
  const isMyPage = String(userId) === id;

  return (
    <PageContainer>
      <UserProfileCard userId={String(id)} />
      <UserActivityCardList userId={String(id)} />
      {isMyPage && (
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
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

export default UserPage;
