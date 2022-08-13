import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import { Input, message } from 'antd';
import LinkText from 'components/atoms/LinkText';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';

const Header = () => {
  const { pathname } = useRouter();
  // const { userId } = useRecoilValue(userAtom);

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
        <Logo width={252} height={92} />
        <Utility>
          {/* {userId ? (
            <>
              <LinkText href={`/users/${userId}`} text="마이페이지" />
              <LogoutButton>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <LinkText href="/signin" text="로그인" />
              <LinkText href="/signup" text="회원가입" />
            </>
          )} */}
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
            text="감상평 쓰기"
            isCurrentPage={pathname === '/reviews/create'}
          />
          <LinkText href="/community" text="커뮤니티" isCurrentPage={pathname === '/community'} />
        </Navigation>
        <SearchBar
          placeholder="전시회 제목을 검색해주세요."
          allowClear
          onSearch={handleSearchExhibition}
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
    margin-bottom: 10px;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const Utility = styled.div`
  & > a:first-of-type {
    margin-right: 20px;
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

    @media (max-width: 767px) {
      margin-right: auto;
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SearchBar = styled(Input.Search)`
  width: 400px;
  margin-bottom: 14px;

  .ant-btn {
    height: 35px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  font-size: 2.4rem;
  white-space: nowrap;
`;

export default Header;
