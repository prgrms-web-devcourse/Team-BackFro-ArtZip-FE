import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import { Input, message } from 'antd';
import LinkText from 'components/atoms/LinkText';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userAtom } from 'states';
import { useUserAuthActions } from 'hooks';

const Header = () => {
  const { pathname } = useRouter();

  const [userState, setUserState] = useRecoilState(userAtom);
  const { logout } = useUserAuthActions();
  const router = useRouter();

  const handleSearchExhibition = (value: string) => {
    const isEmpty = !/\S/.test(value);
    if (isEmpty || value.length < 2) {
      message.warning('두 글자 이상 입력해주세요.');
      return;
    }
    router.push({
      pathname: '/search-result',
      query: { exhibition: value },
    });
  };

  return (
    <StyledHeader>
      <Container>
        <Logo width={180} height={55} />
        <Utility>
          {userState.userId ? (
            <>
              <LinkText href={`/users/${userState.userId}`} text="마이페이지" />
              <LogoutButton onClick={logout}>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <LinkText href="/signin" text="로그인" />
              <LinkText href="/signup" text="회원가입" />
            </>
          )}
        </Utility>
      </Container>
      <Container>
        <Navigation>
          <LinkText
            href="/exhibitions/custom"
            text="맞춤 전시회"
            isCurrentPage={pathname === '/exhibitions/custom'}
          />
          <LinkText
            href="/reviews/create"
            text="후기 작성"
            isCurrentPage={pathname === '/reviews/create'}
          />
          <LinkText href="/community" text="커뮤니티" isCurrentPage={pathname === '/community'} />
        </Navigation>
        <SearchBar
          bordered={false}
          placeholder="전시회 제목을 검색해주세요."
          allowClear
          onSearch={handleSearchExhibition}
          size="large"
          enterButton={true}
        />
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.light};
  background-color: ${({ theme }) => theme.color.background};
  z-index: 999;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;

  &:first-of-type {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 90%;
  }
`;

const Utility = styled.div`
  display: flex;
  align-items: center;
  & > a:first-of-type {
    margin-right: 20px;

    @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      margin-right: 10px;
    }
  }

  & > a:last-of-type {
    @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      display: none;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > a {
    margin-right: 80px;
    padding-bottom: 14px;
    margin-bottom: -3px;
    border-bottom: 3px solid transparent;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      font-weight: 500;
      border-bottom: 3px solid ${({ theme }) => theme.color.blue.main};
    }

    @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      margin-right: auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 100%;
  }
`;

const SearchBar = styled(Input.Search)`
  width: 400px;
  margin-bottom: 14px;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.blue.light};
  input::placeholder {
    color: ${({ theme }) => theme.color.blue.light};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.blue.dark};
  }
  .ant-btn {
    background-color: transparent;
    color: ${({ theme }) => theme.color.blue.dark};
    height: 35px;
    border: none;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  font-size: 2.2rem;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

export default Header;
